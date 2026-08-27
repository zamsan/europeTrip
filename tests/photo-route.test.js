const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildPlaybackTimeline,
  getPlaybackFrame,
  analyzePhotoFiles,
  formatPhotoAnalysisProgress,
  getPhotoRouteZoom,
  getPhotoPickerInterruptionMessage
} = require("../photo-route.js");

test("sorts photos by capture time and caps long gaps before normalization", () => {
  const photos = [
    { id: "c", capturedAt: new Date("2026-08-01T13:00:00Z"), lat: 30, lng: 30 },
    { id: "a", capturedAt: new Date("2026-08-01T10:00:00Z"), lat: 10, lng: 10 },
    { id: "b", capturedAt: new Date("2026-08-01T10:10:00Z"), lat: 20, lng: 20 }
  ];
  const timeline = buildPlaybackTimeline(photos, {
    targetDurationMs: 12_000,
    maxSourceGapMs: 20 * 60 * 1000
  });
  assert.deepEqual(timeline.photos.map((photo) => photo.id), ["a", "b", "c"]);
  assert.equal(timeline.durationMs, 12_000);
  assert.equal(timeline.segments[0].endMs, 4_000);
  assert.equal(timeline.segments[1].endMs, 12_000);
});

test("preserves input order when capture times are equal", () => {
  const capturedAt = new Date("2026-08-01T10:00:00Z");
  const timeline = buildPlaybackTimeline([
    { id: "first", capturedAt, lat: 1, lng: 1 },
    { id: "second", capturedAt, lat: 2, lng: 2 }
  ], { targetDurationMs: 2_000 });
  assert.deepEqual(timeline.photos.map((photo) => photo.id), ["first", "second"]);
  assert.equal(timeline.durationMs, 2_000);
});

test("interpolates marker and visited path at the requested playback time", () => {
  const timeline = buildPlaybackTimeline([
    { id: "a", capturedAt: new Date(0), lat: 10, lng: 20 },
    { id: "b", capturedAt: new Date(1000), lat: 20, lng: 40 },
    { id: "c", capturedAt: new Date(2000), lat: 30, lng: 50 }
  ], { targetDurationMs: 10_000 });
  const frame = getPlaybackFrame(timeline, 2_500);
  assert.equal(frame.progress, 0.25);
  assert.equal(frame.photoIndex, 0);
  assert.equal(frame.lat, 15);
  assert.equal(frame.lng, 30);
  assert.deepEqual(frame.visitedPoints, [[10, 20], [15, 30]]);
  assert.equal(frame.done, false);
});

test("returns a stationary completed frame for a single-photo timeline", () => {
  const timeline = buildPlaybackTimeline([
    { id: "only", capturedAt: new Date("2026-08-01T10:00:00Z"), lat: 51.5, lng: -0.1 }
  ]);
  const frame = getPlaybackFrame(timeline, 500);
  assert.deepEqual(frame, {
    progress: 1,
    photoIndex: 0,
    lat: 51.5,
    lng: -0.1,
    visitedPoints: [[51.5, -0.1]],
    done: true
  });
});

test("returns a deterministic empty frame for a zero-photo timeline", () => {
  const timeline = buildPlaybackTimeline([]);
  const frame = getPlaybackFrame(timeline, 500);
  assert.deepEqual(frame, {
    progress: 0,
    photoIndex: -1,
    lat: null,
    lng: null,
    visitedPoints: [],
    done: true
  });
});

test("silently skips unusable metadata and preserves generated preview urls", async () => {
  const files = [{ name: "bad.jpg" }, { name: "good.jpg" }];
  const result = await analyzePhotoFiles(files, {
    parseMetadata: async (file) => file.name === "good.jpg"
      ? { DateTimeOriginal: "2026:08:01 12:00:00", latitude: 48.8, longitude: 2.3 }
      : undefined,
    createObjectURL: (file) => `blob:${file.name}`
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].previewUrl, "blob:good.jpg");
  assert.equal(result[0].lat, 48.8);
});

test("reports progress for every selected photo and yields between large batches", async () => {
  const files = Array.from({ length: 100 }, (_, index) => ({ name: `${index}.jpg` }));
  const progress = [];
  let yields = 0;

  const result = await analyzePhotoFiles(files, {
    parseMetadata: async (file) => file.name === "50.jpg"
      ? Promise.reject(new Error("unreadable"))
      : { DateTimeOriginal: "2026:08:01 12:00:00", latitude: 48.8, longitude: 2.3 },
    createObjectURL: () => "",
    onProgress: (completed, total) => progress.push([completed, total]),
    yieldControl: async () => { yields += 1; }
  });

  assert.equal(result.length, 99);
  assert.deepEqual(progress[0], [1, 100]);
  assert.deepEqual(progress.at(-1), [100, 100]);
  assert.equal(progress.length, 100);
  assert.equal(yields, 100);
});

test("formats a visible photo analysis count and percentage", () => {
  assert.equal(formatPhotoAnalysisProgress(0, 100), "사진 정보 읽는 중… 0 / 100 (0%)");
  assert.equal(formatPhotoAnalysisProgress(37, 100), "사진 정보 읽는 중… 37 / 100 (37%)");
  assert.equal(formatPhotoAnalysisProgress(1, 3), "사진 정보 읽는 중… 1 / 3 (33%)");
});

test("zooms out only for city-to-city photo gaps", () => {
  assert.equal(getPhotoRouteZoom(49_999), 14);
  assert.equal(getPhotoRouteZoom(50_000), 8);
  assert.equal(getPhotoRouteZoom(350_000), 8);
});

test("distinguishes a page restart while the mobile photo picker was open", () => {
  assert.equal(getPhotoPickerInterruptionMessage(null, "new-page"), null);
  assert.equal(getPhotoPickerInterruptionMessage({ pageId: "same-page" }, "same-page"), null);
  assert.equal(
    getPhotoPickerInterruptionMessage({ pageId: "old-page" }, "new-page"),
    "사진 선택 중 Safari 페이지가 다시 시작되었습니다. 많은 사진으로 인한 메모리 부족일 가능성이 있습니다."
  );
});

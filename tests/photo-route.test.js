const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildPlaybackTimeline,
  getPlaybackFrame,
  analyzePhotoFiles
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

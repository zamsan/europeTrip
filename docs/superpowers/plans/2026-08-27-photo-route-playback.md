# Photo Route Playback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users select local travel photos and replay their EXIF GPS positions on the existing Leaflet map in capture-time order with time-proportional animation.

**Architecture:** Add a small dependency-free playback core in `photo-route.js`, with EXIF parsing injected at the boundary so time normalization and interpolation can be tested in Node. Load the browser UMD build of `exifr` only to read local `File` objects, then let `app.js` own DOM events and separate Leaflet layers for the planned route and photo playback.

**Tech Stack:** Vanilla JavaScript, Node.js built-in test runner, exifr 7.1.3 lite UMD, Leaflet 1.9.4, HTML5 file input and Blob object URLs

**Spec:** `docs/superpowers/specs/2026-08-27-photo-route-playback-design.md`

## Global Constraints

- Photos and extracted metadata must remain in browser memory and must never be sent to Firebase or another external service.
- Interpolate straight lines between photo GPS points; do not call a routing service.
- Preserve relative capture-time gaps after applying a per-segment upper cap.
- Keep the existing planned-route filters and markers working.
- Skip unusable files silently; show a message only when zero or one playable photo remains.
- Revoke every generated object URL when photos are replaced or the page unloads.
- Do not add a build system or package manager to this static GitHub Pages site.

---

## File Structure

- Create `photo-route.js`: pure date normalization, route timeline construction, interpolation, and injected local-file analysis.
- Create `tests/photo-route.test.js`: Node built-in unit tests for ordering, time compression, interpolation, invalid metadata, and cleanup data.
- Modify `index.html`: load pinned `exifr`, load `photo-route.js`, and add accessible local-photo and playback controls.
- Modify `app.js`: connect the controls to local EXIF parsing and manage photo-only Leaflet layers and animation state.
- Modify `styles.css`: responsive layout for the file picker, playback controls, progress slider, and current-photo panel.
- Modify `README.md`: document local-only behavior, supported metadata, and static smoke-test steps.

### Task 1: Testable photo timeline core

**Files:**
- Create: `photo-route.js`
- Create: `tests/photo-route.test.js`

**Interfaces:**
- Consumes: metadata objects shaped as `{ DateTimeOriginal: Date|string, latitude: number, longitude: number }`.
- Produces: `window.PhotoRoute` and `module.exports` with `normalizeCapturedAt(value)`, `buildPlaybackTimeline(photos, options)`, `getPlaybackFrame(timeline, elapsedMs)`, and `analyzePhotoFiles(files, dependencies)`.
- `buildPlaybackTimeline` returns `{ photos, segments, durationMs }`; each segment is `{ fromIndex, toIndex, startMs, endMs }`.
- `getPlaybackFrame` returns `{ progress, photoIndex, lat, lng, visitedPoints, done }`.

- [ ] **Step 1: Write failing tests for sorting and compressed timing**

```js
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
```

- [ ] **Step 2: Run the tests and verify the missing module failure**

Run: `node --test tests/photo-route.test.js`

Expected: FAIL because `../photo-route.js` does not exist or does not export the named functions.

- [ ] **Step 3: Implement stable sorting and capped proportional segments**

```js
(function exposePhotoRoute(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.PhotoRoute = api;
})(typeof window !== "undefined" ? window : globalThis, () => {
  function normalizeCapturedAt(value) {
    if (value instanceof Date && Number.isFinite(value.getTime())) return value;
    if (typeof value !== "string") return null;
    const normalized = value.trim().replace(
      /^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/,
      "$1-$2-$3T$4:$5:$6"
    );
    const date = new Date(normalized);
    return Number.isFinite(date.getTime()) ? date : null;
  }

  function buildPlaybackTimeline(photos, options = {}) {
    const targetDurationMs = options.targetDurationMs ?? 20_000;
    const maxSourceGapMs = options.maxSourceGapMs ?? 30 * 60 * 1000;
    const ordered = photos
      .map((photo, inputIndex) => ({ ...photo, inputIndex }))
      .sort((a, b) => a.capturedAt - b.capturedAt || a.inputIndex - b.inputIndex);
    if (ordered.length < 2) return { photos: ordered, segments: [], durationMs: 0 };
    const weights = ordered.slice(1).map((photo, index) => {
      const sourceGap = photo.capturedAt - ordered[index].capturedAt;
      return Math.max(1, Math.min(maxSourceGapMs, sourceGap));
    });
    const totalWeight = weights.reduce((sum, value) => sum + value, 0);
    let cursor = 0;
    const segments = weights.map((weight, index) => {
      const startMs = cursor;
      cursor = index === weights.length - 1
        ? targetDurationMs
        : cursor + targetDurationMs * weight / totalWeight;
      return { fromIndex: index, toIndex: index + 1, startMs, endMs: cursor };
    });
    return { photos: ordered, segments, durationMs: targetDurationMs };
  }
```

- [ ] **Step 4: Add failing interpolation and file-analysis tests**

```js
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
```

- [ ] **Step 5: Implement interpolation and injected file analysis**

```js
  function getPlaybackFrame(timeline, elapsedMs) {
    const elapsed = Math.max(0, Math.min(timeline.durationMs, elapsedMs));
    const segment = timeline.segments.find((item) => elapsed <= item.endMs)
      || timeline.segments[timeline.segments.length - 1];
    const span = Math.max(1, segment.endMs - segment.startMs);
    const ratio = Math.max(0, Math.min(1, (elapsed - segment.startMs) / span));
    const from = timeline.photos[segment.fromIndex];
    const to = timeline.photos[segment.toIndex];
    const lat = from.lat + (to.lat - from.lat) * ratio;
    const lng = from.lng + (to.lng - from.lng) * ratio;
    const visitedPoints = timeline.photos
      .slice(0, segment.fromIndex + 1)
      .map((photo) => [photo.lat, photo.lng]);
    visitedPoints.push([lat, lng]);
    return {
      progress: timeline.durationMs ? elapsed / timeline.durationMs : 0,
      photoIndex: ratio >= 1 ? segment.toIndex : segment.fromIndex,
      lat,
      lng,
      visitedPoints,
      done: elapsed >= timeline.durationMs
    };
  }

  async function analyzePhotoFiles(files, dependencies) {
    const results = [];
    for (const [index, file] of Array.from(files).entries()) {
      try {
        const metadata = await dependencies.parseMetadata(file);
        const capturedAt = normalizeCapturedAt(metadata?.DateTimeOriginal);
        const lat = Number(metadata?.latitude);
        const lng = Number(metadata?.longitude);
        if (!capturedAt || !Number.isFinite(lat) || !Number.isFinite(lng)) continue;
        results.push({
          id: `${index}-${file.name}`,
          file,
          previewUrl: dependencies.createObjectURL(file),
          capturedAt,
          lat,
          lng
        });
      } catch (_) {
        // An unreadable file does not prevent the remaining local files from loading.
      }
    }
    return results;
  }

  return { normalizeCapturedAt, buildPlaybackTimeline, getPlaybackFrame, analyzePhotoFiles };
});
```

- [ ] **Step 6: Run focused tests**

Run: `node --test tests/photo-route.test.js`

Expected: all tests PASS.

- [ ] **Step 7: Commit the core**

```powershell
git add photo-route.js tests/photo-route.test.js
git commit -m "Add photo route playback core"
```

### Task 2: Local-photo playback controls

**Files:**
- Modify: `index.html:8-14`
- Modify: `index.html:31-45`
- Modify: `styles.css:150-240`

**Interfaces:**
- Consumes: global `window.exifr` and `window.PhotoRoute` loaded before `app.js`.
- Produces DOM IDs `photoRouteFiles`, `photoRouteStatus`, `photoRoutePanel`, `photoRoutePreview`, `photoRouteTimestamp`, `photoRoutePosition`, `photoRoutePlay`, `photoRouteReset`, `photoRouteProgress`, and `photoRouteSpeed`.

- [ ] **Step 1: Add a failing static markup test**

Create `tests/photo-route-markup.test.js` with:

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

test("loads pinned EXIF and playback scripts before app.js", () => {
  const exifr = html.indexOf("exifr@7.1.3/dist/lite.umd.js");
  const core = html.indexOf("photo-route.js");
  const app = html.indexOf("app.js");
  assert.ok(exifr >= 0 && exifr < core && core < app);
});

test("contains accessible local photo playback controls", () => {
  for (const id of [
    "photoRouteFiles", "photoRouteStatus", "photoRoutePanel", "photoRoutePreview",
    "photoRouteTimestamp", "photoRoutePosition", "photoRoutePlay", "photoRouteReset",
    "photoRouteProgress", "photoRouteSpeed"
  ]) assert.match(html, new RegExp(`id=["']${id}["']`));
  assert.match(html, /accept=["']image\/\*["']/);
  assert.match(html, /multiple/);
  assert.match(html, /사진은 이 기기에서만 처리/);
});
```

- [ ] **Step 2: Run the static test and verify failure**

Run: `node --test tests/photo-route-markup.test.js`

Expected: FAIL because the dependency tags and control IDs are absent.

- [ ] **Step 3: Add pinned scripts and accessible controls**

Add before `app.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/exifr@7.1.3/dist/lite.umd.js" defer></script>
<script src="photo-route.js?v=1" defer></script>
```

Add inside `.route-map-shell`, after `#routeMap`:

```html
<section class="photo-route-player" aria-labelledby="photo-route-title">
  <div class="photo-route-picker">
    <div>
      <h3 id="photo-route-title">사진 이동 경로 재생</h3>
      <p>사진은 이 기기에서만 처리되며 서버에 저장되지 않습니다.</p>
    </div>
    <label class="photo-route-file-button" for="photoRouteFiles">사진 선택</label>
    <input id="photoRouteFiles" type="file" accept="image/*" multiple>
  </div>
  <p id="photoRouteStatus" class="photo-route-status" aria-live="polite">사진을 선택해 주세요.</p>
  <div id="photoRoutePanel" class="photo-route-panel" hidden>
    <img id="photoRoutePreview" alt="현재 위치에서 촬영한 사진">
    <div class="photo-route-details">
      <time id="photoRouteTimestamp"></time>
      <span id="photoRoutePosition"></span>
      <div class="photo-route-buttons">
        <button id="photoRoutePlay" type="button">재생</button>
        <button id="photoRouteReset" type="button">처음부터</button>
        <label>속도
          <select id="photoRouteSpeed">
            <option value="0.5">0.5×</option>
            <option value="1" selected>1×</option>
            <option value="2">2×</option>
          </select>
        </label>
      </div>
      <label class="photo-route-progress-label" for="photoRouteProgress">재생 위치</label>
      <input id="photoRouteProgress" type="range" min="0" max="1000" value="0">
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add responsive styles**

Style `.photo-route-player` as a bordered card below the map, hide the native file input visually while keeping it focusable, use a two-column preview/details layout above 720px, constrain the preview with `aspect-ratio: 4 / 3; object-fit: cover`, give controls visible focus states, and collapse the panel to one column below 720px. Reuse the existing colors and button radius variables/patterns from `styles.css`; do not introduce a new visual theme.

- [ ] **Step 5: Run markup and syntax checks**

Run: `node --test tests/photo-route-markup.test.js`

Expected: all tests PASS.

Run: `node --check photo-route.js`

Expected: exit code 0.

- [ ] **Step 6: Commit the UI shell**

```powershell
git add index.html styles.css tests/photo-route-markup.test.js
git commit -m "Add local photo route controls"
```

### Task 3: EXIF ingestion and playback state

**Files:**
- Modify: `app.js:500-510`
- Modify: `app.js:1596-1712`
- Modify: `app.js:2380-2420`
- Modify: `tests/photo-route-markup.test.js`

**Interfaces:**
- Consumes: `window.PhotoRoute.analyzePhotoFiles`, `buildPlaybackTimeline`, `getPlaybackFrame`; `window.exifr.parse(file, options)`; existing `renderRouteMap.map` Leaflet instance.
- Produces: `loadPhotoRouteFiles(files)`, `startPhotoRoutePlayback()`, `pausePhotoRoutePlayback()`, `seekPhotoRoutePlayback(elapsedMs)`, `resetPhotoRoutePlayback()`, and `disposePhotoRoutePlayback()`.

- [ ] **Step 1: Extend the static test with integration markers**

Append:

```js
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

test("wires local EXIF parsing and animation without Firebase writes", () => {
  assert.match(app, /window\.exifr\.parse/);
  assert.match(app, /analyzePhotoFiles/);
  assert.match(app, /requestAnimationFrame/);
  assert.match(app, /URL\.revokeObjectURL/);
  assert.doesNotMatch(app, /setDoc\([^)]*photo/i);
  assert.doesNotMatch(app, /uploadBytes|FirebaseStorage|getStorage/);
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/photo-route-markup.test.js`

Expected: FAIL because `app.js` does not yet parse photos or animate playback.

- [ ] **Step 3: Add DOM references and a single playback state object**

Add references for every Task 2 ID next to `routeMapEl`, and initialize:

```js
const photoRouteState = {
  photos: [],
  timeline: null,
  elapsedMs: 0,
  speed: 1,
  playing: false,
  startedAt: 0,
  frameId: 0,
  layer: null,
  path: null,
  marker: null
};
```

- [ ] **Step 4: Implement local EXIF ingestion**

Implement `loadPhotoRouteFiles(files)` to pause and dispose the previous selection, show `사진을 분석하는 중입니다…`, call:

```js
const photos = await window.PhotoRoute.analyzePhotoFiles(files, {
  parseMetadata: (file) => window.exifr.parse(file, {
    ifd0: false,
    exif: { pick: ["DateTimeOriginal"] },
    gps: true
  }),
  createObjectURL: (file) => URL.createObjectURL(file)
});
```

Build the timeline with `{ targetDurationMs: Math.min(45_000, Math.max(12_000, photos.length * 1_500)), maxSourceGapMs: 30 * 60 * 1000 }`. For zero photos, keep the panel hidden and display `촬영 시각과 위치가 포함된 사진이 없습니다.` For one photo, show its location and preview, disable play/progress, and display `이동 경로를 재생하려면 위치 정보가 있는 사진이 두 장 이상 필요합니다.` For two or more, enable controls, fit the Leaflet map to all photo bounds, seek to zero, and display `재생 준비가 완료되었습니다.` Do not display excluded counts or reasons.

- [ ] **Step 5: Implement separate Leaflet photo layers and frame rendering**

Create `ensurePhotoRouteLayer()` that adds a new `L.layerGroup()` without removing `renderRouteMap.layer`. Inside it create a teal/purple photo polyline and a high-contrast circle marker. Implement `renderPhotoRouteFrame(frame)` to update `path.setLatLngs(frame.visitedPoints)`, `marker.setLatLng([frame.lat, frame.lng])`, preview `src`, timestamp via `Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "medium" })`, `현재 사진 N / total`, and the range value `Math.round(frame.progress * 1000)`.

- [ ] **Step 6: Implement playback, pause, seek, speed, and completion**

Use `requestAnimationFrame` with `startedAt = performance.now() - elapsedMs / speed`. Each animation callback calculates `elapsedMs = Math.min(durationMs, (now - startedAt) * speed)`, calls `getPlaybackFrame`, renders it, and schedules the next frame. On completion, set `playing = false`, cancel the stored frame, and change the button label back to `재생`. Seeking while playing must reset `startedAt` from the new elapsed time. Changing speed while playing must preserve the current elapsed time before replacing the multiplier.

- [ ] **Step 7: Wire lifecycle cleanup**

Wire file input change, play/pause, reset, progress `input`, and speed `change`. Implement `disposePhotoRoutePlayback()` to cancel animation, remove only the photo layer, revoke every `photo.previewUrl`, clear `photoRouteState.photos`, and reset the file input when appropriate. Register `window.addEventListener("beforeunload", disposePhotoRoutePlayback)`.

- [ ] **Step 8: Run all automated checks**

Run: `node --test tests/photo-route.test.js tests/photo-route-markup.test.js`

Expected: all tests PASS.

Run: `node --check app.js`

Expected: exit code 0.

- [ ] **Step 9: Commit the integration**

```powershell
git add app.js tests/photo-route-markup.test.js
git commit -m "Animate local photo routes on the trip map"
```

### Task 4: Browser verification and documentation

**Files:**
- Modify: `README.md:1-35`
- Modify only if verification finds defects: `index.html`, `styles.css`, `app.js`, `photo-route.js`, `tests/photo-route.test.js`, `tests/photo-route-markup.test.js`

**Interfaces:**
- Consumes: the completed photo-route feature.
- Produces: documented local-only behavior and recorded manual verification evidence.

- [ ] **Step 1: Document the feature and privacy boundary**

Add a `사진 이동 경로 재생` section explaining that users select original photos, the browser reads EXIF capture time and GPS locally, no image or EXIF data is saved to Firebase, points are straight-line interpolated, and refreshing clears the selection. Mention that messaging/social-media copies often lack metadata.

- [ ] **Step 2: Start a local static server**

Run: `python -m http.server 8000`

Expected: server listens on `http://localhost:8000` without console errors.

- [ ] **Step 3: Verify the zero/one/two-photo states in a real browser**

Open `http://localhost:8000`. Confirm the existing planned route initially renders. Select a file without GPS and confirm only the generic insufficient-metadata message appears. Select one valid geotagged photo and confirm the preview and single marker appear with playback disabled. Select at least two valid geotagged originals and confirm playback becomes available and the map fits their bounds.

- [ ] **Step 4: Verify time-proportional animation controls**

With at least three valid photos having unequal capture gaps, confirm the marker starts at the first photo, moves in straight lines, spends proportionally longer on the larger gap up to the configured cap, draws only the visited path, and ends exactly at the final photo. Verify pause/resume, reset, progress seeking, and `0.5× / 1× / 2×` without jumps or stale photo details.

- [ ] **Step 5: Verify privacy and cleanup**

In browser developer tools, filter Network requests while selecting and replaying photos. Confirm there are no requests containing photo bodies, Blob URLs, EXIF values, Firebase Storage calls, or new Firestore writes. Select a second photo set and confirm old previews disappear without console errors; reload and confirm no photo route remains.

- [ ] **Step 6: Verify regressions and responsive layout**

Confirm `전체`, `런던`, `파리`, and `러닝` planned-route filters still work before and after photo playback. At desktop width and a mobile viewport near 390px, confirm the preview, buttons, speed selector, and range control remain visible, operable, and do not overflow.

- [ ] **Step 7: Run the final automated verification**

Run: `node --test tests/*.test.js`

Expected: all tests PASS.

Run: `node --check app.js`

Expected: exit code 0.

Run: `node --check photo-route.js`

Expected: exit code 0.

Run: `git diff --check HEAD~3..HEAD`

Expected: no whitespace errors.

- [ ] **Step 8: Commit documentation and any verified fixes**

```powershell
git add README.md index.html styles.css app.js photo-route.js tests
git commit -m "Document and verify local photo route playback"
```

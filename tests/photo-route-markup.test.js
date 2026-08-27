const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

function functionBody(name) {
  const start = app.indexOf(`function ${name}`);
  assert.notEqual(start, -1, `missing ${name}`);
  const next = app.indexOf("\nfunction ", start + 1);
  return app.slice(start, next === -1 ? undefined : next);
}

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

test("wires local EXIF parsing and animation without Firebase writes", () => {
  assert.match(app, /window\.exifr\.parse/);
  assert.match(app, /analyzePhotoFiles/);
  assert.match(app, /requestAnimationFrame/);
  assert.match(app, /URL\.revokeObjectURL/);
  assert.doesNotMatch(app, /setDoc\([^)]*photo/i);
  assert.doesNotMatch(app, /uploadBytes|FirebaseStorage|getStorage/);
});

test("renders photo UI from the sorted playback timeline", () => {
  const body = functionBody("renderPhotoRouteFrame");
  assert.match(body, /photoRouteState\.timeline\.photos\[frame\.photoIndex\]/);
  assert.doesNotMatch(body, /photoRouteState\.photos\[frame\.photoIndex\]/);
});

test("guards stale photo loads and revokes stale previews", () => {
  const body = functionBody("loadPhotoRouteFiles");
  assert.match(app, /loadToken/);
  assert.match(body, /const loadToken = \+{2}photoRouteState\.loadToken/);
  assert.match(body, /if \(loadToken !== photoRouteState\.loadToken\)/);
  assert.match(body, /revokePhotoPreviewUrls\(photos\)/);
});

test("removes remote map tiles before photo-derived viewport changes", () => {
  const renderBody = functionBody("renderRouteMap");
  const loadBody = functionBody("loadPhotoRouteFiles");
  const removeIndex = loadBody.indexOf("suspendPlannedRouteTilesForPhotoPlayback()");
  const fitIndex = loadBody.indexOf("renderRouteMap.map.fitBounds");

  assert.match(renderBody, /renderRouteMap\.tileLayer\s*=/);
  assert.match(app, /function suspendPlannedRouteTilesForPhotoPlayback/);
  assert.match(app, /function restorePlannedRouteTilesAfterPhotoPlayback/);
  assert.ok(removeIndex >= 0, "photo loading must suspend remote tiles");
  assert.ok(fitIndex >= 0, "photo loading should still fit local photo bounds");
  assert.ok(removeIndex < fitIndex, "remote tiles must be removed before photo fitBounds");
});

test("restores planned map tiles only outside immediate photo reloads", () => {
  const disposeBody = functionBody("disposePhotoRoutePlayback");
  const loadBody = functionBody("loadPhotoRouteFiles");
  const wireBody = functionBody("wirePhotoRoutePlayback");

  assert.match(disposeBody, /restorePlannedTiles\s*=\s*true/);
  assert.match(disposeBody, /if \(restorePlannedTiles\)/);
  assert.match(disposeBody, /restorePlannedRouteTilesAfterPhotoPlayback\(\)/);
  assert.match(loadBody, /restorePlannedTiles:\s*false/);
  assert.match(loadBody, /if \(!window\.PhotoRoute \|\| !window\.exifr\) \{\s*restorePlannedRouteTilesAfterPhotoPlayback\(\)/);
  assert.match(wireBody, /beforeunload[\s\S]*restorePlannedTiles:\s*false/);
});

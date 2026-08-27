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
    "photoRouteFiles", "photoRouteStatus", "photoRoutePanel", "photoRoutePlay", "photoRouteReset",
    "photoRouteProgress", "photoRouteSpeed"
  ]) assert.match(html, new RegExp(`id=["']${id}["']`));
  for (const id of ["photoRoutePreview", "photoRouteTimestamp", "photoRoutePosition"]) {
    assert.doesNotMatch(html, new RegExp(`id=["']${id}["']`));
  }
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

test("renders only route progress without photo details", () => {
  const body = functionBody("renderPhotoRouteFrame");
  assert.doesNotMatch(body, /photoRoutePreview|photoRouteTimestamp|photoRoutePosition/);
  assert.match(body, /photoRouteProgressEl\.value/);
});

test("guards stale photo loads and revokes stale previews", () => {
  const body = functionBody("loadPhotoRouteFiles");
  assert.match(app, /loadToken/);
  assert.match(body, /const loadToken = \+{2}photoRouteState\.loadToken/);
  assert.match(body, /if \(loadToken !== photoRouteState\.loadToken\)/);
  assert.match(body, /revokePhotoPreviewUrls\(photos\)/);
});

test("keeps map tiles but hides the planned route during photo playback", () => {
  const renderBody = functionBody("renderRouteMap");
  const loadBody = functionBody("loadPhotoRouteFiles");
  const activateIndex = loadBody.indexOf("activatePhotoRouteMode()");
  const fitIndex = loadBody.indexOf("renderRouteMap.map.fitBounds");

  assert.match(renderBody, /renderRouteMap\.tileLayer\s*=/);
  assert.match(app, /function activatePhotoRouteMode/);
  assert.match(app, /function restorePlannedRouteAfterPhotoPlayback/);
  assert.match(functionBody("activatePhotoRouteMode"), /renderRouteMap\.layer\.remove\(\)/);
  assert.doesNotMatch(functionBody("activatePhotoRouteMode"), /tileLayer|removeLayer/);
  assert.ok(activateIndex >= 0, "photo loading must hide the planned route");
  assert.ok(fitIndex >= 0, "photo loading should still fit local photo bounds");
  assert.ok(activateIndex < fitIndex, "planned route must be hidden before photo fitBounds");
});

test("uses a person marker and restores the planned route after playback", () => {
  const disposeBody = functionBody("disposePhotoRoutePlayback");
  const loadBody = functionBody("loadPhotoRouteFiles");
  const wireBody = functionBody("wirePhotoRoutePlayback");

  assert.match(app, /window\.L\.divIcon/);
  assert.match(app, /photo-route-person-marker/);
  assert.match(disposeBody, /restorePlannedRoute\s*=\s*true/);
  assert.match(disposeBody, /restorePlannedRouteAfterPhotoPlayback\(\)/);
  assert.match(loadBody, /restorePlannedRoute:\s*false/);
  assert.match(wireBody, /beforeunload[\s\S]*restorePlannedRoute:\s*false/);
});

test("zooms out only for city-to-city gaps while following the person marker", () => {
  const cameraBody = functionBody("updatePhotoRouteCamera");
  const renderBody = functionBody("renderPhotoRouteFrame");

  assert.match(cameraBody, /map\.distance/);
  assert.match(cameraBody, /window\.PhotoRoute\.getPhotoRouteZoom/);
  assert.match(cameraBody, /photoRouteState\.cameraZoom !== targetZoom/);
  assert.match(cameraBody, /map\.setView\(currentLatLng, targetZoom/);
  assert.match(cameraBody, /panTo/);
  assert.match(renderBody, /updatePhotoRouteCamera\(frame\)/);
});

test("cache-busts the deployed app bundle", () => {
  assert.match(html, /photo-route\.js\?v=4/);
  assert.match(html, /app\.js\?v=42/);
});

test("shows live progress while reading many photos", () => {
  const loadBody = functionBody("loadPhotoRouteFiles");

  assert.match(loadBody, /formatPhotoAnalysisProgress\(0, selectedFiles\.length\)/);
  assert.match(loadBody, /onProgress:\s*\(completed, total\)/);
  assert.match(loadBody, /formatPhotoAnalysisProgress\(completed, total\)/);
  assert.match(loadBody, /yieldControl/);
});

test("lets the mobile photo picker close and paints progress before analysis", () => {
  const waitBody = functionBody("waitForPhotoPickerToClose");
  const loadBody = functionBody("loadPhotoRouteFiles");
  const statusIndex = loadBody.indexOf("formatPhotoAnalysisProgress(0, selectedFiles.length)");
  const waitIndex = loadBody.indexOf("await waitForPhotoPickerToClose()");
  const analyzeIndex = loadBody.indexOf("analyzePhotoFiles");

  assert.match(waitBody, /requestAnimationFrame/);
  assert.match(waitBody, /setTimeout/);
  assert.ok(statusIndex >= 0 && statusIndex < waitIndex);
  assert.ok(waitIndex < analyzeIndex);
});

test("keeps local diagnostics for picker delivery failures and page restarts", () => {
  const wireBody = functionBody("wirePhotoRoutePlayback");

  assert.match(app, /sessionStorage/);
  assert.match(app, /getPhotoPickerInterruptionMessage/);
  assert.match(wireBody, /photoRouteFilesEl\.addEventListener\("click"/);
  assert.match(wireBody, /photoRouteFilesEl\.addEventListener\("cancel"/);
  assert.match(wireBody, /window\.addEventListener\("focus"/);
  assert.match(wireBody, /사진 선택 창은 닫혔지만 사진이 앱에 전달되지 않았습니다/);
});

test("locks map interaction only while playback is running", () => {
  const lockBody = functionBody("setPhotoRouteMapInteractionLocked");
  const startBody = functionBody("startPhotoRoutePlayback");
  const pauseBody = functionBody("pausePhotoRoutePlayback");

  for (const handler of ["dragging", "touchZoom", "scrollWheelZoom", "doubleClickZoom", "boxZoom", "keyboard"]) {
    assert.match(lockBody, new RegExp(`map\\.${handler}`));
  }
  assert.match(lockBody, /handler\.enabled\(\)/);
  assert.match(lockBody, /handler\.disable\(\)/);
  assert.match(lockBody, /handler\.enable\(\)/);
  assert.match(startBody, /setPhotoRouteMapInteractionLocked\(true\)/);
  assert.match(pauseBody, /setPhotoRouteMapInteractionLocked\(false\)/);
});

test("fits the full photo route only when playback finishes naturally", () => {
  const finishBody = functionBody("finishPhotoRoutePlayback");
  const animateBody = functionBody("animatePhotoRoutePlayback");
  const pauseBody = functionBody("pausePhotoRoutePlayback");

  assert.match(finishBody, /pausePhotoRoutePlayback\(\)/);
  assert.match(finishBody, /map\.fitBounds/);
  assert.match(finishBody, /timeline\?\.photos\.map/);
  assert.match(animateBody, /finishPhotoRoutePlayback\(\)/);
  assert.doesNotMatch(pauseBody, /fitBounds/);
});

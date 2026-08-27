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

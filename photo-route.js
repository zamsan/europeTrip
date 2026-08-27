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

  function getPlaybackFrame(timeline, elapsedMs) {
    if (!timeline.segments.length) {
      const photo = timeline.photos[0];
      if (!photo) {
        return {
          progress: 0,
          photoIndex: -1,
          lat: null,
          lng: null,
          visitedPoints: [],
          done: true
        };
      }
      return {
        progress: 1,
        photoIndex: 0,
        lat: photo.lat,
        lng: photo.lng,
        visitedPoints: [[photo.lat, photo.lng]],
        done: true
      };
    }
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

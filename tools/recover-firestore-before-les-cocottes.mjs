const projectId = "europetrip-eb435";
const documentPath = `projects/${projectId}/databases/(default)/documents/trips/europe-2026`;
const documentUrl = `https://firestore.googleapis.com/v1/${documentPath}`;
const recoveryReadTime = "2026-08-27T09:01:50Z";

function decodeValue(value) {
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields || {}).map(([key, nested]) => [key, decodeValue(nested)])
    );
  }
  throw new Error(`Unsupported Firestore value: ${JSON.stringify(value)}`);
}

function encodeValue(value) {
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return Number.isInteger(value)
    ? { integerValue: String(value) }
    : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } };
  if (value && typeof value === "object") {
    return {
      mapValue: {
        fields: Object.fromEntries(
          Object.entries(value).map(([key, nested]) => [key, encodeValue(nested)])
        )
      }
    };
  }
  return { nullValue: null };
}

async function readDocument(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Firestore read failed: ${response.status} ${await response.text()}`);
  }
  const document = await response.json();
  return Object.fromEntries(
    Object.entries(document.fields || {}).map(([key, value]) => [key, decodeValue(value)])
  );
}

const historical = await readDocument(`${documentUrl}?readTime=${encodeURIComponent(recoveryReadTime)}`);
const current = await readDocument(documentUrl);
const recoveredDates = new Set(["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"]);
const historicalDays = historical.schedule.filter((day) => recoveredDates.has(day.date));
const currentDays = current.schedule.filter((day) => !recoveredDates.has(day.date));
const august4 = historicalDays.find((day) => day.date === "2026-08-04");

if (!august4) {
  throw new Error("Historical August 4 schedule was not found.");
}

if (!august4.items.some((item) => String(item.text || "").includes("Les Cocottes"))) {
  const nightIndex = august4.items.findIndex((item) => item.time === "밤");
  const lesCocottes = {
    time: "저녁",
    text: "🍽 Les Cocottes 방문 · 저녁 식사",
    mapUrl: "Les Cocottes Paris",
    lat: "48.8587",
    lng: "2.3078"
  };
  august4.items.splice(nightIndex === -1 ? august4.items.length : nightIndex, 0, lesCocottes);
}

const schedule = [...historicalDays, ...currentDays]
  .sort((left, right) => left.date.localeCompare(right.date));
const body = {
  fields: {
    schedule: encodeValue(schedule),
    updatedAt: { timestampValue: new Date().toISOString() }
  }
};

const response = await fetch(
  `${documentUrl}?updateMask.fieldPaths=schedule&updateMask.fieldPaths=updatedAt`,
  {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }
);

if (!response.ok) {
  throw new Error(`Firestore recovery failed: ${response.status} ${await response.text()}`);
}

const recoveredDocument = await response.json();
const recovered = Object.fromEntries(
  Object.entries(recoveredDocument.fields || {}).map(([key, value]) => [key, decodeValue(value)])
);

for (const date of ["2026-08-01", "2026-08-02", "2026-08-03"]) {
  const expectedDay = historical.schedule.find((day) => day.date === date);
  const recoveredDay = recovered.schedule.find((day) => day.date === date);
  if (JSON.stringify(recoveredDay) !== JSON.stringify(expectedDay)) {
    throw new Error(`Recovered ${date} does not match the historical version.`);
  }
}

const recoveredAugust4 = recovered.schedule.find((day) => day.date === "2026-08-04");
if (!recoveredAugust4?.items.some((item) => String(item.text || "").includes("Les Cocottes"))) {
  throw new Error("Les Cocottes is missing from recovered August 4.");
}

for (const date of ["2026-08-05", "2026-08-06", "2026-08-07"]) {
  const expectedDay = current.schedule.find((day) => day.date === date);
  const recoveredDay = recovered.schedule.find((day) => day.date === date);
  if (JSON.stringify(recoveredDay) !== JSON.stringify(expectedDay)) {
    throw new Error(`Current ${date} was not preserved.`);
  }
}

console.log("Recovered Firestore schedule for August 1-4 from", recoveryReadTime);
console.log("Preserved current schedule for August 5-7");
console.log("Merged Les Cocottes into August 4");
console.log("Verified recovered days against historical and current Firestore data");

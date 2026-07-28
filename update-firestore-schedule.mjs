import { readFileSync } from "node:fs";

const projectId = "europetrip-eb435";
const documentPath = `projects/${projectId}/databases/(default)/documents/trips/europe-2026`;
const documentUrl = `https://firestore.googleapis.com/v1/${documentPath}`;

function encodeValue(value) {
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } };
  if (value && typeof value === "object") {
    return {
      mapValue: {
        fields: Object.fromEntries(
          Object.entries(value).map(([key, nestedValue]) => [key, encodeValue(nestedValue)])
        )
      }
    };
  }
  return { nullValue: null };
}

function readJsonConst(source, constName, nextToken) {
  const start = source.indexOf(`const ${constName} = `);
  if (start === -1) {
    throw new Error(`Missing const ${constName}`);
  }

  const valueStart = start + `const ${constName} = `.length;
  const end = source.indexOf(nextToken, valueStart);
  if (end === -1) {
    throw new Error(`Missing end token for ${constName}`);
  }

  const literal = source.slice(valueStart, end).trim().replace(/;$/, "");
  return JSON.parse(literal);
}

const appSource = readFileSync("app.js", "utf8");
const schedule = readJsonConst(appSource, "fallbackSchedule", "const sheetConfig");
const checklist = readJsonConst(appSource, "defaultChecklist", "let currentSchedule");

const body = {
  fields: {
    schedule: encodeValue(schedule),
    checklist: encodeValue(checklist),
    updatedAt: { timestampValue: new Date().toISOString() }
  }
};

const response = await fetch(
  `${documentUrl}?updateMask.fieldPaths=schedule&updateMask.fieldPaths=checklist&updateMask.fieldPaths=updatedAt`,
  {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }
);

if (!response.ok) {
  throw new Error(`Firestore write failed: ${response.status} ${await response.text()}`);
}

console.log("Updated Firestore schedule:", schedule.map((day) => `${day.date} ${day.title}`).join(" | "));
console.log("Updated Firestore checklist:", checklist.length);

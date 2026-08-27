const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app.js", "utf8");
const getMinutesSource = source.match(/function getItemSortMinutes[\s\S]*?\r?\n}\r?\n/)[0];
const sortSource = source.match(/function sortItemsByTime[\s\S]*?\r?\n}\r?\n/)[0];
const splitTimeSource = source.match(/function splitTime[\s\S]*?\r?\n}\r?\n/)[0];
const context = {};
vm.runInNewContext(`${getMinutesSource}\n${sortSource}\n${splitTimeSource}`, context);

const items = [
  { time: "밤", text: "호텔 복귀" },
  { time: "11:00경", text: "관광" },
  { time: "06:00", text: "러닝" },
  { time: "오후", text: "산책" },
  { time: "아침", text: "브런치" },
  { time: "19:00경", text: "저녁" }
];

assert.deepEqual(
  Array.from(context.sortItemsByTime(items), (item) => item.text),
  ["러닝", "브런치", "관광", "산책", "저녁", "호텔 복귀"]
);

assert.deepEqual(
  { ...context.splitTime("아침") },
  { hour: "아침", minute: "" }
);
assert.deepEqual(
  { ...context.splitTime("11:00경") },
  { hour: "11", minute: "00" }
);

assert.doesNotMatch(
  source,
  /timelineEl\.addEventListener\("change"[\s\S]*?sortEditorRowsByTime\(itemList\);[\s\S]*?\n\s*}\);/,
  "시간 변경 중에는 행을 재배치하지 않고 저장할 때만 정렬해야 합니다."
);

console.log("time-sort tests passed");

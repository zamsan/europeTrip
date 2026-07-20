const projectId = "europetrip-eb435";
const documentPath = `projects/${projectId}/databases/(default)/documents/trips/europe-2026`;
const documentUrl = `https://firestore.googleapis.com/v1/${documentPath}`;

function decodeValue(value) {
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields || {});
  return null;
}

function decodeFields(fields) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));
}

function encodeValue(value) {
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } };
  if (value && typeof value === "object") {
    return {
      mapValue: {
        fields: Object.fromEntries(Object.entries(value).map(([key, nestedValue]) => [key, encodeValue(nestedValue)]))
      }
    };
  }
  return { nullValue: null };
}

function item(time, text, mapUrl, lat, lng) {
  return { time, text, mapUrl, lat: String(lat), lng: String(lng) };
}

const response = await fetch(documentUrl);
if (!response.ok) {
  throw new Error(`Firestore read failed: ${response.status} ${await response.text()}`);
}

const firestoreDoc = await response.json();
const data = decodeFields(firestoreDoc.fields || {});
const schedule = Array.isArray(data.schedule) ? data.schedule : [];
const checklist = Array.isArray(data.checklist) ? data.checklist : [];

const byDate = new Map(schedule.map((day) => [day.date, day]));

byDate.set("2026-08-02", {
  ...byDate.get("2026-08-02"),
  title: "런던 시내 관광",
  note: "버킹엄 궁전은 월요일 내부 관람으로 옮기고, 일요일은 세인트 제임스 파크와 웨스트민스터 외관, 코벤트 가든 중심으로 여유 있게 봅니다.",
  items: [
    item("08:00", "☕ 조식 WatchHouse Tower Bridge / 워치하우스 타워브리지", "37 Shad Thames, London SE1 2NJ", 51.5060, -0.0739),
    item("09:30", "🌳 St James's Park / 세인트 제임스 파크 산책", "London SW1A 2BJ", 51.5025, -0.1348),
    item("10:30", "⛪ Westminster Abbey / 웨스트민스터 사원 - 일요일은 내부 관광 대신 외관 중심", "20 Deans Yd, London SW1P 3PA", 51.4993, -0.1273),
    item("11:15", "🕰 Big Ben / 빅벤", "London SW1A 0AA", 51.5007, -0.1246),
    item("12:30", "🍴 점심 The Red Lion / 더 레드 라이언 - 추천: Sunday Roast, Fish & Chips", "48 Parliament St, London SW1A 2NH", 51.5016, -0.1256),
    item("14:00", "🎭 Covent Garden / 코벤트 가든", "London WC2E 8RF", 51.5117, -0.1240),
    item("15:30", "📺 Piccadilly Circus / 피카딜리 서커스", "London W1J 9HS", 51.5101, -0.1340),
    item("16:30", "🕵️ 221B Baker Street / 셜록 홈즈 박물관 - 내부 입장보다는 외관/기념품샵 위주 추천", "221B Baker St, London NW1 6XE", 51.5237, -0.1585),
    item("18:30", "🇰🇷 저녁 KIMCHEE Pancras / 김치 판크라스", "2 Pancras Square, King's Cross, London N1C 4AG", 51.5322, -0.1251),
    item("20:30", "🏨 호텔 복귀", "The Tower Hotel, St Katharine's Way, London E1W 1LD", 51.5077, -0.0733)
  ]
});

byDate.set("2026-08-03", {
  ...byDate.get("2026-08-03"),
  title: "버킹엄 궁전 + 런던탑",
  note: "버킹엄 궁전 내부 관람을 월요일 오전으로 옮기고, 월요일 휴무인 Borough Market은 제외했습니다. Sky Garden은 점검일이라 정원 관람은 확정 일정이 아닌 저녁 대체 후보로만 둡니다.",
  items: [
    item("06:30", "🏃 선택 러닝 Tower Bridge Morning Run / 약 10km 코스", "Tower Bridge, London", 51.5055, -0.0754),
    item("08:00", "☕ 조식 The Ivy Tower Bridge / 더 아이비 타워브리지", "One Tower Bridge, Tower Bridge Rd, London SE1 2AA", 51.5041, -0.0739),
    item("09:30", "👑 Buckingham Palace / 버킹엄 궁전 State Rooms 내부 관람 - 사전 예약 권장", "London SW1A 1AA", 51.5014, -0.1419),
    item("12:00", "🚖 Tower of London 이동", "London EC3N 4AB", 51.5081, -0.0759),
    item("12:30", "🍴 점심 Coppa Club Tower Bridge 또는 런던탑 근처 식사", "3 Three Quays Walk, Lower Thames St, London EC3R 6AH", 51.5094, -0.0801),
    item("14:00", "🏰 Tower of London / 런던탑 - 월요일 10:00 이후 운영, 예약 권장", "London EC3N 4AB", 51.5081, -0.0759),
    item("16:30", "🏛 British Museum / 대영박물관 - 시간이 부족하면 짧게 보거나 생략", "Great Russell St, London WC1B 3DG", 51.5194, -0.1270),
    item("18:30", "🏨 호텔 또는 근처에서 잠시 휴식", "The Tower Hotel, St Katharine's Way, London E1W 1LD", 51.5077, -0.0733),
    item("19:30", "🍽 저녁 후보 Sky Garden 레스토랑 또는 호텔 근처 식사 - 8/3은 점검일이라 정원 자유 관람은 확인 필요", "1 Sky Garden Walk, London EC3M 8AF", 51.5113, -0.0836),
    item("21:15", "🌉 Tower Bridge / 타워 브리지 야경", "Tower Bridge Rd, London SE1 2UP", 51.5055, -0.0754),
    item("21:40", "⚓ St Katharine Docks / 세인트 캐서린 독스 산책", "St Katharine's Way, London E1W 1LA", 51.5076, -0.0715),
    item("22:00", "🏨 호텔 복귀", "The Tower Hotel, St Katharine's Way, London E1W 1LD", 51.5077, -0.0733)
  ]
});

byDate.set("2026-08-06", {
  ...byDate.get("2026-08-06"),
  title: "루브르 + 오페라 + 쇼핑 + 순그릴",
  note: "오페라 가르니에는 늦은 오후 입장이 위험해서 갤러리 라파예트보다 먼저 배치했습니다.",
  items: [
    item("08:30", "☕ 조식 호텔 조식 또는 근처 카페", "Hyatt Regency Paris Étoile, 3 Place du Général Kœnig, 75017 Paris", 48.8808, 2.2840),
    item("09:30", "🖼 Louvre Museum / 루브르 박물관 - 예약 권장", "Rue de Rivoli, 75001 Paris", 48.8606, 2.3376),
    item("13:00", "🍴 점심 Café Marly / 카페 마를리 - 루브르 근처, 피라미드 전망", "93 Rue de Rivoli, 75001 Paris", 48.8627, 2.3320),
    item("15:00", "🎭 Palais Garnier / 오페라 가르니에 - 15:30 이전 입장 추천", "Place de l'Opéra, 75009 Paris", 48.8719, 2.3316),
    item("16:30", "🛍 Galeries Lafayette Haussmann / 갤러리 라파예트 오스만 - 쇼핑 + 무료 전망대", "40 Boulevard Haussmann, 75009 Paris", 48.8738, 2.3321),
    item("19:00", "🇰🇷 저녁 Soon Grill Le Marais / 순그릴 마레 - 예약 권장, 파리 한식, 마지막 저녁으로 적합", "78 Rue des Tournelles, 75003 Paris", 48.8562, 2.3673)
  ]
});

const nextSchedule = schedule.map((day) => byDate.get(day.date) || day);
const nextChecklist = checklist.map((entry) => {
  if (entry.id === "sky-garden") {
    return {
      ...entry,
      label: "Sky Garden / 식당 예약 또는 무료입장권",
      checked: false,
      note: "8월 3일은 점검일이라 정원 자유 관람 가능 여부 확인 필요"
    };
  }

  if (entry.id === "sky-garden-reminder") {
    return {
      ...entry,
      label: "Sky Garden 무료입장권 재확인",
      checked: false,
      note: "무료 방문 슬롯이 없으면 식당 예약 또는 다른 야경 장소로 대체"
    };
  }

  return entry;
});

const body = {
  fields: {
    schedule: encodeValue(nextSchedule),
    checklist: encodeValue(nextChecklist),
    updatedAt: { timestampValue: new Date().toISOString() }
  }
};

const writeResponse = await fetch(`${documentUrl}?updateMask.fieldPaths=schedule&updateMask.fieldPaths=checklist&updateMask.fieldPaths=updatedAt`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});

if (!writeResponse.ok) {
  throw new Error(`Firestore write failed: ${writeResponse.status} ${await writeResponse.text()}`);
}

console.log("Updated Firestore schedule:", nextSchedule.map((day) => `${day.date} ${day.title}`).join(" | "));
console.log("Updated checklist:", nextChecklist.filter((entry) => entry.id?.startsWith("sky-garden")).map((entry) => entry.label).join(" | "));

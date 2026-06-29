const fallbackSchedule = [
  {
    date: "2026-08-01",
    dateLabel: "8월 1일 토요일",
    city: "런던",
    title: "한국 출발, 런던 도착",
    items: [
      "10:55 KE907 탑승",
      "입국, 수하물 수령 후 택시/호출차로 숙소 이동",
      "타워브릿지, 런던탑 외관, 템스강변 산책"
    ],
    note: "첫날은 장거리 비행 후라 숙소 주변 야경만 가볍게 봅니다.",
    type: ""
  },
  {
    date: "2026-08-02",
    dateLabel: "8월 2일 일요일",
    city: "런던",
    title: "런던 클래식 코스",
    items: [
      "웨스트민스터 사원, 빅벤, 국회의사당",
      "버킹엄 궁전과 세인트 제임스 파크",
      "소호 또는 코벤트가든 저녁"
    ],
    note: "내부 관람은 웨스트민스터 사원 여부만 먼저 결정하면 됩니다.",
    type: ""
  },
  {
    date: "2026-08-03",
    dateLabel: "8월 3일 월요일",
    city: "런던",
    title: "런던탑, 타워브릿지, 시티",
    items: [
      "런던탑 내부 관람",
      "타워브릿지 전망 또는 브리지 산책",
      "스카이 가든, 버로우 마켓, 세인트폴 대성당 중 선택"
    ],
    note: "다음 날 유로스타 이동을 위해 티켓, 여권, 역 이동 시간을 확인합니다.",
    type: ""
  },
  {
    date: "2026-08-04",
    dateLabel: "8월 4일 화요일",
    city: "파리",
    title: "유로스타로 파리 이동",
    items: [
      "오전 호텔 체크아웃 후 택시로 세인트판크라스역 이동",
      "12:05 유로스타 탑승, 파리 도착",
      "하얏트 리젠시 체크인 후 개선문, 샹젤리제, 에펠탑 야경"
    ],
    note: "화요일은 루브르 휴관일이라 야경 중심으로 가볍게 둡니다.",
    type: "transfer"
  },
  {
    date: "2026-08-05",
    dateLabel: "8월 5일 수요일",
    city: "파리",
    title: "루브르와 파리 중심부",
    items: [
      "루브르 박물관",
      "튈르리 정원, 콩코르드 광장",
      "오페라 가르니에, 갤러리 라파예트 또는 센강 유람선"
    ],
    note: "루브르는 시간대 예약을 우선 검토합니다.",
    type: ""
  },
  {
    date: "2026-08-06",
    dateLabel: "8월 6일 목요일",
    city: "파리",
    title: "베르사유 또는 파리 시내 여유형",
    items: [
      "선택 1: 베르사유 궁전 반나절",
      "선택 2: 오르세 미술관, 생제르맹, 몽마르트르",
      "저녁은 에펠탑 또는 몽마르트르 야경"
    ],
    note: "더위와 체력에 따라 베르사유 여부를 결정합니다.",
    type: ""
  },
  {
    date: "2026-08-07",
    dateLabel: "8월 7일 금요일",
    city: "파리",
    title: "파리 마무리, 귀국",
    items: [
      "느린 아침과 체크아웃",
      "마레, 노트르담 주변, 쇼핑 중 선택",
      "택시로 공항 이동 후 20:35 KE902 탑승"
    ],
    note: "금요일 저녁 정체를 고려해 공항 이동 시간을 넉넉히 잡습니다.",
    type: "return"
  },
  {
    date: "2026-08-08",
    dateLabel: "8월 8일 토요일",
    city: "한국",
    title: "한국 도착",
    items: [
      "입국, 귀가",
      "사진 백업 및 영수증 정리"
    ],
    note: "",
    type: "return"
  }
];

const sheetConfig = window.TRIP_SHEET || {};
const timelineEl = document.querySelector("#tripTimeline");
const editLinkEl = document.querySelector("#sheetEditLink");
const statusEl = document.querySelector("#sheetStatus");

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((csvRow) => csvRow.some((value) => value.trim()));
}

function normalizeKey(key) {
  return key.replace(/^\uFEFF/, "").trim();
}

function readField(row, keys) {
  for (const key of keys) {
    const value = row[key];
    if (value && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function rowsToSchedule(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map(normalizeKey);

  return rows.slice(1).map((values) => {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = (values[index] || "").trim();
    });

    const items = [
      readField(row, ["item1", "일정1"]),
      readField(row, ["item2", "일정2"]),
      readField(row, ["item3", "일정3"]),
      readField(row, ["item4", "일정4"])
    ].filter(Boolean);

    return {
      date: readField(row, ["date", "날짜"]),
      dateLabel: readField(row, ["dateLabel", "날짜표시"]),
      city: readField(row, ["city", "도시"]),
      title: readField(row, ["title", "제목"]),
      items,
      note: readField(row, ["note", "메모"]),
      type: readField(row, ["type", "구분"])
    };
  }).filter((item) => item.title || item.items.length);
}

function renderSchedule(schedule) {
  if (!timelineEl) {
    return;
  }

  timelineEl.innerHTML = schedule.map((day) => {
    const cardType = ["transfer", "return"].includes(day.type) ? day.type : "";
    const typeClass = cardType ? ` ${cardType}` : "";
    const dateText = day.dateLabel || day.date || "날짜 미정";
    const city = day.city ? `<span class="city-tag">${escapeHtml(day.city)}</span>` : "";
    const items = day.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const note = day.note ? `<p class="note">${escapeHtml(day.note)}</p>` : "";

    return `
      <article class="day-card${typeClass}">
        <time datetime="${escapeHtml(day.date)}">${escapeHtml(dateText)}</time>
        ${city}
        <h3>${escapeHtml(day.title)}</h3>
        <ul>${items}</ul>
        ${note}
      </article>
    `;
  }).join("");
}

function setSheetUi(message, connected) {
  if (editLinkEl) {
    if (sheetConfig.editUrl) {
      editLinkEl.href = sheetConfig.editUrl;
      editLinkEl.textContent = "Google Sheets에서 수정하기";
      editLinkEl.target = "_blank";
      editLinkEl.rel = "noopener";
    } else {
      editLinkEl.href = "sheet-template.csv";
      editLinkEl.textContent = "샘플 표 보기";
      editLinkEl.removeAttribute("target");
      editLinkEl.removeAttribute("rel");
    }
  }

  if (statusEl) {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-connected", Boolean(connected));
  }
}

async function loadSchedule() {
  const csvUrl = (sheetConfig.csvUrl || "").trim();

  if (!csvUrl) {
    renderSchedule(fallbackSchedule);
    setSheetUi(
      sheetConfig.editUrl
        ? "수정 링크는 연결됐고, CSV 게시 주소 연결 전입니다."
        : "아직 Google Sheets 링크가 연결되지 않았습니다.",
      Boolean(sheetConfig.editUrl)
    );
    return;
  }

  try {
    const response = await fetch(csvUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`CSV load failed: ${response.status}`);
    }

    const schedule = rowsToSchedule(await response.text());
    renderSchedule(schedule.length ? schedule : fallbackSchedule);
    setSheetUi(sheetConfig.updatedLabel || "Google Sheets 연동 중", true);
  } catch (error) {
    console.warn(error);
    renderSchedule(fallbackSchedule);
    setSheetUi("Google Sheets를 불러오지 못해 기본 일정을 표시 중입니다.", false);
  }
}

loadSchedule();

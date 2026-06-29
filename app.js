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
const firebaseConfig = window.TRIP_FIREBASE || {};
const timelineEl = document.querySelector("#tripTimeline");
const timelineControlsEl = document.querySelector("#timelineControls");
const statusEl = document.querySelector("#sheetStatus");
const firebaseSignInEl = document.querySelector("#firebaseSignIn");
const editUnlockFormEl = document.querySelector("#editUnlockForm");
const editPasswordEl = document.querySelector("#editPassword");
const editLockEl = document.querySelector("#editLock");

let currentSchedule = [];
let firestoreApi = null;
let firestoreDocRef = null;
let editUnlocked = sessionStorage.getItem("tripEditUnlocked") === "true";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeItem(item) {
  if (typeof item === "string") {
    const value = item.trim();
    const timeMatch = value.match(/^(\d{1,2}:\d{2})\s+(.+)$/);

    return {
      time: timeMatch ? timeMatch[1].padStart(5, "0") : "",
      text: timeMatch ? timeMatch[2].trim() : value,
      mapUrl: ""
    };
  }

  if (!item || typeof item !== "object") {
    return {
      time: "",
      text: "",
      mapUrl: ""
    };
  }

  return {
    time: String(item.time || "").trim(),
    text: String(item.text || item.title || item.label || "").trim(),
    mapUrl: String(item.mapUrl || item.map || item.url || "").trim()
  };
}

function normalizeItems(items) {
  return (Array.isArray(items) ? items : [])
    .map(normalizeItem)
    .filter((item) => item.time || item.text || item.mapUrl);
}

function getMapHref(value) {
  const location = String(value || "").trim();
  if (!location) {
    return "";
  }

  if (/^https?:\/\//i.test(location)) {
    return location;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function splitTime(value) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return { hour: "", minute: "" };
  }

  return {
    hour: match[1].padStart(2, "0"),
    minute: match[2]
  };
}

function renderSelectOptions(values, selectedValue, emptyLabel) {
  return [
    `<option value="">${escapeHtml(emptyLabel)}</option>`,
    ...values.map((value) => {
      const selected = value === selectedValue ? " selected" : "";
      return `<option value="${escapeHtml(value)}"${selected}>${escapeHtml(value)}</option>`;
    })
  ].join("");
}

function renderTimePicker(value) {
  const { hour, minute } = splitTime(value);
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));

  return `
    <div class="time-picker">
      <select name="itemHour" aria-label="시간">
        ${renderSelectOptions(hours, hour, "시")}
      </select>
      <select name="itemMinute" aria-label="분">
        ${renderSelectOptions(minutes, minute, "분")}
      </select>
    </div>
  `;
}

function readItemTime(row) {
  const hour = String(row.querySelector('[name="itemHour"]')?.value || "").trim();
  const minute = String(row.querySelector('[name="itemMinute"]')?.value || "").trim();

  if (!hour && !minute) {
    return "";
  }

  return `${(hour || "00").padStart(2, "0")}:${(minute || "00").padStart(2, "0")}`;
}

function cloneDay(day) {
  return {
    date: day.date || "",
    dateLabel: day.dateLabel || "",
    city: day.city || "",
    title: day.title || "",
    items: normalizeItems(day.items).map((item) => ({ ...item })),
    note: day.note || "",
    type: day.type || ""
  };
}

function getEditPassword() {
  return String(firebaseConfig.editPassword || "").trim();
}

function canEdit() {
  return isFirebaseConfigured() && (!getEditPassword() || editUnlocked);
}

function setEditUnlocked(value) {
  editUnlocked = Boolean(value);
  if (editUnlocked) {
    sessionStorage.setItem("tripEditUnlocked", "true");
  } else {
    sessionStorage.removeItem("tripEditUnlocked");
  }
  setFirestoreUi(
    editUnlocked ? "수정 잠금이 해제되었습니다." : "수정하려면 비밀번호를 입력하세요.",
    true
  );
  if (currentSchedule.length) {
    renderSchedule(currentSchedule);
  }
}

function normalizeSchedule(schedule) {
  return (Array.isArray(schedule) ? schedule : [])
    .map((day) => ({
      date: String(day.date || "").trim(),
      dateLabel: String(day.dateLabel || "").trim(),
      city: String(day.city || "").trim(),
      title: String(day.title || "").trim(),
      items: normalizeItems(day.items),
      note: String(day.note || "").trim(),
      type: ["transfer", "return"].includes(day.type) ? day.type : ""
    }))
    .filter((day) => day.title || day.items.length);
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

function renderScheduleItem(item) {
  const time = item.time ? `<span class="item-time">${escapeHtml(item.time)}</span>` : "";
  const mapHref = getMapHref(item.mapUrl);
  const mapLink = mapHref
    ? `<a class="map-link" href="${escapeHtml(mapHref)}" target="_blank" rel="noopener">지도</a>`
    : "";

  return `
    <li class="schedule-item">
      ${time}
      <span class="item-text">${escapeHtml(item.text || "일정 내용 미정")}</span>
      ${mapLink}
    </li>
  `;
}

function renderSchedule(schedule) {
  if (!timelineEl) {
    return;
  }

  currentSchedule = normalizeSchedule(schedule);

  timelineEl.innerHTML = currentSchedule.map((day, index) => {
    const cardType = ["transfer", "return"].includes(day.type) ? day.type : "";
    const typeClass = cardType ? ` ${cardType}` : "";
    const dateText = day.dateLabel || day.date || "날짜 미정";
    const city = day.city ? `<span class="city-tag">${escapeHtml(day.city)}</span>` : "";
    const items = day.items.map(renderScheduleItem).join("");
    const note = day.note ? `<p class="note">${escapeHtml(day.note)}</p>` : "";
    const editButton = canEdit()
      ? `<button class="card-edit-button" type="button" data-edit-index="${index}">수정</button>`
      : "";

    return `
      <article class="day-card${typeClass}">
        <div class="day-card-head">
          <div>
            <time datetime="${escapeHtml(day.date)}">${escapeHtml(dateText)}</time>
            ${city}
          </div>
          ${editButton}
        </div>
        <h3>${escapeHtml(day.title)}</h3>
        <ul>${items}</ul>
        ${note}
        ${renderInlineEditor(day, index)}
      </article>
    `;
  }).join("");
}

function renderItemEditorRow(item = {}) {
  const normalizedItem = normalizeItem(item);

  return `
    <div class="item-editor-row" data-item-row>
      <label>
        시간
        ${renderTimePicker(normalizedItem.time)}
      </label>
      <label class="item-editor-text">
        일정
        <input name="itemText" type="text" value="${escapeHtml(normalizedItem.text)}" autocomplete="off">
      </label>
      <label class="item-editor-map">
        위치/지도 링크
        <div class="map-input-row">
          <input name="itemMapUrl" type="text" value="${escapeHtml(normalizedItem.mapUrl)}" placeholder="루브르 또는 https://maps.google.com/..." autocomplete="off">
          <button class="card-edit-button ghost map-action-button" type="button" data-open-map>지도 열기</button>
          <button class="card-edit-button ghost map-action-button" type="button" data-paste-map>붙여넣기</button>
        </div>
      </label>
      <button class="card-edit-button ghost item-delete-button" type="button" data-delete-item>삭제</button>
    </div>
  `;
}

function renderInlineEditor(day, index) {
  if (!canEdit()) {
    return "";
  }

  const itemRows = (day.items.length ? day.items : [normalizeItem("")])
    .map(renderItemEditorRow)
    .join("");

  return `
    <form class="inline-editor" data-editor-index="${index}" hidden>
      <label>
        표시 날짜
        <input name="dateLabel" type="text" value="${escapeHtml(day.dateLabel)}" autocomplete="off">
      </label>
      <label>
        도시
        <input name="city" type="text" value="${escapeHtml(day.city)}" autocomplete="off">
      </label>
      <label class="wide">
        제목
        <input name="title" type="text" value="${escapeHtml(day.title)}" autocomplete="off">
      </label>
      <div class="editor-section-title wide">세부 일정</div>
      <div class="item-editor-list wide" data-item-list>
        ${itemRows}
      </div>
      <button class="edit-button ghost wide" type="button" data-add-item>세부 일정 추가</button>
      <label class="wide">
        메모
        <textarea name="note" rows="3">${escapeHtml(day.note)}</textarea>
      </label>
      <label>
        구분
        <select name="type">
          <option value=""${day.type ? "" : " selected"}>일반</option>
          <option value="transfer"${day.type === "transfer" ? " selected" : ""}>도시 이동</option>
          <option value="return"${day.type === "return" ? " selected" : ""}>귀국/도착</option>
        </select>
      </label>
      <div class="inline-editor-actions">
        <button class="edit-button" type="submit">저장</button>
        <button class="edit-button ghost" type="button" data-cancel-edit>취소</button>
      </div>
    </form>
  `;
}

function renderError(title, message) {
  if (!timelineEl) {
    return;
  }

  currentSchedule = [];
  timelineEl.innerHTML = `
    <article class="day-card error-card">
      <time>오류</time>
      <h3>${escapeHtml(title)}</h3>
      <p class="note">${escapeHtml(message)}</p>
    </article>
  `;
}

function renderInvalidScheduleError() {
  renderError(
    "Firestore 일정 데이터가 비어 있습니다",
    "Firestore 콘솔에서 trips/europe-2026 문서의 schedule 값을 확인하세요."
  );
}

function setSheetUi(message, connected) {
  if (timelineControlsEl) {
    timelineControlsEl.hidden = false;
  }

  if (firebaseSignInEl) {
    firebaseSignInEl.hidden = true;
  }

  if (statusEl) {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-connected", Boolean(connected));
  }
}

function isFirebaseConfigured() {
  const config = firebaseConfig.firebaseConfig || {};
  return Boolean(
    firebaseConfig.enabled
      && config.apiKey
      && config.authDomain
      && config.projectId
      && config.appId
  );
}

function setFirestoreUi(message, connected) {
  if (timelineControlsEl) {
    timelineControlsEl.hidden = false;
  }

  if (firebaseSignInEl) {
    firebaseSignInEl.hidden = true;
  }

  if (editUnlockFormEl) {
    editUnlockFormEl.hidden = canEdit();
  }

  if (editLockEl) {
    editLockEl.hidden = !canEdit() || !getEditPassword();
  }

  if (statusEl) {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-connected", Boolean(connected));
  }
}

async function saveSelectedDay(index, form) {
  if (!firestoreApi || !firestoreDocRef || index < 0) {
    return;
  }

  if (!canEdit()) {
    setFirestoreUi("수정하려면 비밀번호를 먼저 입력하세요.", false);
    return;
  }

  setFirestoreUi("Firestore에 저장하는 중입니다...", true);

  const nextSchedule = currentSchedule.map(cloneDay);
  const formData = new FormData(form);
  const items = Array.from(form.querySelectorAll("[data-item-row]"))
    .map((row) => ({
      time: readItemTime(row),
      text: String(row.querySelector('[name="itemText"]')?.value || "").trim(),
      mapUrl: String(row.querySelector('[name="itemMapUrl"]')?.value || "").trim()
    }))
    .filter((item) => item.time || item.text || item.mapUrl);

  nextSchedule[index] = {
    ...nextSchedule[index],
    dateLabel: String(formData.get("dateLabel") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    items,
    note: String(formData.get("note") || "").trim(),
    type: String(formData.get("type") || "")
  };

  try {
    await firestoreApi.setDoc(firestoreDocRef, {
      schedule: nextSchedule,
      updatedAt: firestoreApi.serverTimestamp()
    }, { merge: true });

    setFirestoreUi("Firestore에 저장했습니다.", true);
  } catch (error) {
    console.warn(error);
    setFirestoreUi("Firestore 저장 실패: Firestore Rules 쓰기 권한을 확인하세요.", false);
  }
}

function wireTimelineEditing() {
  if (!timelineEl) {
    return;
  }

  timelineEl.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit-index]");
    if (editButton) {
      const index = editButton.dataset.editIndex;
      const editor = timelineEl.querySelector(`[data-editor-index="${index}"]`);
      if (editor) {
        editor.hidden = !editor.hidden;
      }
      return;
    }

    const addItemButton = event.target.closest("[data-add-item]");
    if (addItemButton) {
      const editor = addItemButton.closest("[data-editor-index]");
      const itemList = editor?.querySelector("[data-item-list]");
      if (itemList) {
        itemList.insertAdjacentHTML("beforeend", renderItemEditorRow());
      }
      return;
    }

    const openMapButton = event.target.closest("[data-open-map]");
    if (openMapButton) {
      const row = openMapButton.closest("[data-item-row]");
      const mapInput = row?.querySelector('[name="itemMapUrl"]');
      const textInput = row?.querySelector('[name="itemText"]');
      const mapValue = String(mapInput?.value || "").trim();
      const textValue = String(textInput?.value || "").trim();
      const mapHref = getMapHref(mapValue || textValue) || "https://www.google.com/maps";
      window.open(mapHref, "_blank", "noopener");
      return;
    }

    const pasteMapButton = event.target.closest("[data-paste-map]");
    if (pasteMapButton) {
      const row = pasteMapButton.closest("[data-item-row]");
      const mapInput = row?.querySelector('[name="itemMapUrl"]');

      try {
        const clipboardText = await navigator.clipboard.readText();
        if (mapInput && clipboardText.trim()) {
          mapInput.value = clipboardText.trim();
          setFirestoreUi("지도 링크를 입력했습니다. 저장을 눌러 반영하세요.", true);
        } else {
          setFirestoreUi("클립보드에 붙여넣을 지도 링크가 없습니다.", false);
        }
      } catch (error) {
        console.warn(error);
        setFirestoreUi("클립보드 권한이 막혔습니다. 지도 링크를 직접 붙여넣어 주세요.", false);
      }
      return;
    }

    const deleteItemButton = event.target.closest("[data-delete-item]");
    if (deleteItemButton) {
      const row = deleteItemButton.closest("[data-item-row]");
      const itemList = deleteItemButton.closest("[data-item-list]");
      if (row && itemList) {
        row.remove();
        if (!itemList.querySelector("[data-item-row]")) {
          itemList.insertAdjacentHTML("beforeend", renderItemEditorRow());
        }
      }
      return;
    }

    const cancelButton = event.target.closest("[data-cancel-edit]");
    if (cancelButton) {
      const editor = cancelButton.closest("[data-editor-index]");
      if (editor) {
        editor.hidden = true;
      }
    }
  });

  timelineEl.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-editor-index]");
    if (!form) {
      return;
    }

    event.preventDefault();
    await saveSelectedDay(Number.parseInt(form.dataset.editorIndex, 10), form);
  });
}

async function initFirestoreSchedule() {
  if (!isFirebaseConfigured()) {
    return false;
  }

  try {
    const [
      appModule,
      firestoreModule
    ] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]);

    const firebaseApp = appModule.initializeApp(firebaseConfig.firebaseConfig);
    const db = firestoreModule.getFirestore(firebaseApp);
    const collectionPath = firebaseConfig.collectionPath || "trips";
    const documentId = firebaseConfig.documentId || "europe-2026";

    firestoreApi = firestoreModule;
    firestoreDocRef = firestoreModule.doc(db, collectionPath, documentId);

    editUnlockFormEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      const expectedPassword = getEditPassword();
      const enteredPassword = String(editPasswordEl?.value || "").trim();

      if (!expectedPassword || enteredPassword === expectedPassword) {
        if (editPasswordEl) {
          editPasswordEl.value = "";
        }
        setEditUnlocked(true);
      } else {
        setEditUnlocked(false);
        setFirestoreUi("비밀번호가 맞지 않습니다.", false);
      }
    });
    editLockEl?.addEventListener("click", () => {
      setEditUnlocked(false);
    });
    wireTimelineEditing();
    setFirestoreUi(
      canEdit() ? "Firestore 연결 중입니다. 일정은 바로 수정할 수 있습니다." : "Firestore 연결 중입니다. 수정하려면 비밀번호를 입력하세요.",
      true
    );

    firestoreModule.onSnapshot(
      firestoreDocRef,
      (snapshot) => {
        if (snapshot.exists() && Array.isArray(snapshot.data().schedule)) {
          const schedule = normalizeSchedule(snapshot.data().schedule);
          if (schedule.length) {
            renderSchedule(schedule);
            setFirestoreUi(firebaseConfig.updatedLabel || "Firestore 실시간 연동 중", true);
          } else {
            renderInvalidScheduleError();
            setFirestoreUi("Firestore 문서는 있지만 일정 데이터가 비어 있습니다.", false);
          }
        } else {
          renderError(
            "Firestore 일정 문서가 없습니다",
            "Firestore 콘솔에서 trips/europe-2026 문서와 schedule 배열을 만들어 주세요."
          );
          setFirestoreUi("Firestore 문서가 없어 일정을 표시할 수 없습니다.", false);
        }
      },
      (error) => {
        console.warn(error);
        renderError(
          "Firestore를 읽지 못했습니다",
          "Firebase 설정, Firestore Rules, 네트워크 상태를 확인하세요."
        );
        setFirestoreUi("Firestore 읽기 오류가 발생했습니다.", false);
      }
    );

    return true;
  } catch (error) {
    console.warn(error);
    renderError(
      "Firebase 초기화 실패",
      "config.js의 window.TRIP_FIREBASE 설정값을 확인하세요."
    );
    setFirestoreUi("Firebase 초기화 오류가 발생했습니다.", false);
    return true;
  }
}

async function loadSchedule() {
  if (await initFirestoreSchedule()) {
    return;
  }

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

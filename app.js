const fallbackSchedule = [
  {
    "date": "2026-08-01",
    "dateLabel": "8월 1일 토요일",
    "city": "서울 → 런던",
    "title": "출국 및 런던 도착",
    "items": [
      {
        "time": "06:15",
        "text": "🚌 공항 리무진 탑승",
        "mapUrl": "Incheon International Airport",
        "lat": "37.4602",
        "lng": "126.4407"
      },
      {
        "time": "10:55",
        "text": "✈️ 대한항공 KE907 런던행 탑승",
        "mapUrl": "Incheon International Airport",
        "lat": "37.4602",
        "lng": "126.4407"
      },
      {
        "time": "오후",
        "text": "🇬🇧 런던 도착 후 입국 / 수하물 수령",
        "mapUrl": "London Heathrow Airport",
        "lat": "51.47",
        "lng": "-0.4543"
      },
      {
        "time": "18:30",
        "text": "🏨 The Tower Hotel / 더 타워 호텔 체크인",
        "mapUrl": "St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      },
      {
        "time": "19:00",
        "text": "📦 호텔 픽업 메모 - 바이시슬 픽업비용: 말보로 골드 오리지널 2보루 + 60파운드",
        "mapUrl": "The Tower Hotel, St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      },
      {
        "time": "20:00",
        "text": "🍺 저녁 The Dickens Inn / 더 디킨스 인",
        "mapUrl": "Marble Quay, St Katharine's Way, London E1W 1UH",
        "lat": "51.5073",
        "lng": "-0.0717"
      },
      {
        "time": "21:30",
        "text": "🏨 호텔 복귀",
        "mapUrl": "The Tower Hotel, St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      }
    ],
    "note": "출국일은 공항 이동, KE907 탑승, 런던 도착 후 호텔 체크인과 근처 저녁만 잡아둡니다.",
    "type": "transfer"
  },
  {
    "date": "2026-08-02",
    "dateLabel": "8월 2일 일요일",
    "city": "런던",
    "title": "버로우 마켓 + 쇼디치",
    "items": [
      {
        "time": "08:30",
        "text": "☕ 조식 WatchHouse Tower Bridge / 워치하우스 타워브리지",
        "mapUrl": "37 Shad Thames, London SE1 2NJ",
        "lat": "51.506",
        "lng": "-0.0739"
      },
      {
        "time": "10:00",
        "text": "🍴 Borough Market / 버로우 마켓 - 10시 오픈",
        "mapUrl": "8 Southwark St, London SE1 1TL",
        "lat": "51.5055",
        "lng": "-0.091"
      },
      {
        "time": "12:00",
        "text": "🥩 점심 Lobos Meat and Tapas 또는 마켓 스트리트 푸드",
        "mapUrl": "Lobos Meat and Tapas Borough, London",
        "lat": "51.506",
        "lng": "-0.0915"
      },
      {
        "time": "13:30",
        "text": "🎨 Tate Modern 또는 OXO Tower 무료 전망대",
        "mapUrl": "Tate Modern, Bankside, London SE1 9TG",
        "lat": "51.5076",
        "lng": "-0.0994"
      },
      {
        "time": "15:30",
        "text": "🧱 Shoreditch / Brick Lane 거리 구경",
        "mapUrl": "Brick Lane, London",
        "lat": "51.5217",
        "lng": "-0.0718"
      },
      {
        "time": "17:15",
        "text": "🍽 저녁 Dishoom Shoreditch / 디슘 쇼디치 - 예약",
        "mapUrl": "7 Boundary St, London E2 7JE",
        "lat": "51.5245",
        "lng": "-0.0767"
      },
      {
        "time": "19:30",
        "text": "🏨 호텔 복귀",
        "mapUrl": "The Tower Hotel, St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      }
    ],
    "note": "일요일은 버로우 마켓과 쇼디치 중심으로 잡고, 17:15 Dishoom Shoreditch 예약에 맞춰 움직입니다.",
    "type": ""
  },
  {
    "date": "2026-08-03",
    "dateLabel": "8월 3일 월요일",
    "city": "런던",
    "title": "버킹엄 궁전 + 소호 + 덕앤와플",
    "items": [
      {
        "time": "09:30",
        "text": "🚖 호텔 출발 / 버킹엄 궁전 이동",
        "mapUrl": "The Tower Hotel, St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      },
      {
        "time": "11:00",
        "text": "👑 Buckingham Palace / 버킹엄 궁전",
        "mapUrl": "London SW1A 1AA",
        "lat": "51.5014",
        "lng": "-0.1419"
      },
      {
        "time": "12:15",
        "text": "🌳 St James's Park / 세인트 제임스 파크",
        "mapUrl": "London SW1A 2BJ",
        "lat": "51.5025",
        "lng": "-0.1348"
      },
      {
        "time": "13:30",
        "text": "🦞 점심 랍스터 - Burger & Lobster Soho 후보",
        "mapUrl": "Burger & Lobster Soho London",
        "lat": "51.5125",
        "lng": "-0.1366"
      },
      {
        "time": "15:00",
        "text": "🛍 Soho / 소호 구경",
        "mapUrl": "Soho, London",
        "lat": "51.5136",
        "lng": "-0.1365"
      },
      {
        "time": "16:15",
        "text": "🕰 Big Ben / 빅벤",
        "mapUrl": "London SW1A 0AA",
        "lat": "51.5007",
        "lng": "-0.1246"
      },
      {
        "time": "16:45",
        "text": "⛪ Westminster Abbey / 웨스트민스터 사원",
        "mapUrl": "20 Deans Yd, London SW1P 3PA",
        "lat": "51.4993",
        "lng": "-0.1273"
      },
      {
        "time": "17:30",
        "text": "🎡 London Eye / 런던아이",
        "mapUrl": "London Eye, London",
        "lat": "51.5033",
        "lng": "-0.1195"
      },
      {
        "time": "18:00",
        "text": "🎭 Covent Garden / 코벤트 가든",
        "mapUrl": "London WC2E 8RF",
        "lat": "51.5117",
        "lng": "-0.124"
      },
      {
        "time": "19:00",
        "text": "🍽 저녁 Duck & Waffle / 덕앤와플 - 예약",
        "mapUrl": "110 Bishopsgate, London EC2N 4AY",
        "lat": "51.5162",
        "lng": "-0.0808"
      },
      {
        "time": "21:30",
        "text": "🏨 호텔 복귀",
        "mapUrl": "The Tower Hotel, St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      }
    ],
    "note": "월요일은 11:00 버킹엄 궁전 일정에 맞추고, 소호와 웨스트민스터 권역을 본 뒤 19:00 Duck & Waffle 예약으로 마무리합니다.",
    "type": ""
  },
  {
    "date": "2026-08-04",
    "dateLabel": "8월 4일 화요일",
    "city": "런던 → 파리",
    "title": "유로스타 이동 + 파리 첫날",
    "items": [
      {
        "time": "08:30",
        "text": "🏨 The Tower Hotel 체크아웃 준비",
        "mapUrl": "The Tower Hotel, St Katharine's Way, London E1W 1LD",
        "lat": "51.5077",
        "lng": "-0.0733"
      },
      {
        "time": "09:00",
        "text": "🚖 호텔 출발 / St Pancras International 이동",
        "mapUrl": "St Pancras International, London",
        "lat": "51.5315",
        "lng": "-0.1263"
      },
      {
        "time": "10:15",
        "text": "🥪 세인트 판크라스역에서 간단한 샌드위치와 커피",
        "mapUrl": "St Pancras International, Euston Rd, London N1C 4QP",
        "lat": "51.5315",
        "lng": "-0.1263"
      },
      {
        "time": "10:45",
        "text": "🚄 Eurostar 체크인",
        "mapUrl": "St Pancras International, Euston Rd, London N1C 4QP",
        "lat": "51.5315",
        "lng": "-0.1263"
      },
      {
        "time": "12:01",
        "text": "🚄 Eurostar 런던 출발",
        "mapUrl": "St Pancras International, Euston Rd, London N1C 4QP",
        "lat": "51.5315",
        "lng": "-0.1263"
      },
      {
        "time": "15:20",
        "text": "🇫🇷 Paris Gare du Nord 도착",
        "mapUrl": "Gare du Nord, Paris",
        "lat": "48.8809",
        "lng": "2.3553"
      },
      {
        "time": "16:30",
        "text": "🏨 Hyatt Regency Paris Étoile / 하얏트 리젠시 에투알 체크인",
        "mapUrl": "3 Place du Général Kœnig, 75017 Paris",
        "lat": "48.8808",
        "lng": "2.284"
      },
      {
        "time": "17:30",
        "text": "🏛 Arc de Triomphe / 개선문",
        "mapUrl": "Place Charles de Gaulle, 75008 Paris",
        "lat": "48.8738",
        "lng": "2.295"
      },
      {
        "time": "18:10",
        "text": "🛍 Champs-Élysées / 샹젤리제 거리",
        "mapUrl": "Avenue des Champs-Élysées, 75008 Paris",
        "lat": "48.8698",
        "lng": "2.3076"
      },
      {
        "time": "18:40",
        "text": "🗼 Eiffel Tower / 에펠탑 외관",
        "mapUrl": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
        "lat": "48.8584",
        "lng": "2.2945"
      },
      {
        "time": "19:00",
        "text": "🍽 저녁 Les Cocottes / 레 코코트 - 예약",
        "mapUrl": "Les Cocottes Paris",
        "lat": "48.8587",
        "lng": "2.3078"
      }
    ],
    "note": "런던 체크아웃 후 12:01 유로스타로 파리 이동. 파리 첫날은 개선문, 샹젤리제, 에펠탑 외관과 19:00 Les Cocottes 예약으로 정리합니다.",
    "type": "transfer"
  },
  {
    "date": "2026-08-05",
    "dateLabel": "8월 5일 수요일",
    "city": "파리",
    "title": "몽마르트 + 오페라 권역 + 루브르 외관",
    "items": [
      {
        "time": "08:30",
        "text": "⛪ Sacré-Cœur / 사크레쾨르 - 오전 일찍",
        "mapUrl": "35 Rue du Chevalier de la Barre, 75018 Paris",
        "lat": "48.8867",
        "lng": "2.3431"
      },
      {
        "time": "11:30",
        "text": "🍝 점심 Pink Mamma / 핑크 마마",
        "mapUrl": "20bis Rue de Douai, 75009 Paris",
        "lat": "48.8821",
        "lng": "2.3335"
      },
      {
        "time": "13:00",
        "text": "🌹 La Maison Rose / 라 메종 로즈",
        "mapUrl": "2 Rue de l'Abreuvoir, 75018 Paris",
        "lat": "48.8878",
        "lng": "2.3404"
      },
      {
        "time": "13:30",
        "text": "💌 Le mur des je t'aime / 사랑해 벽",
        "mapUrl": "Square Jehan Rictus, Place des Abbesses, 75018 Paris",
        "lat": "48.8849",
        "lng": "2.3387"
      },
      {
        "time": "15:00",
        "text": "🛍 Galeries Lafayette 전망대 / 라파예트 전망",
        "mapUrl": "40 Boulevard Haussmann, 75009 Paris",
        "lat": "48.8738",
        "lng": "2.3321"
      },
      {
        "time": "16:00",
        "text": "🎭 Palais Garnier / 오페라 가르니에 - 예약 선택",
        "mapUrl": "Place de l'Opéra, 75009 Paris",
        "lat": "48.8719",
        "lng": "2.3316"
      },
      {
        "time": "17:00",
        "text": "🖼 Bourse de Commerce - Pinault Collection / 피노 컬렉션 - 티켓 선택",
        "mapUrl": "2 Rue de Viarmes, 75001 Paris",
        "lat": "48.8624",
        "lng": "2.342"
      },
      {
        "time": "18:00",
        "text": "🌉 Pont Alexandre III / 알렉산드르 3세 다리",
        "mapUrl": "Pont Alexandre III, 75008 Paris",
        "lat": "48.8639",
        "lng": "2.3136"
      },
      {
        "time": "18:40",
        "text": "🌳 Tuileries + Louvre 외관 / 루브르 안 Café Marly 선택",
        "mapUrl": "Rue de Rivoli, 75001 Paris",
        "lat": "48.8606",
        "lng": "2.3376"
      },
      {
        "time": "19:40",
        "text": "🍜 저녁 Sanukiya 또는 쌀국수",
        "mapUrl": "Sanukiya Paris",
        "lat": "48.866",
        "lng": "2.3334"
      }
    ],
    "note": "몽마르트는 오전 일찍 보고, 오후에는 라파예트 전망대와 오페라/피노 컬렉션 선택지를 둡니다.",
    "type": ""
  },
  {
    "date": "2026-08-06",
    "dateLabel": "8월 6일 목요일",
    "city": "파리",
    "title": "사마리텐 + 노트르담 + 마레 + 레종브레",
    "items": [
      {
        "time": "09:30",
        "text": "🛍 La Samaritaine / 사마리텐",
        "mapUrl": "9 Rue de la Monnaie, 75001 Paris",
        "lat": "48.8599",
        "lng": "2.3427"
      },
      {
        "time": "10:15",
        "text": "🌉 Pont Neuf / 퐁뇌프 다리",
        "mapUrl": "Pont Neuf, 75001 Paris",
        "lat": "48.8574",
        "lng": "2.3414"
      },
      {
        "time": "10:45",
        "text": "⛪ Notre-Dame de Paris / 노트르담",
        "mapUrl": "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris",
        "lat": "48.853",
        "lng": "2.3499"
      },
      {
        "time": "11:45",
        "text": "🛍 Marais / 마레 - Merci 시작",
        "mapUrl": "111 Boulevard Beaumarchais, 75003 Paris",
        "lat": "48.8614",
        "lng": "2.3674"
      },
      {
        "time": "13:00",
        "text": "🍴 점심 Soon Grill 또는 Chez Janou",
        "mapUrl": "78 Rue des Tournelles, 75003 Paris",
        "lat": "48.8562",
        "lng": "2.3673"
      },
      {
        "time": "14:30",
        "text": "☕ 파블라 커피",
        "mapUrl": "Le Marais, Paris",
        "lat": "48.8589",
        "lng": "2.363"
      },
      {
        "time": "15:30",
        "text": "🚶 어펑휴쥬거리 / 마레 거리 산책",
        "mapUrl": "Le Marais, Paris",
        "lat": "48.8589",
        "lng": "2.363"
      },
      {
        "time": "19:00",
        "text": "🍽 저녁 Les Ombres / 레종브레",
        "mapUrl": "27 Quai Jacques Chirac, 75007 Paris",
        "lat": "48.861",
        "lng": "2.2979"
      }
    ],
    "note": "목요일은 센강 중심 쇼핑/산책과 마레를 묶고, 저녁은 에펠탑 전망 식당 Les Ombres로 잡습니다.",
    "type": ""
  },
  {
    "date": "2026-08-07",
    "dateLabel": "8월 7일 금요일",
    "city": "파리 → 서울",
    "title": "귀국일",
    "items": [
      {
        "time": "09:30",
        "text": "🏨 호텔 체크아웃 / 짐 보관",
        "mapUrl": "Hyatt Regency Paris Étoile, 3 Place du Général Kœnig, 75017 Paris",
        "lat": "48.8808",
        "lng": "2.284"
      },
      {
        "time": "10:30",
        "text": "📸 Trocadéro / 트로카데로 광장",
        "mapUrl": "Place du Trocadéro et du 11 Novembre, 75016 Paris",
        "lat": "48.8629",
        "lng": "2.287"
      },
      {
        "time": "12:00",
        "text": "🍴 점심 또는 자유시간",
        "mapUrl": "Paris",
        "lat": "48.8566",
        "lng": "2.3522"
      },
      {
        "time": "15:30",
        "text": "🏨 호텔 복귀 / 짐 찾기",
        "mapUrl": "Hyatt Regency Paris Étoile, 3 Place du Général Kœnig, 75017 Paris",
        "lat": "48.8808",
        "lng": "2.284"
      },
      {
        "time": "16:30",
        "text": "🚖 공항 샌딩",
        "mapUrl": "Paris Charles de Gaulle Airport",
        "lat": "49.0097",
        "lng": "2.5479"
      },
      {
        "time": "20:35",
        "text": "✈️ 대한항공 KE902 탑승 / 귀국",
        "mapUrl": "Paris Charles de Gaulle Airport",
        "lat": "49.0097",
        "lng": "2.5479"
      }
    ],
    "note": "귀국일은 트로카데로만 가볍게 보고, 16:30 샌딩 시간에 맞춰 호텔로 복귀합니다.",
    "type": "return"
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
const bookingChecklistEl = document.querySelector("#bookingChecklist");
const bookingTabEls = Array.from(document.querySelectorAll("[data-booking-tab]"));
const bookingPanelEls = Array.from(document.querySelectorAll("[data-booking-panel]"));
const routeMapEl = document.querySelector("#routeMap");
const routeFilterEls = Array.from(document.querySelectorAll("[data-route-filter]"));

const routePoints = [
  {
    "country": "london",
    "day": "8/1",
    "title": "공항 리무진 탑승",
    "lat": 37.4602,
    "lng": 126.4407
  },
  {
    "country": "london",
    "day": "8/1",
    "title": "대한항공 KE907 런던행 탑승",
    "lat": 37.4602,
    "lng": 126.4407
  },
  {
    "country": "london",
    "day": "8/1",
    "title": "런던 도착 후 입국",
    "lat": 51.47,
    "lng": -0.4543
  },
  {
    "country": "london",
    "day": "8/1",
    "title": "The Tower Hotel",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "london",
    "day": "8/1",
    "title": "호텔 픽업 메모",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "london",
    "day": "8/1",
    "title": "저녁 The Dickens Inn",
    "lat": 51.5073,
    "lng": -0.0717
  },
  {
    "country": "london",
    "day": "8/1",
    "title": "호텔 복귀",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "조식 WatchHouse Tower Bridge",
    "lat": 51.506,
    "lng": -0.0739
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "Borough Market",
    "lat": 51.5055,
    "lng": -0.091
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "점심 Lobos Meat and Tapas 또는 마켓 스트리트 푸드",
    "lat": 51.506,
    "lng": -0.0915
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "Tate Modern 또는 OXO Tower 무료 전망대",
    "lat": 51.5076,
    "lng": -0.0994
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "Shoreditch",
    "lat": 51.5217,
    "lng": -0.0718
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "저녁 Dishoom Shoreditch",
    "lat": 51.5245,
    "lng": -0.0767
  },
  {
    "country": "london",
    "day": "8/2",
    "title": "호텔 복귀",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "호텔 출발",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "Buckingham Palace",
    "lat": 51.5014,
    "lng": -0.1419
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "St James's Park",
    "lat": 51.5025,
    "lng": -0.1348
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "점심 랍스터",
    "lat": 51.5125,
    "lng": -0.1366
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "Soho",
    "lat": 51.5136,
    "lng": -0.1365
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "Big Ben",
    "lat": 51.5007,
    "lng": -0.1246
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "Westminster Abbey",
    "lat": 51.4993,
    "lng": -0.1273
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "London Eye",
    "lat": 51.5033,
    "lng": -0.1195
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "Covent Garden",
    "lat": 51.5117,
    "lng": -0.124
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "저녁 Duck & Waffle",
    "lat": 51.5162,
    "lng": -0.0808
  },
  {
    "country": "london",
    "day": "8/3",
    "title": "호텔 복귀",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "The Tower Hotel 체크아웃 준비",
    "lat": 51.5077,
    "lng": -0.0733
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "호텔 출발",
    "lat": 51.5315,
    "lng": -0.1263
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "세인트 판크라스역에서 간단한 샌드위치와 커피",
    "lat": 51.5315,
    "lng": -0.1263
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Eurostar 체크인",
    "lat": 51.5315,
    "lng": -0.1263
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Eurostar 런던 출발",
    "lat": 51.5315,
    "lng": -0.1263
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Paris Gare du Nord 도착",
    "lat": 48.8809,
    "lng": 2.3553
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Hyatt Regency Paris Étoile",
    "lat": 48.8808,
    "lng": 2.284
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Arc de Triomphe",
    "lat": 48.8738,
    "lng": 2.295
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Champs-Élysées",
    "lat": 48.8698,
    "lng": 2.3076
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "Eiffel Tower",
    "lat": 48.8584,
    "lng": 2.2945
  },
  {
    "country": "paris",
    "day": "8/4",
    "title": "저녁 Les Cocottes",
    "lat": 48.8587,
    "lng": 2.3078
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Sacré-Cœur",
    "lat": 48.8867,
    "lng": 2.3431
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "점심 Pink Mamma",
    "lat": 48.8821,
    "lng": 2.3335
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "La Maison Rose",
    "lat": 48.8878,
    "lng": 2.3404
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Le mur des je t'aime",
    "lat": 48.8849,
    "lng": 2.3387
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Galeries Lafayette 전망대",
    "lat": 48.8738,
    "lng": 2.3321
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Palais Garnier",
    "lat": 48.8719,
    "lng": 2.3316
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Bourse de Commerce",
    "lat": 48.8624,
    "lng": 2.342
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Pont Alexandre III",
    "lat": 48.8639,
    "lng": 2.3136
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "Tuileries + Louvre 외관",
    "lat": 48.8606,
    "lng": 2.3376
  },
  {
    "country": "paris",
    "day": "8/5",
    "title": "저녁 Sanukiya 또는 쌀국수",
    "lat": 48.866,
    "lng": 2.3334
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "La Samaritaine",
    "lat": 48.8599,
    "lng": 2.3427
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "Pont Neuf",
    "lat": 48.8574,
    "lng": 2.3414
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "Notre-Dame de Paris",
    "lat": 48.853,
    "lng": 2.3499
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "Marais",
    "lat": 48.8614,
    "lng": 2.3674
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "점심 Soon Grill 또는 Chez Janou",
    "lat": 48.8562,
    "lng": 2.3673
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "파블라 커피",
    "lat": 48.8589,
    "lng": 2.363
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "어펑휴쥬거리",
    "lat": 48.8589,
    "lng": 2.363
  },
  {
    "country": "paris",
    "day": "8/6",
    "title": "저녁 Les Ombres",
    "lat": 48.861,
    "lng": 2.2979
  },
  {
    "country": "paris",
    "day": "8/7",
    "title": "호텔 체크아웃",
    "lat": 48.8808,
    "lng": 2.284
  },
  {
    "country": "paris",
    "day": "8/7",
    "title": "Trocadéro",
    "lat": 48.8629,
    "lng": 2.287
  },
  {
    "country": "paris",
    "day": "8/7",
    "title": "점심 또는 자유시간",
    "lat": 48.8566,
    "lng": 2.3522
  },
  {
    "country": "paris",
    "day": "8/7",
    "title": "호텔 복귀",
    "lat": 48.8808,
    "lng": 2.284
  },
  {
    "country": "paris",
    "day": "8/7",
    "title": "공항 샌딩",
    "lat": 49.0097,
    "lng": 2.5479
  },
  {
    "country": "paris",
    "day": "8/7",
    "title": "대한항공 KE902 탑승",
    "lat": 49.0097,
    "lng": 2.5479
  }
];

const runningRoutePoints = [
  { country: "running", day: "10km", title: "The Tower Hotel 출발", lat: 51.5077, lng: -0.0733 },
  { country: "running", day: "10km", title: "Tower Bridge 남단", lat: 51.5055, lng: -0.0754 },
  { country: "running", day: "10km", title: "Potters Fields Park", lat: 51.5046, lng: -0.0788 },
  { country: "running", day: "10km", title: "HMS Belfast", lat: 51.5066, lng: -0.0815 },
  { country: "running", day: "10km", title: "London Bridge", lat: 51.5079, lng: -0.0877 },
  { country: "running", day: "10km", title: "Borough Market", lat: 51.5055, lng: -0.0910 },
  { country: "running", day: "10km", title: "Shakespeare's Globe", lat: 51.5081, lng: -0.0972 },
  { country: "running", day: "10km", title: "Tate Modern", lat: 51.5076, lng: -0.0994 },
  { country: "running", day: "10km", title: "Southbank Centre", lat: 51.5061, lng: -0.1162 },
  { country: "running", day: "10km", title: "London Eye", lat: 51.5033, lng: -0.1195 },
  { country: "running", day: "10km", title: "Westminster Bridge", lat: 51.5009, lng: -0.1217 },
  { country: "running", day: "10km", title: "Big Ben", lat: 51.5007, lng: -0.1246 },
  { country: "running", day: "10km", title: "St James's Park 동쪽", lat: 51.5029, lng: -0.1301 },
  { country: "running", day: "10km", title: "Horse Guards", lat: 51.5048, lng: -0.1269 },
  { country: "running", day: "10km", title: "Victoria Embankment", lat: 51.5075, lng: -0.1226 },
  { country: "running", day: "10km", title: "Blackfriars Bridge", lat: 51.5098, lng: -0.1040 },
  { country: "running", day: "10km", title: "St Paul's Cathedral", lat: 51.5138, lng: -0.0984 },
  { country: "running", day: "10km", title: "Bank", lat: 51.5133, lng: -0.0886 },
  { country: "running", day: "10km", title: "Monument", lat: 51.5101, lng: -0.0860 },
  { country: "running", day: "10km", title: "Tower of London", lat: 51.5081, lng: -0.0759 },
  { country: "running", day: "10km", title: "The Tower Hotel 복귀", lat: 51.5077, lng: -0.0733 }
];

const restaurantLinks = [
  {
    "match": [
      "The Dickens Inn",
      "더 디킨스 인"
    ],
    "targetId": "restaurant-dickens-inn",
    "label": "식당 예약"
  },
  {
    "match": [
      "Lobos Meat and Tapas",
      "Lobos"
    ],
    "targetId": "restaurant-lobos",
    "label": "식당 예약"
  },
  {
    "match": [
      "Dishoom Shoreditch",
      "디슘 쇼디치"
    ],
    "targetId": "restaurant-dishoom-shoreditch",
    "label": "식당 예약"
  },
  {
    "match": [
      "Burger & Lobster",
      "랍스터"
    ],
    "targetId": "restaurant-burger-lobster",
    "label": "식당 예약"
  },
  {
    "match": [
      "Duck & Waffle",
      "덕앤와플"
    ],
    "targetId": "restaurant-duck-waffle",
    "label": "식당 예약"
  },
  {
    "match": [
      "Les Cocottes",
      "레 코코트"
    ],
    "targetId": "restaurant-les-cocottes",
    "label": "식당 예약"
  },
  {
    "match": [
      "Pink Mamma",
      "핑크 마마"
    ],
    "targetId": "restaurant-pink-mamma",
    "label": "식당 예약"
  },
  {
    "match": [
      "Sanukiya",
      "쌀국수"
    ],
    "targetId": "restaurant-sanukiya",
    "label": "식당 예약"
  },
  {
    "match": [
      "Soon Grill",
      "Chez Janou"
    ],
    "targetId": "restaurant-soon-chez-janou",
    "label": "식당 예약"
  },
  {
    "match": [
      "Les Ombres",
      "레종브레"
    ],
    "targetId": "restaurant-les-ombres",
    "label": "식당 예약"
  }
];

const defaultChecklist = [
  {
    "id": "flight",
    "label": "항공 KE907 / KE902",
    "checked": true,
    "url": "https://www.koreanair.com/booking/manage-booking",
    "note": "8/1 10:55 KE907, 8/7 20:35 KE902"
  },
  {
    "id": "airport-limousine",
    "label": "8월 1일 공항 리무진 06:15",
    "checked": false,
    "url": "",
    "note": "출발 위치와 탑승장 확인"
  },
  {
    "id": "tower-hotel",
    "label": "런던 숙소 The Tower Hotel",
    "checked": true,
    "url": "https://www.thistle.com/the-tower",
    "note": "호텔 픽업 메모 포함"
  },
  {
    "id": "hotel-pickup",
    "label": "The Tower Hotel 픽업비용 메모",
    "checked": false,
    "url": "",
    "note": "말보로 골드 오리지널 2보루 + 60파운드"
  },
  {
    "id": "hyatt-paris",
    "label": "파리 숙소 Hyatt Regency Paris Étoile",
    "checked": true,
    "url": "https://www.hyatt.com/hyatt-regency/en-US/parhr-hyatt-regency-paris-etoile",
    "note": ""
  },
  {
    "id": "eurostar",
    "label": "Eurostar 8월 4일 12:01",
    "checked": true,
    "url": "https://www.eurostar.com/rw-en/travel-info/your-trip/manage-booking",
    "note": "St Pancras International"
  },
  {
    "id": "dickens-inn",
    "label": "8월 1일 The Dickens Inn",
    "checked": false,
    "url": "https://www.dickensinn.co.uk/",
    "note": "호텔 근처 저녁"
  },
  {
    "id": "dishoom-shoreditch",
    "label": "8월 2일 Dishoom Shoreditch 17:15",
    "checked": true,
    "url": "https://www.dishoom.com/shoreditch/",
    "note": "예약 완료"
  },
  {
    "id": "buckingham-palace",
    "label": "8월 3일 Buckingham Palace 11:00",
    "checked": false,
    "url": "https://www.rct.uk/visit/buckingham-palace",
    "note": "입장권/시간 확인"
  },
  {
    "id": "duck-waffle",
    "label": "8월 3일 Duck & Waffle 19:00",
    "checked": true,
    "url": "https://duckandwaffle.com/",
    "note": "예약 완료"
  },
  {
    "id": "les-cocottes",
    "label": "8월 4일 Les Cocottes 19:00",
    "checked": true,
    "url": "https://www.maisonconstant.com/les-cocottes-tour-eiffel/",
    "note": "예약 완료"
  },
  {
    "id": "pink-mamma",
    "label": "8월 5일 Pink Mamma 점심",
    "checked": false,
    "url": "https://www.bigmammagroup.com/italian-restaurants/pink-mamma",
    "note": "점심 예약 확인"
  },
  {
    "id": "palais-garnier",
    "label": "8월 5일 Opéra Garnier 선택",
    "checked": false,
    "url": "https://www.operadeparis.fr/en/visits/palais-garnier",
    "note": "예약 선택"
  },
  {
    "id": "pinault",
    "label": "8월 5일 Pinault Collection 선택",
    "checked": false,
    "url": "https://www.pinaultcollection.com/en/boursedecommerce",
    "note": "티켓 선택"
  },
  {
    "id": "les-ombres",
    "label": "8월 6일 Les Ombres 저녁",
    "checked": false,
    "url": "https://www.lesombres-restaurant.com/",
    "note": "예약 확인"
  },
  {
    "id": "airport-transfer",
    "label": "8월 7일 공항 샌딩 16:30",
    "checked": false,
    "url": "",
    "note": "픽업 장소/기사 연락처 확인"
  }
];

let currentSchedule = [];
let currentChecklist = [];
let firestoreApi = null;
let firestoreDocRef = null;
let editUnlocked = sessionStorage.getItem("tripEditUnlocked") === "true";
let activeRouteFilter = "all";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeCoordinate(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const number = Number(value);
  return Number.isFinite(number) ? String(number) : "";
}

function readCoordinate(row, name) {
  return normalizeCoordinate(row.querySelector(`[name="${name}"]`)?.value);
}

function parseCoordinatesFromText(value) {
  const text = String(value || "");
  const patterns = [
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /[?&](?:q|ll)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        lat: normalizeCoordinate(match[1]),
        lng: normalizeCoordinate(match[2])
      };
    }
  }

  return { lat: "", lng: "" };
}

function normalizeItem(item) {
  if (typeof item === "string") {
    const value = item.trim();
    const timeMatch = value.match(/^(\d{1,2}:\d{2})\s+(.+)$/);

    return {
      time: timeMatch ? timeMatch[1].padStart(5, "0") : "",
      text: timeMatch ? timeMatch[2].trim() : value,
      mapUrl: "",
      lat: "",
      lng: ""
    };
  }

  if (!item || typeof item !== "object") {
    return {
      time: "",
      text: "",
      mapUrl: "",
      lat: "",
      lng: ""
    };
  }

  return {
    time: String(item.time || "").trim(),
    text: String(item.text || item.title || item.label || "").trim(),
    mapUrl: String(item.mapUrl || item.map || item.url || "").trim(),
    lat: normalizeCoordinate(item.lat),
    lng: normalizeCoordinate(item.lng)
  };
}

function normalizeItems(items) {
  return sortItemsByTime((Array.isArray(items) ? items : [])
    .map(normalizeItem)
    .filter((item) => item.time || item.text || item.mapUrl || (item.lat && item.lng)));
}

function getItemSortMinutes(item) {
  const match = String(item?.time || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  return Number.parseInt(match[1], 10) * 60 + Number.parseInt(match[2], 10);
}

function sortItemsByTime(items) {
  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const diff = getItemSortMinutes(left.item) - getItemSortMinutes(right.item);
      return diff || left.index - right.index;
    })
    .map((entry) => entry.item);
}

function getDayTypeLabel(type) {
  if (type === "transfer") {
    return "도시 이동";
  }

  if (type === "return") {
    return "귀국/도착";
  }

  return "일반";
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

function getRestaurantLink(item) {
  const text = String(item?.text || "");
  const date = String(item?.date || "");

  return restaurantLinks.find((link) => {
    if (link.date && link.date !== date) {
      return false;
    }

    return link.match.some((keyword) => text.includes(keyword));
  });
}

function openBookingTab(selectedTab) {
  if (!bookingTabEls.length || !bookingPanelEls.length) {
    return;
  }

  bookingTabEls.forEach((item) => {
    const isSelected = item.dataset.bookingTab === selectedTab;
    item.classList.toggle("is-active", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
  });

  bookingPanelEls.forEach((panel) => {
    panel.hidden = panel.dataset.bookingPanel !== selectedTab;
  });
}

function focusRestaurantCard(targetId) {
  openBookingTab("restaurants");

  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "center" });
  target.classList.remove("is-targeted");
  window.setTimeout(() => target.classList.add("is-targeted"), 0);
  window.setTimeout(() => target.classList.remove("is-targeted"), 1800);
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

function sortEditorRowsByTime(itemList) {
  const rows = Array.from(itemList.querySelectorAll("[data-item-row]"));
  rows
    .map((row, index) => ({
      row,
      index,
      time: readItemTime(row)
    }))
    .sort((left, right) => {
      const diff = getItemSortMinutes({ time: left.time }) - getItemSortMinutes({ time: right.time });
      return diff || left.index - right.index;
    })
    .forEach(({ row }) => itemList.append(row));
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
  renderChecklist(currentChecklist.length ? currentChecklist : defaultChecklist);
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

function normalizeChecklist(checklist) {
  const incoming = Array.isArray(checklist) ? checklist : [];
  const incomingById = new Map(incoming
    .filter((item) => item && typeof item === "object")
    .map((item) => [String(item.id || "").trim(), item]));

  const merged = defaultChecklist.map((item) => {
    const saved = incomingById.get(item.id);
    return {
      id: item.id,
      label: String(saved?.label || item.label).trim(),
      checked: typeof saved?.checked === "boolean" ? saved.checked : Boolean(item.checked),
      url: String(saved?.url || item.url || "").trim(),
      note: String(saved?.note || item.note || "").trim()
    };
  });

  incoming.forEach((item) => {
    const id = String(item?.id || "").trim();
    if (!id || merged.some((saved) => saved.id === id)) {
      return;
    }

    merged.push({
      id,
      label: String(item.label || id).trim(),
      checked: Boolean(item.checked),
      url: String(item.url || "").trim(),
      note: String(item.note || "").trim()
    });
  });

  return merged;
}

function getChecklistLinkHref(value) {
  const url = String(value || "").trim();
  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

function renderChecklist(checklist) {
  if (!bookingChecklistEl) {
    return;
  }

  currentChecklist = normalizeChecklist(checklist);
  bookingChecklistEl.innerHTML = currentChecklist.map((item) => {
    const checked = item.checked ? " checked" : "";
    const disabled = canEdit() ? "" : " disabled";
    const linkHref = getChecklistLinkHref(item.url);
    const linkButton = linkHref
      ? `<a class="check-link" href="${escapeHtml(linkHref)}" target="_blank" rel="noopener">열기</a>`
      : "";

    return `
      <li>
        <div class="check-item">
          <label class="check-label">
            <input type="checkbox" data-checklist-id="${escapeHtml(item.id)}" data-checklist-field="checked"${checked}${disabled}>
            <span>${escapeHtml(item.label)}</span>
          </label>
          ${item.note ? `<p class="check-note">${escapeHtml(item.note)}</p>` : ""}
          <div class="check-fields">
            <label>
              예약 링크
              <div class="check-url-row">
                <input type="url" data-checklist-id="${escapeHtml(item.id)}" data-checklist-field="url" value="${escapeHtml(item.url)}" placeholder="https://..."${disabled}>
                ${linkButton}
              </div>
            </label>
            <label>
              메모
              <input type="text" data-checklist-id="${escapeHtml(item.id)}" data-checklist-field="note" value="${escapeHtml(item.note)}" placeholder="예약 시간, 가격, 참고사항"${disabled}>
            </label>
          </div>
        </div>
      </li>
    `;
  }).join("");
}

function getRouteColor(filter) {
  if (filter === "london") {
    return "#2563eb";
  }

  if (filter === "paris") {
    return "#be3455";
  }

  if (filter === "running") {
    return "#ea580c";
  }

  return "#0f766e";
}

function getRouteCountry(point) {
  if (point.country) {
    return point.country;
  }

  return Number(point.lng) < 1 ? "london" : "paris";
}

function getRoutePointsFromSchedule() {
  return currentSchedule.flatMap((day, dayIndex) => {
    const dayLabel = String(day.dateLabel || day.date || "").replace(/\s+/g, " ").trim();

    return normalizeItems(day.items)
      .map((item, itemIndex) => ({ ...item, routeId: `${dayIndex}-${itemIndex}` }))
      .filter((item) => item.lat && item.lng)
      .map((item) => ({
        id: item.routeId,
        country: getRouteCountry(item),
        day: dayLabel.replace(/^8월\s*/, "8/").replace(/\s*요일$/, ""),
        title: item.text || day.title || "일정",
        mapUrl: item.mapUrl,
        lat: Number(item.lat),
        lng: Number(item.lng)
      }));
  });
}

function getRoutePointMapHref(point) {
  const mapHref = getMapHref(point?.mapUrl);
  if (mapHref) {
    return mapHref;
  }

  if (Number.isFinite(point?.lat) && Number.isFinite(point?.lng)) {
    return `https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`;
  }

  return "";
}

function getVisibleRoutePoints(filter) {
  if (filter === "running") {
    return runningRoutePoints;
  }

  const scheduleRoutePoints = getRoutePointsFromSchedule();
  const sourcePoints = scheduleRoutePoints.length ? scheduleRoutePoints : routePoints;

  if (filter === "london" || filter === "paris") {
    return sourcePoints.filter((point) => getRouteCountry(point) === filter);
  }

  return sourcePoints;
}

function getRouteMarkerColor(point, filter) {
  if (filter === "running" || getRouteCountry(point) === "running") {
    return "#ea580c";
  }

  return getRouteCountry(point) === "london" ? "#2563eb" : "#be3455";
}

function renderRouteMap(filter = "all") {
  if (!routeMapEl) {
    return;
  }

  if (!window.L) {
    routeMapEl.innerHTML = '<div class="route-map-error">지도를 불러오지 못했습니다.</div>';
    return;
  }

  if (!renderRouteMap.map) {
    renderRouteMap.map = window.L.map(routeMapEl, {
      scrollWheelZoom: false
    });

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(renderRouteMap.map);
  }

  if (renderRouteMap.layer) {
    renderRouteMap.layer.remove();
  }

  const visiblePoints = getVisibleRoutePoints(filter);
  const color = getRouteColor(filter);
  const layer = window.L.layerGroup().addTo(renderRouteMap.map);
  const latLngs = visiblePoints.map((point) => [point.lat, point.lng]);
  renderRouteMap.markers = new Map();

  window.L.polyline(latLngs, {
    color,
    weight: 4,
    opacity: 0.75
  }).addTo(layer);

  visiblePoints.forEach((point, index) => {
    const marker = window.L.circleMarker([point.lat, point.lng], {
      radius: 8,
      color: "#ffffff",
      weight: 2,
      fillColor: getRouteMarkerColor(point, filter),
      fillOpacity: 0.95
    }).addTo(layer);

    marker.bindTooltip(String(index + 1), {
      permanent: true,
      direction: "center",
      className: "route-marker-number"
    });
    const mapHref = getRoutePointMapHref(point);
    const popupTitle = `${escapeHtml(point.day)} ${escapeHtml(point.title)}`;
    const popupContent = mapHref
      ? `<a class="route-popup-link" href="${escapeHtml(mapHref)}" target="_blank" rel="noopener">${popupTitle}</a>`
      : `<strong>${popupTitle}</strong>`;

    marker.bindPopup(popupContent);
    if (mapHref) {
      marker.on("click", () => {
        window.open(mapHref, "_blank", "noopener");
      });
    }
    if (point.id) {
      renderRouteMap.markers.set(point.id, marker);
    }
  });

  renderRouteMap.layer = layer;

  if (latLngs.length) {
    renderRouteMap.map.fitBounds(window.L.latLngBounds(latLngs), {
      padding: [28, 28],
      maxZoom: filter === "all" ? 6 : 14
    });
  }
}

function wireRouteMap() {
  if (!routeMapEl) {
    return;
  }

  routeFilterEls.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveRouteFilter(button.dataset.routeFilter || "all");
    });
  });

  renderRouteMap(activeRouteFilter);
}

function setActiveRouteFilter(filter) {
  activeRouteFilter = filter || "all";
  routeFilterEls.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.routeFilter === activeRouteFilter);
  });
  renderRouteMap(activeRouteFilter);
}

function focusRoutePoint(routeId) {
  if (!routeId || !routeMapEl || !window.L) {
    return;
  }

  const point = getRoutePointsFromSchedule().find((item) => item.id === routeId);
  if (!point) {
    return;
  }

  setActiveRouteFilter("all");
  routeMapEl.scrollIntoView({ behavior: "smooth", block: "center" });

  window.setTimeout(() => {
    const marker = renderRouteMap.markers?.get(routeId);
    if (!marker) {
      return;
    }

    renderRouteMap.map.setView([point.lat, point.lng], 15, { animate: true });
    marker.openPopup();
  }, 260);
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

function renderScheduleItem(item, dayIndex, itemIndex, day) {
  const time = item.time ? `<span class="item-time">${escapeHtml(item.time)}</span>` : "";
  const routeId = `${dayIndex}-${itemIndex}`;
  const mapLink = item.lat && item.lng
    ? `<button class="map-link" type="button" data-route-focus="${escapeHtml(routeId)}">지도</button>`
    : "";
  const restaurantLink = getRestaurantLink({ ...item, date: day?.date });
  const restaurantButton = restaurantLink
    ? `<button class="restaurant-jump-link" type="button" data-restaurant-target="${escapeHtml(restaurantLink.targetId)}">${escapeHtml(restaurantLink.label)}</button>`
    : "";

  return `
    <li class="schedule-item">
      ${time}
      <span class="item-text">${escapeHtml(item.text || "일정 내용 미정")}</span>
      ${mapLink}
      ${restaurantButton}
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
    const typeTag = `<span class="type-tag${cardType ? ` ${cardType}` : ""}">${escapeHtml(getDayTypeLabel(day.type))}</span>`;
    const items = day.items.map((item, itemIndex) => renderScheduleItem(item, index, itemIndex, day)).join("");
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
            ${typeTag}
          </div>
          ${editButton}
        </div>
        <div class="day-card-view">
          <h3>${escapeHtml(day.title)}</h3>
          <ul>${items}</ul>
          ${note}
        </div>
        ${renderInlineEditor(day, index)}
      </article>
    `;
  }).join("");

  renderRouteMap(activeRouteFilter);
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
        <div class="coordinate-input-row">
          <input name="itemLat" type="number" step="any" value="${escapeHtml(normalizedItem.lat)}" placeholder="위도">
          <input name="itemLng" type="number" step="any" value="${escapeHtml(normalizedItem.lng)}" placeholder="경도">
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
  const items = sortItemsByTime(Array.from(form.querySelectorAll("[data-item-row]"))
    .map((row) => {
      const mapUrl = String(row.querySelector('[name="itemMapUrl"]')?.value || "").trim();
      const parsedCoordinates = parseCoordinatesFromText(mapUrl);
      const lat = readCoordinate(row, "itemLat") || parsedCoordinates.lat;
      const lng = readCoordinate(row, "itemLng") || parsedCoordinates.lng;

      return {
        time: readItemTime(row),
        text: String(row.querySelector('[name="itemText"]')?.value || "").trim(),
        mapUrl,
        lat,
        lng
      };
    })
    .filter((item) => item.time || item.text || item.mapUrl || (item.lat && item.lng)));

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

async function saveChecklistItem(id, updates) {
  if (!firestoreApi || !firestoreDocRef) {
    return;
  }

  if (!canEdit()) {
    renderChecklist(currentChecklist.length ? currentChecklist : defaultChecklist);
    setFirestoreUi("체크리스트를 수정하려면 비밀번호를 먼저 입력하세요.", false);
    return;
  }

  const nextChecklist = normalizeChecklist(currentChecklist.length ? currentChecklist : defaultChecklist)
    .map((item) => item.id === id ? { ...item, ...updates } : item);

  currentChecklist = nextChecklist;
  renderChecklist(nextChecklist);
  setFirestoreUi("체크리스트를 저장하는 중입니다...", true);

  try {
    await firestoreApi.setDoc(firestoreDocRef, {
      checklist: nextChecklist,
      updatedAt: firestoreApi.serverTimestamp()
    }, { merge: true });

    setFirestoreUi("체크리스트를 저장했습니다.", true);
  } catch (error) {
    console.warn(error);
    renderChecklist(currentChecklist);
    setFirestoreUi("체크리스트 저장 실패: Firestore Rules 쓰기 권한을 확인하세요.", false);
  }
}

function wireChecklistEditing() {
  if (!bookingChecklistEl) {
    return;
  }

  bookingChecklistEl.addEventListener("change", async (event) => {
    const field = event.target.closest("[data-checklist-id][data-checklist-field]");
    if (!field) {
      return;
    }

    const fieldName = field.dataset.checklistField;
    const value = fieldName === "checked" ? field.checked : String(field.value || "").trim();

    await saveChecklistItem(field.dataset.checklistId, { [fieldName]: value });
  });
}

function wireBookingTabs() {
  if (!bookingTabEls.length || !bookingPanelEls.length) {
    return;
  }

  bookingTabEls.forEach((tab) => {
    tab.addEventListener("click", () => {
      openBookingTab(tab.dataset.bookingTab);
    });
  });
}

function wireTimelineEditing() {
  if (!timelineEl) {
    return;
  }

  timelineEl.addEventListener("click", async (event) => {
    const routeFocusButton = event.target.closest("[data-route-focus]");
    if (routeFocusButton) {
      focusRoutePoint(routeFocusButton.dataset.routeFocus);
      return;
    }

    const restaurantTargetButton = event.target.closest("[data-restaurant-target]");
    if (restaurantTargetButton) {
      focusRestaurantCard(restaurantTargetButton.dataset.restaurantTarget);
      return;
    }

    const editButton = event.target.closest("[data-edit-index]");
    if (editButton) {
      const index = editButton.dataset.editIndex;
      const editor = timelineEl.querySelector(`[data-editor-index="${index}"]`);
      const card = editButton.closest(".day-card");
      if (editor) {
        editor.hidden = !editor.hidden;
        card?.classList.toggle("is-editing", !editor.hidden);
        editButton.textContent = editor.hidden ? "수정" : "보기";
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
      const latInput = row?.querySelector('[name="itemLat"]');
      const lngInput = row?.querySelector('[name="itemLng"]');

      try {
        const clipboardText = await navigator.clipboard.readText();
        if (mapInput && clipboardText.trim()) {
          const value = clipboardText.trim();
          const parsedCoordinates = parseCoordinatesFromText(value);
          mapInput.value = value;
          if (latInput && parsedCoordinates.lat) {
            latInput.value = parsedCoordinates.lat;
          }
          if (lngInput && parsedCoordinates.lng) {
            lngInput.value = parsedCoordinates.lng;
          }
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
      const card = cancelButton.closest(".day-card");
      if (editor) {
        editor.hidden = true;
        card?.classList.remove("is-editing");
        card?.querySelector("[data-edit-index]")?.replaceChildren("수정");
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

  timelineEl.addEventListener("change", (event) => {
    const timeSelect = event.target.closest('[name="itemHour"], [name="itemMinute"]');
    if (!timeSelect) {
      return;
    }

    const itemList = timeSelect.closest("[data-item-list]");
    if (itemList) {
      sortEditorRowsByTime(itemList);
    }
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
    wireChecklistEditing();
    setFirestoreUi(
      canEdit() ? "Firestore 연결 중입니다. 일정은 바로 수정할 수 있습니다." : "Firestore 연결 중입니다. 수정하려면 비밀번호를 입력하세요.",
      true
    );

    firestoreModule.onSnapshot(
      firestoreDocRef,
      (snapshot) => {
        const data = snapshot.exists() ? snapshot.data() : {};
        renderChecklist(normalizeChecklist(data.checklist));

        if (snapshot.exists() && Array.isArray(data.schedule)) {
          const schedule = normalizeSchedule(data.schedule);
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

renderChecklist(defaultChecklist);
wireBookingTabs();
wireRouteMap();
loadSchedule();

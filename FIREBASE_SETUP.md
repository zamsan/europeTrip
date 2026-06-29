# Firebase Firestore 연동 방법

이 사이트는 Firebase 설정을 넣으면 GitHub Pages를 유지한 채 Firestore에서 일정을 실시간으로 읽고, Google 로그인 후 같은 화면에서 수정할 수 있습니다.

## 1. Firebase 프로젝트 만들기

Firebase Console에서 새 프로젝트를 만들고 Web 앱을 추가합니다.

Web 앱을 만들면 아래와 비슷한 `firebaseConfig`가 나옵니다.

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...firebaseapp.com",
  projectId: "...",
  storageBucket: "...firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

## 2. Authentication 켜기

`Authentication > Sign-in method`에서 Google 로그인을 켭니다.

## 3. Firestore 만들기

`Firestore Database`를 만들고 위치를 선택합니다. 테스트 모드가 아니라, 아래 보안 규칙을 직접 넣는 쪽을 권장합니다.

모든 사람이 읽고, 허용된 Google 계정만 수정하게 하려면:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{tripId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email in [
          "your-email@gmail.com"
        ];
    }
  }
}
```

같이 수정할 사람의 Google 이메일을 배열에 추가하면 됩니다.

## 4. config.js 채우기

`config.js`의 `window.TRIP_FIREBASE`를 아래처럼 바꿉니다.

```js
window.TRIP_FIREBASE = {
  enabled: true,
  firebaseConfig: {
    apiKey: "Firebase에서 받은 값",
    authDomain: "Firebase에서 받은 값",
    projectId: "Firebase에서 받은 값",
    storageBucket: "Firebase에서 받은 값",
    messagingSenderId: "Firebase에서 받은 값",
    appId: "Firebase에서 받은 값"
  },
  collectionPath: "trips",
  documentId: "europe-2026",
  updatedLabel: "Firestore 실시간 연동 중"
};
```

`enabled`가 `true`이고 필수 config 값이 있으면 사이트가 Firestore 모드로 전환됩니다.

## 5. 첫 일정 올리기

배포된 사이트에서 Google 로그인 후 `기본 일정 저장`을 누르면 현재 기본 일정이 Firestore 문서에 저장됩니다.

저장 위치:

```text
trips/europe-2026
```

문서 구조:

```js
{
  schedule: [
    {
      date: "2026-08-01",
      dateLabel: "8월 1일 토요일",
      city: "런던",
      title: "한국 출발, 런던 도착",
      items: ["10:55 KE907 탑승"],
      note: "메모",
      type: ""
    }
  ],
  updatedAt: serverTimestamp()
}
```

## 6. 배포

`config.js`를 커밋하고 푸시하면 GitHub Pages에 반영됩니다.

주의: Firebase Web config의 `apiKey`는 브라우저에 공개되는 값입니다. 보안은 API 키를 숨기는 방식이 아니라 Firestore Rules로 제어합니다.

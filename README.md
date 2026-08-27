# London Paris Trip 2026

2026년 8월 런던·파리 여행 일정을 공유하기 위한 정적 웹페이지입니다.

## 구성

- `index.html`: 공유용 일정 웹페이지
- `styles.css`: 모바일/데스크톱 반응형 스타일
- `app.js`: Google Sheets CSV를 읽어 일정 카드를 표시하는 스크립트
- `config.js`: Google Sheets 게시 CSV 주소와 수정 링크 설정
- `FIREBASE_SETUP.md`: Firebase Firestore 실시간 연동 절차
- `sheet-template.csv`: Google Sheets로 가져올 수 있는 일정 샘플
- `sheet-template.html`: 브라우저에서 한글이 깨지지 않는 샘플 표
- `GOOGLE_SHEETS_SETUP.md`: Google Sheets 연동 절차
- `여행_기본정보.md`: 여행 기본 정보 원본
- `전체_일정.md`: 날짜별 전체 일정 원본

## 공유 방식

GitHub Pages를 켜면 링크 하나로 일정을 공유할 수 있습니다.

일정을 같이 수정하려면 Google Sheets를 원본으로 두고 `config.js`에 게시 CSV 주소와 수정 링크를 넣으면 됩니다. 자세한 절차는 `GOOGLE_SHEETS_SETUP.md`에 정리했습니다.

실시간 공동 수정이 필요하면 Firebase Firestore를 사용할 수 있습니다. Firebase 설정값을 `config.js`의 `window.TRIP_FIREBASE`에 넣으면 Google 로그인 후 웹페이지에서 일정을 직접 수정할 수 있습니다. 자세한 절차는 `FIREBASE_SETUP.md`에 정리했습니다.

## 사진 이동 경로 재생

지도 아래의 `사진 선택` 버튼으로 원본 사진을 여러 장 고르면 브라우저가 각 사진의 EXIF 촬영 시각과 GPS 위치를 이 기기 안에서만 읽어 이동 경로를 재생합니다. 사진 파일, 미리보기 이미지, EXIF 값, GPS 좌표는 Firebase Storage나 Firestore에 저장되지 않습니다.

위치 정보가 있는 사진은 촬영 시각순으로 정렬되고, 지도 위 점들은 실제 도로 경로가 아니라 사진 사이를 직선으로 보간해 이어집니다. 촬영 간격이 긴 구간은 재생 중 더 오래 머물도록 반영되며, 너무 긴 간격은 앱의 재생 시간 상한 안에서 제한됩니다. 새로고침하면 선택한 사진과 재생 경로는 모두 사라집니다.

메신저나 소셜 미디어를 거쳐 저장한 사진 사본은 EXIF 촬영 시각이나 GPS 위치가 제거되어 있을 수 있습니다. 경로가 나오지 않으면 휴대폰이나 카메라에서 내려받은 원본 사진을 다시 선택해 주세요.

권장 설정:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/root`

## 현재 상태

Firestore와 Google Sheets 읽기 링크가 비어 있으면 웹페이지는 기본 일정 데이터를 표시합니다.

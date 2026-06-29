# Google Sheets 일정 연동 방법

이 사이트는 DB 없이 Google Sheets를 일정 원본으로 사용할 수 있습니다.

## 1. Google Sheets 만들기

샘플 표를 브라우저에서 확인하려면 `sheet-template.html`을 열면 됩니다.

Google Sheets에는 `sheet-template.csv`를 가져오거나, 아래 열 이름으로 새 시트를 만듭니다.

```text
date,dateLabel,city,title,item1,item2,item3,item4,note,type
```

한국어 열 이름도 사용할 수 있습니다.

```text
날짜,날짜표시,도시,제목,일정1,일정2,일정3,일정4,메모,구분
```

`type` 또는 `구분`에는 비워두거나 `transfer`, `return`을 넣으면 카드 왼쪽 색이 바뀝니다.

## 2. 같이 수정할 사람 초대

Google Sheets의 공유 버튼에서 같이 수정할 사람의 Google 계정만 편집자로 초대합니다.

## 3. 웹페이지에서 읽을 CSV 주소 만들기

Google Sheets에서 `파일 > 공유 > 웹에 게시`를 선택한 뒤 CSV 형식으로 게시합니다.

주의: 게시된 CSV 내용은 링크를 아는 사람이 읽을 수 있습니다. 여권번호, 예약번호, e-ticket 번호, 개인 전화번호 같은 민감정보는 넣지 않습니다.

## 4. config.js에 주소 넣기

`config.js`를 열고 아래 값을 채웁니다.

```js
window.TRIP_SHEET = {
  csvUrl: "게시된 CSV 주소",
  editUrl: "같이 수정할 Google Sheets 주소",
  updatedLabel: "Google Sheets 연동 중"
};
```

`csvUrl`은 페이지가 일정을 읽는 주소이고, `editUrl`은 방문자가 버튼을 눌렀을 때 열리는 수정용 주소입니다.

## 5. GitHub에 올리기

변경한 `config.js`를 커밋하고 푸시하면 GitHub Pages에 반영됩니다.

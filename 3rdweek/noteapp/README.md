# [React Toy Project] Note App 노트앱 만들기 토이 프로젝트

![noteFull](https://user-images.githubusercontent.com/81923229/120352224-86fac400-c33b-11eb-9022-b0289cb6f65c.gif)

# 🙈 intro
Javascript 스터디를 진행하며 리액트로 JS를 연습해보고자 리액트로 노트앱을 만드는 토이프로젝트를 진행하였습니다! 자바스크립트로 구현된 노트앱의 기능들을 참고하여 리액트로 구현하였습니다:D

# 1. NoteApp UX/UI
노트앱의 기본적인 디자인과 기능을 소개합니다~!

![image](https://user-images.githubusercontent.com/81923229/120352638-ee187880-c33b-11eb-8152-b483b59e69ca.png)

노트앱은 Figma를 통해 디자인하였으며, 노트리스트를 보여주는 메인페이지와 노트를 생성/수정/삭제하는 페이지 두 개로 간단하게 구성되어 있습니다.
기능은 크게 노트 생성, 노트 수정, 노트 삭제, 노트 검색 네 가지로 이뤄져 있으며, 로컬 스토리지를 이용해 데이터를 저장하였습니다.
각종 버튼들은 재사용 가능한 버튼 컴포넌트를 만들어 재사용하여 사용하였습니다:D

# 2. Main Feature
노트의 기본 기능들을 소개합니다.
우선 기본적인 폴더의 구조는 아래와 같습니다!
```bash
 📦public
   └──📜index.html
 📦src
  ├──📂components 
  │   ├──📜Button.js
  │   ├──📜NoteList.js
  │   └──📜Title.js
  ├──📂images
  ├──📂Screens
  │   ├──📜CreateNote.js
  │   └──📜DrawMain.js
  ├──📜App.js
  ├──📜index.css
  └──📜index.js

``` 
## 2-1. Create Note 
노트 생성 시 동시에 로컬스토리지에 데이터가 저장됩니다. 로컬 스토리지에 데이터를 저장할 때에는 `JSON.stringfy()`를 통해 JSON 형태로 데이터를 저장하며, 다시 보여줄 때에는 `JSON.parse()`를 통해 파싱하여 보여줍니다. 기본적으로 노트의 제목, 내용, 생성시간, 수정시간, 마지막 업데이트 시간이 함께 저장됩니다. 생성시간을 노트 고유아이디로 이용했으며, `moment.js` 라이브러리를 사용했습니다.

![noteCreate](https://user-images.githubusercontent.com/81923229/120353559-b78f2d80-c33c-11eb-876d-3337e1a101af.gif)

## 2-2. Edit Note / Remove Note
노트를 수정하고 삭제할 때에는 해당 노트의 생성시간을 params.id값으로 받아 해당 페이지로 들어갑니다.
param.Id값이 있으면 수정,삭제 모드로 들어가고 없으면 노트 생성 모드로 들어가 하나의 컴포넌트로 두 가지 기능을 수행하고 있습니다.
노트를 수정하고 삭제하면 실시간으로 로컬스토리지에 수정, 삭제 사항과 마지막 업데이트 시간이 갱신됩니다.
업데이트 시간의 갱신은 `moment(timestamp).fromNow()` 기능을 이용하였습니다.

![noteEdit](https://user-images.githubusercontent.com/81923229/120353674-cb3a9400-c33c-11eb-9c1e-09e71968dcfb.gif)

## 2-3. Search Note
노트를 검색하는 기능입니다. search창에 입력된 input의 event.target.value를 받아 filter을 이용해 로컬스토리지 내부를 순회하면서 같은 값을 찾는 방식으로 서치기능을 구현하였습니다. 

![noteSearch](https://user-images.githubusercontent.com/81923229/120353752-d5f52900-c33c-11eb-95fb-05075f7b4325.gif)

# 🙉 Reference 
https://www.cookieparking.com/share/U2FsdGVkX18SHlReQS3q2p0p-TAN1qmQcFhFiLbGvCBsbMam_rThTqeYX7cFdfLgl34JJC9Zt7bOq3gmt7uSRLPbotIb5sFkrovz9w3FPg0




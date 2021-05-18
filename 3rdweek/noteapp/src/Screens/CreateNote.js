import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import styled from "styled-components";
import Button from "../components/Button";

//로컬스토리지에 입력값 저장하는 곳
//객체에는 1.제목 2.내용 3.마지막 접근 시간을 저장한다
function CreateNote({ history, match }) {
  console.log("난 매치", match.params);
  const moment = require("moment");
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  //로컬스토리지 배열 내부의 객체 하나값
  const [note, setNote] = useState({
    title: "",
    body: "",
    create: timestamp,
    update: "업데이트",
    edit: "",
  });

  //renoteId가 있으면 수정 버전 , 없으면 생성 버전
  const renoteId = match.params && match.params.id;
  //우선 로컬스토리지에서 객체들의 배열을 불러오고, 각 객체를 localNoteObj에 저장
  const localNote = JSON.parse(localStorage.getItem("notes") || "[]");
  const localNoteObj = localNote.filter(
    (element) => element.create === renoteId
  );

  //우선 렌더 한 번 더 될 때 renoteId값이 있으면 localNoteObj에서 그 객체 가저와서 기본 note에 set
  useEffect(() => {
    console.log(localNote, renoteId);
    if (renoteId) {
      setNote(localNoteObj[0]);
    }
  }, []);
  //타이틀 배열변수에 담음
  const titleChangeHandler = (event) => {
    event.preventDefault();
    console.log("title", event.target.value);
    setNote({ ...note, title: event.target.value });
  };

  const saveNotes = (newNote) => {
    setNote(newNote);
    let newNotes;
    //완전 새로운 객체로 저장, 만약 match.params.id가 있으면
    if (renoteId) {
      //로컬스토리지 돌면서 create가 현재의 create와 같으면 현재의 노트 반환(새로운 노트 생성이 아닌, 기존의 값에 덮어 씌우기 위해서)
      newNotes = localNote.map((element) =>
        element.create === note.create ? newNote : element
      );
    } else {
      newNotes = [...localNote, newNote];
    }
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  //내용 배열변수에 담음
  const contentChangeHandler = (event) => {
    event.preventDefault();
    console.log("content", event.target.value);
    setNote({ ...note, body: event.target.value });
  };

  //submit할 때 그 시간 찍어서 update에 저장
  const noteSubmit = () => {
    const updateTimeStamp = moment().format("YYYY- MM-DD HH:mm:ss");
    const diffTime = moment(updateTimeStamp, "YYYY- MM-DD HH:mm:ss").fromNow();
    const newNote = { ...note, update: diffTime, edit: updateTimeStamp };
    console.log(localNote);
    localNote.map(
      (e) => (e.update = moment(e.edit, "YYYY- MM-DD HH:mm:ss").fromNow())
    );
    console.log(updateTimeStamp);
    saveNotes(newNote);
    history.push("/");
  };

  const back = () => {
    history.push("/");
  };

  //1. 해당 노트 객체의 create가 아닌 애들만 새로 저장 2. 그 새로운 배열을 localStorage에 저장
  const noteRemove = (localNote) => {
    const notNowNote = localNote.filter(
      (element) => element.create !== note.create
    );
    localStorage.setItem("notes", JSON.stringify(notNowNote));
    history.push("/");
  };

  return (
    <CreateNoteWrap>
      <div className="container">
        <Title />
        <Button onClick={back} className="btn-back" color="gray" size="small">
          Back
        </Button>
        <div className="title-form">
          <input
            className="title-form--input"
            type="text"
            value={note.title}
            onChange={titleChangeHandler}
            placeholder="Title"
            maxLength="20"
          ></input>
        </div>
        <div className="content-form">
          <textarea
            className="content-form--input"
            type="text"
            value={note.body}
            onChange={contentChangeHandler}
            placeholder="Contents"
          ></textarea>
        </div>
        <div className="btn-bottom">
          <Button
            onClick={() => noteRemove(localNote)}
            className="btn-remove"
            color="pink"
            size="large"
          >
            Remove Note
          </Button>
          <Button
            onClick={noteSubmit}
            className="btn-done"
            color="gray"
            size="small"
          >
            Done
          </Button>
        </div>
      </div>
    </CreateNoteWrap>
  );
}

export default CreateNote;

const CreateNoteWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    margin-top: 104px;
    margin-left: 56px;
  }
  .container {
    width: 710px;
    height: 777px;
    background: #f5f5f5;
    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.15);
    border-radius: 70px;
  }
  .btn-back {
    margin-top: 33px;
    margin-left: 56px;
  }
  .btn-bottom {
    width: 710px;
    display: flex;
    margin-top: 39px;
  }
  .btn-remove {
    margin-left: 56px;
  }
  .btn-done {
    margin-left: 379px;
  }
  .title-form {
    width: 591px;
    height: 51px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 33px;
    margin-left: 56px;
    &--input {
      font-family: Noticia Text;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0.03em;
      padding-left: 15px;
      border: none;
      outline: none;
      width: 591px;
      height: 51px;
      background: #ffffff;
      color: #2d2d2d;
      border-radius: 20px;
    }
  }
  .content-form {
    width: 598px;
    height: 254px;
    background: #ffffff;
    border-radius: 20px;
    margin-top: 15px;
    margin-left: 56px;
    &--input {
      font-family: Noticia Text;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0.03em;
      padding-left: 15px;
      padding-top: 20px;
      border: none;
      outline: none;
      width: 598px;
      height: 254px;
      background: #ffffff;
      color: #2d2d2d;
      border-radius: 20px;
      resize: none;
    }
  }
`;

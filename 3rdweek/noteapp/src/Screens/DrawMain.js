import React, { useState } from "react";
import Title from "../components/Title";
import searchIcon from "../images/searchIcon.svg";
import styled from "styled-components";
import Button from "../components/Button";
import NoteList from "../components/NoteList";

function DrawMain({ history }) {
  //search 인풋 받을 state 변수
  const [searchNote, setSearchNote] = useState();
  //기본적으로 뷰에 보일 note 구성할 state 변수
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );
  //뷰에 보일 note를 구성하기 위해 근본적인 원천이 되어줄 로컬스토리지 값들
  const localNotes = JSON.parse(localStorage.getItem("notes"));

  //search Input태그의 onChange값 제어
  const changeHandler = (event) => {
    setSearchNote(event.target.value); //input값 조정하기 위해서 필요!
    //filter을 통해 로컬스토리지를 돌면서 로컬스토리지배열 객체 내부의 title값에 event.target.value값이 들어가는 경우 그 객체를 저장
    const filterNotes = localNotes.filter((element) =>
      element.title.match(event.target.value)
    );

    //인풋값이 있으면 filterNotes를 보여줌
    if (event.target.value) {
      setNotes(filterNotes);
    } else {
      //인풋값이 없으면 그냥 로컬스토리지 모든 노트객체 다 보여줌
      setNotes(JSON.parse(localStorage.getItem("notes")));
    }
  };
  //Create Note 버튼 클릭하면 createnote 페이지로 이동
  const gotoCreate = () => {
    history.push("/createnote");
  };
  return (
    <DrawMainWrap>
      <div className="container">
        <Title className="title" />
        <form>
          <img src={searchIcon} className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={searchNote}
            onChange={changeHandler}
            placeholder="search"
          ></input>
        </form>
        <NoteListContainer>
          {notes &&
            notes.map((note, index) => <NoteList note={note} key={index} />)}
        </NoteListContainer>
        <Button
          onClick={gotoCreate}
          className="btn-create"
          size="large"
          color="gray"
        >
          Create Note
        </Button>
      </div>
    </DrawMainWrap>
  );
}

export default DrawMain;

const NoteListContainer = styled.div`
  margin-top: 30px;
  margin-left: 56px;
  height: 381px;
  width: 598px;
  overflow-y: scroll;
`;

const DrawMainWrap = styled.div`
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
  form {
    margin-top: 17px;
    margin-left: 56px;
    width: 598px;
    height: 40px;
    background: #e7e7e7;
    border-radius: 10px;
    display: flex;
    img {
      width: 20px;
      height: 20px;
      margin-top: 10px;
      margin-left: 16px;
    }
    input {
      border: none;
      outline: none;
      background: #e7e7e7;
      margin-left: 13px;
      font-family: Noto Sans Tai Viet;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      width: 549px;
      border-radius: 10px;
    }
  }
  .btn-create {
    margin-left: 527px;
    margin-top: 40px;
  }
`;

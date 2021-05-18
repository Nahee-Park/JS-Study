import React, { useState } from "react";
import Title from "../components/Title";
import searchIcon from "../images/searchIcon.svg";
import styled from "styled-components";
import Button from "../components/Button";
import NoteList from "../components/NoteList";

function DrawMain({ history }) {
  //나중에 로컬스토리지 값 중에서 인풋값으로 불러올 값임,
  //이 값은 CreateNote로 보낼 예정
  const [searchNote, setSearchNote] = useState();
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );
  const localNotes = JSON.parse(localStorage.getItem("notes"));

  const changeHandler = (event) => {
    setSearchNote(event.target.value); //input값 조정하기 위해서 필요!
    const filterNotes = localNotes.filter((element) =>
      element.title.match(event.target.value)
    );
    if (event.target.value) {
      setNotes(filterNotes);
    } else {
      //인풋값이 없으면
      setNotes(JSON.parse(localStorage.getItem("notes")));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const gotoCreate = () => {
    history.push("/createnote");
  };
  return (
    <DrawMainWrap>
      <div className="container">
        <Title className="title" />
        <form onSubmit={submitHandler}>
          <img src={searchIcon} className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={searchNote}
            onChange={changeHandler}
            placeholder="search"
          ></input>
        </form>
        {/* height: 381, width:598 안에서 스크롤  */}
        {/* map 돌려서 로컬스토리지 객체 잠시 배열로 바꾼 후 순회해서 그 갯수만큼 Notelist 불러오기 */}
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

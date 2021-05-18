import React, { useState } from "react";
import Title from "../components/Title";
import searchIcon from "../images/searchIcon.svg";
import styled from "styled-components";
import Button from "../components/Button";
import NoteList from "../components/NoteList";

//대략적인 구조가 우선 create 노트에서 로컬스토리지에 내용값+제목값+저장 시간을 저장할 거임
//여가서 받은 인풋값을 로컬스토리지 돎면서 비교해서 같으면 그 노트를 찾는 방식으로
function DrawMain({ history }) {
  //나중에 로컬스토리지 값 중에서 인풋값으로 불러올 값임,
  //이 값은 CreateNote로 보낼 예정
  const [searchNote, setSearchNote] = useState();
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

  const changeHandler = (event) => {
    console.log("인풋아 나와랑", event.target.value);
    //이건 그 서치한 input 내부에 둔 value값이 searchNote이고 그 값을 변경시켜줘! 근데 useState라서 한템포 느리게 반영돼 -> 그래서 결국 searchNote변수를 안쓰고, event.target.value를 직접 가지고 필터링했엉
    setSearchNote(event.target.value); //그냥 혹시 모를 input저장용인데 쓸모없는듯...
    const filterNotes = notes.filter((element) =>
      element.title.match(event.target.value)
    );
    if (event.target.value) {
      setNotes(filterNotes);
    } else {
      //인풋값이 없으면
      setNotes(JSON.parse(localStorage.getItem("notes")));
    }

    console.log(filterNotes);
  };
  //지금 기본적으로 뿌려지는 노트값이 모든 로컬스토리지를 다 돌면서 뿌려지는 것 -> 만약 searchNote에 값이 들어오면 로컬스토리지에 setNotes를

  //enter치는 순간 그 값을 filterNotes값을 뿌리기
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

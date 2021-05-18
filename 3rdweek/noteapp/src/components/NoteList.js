import React, { useState } from "react";
import styled from "styled-components";
import "@fontsource/noticia-text";
//history 사용하기 위해서 import
import { useHistory } from "react-router-dom";

//로컬스토리지에서 값을 받아와서 아이디를 추가한 채로 객체에 넣는다
//그 객채를 잠시 배열로 바꿔 순회하며 , 객체.title만 뽑아낸다

function NoteList({ note }) {
  //hostory 이용
  const history = useHistory();

  //출력은 DrawMain에서 NoteList 순회하먄서 할 것이므로 여기서는 하나하나의 뷰를 잘 짜기
  const gotoPage = () => {
    //note.create의 param값을 아이디로 지정
    history.push(`/createnote/${note.create}`);
  };

  return (
    <NoteListWrap>
      <div onClick={gotoPage} className="list-container">
        <div className="list-title">{note.title}</div>
        <div className="update-time">last edited {note.update}</div>
      </div>
    </NoteListWrap>
  );
}

export default NoteList;

const NoteListWrap = styled.div`
  margin-bottom: 24px;
  .list-container {
    width: 583px;
    height: 111px;
    background: #ffffff;
    border-radius: 20px;
  }
  .list-title {
    padding-top: 21px;
    padding-left: 22px;
    font-family: Noticia Text;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.03em;
    color: #0a0909;
  }
  .update-time {
    padding-top: 17px;
    padding-left: 22px;
    font-family: Noticia Text;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.03em;
    color: rgba(0, 0, 0, 0.48);
  }
`;

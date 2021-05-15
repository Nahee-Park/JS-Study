import React, { useState } from "react";
import styled from "styled-components";
import "@fontsource/noticia-text";

//로컬스토리지에서 값을 받아와서 아이디를 추가한 채로 객체에 넣는다
//그 객채를 잠시 배열로 바꿔 순회하며 , 객체.title만 뽑아낸다

function NoteList({ note }) {
  //우선 로컬스토리지값 다시 풀어서 배열로 저장

  //출력은 notes 배열 순호하먄서 하나하나 근데 여기서 순회 안하고 이따 메인에서 할거니까 여기서는 하나 리스트의 뷰를 잘 짜기
  return (
    <NoteListWrap>
      <div className="list-container">
        <div className="list-title">{note.title}</div>
        <div className="update-time">last edited {note.update}</div>
      </div>
    </NoteListWrap>
  );
}

export default NoteList;

const NoteListWrap = styled.div`
  .list-container {
    width: 598px;
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

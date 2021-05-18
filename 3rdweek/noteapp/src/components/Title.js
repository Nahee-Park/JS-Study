import React from "react";
import styled from "styled-components";

function Title() {
  //폰트 타입 불러오기
  require("typeface-pompiere");
  require("typeface-podkova");
  return (
    <TitleWrap>
      <div className="title">Notes App</div>
      <div className="intro">Take notes and never forget</div>
    </TitleWrap>
  );
}

export default Title;

const TitleWrap = styled.div`
  .title {
    font-family: Pompiere;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    letter-spacing: 0.03em;
    color: #000000;
    margin-bottom: 15px;
  }
  .intro {
    font-family: Podkova;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: #000000;
    margin-left: 56px;
  }
`;

import React from "react";
import styled from 'styled-components';

function Title () {
    //폰트 타입 불러오기
    require('typeface-pompiere')
    require('typeface-podkova')
    return(
    <TitleWrap>
        <div className="title">Notes App</div>
        <div className="intro">Take notes and never forget</div>    
    </TitleWrap>
    ); 
}

export default Title;

const TitleWrap = styled.div`
    .title{
        /* top: 166px; */
        /* position: absolute; */
        font-family: Pompiere;
        font-style: normal;
        font-weight: normal;
        font-size: 48px;
        letter-spacing: 0.03em;
        color: #000000;
        margin-bottom: 15px;
        /* margin-left: 56px;
        margin-top: 104px; */
    }
    .intro{
        /* position: absolute; */
        /* width: 235px;
        height: 20px; */
        font-family: Podkova;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.03em;
        color: #000000; 
        margin-left: 56px;
        /* margin-top: 177px;  */
    }
`;

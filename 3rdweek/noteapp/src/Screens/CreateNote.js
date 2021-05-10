import React from "react";
import Title from '../components/Title';
import styled from 'styled-components';

//로컬스토리지에 입력값 저장하는 곳
//객체에는 1.제목 2.내용 3.마지막 접근 시간을 저장한다
function CreateNote () {
    return(
        <CreateNoteWrap>
            <div className="container">
                <Title/>
                <form className="title-form">
                    <input></input>
                </form>
                <form className="content-form">
                    <input></input>
                </form>
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
.title{
    margin-top: 104px;
    margin-left: 56px;
}
.container{
    width: 710px;
    height: 777px;
    background: #F5F5F5;
    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.15);
    border-radius: 70px;
}
`;
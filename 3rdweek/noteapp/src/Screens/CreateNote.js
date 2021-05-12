import React, {useState} from "react";
import Title from '../components/Title';
import styled from 'styled-components';
import Button from '../components/Button'

//로컬스토리지에 입력값 저장하는 곳
//객체에는 1.제목 2.내용 3.마지막 접근 시간을 저장한다
function CreateNote () {
    const [notes,setNotes] = useState({title:'제목',body:'내용',create:'생성시간',update:'업데이트시간'})

    return(
        <CreateNoteWrap>
            <div className="container">
                <Title/>
                <Button className="btn-back" color="gray" size="small">Back</Button>
                <form className="title-form">
                    <input
                        className="title-form--input"
                        type="text"
                        value={notes.title}
                        placeholder="search"                    
                    ></input>
                </form>
                <form className="content-form">
                    <input
                        className="content-form--input"
                        type="text"
                        value={notes.body}
                        placeholder="search"                     
                    ></input>
                </form>
                <div className="btn-bottom">
                    <Button className="btn-remove" color="pink" size="large">Remove Note</Button>
                    <Button className="btn-done" color="gray" size="small">Done</Button>
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
.btn-back{
    margin-top:33px;
    margin-left:56px;
}
.btn-bottom{
    width: 710px;
    display: flex;
    margin-top: 39px;
}
.btn-remove{
    margin-left: 56px;
}
.btn-done{
    margin-left: 379px;
}
.title-form{
    width: 591px;
    height: 51px;
    background: #FFFFFF;
    border-radius: 20px;
    margin-top: 33px;
    margin-left: 56px;
    &--input{
        font-family: Noticia Text;
        font-style: normal;
        font-weight: normal;
        letter-spacing: 0.03em;
        margin-left: 10px;
        margin-right: 10px;
        border: none;
        outline: none;
        width: 591px;
        height: 51px;
        background: #FFFFFF;
        border-radius: 20px;
    }
}
.content-form{
    width: 598px;
    height: 254px;
    background: #FFFFFF;
    border-radius: 20px;
    margin-top: 15px;
    margin-left: 56px;
    &--input{
        font-family: Noticia Text;
        font-style: normal;
        font-weight: normal;
        letter-spacing: 0.03em;
        margin-left: 10px;
        margin-right: 10px;
        border: none;
        outline: none;
        width: 591px;
        height: 51px;
        background: #FFFFFF;
        border-radius: 20px;
    }
}
`;
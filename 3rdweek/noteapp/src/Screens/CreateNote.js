import React, {useState} from "react";
import Title from '../components/Title';
import styled from 'styled-components';
import Button from '../components/Button';

//로컬스토리지에 입력값 저장하는 곳
//객체에는 1.제목 2.내용 3.마지막 접근 시간을 저장한다
function CreateNote () {
    //로컬스토리지값 가져온 걸로 setNote 할거지만 일단 어떤 요소 들어갈 지 넣어둠 
    const [note,setNote] = useState({title:'',body:'',create:'',update:'업데이트시간'})
    const moment = require('moment');

    //타이틀 배열변수에 담음
    const titleChangeHandler = (event) => {
        event.preventDefault();
        console.log("title",event.target.value);
        setNote({...note,title:event.target.value});
    }

    //내용 배열변수에 담음
    const contentChangeHandler = (event) => {
        event.preventDefault();
        console.log("content",event.target.value);
        setNote({...note,body:event.target.value});
    }

    //submit할 때 그 시간 찍어서 update에 저장, create가 비어있는 경우에만 update로 채우기 
    const noteSubmit = (event) => {
        console.log(note);
        const timestamp = moment().format('YYYY년 MM월DD일 h:m:s');
        setNote({...note,update:timestamp});
        if(note.create===''){
            setNote({...note,create:note.update});
        }
    }



    return(
        <CreateNoteWrap>
            <div className="container">
                <Title/>
                <Button className="btn-back" color="gray" size="small">Back</Button>
                <div className="title-form">
                    <input
                        className="title-form--input"
                        type="text"
                        // value={notes.title}
                        onChange={titleChangeHandler}
                        placeholder="Title"                    
                    ></input>
                </div>
                <div className="content-form">
                    <textarea
                        className="content-form--input"
                        type="text"
                        // value={notes.body}
                        onChange={contentChangeHandler}
                        placeholder="Contents"                   
                    ></textarea>
                </div>
                <div className="btn-bottom">
                    <Button className="btn-remove" color="pink" size="large">Remove Note</Button>
                    <Button onClick={noteSubmit} className="btn-done" color="gray" size="small">Done</Button>
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
        padding-left: 15px;
        border: none;
        outline: none;
        width: 591px;
        height: 51px;
        background: #FFFFFF;
        color: #2d2d2d;
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
        padding-left: 15px;
        padding-top: 20px;
        border: none;
        outline: none;
        width: 598px;
        height: 254px;
        background: #FFFFFF;
        color: #2d2d2d;
        border-radius: 20px;
        resize: none;
    }
}
`;
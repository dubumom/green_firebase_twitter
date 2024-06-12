import React, { useState } from "react";
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Post = ({postObj, isOwener}) => {
  const [edit,setEdit] = useState(false);
  const [newPost, setNewPost] = useState(postObj.content);

  //데이터 삭제
  const deletePost = async ()=>{
    const question = window.confirm('정말 삭제할까요?'); //한번 더 묻는 함수
    if(question){
      await deleteDoc(doc(db, "posts", postObj.id));
    }
  }
  //데이터 수정
  const toggleEditMode = () => setEdit(prev => !prev);
  const onchange = (e) =>{
    const {target:{value}} = e;
    setNewPost(value); // 내용 변경
  }
  const onsubmit = async(e) =>{ // 내용 수정 완료
    e.preventDefault()
    const postRef = doc(db, "posts", postObj.id);
    await updateDoc(postRef, {
      content: newPost
    });
    setEdit(false);
  }
  return(
    <li>
      {
      edit ? (
        <>
        <form onSubmit={onsubmit}>
          <input value={newPost} onChange={onchange}/>
          <button>수정완료</button>
        </form>
        <button onClick={toggleEditMode}>취소</button>
        </>
      ) : (
      <>
        <h4>{postObj.content}</h4>
        {
          postObj.attachmentUrl !== '' && (<img src={postObj.attachmentUrl} alt="" width="200" />)
        }
        {
          isOwener && (
            <>
              <button onClick={toggleEditMode}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </>
          )
        }
      </>
    )}
    </li>
  )
}
export default Post;
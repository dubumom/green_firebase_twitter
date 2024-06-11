import React from "react";
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

const Post = ({postObj, isOwener}) => {
  const deletePost = async ()=>{
    const question = window.confirm('정말 삭제할까요?'); //한번 더 묻는 함수
    if(question){
      await deleteDoc(doc(db, "posts", postObj.id));
    }
  }
  return(
    <li>
      <h4>{postObj.content}</h4>
      {
      isOwener && (
        <>
          <button>수정</button>
          <button onClick={deletePost}>삭제</button>
        </>
      )
      }
    </li>
  )
}
export default Post;
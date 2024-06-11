import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const Home = () => {
    const [post,setPost] = useState('');
    const onchange = (e) =>{
      //let value = e.target.value
      const {target:{value}} = e; //비구조 할당
      setPost(value);
    }

    const onsubmit = async (e) =>{
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, "posts"), { //await는 async가 있어야 작동
          post, //title:post
          date: serverTimestamp() //현재의 년월일시분초
        });
        setPost('');
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    return(
      <div>
        <form action="" onSubmit={onsubmit}>
          <input type="text" name="" value={post} placeholder="내용을 입력하세요" onChange={onchange} />
          <input type="submit" value="Add Post" />
        </form>
      </div>
    )
  }
export default Home;
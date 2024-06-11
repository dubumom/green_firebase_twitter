import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"; 

const Home = () => {
    const [post,setPost] = useState('');
    const [posts,setPosts] = useState([]);
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

    const getPosts = async () =>{
      const querySnapshot = await getDocs(collection(db,"posts"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.data().post);
        const postObj = {
          ...doc.data(),
          id : doc.id
        }
        setPosts(prev => [postObj, ...prev])
      });
    }
    console.log(posts)
    useEffect(()=>{
      getPosts();
    },[]);

    //let list = posts.map(item=><li>{item.post}</li>);

    return(
      <div>
        <form action="" onSubmit={onsubmit}>
          <input type="text" name="" value={post} placeholder="내용을 입력하세요" onChange={onchange} />
          <input type="submit" value="Add Post" />
        </form>
        <ul>
          {
            posts.map(item=><li key={item.id}>{item.post}</li>)
          }
        </ul>
      </div>
    )
  }
export default Home;
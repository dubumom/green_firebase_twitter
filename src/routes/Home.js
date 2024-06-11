import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import Post from "../components/Post";
import { collection, addDoc, serverTimestamp, getDocs, onSnapshot, query, orderBy } from "firebase/firestore"; 

const Home = ({userObj}) => {

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
          content: post, //title:post
          date: serverTimestamp(), //현재의 년월일시분초
          uid:userObj
        });
        setPost('');
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    // 데이터 반영 한번만 실시 되는 함수
    /*
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
    */
    useEffect(()=>{
      const q = query(collection(db, "posts"),orderBy('date','desc')); //date를 기준으로 내림차순 정렬
      onSnapshot(q, (querySnapshot) => {
        console.log(querySnapshot)
        const postArr = querySnapshot.docs.map(doc=>({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postArr)
      });


      //getPosts();
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
            posts.map(list => <Post key={list.id} postObj={list.content}/>)
          }
        </ul>
      </div>
    )
  }
export default Home;
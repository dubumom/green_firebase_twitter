import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { db } from '../firebase';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, onSnapshot, where, query, orderBy } from "firebase/firestore"; 

const Profile = () => {
  const [profileImg, setProfileImg] = useState(`${process.env.PUBLIC_URL}/profile_img.svg`);
  const [posts,setPosts] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  console.log(auth);

  const logout =()=> signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/');
  }).catch((error) => {
    // An error happened.
  });

  const updateLogo = async (e)=>{
    const {target:{files}} = e;
    const file = files[0];
    const storage = getStorage(); //업로드에 필요한 함수
    const profileLogoRef = ref(storage, `profile/${auth.currentUser.uid}`); //파일 참조
    const result = await uploadBytes(profileLogoRef, file);
    console.log(result);
    const profileUrl = await getDownloadURL(result.ref);
    console.log(profileUrl);
    setProfileImg(profileUrl);

    await updateProfile(auth.currentUser, { //이미지 url 변경
      photoURL:profileUrl
    })
  }

  useEffect(()=>{
    auth.currentUser.photoURL.includes('firebase') && setProfileImg(auth.currentUser.photoURL); 
    //includes('') 문자가 있는지 없는지 알려주는 스크립트 함수
  },[]);

  useEffect(()=>{
    const q = query(collection(db, "posts"),where("uid", "==", auth.currentUser.uid),orderBy('date','desc'));
    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot)
      const postArr = querySnapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postArr)
    });
  },[]);
  
  return(
    <>
    <div className="profile">
      <img src={profileImg} alt=""/>
      <input type="file" className="hidden" id="profile" accept="image/*" onChange={updateLogo} />
    </div>
      <h3>{auth.currentUser.displayName}</h3>
      <label htmlFor="profile">프로필 수정</label>
      <button onClick={logout}>Log Out</button>
      <hr/>
      <h4>My post</h4>
      <ul>
        {
          posts.map(list => <Post key={list.id} postObj={list} isOwener={list.uid === auth.currentUser.uid}/>)
        }
      </ul>
    </>
  )
}

export default Profile;
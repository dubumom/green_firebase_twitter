import React, { useState } from "react";
import { authService } from '../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const auth = getAuth();
  

  //input에 값이 바뀔 때 마다 할일
  const onchange = (e) =>{
    /*
    const target = e.target;
    const name = target.name;
    const value = target.value;
    */
    const {target:{name,value}} = e; //구조 분해 할당
    if(name === 'email'){
      setEmail(value);
    } else if(name === 'password'){
      setPassWord(value);
    }
  }
  
  const onsubmit = (e) =>{
    e.preventDefault();
    if(newAccount){
      //회원가입
      createUserWithEmailAndPassword(auth, email, passWord)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage);
          setError(errorMessage);
        });
    } else {
      //로그인
      signInWithEmailAndPassword(auth, email, passWord)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        setError(errorMessage);
      });
    }
  }
  
  console.log(email,passWord);

  const toggleAccount =()=>{
    //setNewAccount(prev=>!prev)
    setNewAccount(!newAccount);
  }

  //구글 로그인
  const gooleSignin =() =>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log(token,user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode,email,credential);
      setError(errorMessage);
    });
  }
  return(
    <>
      <form onSubmit={onsubmit}>
        <input type="email" name="email" placeholder="email" onChange={onchange}/>
        <input type="password" name="password" placeholder="password" onChange={onchange}/>
        <p>
          <button>{newAccount ? '회원가입' : '로그인'}</button>
        </p>
        {error}
      </form>
      <hr/>
      <button type="button" onClick={toggleAccount}>{newAccount ? '로그인 바로가기' : '회원가입 바로가기'}</button>
      <hr/>
      <div>
      <button type="button" name="google" onClick={gooleSignin}>구글로 회원가입</button>
      </div>
    </>

  )
}

export default Auth;
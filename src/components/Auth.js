import React, { useState } from "react";
import { authService } from '../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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
    </>

  )
}

export default Auth;
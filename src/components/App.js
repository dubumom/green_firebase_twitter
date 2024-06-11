import '../App.css';
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        const uid = user.uid;
        setUserObj(uid);
      } else {
        // User is signed out
        setIsLoggedIn(false)
      }
      setInit(true);
    });
  },[])

  return(
    <>
    {init ? 
      <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj}/>
      :"초기화 중..."
    }
    </>
  )
  
}
export default App;


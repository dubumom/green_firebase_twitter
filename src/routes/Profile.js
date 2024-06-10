import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const logout =()=> signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/');
  }).catch((error) => {
    // An error happened.
  });;

  return(
    <>
      <button onClick={logout}>Log Out</button>
    </>
  )
}

export default Profile;
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    <div className="profile">
      <img src={`${process.env.PUBLIC_URL}/profile_img.svg`} alt="" />
      <input type="file" className="hidden" id="profile" accept="image/*" />
      <label for="profile">프로필 수정</label>
    </div>
      <button onClick={logout}>Log Out</button>
    </>
  )
}

export default Profile;
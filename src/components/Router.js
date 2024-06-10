// import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Home from "../routes/Home";
import Nav from "./Nav";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn}) =>{

  return(
    <>
      {isLoggedIn && <Nav/>}
      <Routes>
        {isLoggedIn ?  //주소는 동일하지만 상황에 따라 다르게 보이도록 함
        <>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </>
        : <Route path="/" element={<Auth/>}></Route>
        }
      </Routes>
    </>
  )
} 
export default AppRouter;

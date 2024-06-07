// import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Home from "../routes/Home";

const AppRouter = ({isLoggedIn}) =>{

  return(
     //주소는 동일하지만 상황에 따라 다르게 보이도록 함
    <Routes>
      {isLoggedIn ? 
      <Route path="/" element={<Home/>}></Route>
      : <Route path="/" element={<Auth/>}></Route>
      }
    </Routes>
  )
} 
export default AppRouter;

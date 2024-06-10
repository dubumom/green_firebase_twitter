import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>(
  <nav>
    <ul>
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/Profile">Profile</Link></li>
    </ul>
  </nav>
);
export default Nav;
import React from "react";

const Post = ({postObj}) => 
  <li>
    <h4>{postObj}</h4>
    <button>수정</button>
    <button>삭제</button>
  </li>
export default Post;
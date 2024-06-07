import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // 고유의 정보를 환경 파일로 바꾸어 깃 이그노이어에 추가해서 정보 보안
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const firebase = initializeApp(firebaseConfig);
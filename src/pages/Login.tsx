import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getApp } from "firebase/app";
import * as firebaseui from "firebaseui";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // React Router의 history 객체

  useEffect(() => {
    const auth = getAuth(getApp()); // Firebase 인증 객체 초기화

    // FirebaseUI 초기화
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    // FirebaseUI 설정
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID, // Google 로그인
      ],
      signInFlow: "popup", // 팝업 방식 로그인
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log("User signed in:", authResult.user);
        
          navigate("/"); 

          return false;
        },
      },
    });
  }, [navigate]);

  return <div id="firebaseui-auth-container"></div>;
};

export default Login;

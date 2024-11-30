import React, { useEffect } from "react";
import { getAuth } from "firebase/auth"; 
import { getApp } from "firebase/app";
import * as firebaseui from "firebaseui";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const Login = () => {
  useEffect(() => {
    // Firebase 앱과 인증 객체 초기화
    const app = getApp();
    const auth = getAuth(app);

    // FirebaseUI 초기화
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    // FirebaseUI 설정
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID
      ],
      signInFlow: "popup", // 팝업 방식 로그인
      signInSuccessUrl: "/", // 로그인 성공 후 리디렉션할 URL
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log("User signed in:", authResult.user);
          return false; // 자동 리디렉션 방지
        },
      },
    });

  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default Login;

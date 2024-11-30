import React, { useEffect } from "react";
import firebase from 'firebase/compat/app';
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { auth } from '../api/firebase-config';

const Login = () => {
  useEffect(() => {
    // FirebaseUI 초기화
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: "popup",
      signInSuccessUrl: "/", // 로그인 성공 시 이동할 URL
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log("User signed in:", authResult.user);
          return false; // Prevent automatic redirection.
        },
      },
    });

    // return () => {
    //   ui.delete(); // 컴포넌트 언마운트 시 FirebaseUI 정리
    // };
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default Login;

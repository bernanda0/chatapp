import React from "react";
import { GoogleCircleFilled } from "@ant-design/icons";
import { auth } from "../firebase";
import fb from "firebase/app"

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Hi!</h2>
        <div
          className="login-button google"
          onClick={() => auth.signInWithRedirect(new fb.auth.GoogleAuthProvider())}
        >
          <GoogleCircleFilled /> Continue with Google
        </div>
      </div>
    </div>
  );
};

export default Login;

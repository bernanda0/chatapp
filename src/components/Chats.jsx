import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../context/AuthContext";
import axios from "axios";
require('dotenv').config();

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  let username = null;
  if (user) {
    username = user.displayName.replace(/\s/g, "");
    console.log(username);
  }

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios.get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHATAENGINE_PROJECT_ID,
          "user-name": username,
          "user-secret": user.uid,
        },
    }).then(() => { setLoading(false);
    }).catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", username);
        formdata.append("secret", user.uid);
        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios.post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHATAENGINE_PRIVATE_KEY,
              },
            });
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
      });
  }, [user, history]);

  if (!user || loading) {
    return <div className="loading-container">
        Loading...
    </div>;
  }
  
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">LETS TEXT</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHATAENGINE_PROJECT_ID}
        userName={username}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;

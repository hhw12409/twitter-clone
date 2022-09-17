import React from "react";
import { AuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../fbInstance";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OAuthBtn = () => {
  // OAuth login
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    if (name === "google") {
      const provider: AuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } else if (name === "github") {
      const provider: AuthProvider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    }
  };

  return (
    <>
      <button name="google" onClick={onSocialClick} className="authBtn">
        Continue with Google
        <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button name="github" onClick={onSocialClick} className="authBtn">
        Continue with Github
        <FontAwesomeIcon icon={faGithub} />
      </button>
    </>
  );
};

export default OAuthBtn;

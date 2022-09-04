import React, { useState } from "react";
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../fbInstance";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // email, password login
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // create accout
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        await signInWithEmailAndPassword(auth, email, password);
      }
      //console.log(data);
    } catch (error: any) {
      setError(error.message.replace("Firebase:", ""));
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

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
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;

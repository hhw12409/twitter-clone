import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fbInstance";

const AuthForm = () => {
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
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          className="authInput"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="authInput"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {error && <span className="authError">{error}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;

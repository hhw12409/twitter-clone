import React, { useEffect, useState } from "react";
import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
import { auth } from "./fbInstance";
import { onAuthStateChanged, User } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);

  useEffect(() => {
    // 로그인, 로그아웃 여부 확인
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user as any);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      {init ? <Router isLogin={Boolean(userObj)} userObj={userObj} /> : "Loading..."}
    </>
  );
}

export default App;

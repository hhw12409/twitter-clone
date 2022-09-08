import React, { useEffect, useState } from "react";
import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
import { auth } from "./fbInstance";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { useRecoilState } from "recoil";
import { loginCheck } from "./atoms/loginCheck";

interface IArgs {
  displayName?: string | null;
  photoURL?: string | null;
}
interface IProps {
  updateProfile?: (args: IArgs) => Promise<void>;
}

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<User | IProps | null>();
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);

  useEffect(() => {
    // 로그인, 로그아웃 여부 확인
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
      setIsLogin(true);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    if (user !== null) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => updateProfile(user, args),
      });
    } else {
      setUserObj(null);
    }
  };
  return (
    <>
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GlobalStyle />
        {init ? <Router refreshUser={refreshUser} isLogin={isLogin} userObj={userObj} /> : "Loading..."}
      </div>
    </>
  );
}

export default App;

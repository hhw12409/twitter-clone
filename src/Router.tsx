import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Navigation from "./components/Navigation";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import { User } from "firebase/auth";
import { useRecoilValue } from "recoil";
import { loginCheck } from "./atoms/loginCheck";

interface IProps {
  userObj: User;
  refreshUser: () => void;
}

const Router = ({ userObj, refreshUser }: any) => {
  const isLogin = useRecoilValue(loginCheck);
  return (
    <BrowserRouter>
      {isLogin && <Navigation userObj={userObj} />}
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

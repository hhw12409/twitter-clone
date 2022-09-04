import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Navigation from "./components/Navigation";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import { User } from "firebase/auth";
// import { User } from "firebase/auth";

interface IProps {
  // isLogin: User | null;
  isLogin: boolean;
  userObj: User;
}

const Router = ({ isLogin, userObj }: IProps) => {
  return (
    <BrowserRouter>
      {isLogin && <Navigation />}
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
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

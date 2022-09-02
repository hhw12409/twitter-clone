import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import { User } from "firebase/auth";

interface IProps {
  isLogin: User | null;
}

const Router = ({ isLogin }: IProps) => {
  return (
    <HashRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default Router;

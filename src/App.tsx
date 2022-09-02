import React, { useState } from "react";
import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
import fbInstance, { auth } from "./fbInstance";

function App() {
  const [isLogin, setIsLogin] = useState(auth.currentUser);
  return (
    <>
      <GlobalStyle />
      <Router isLogin={isLogin} />
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;

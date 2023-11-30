import React, { useContext, useEffect } from "react";
// import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import Welcome from "./authentication/Welcome";
import UserContext from "./store/user-context";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

function App() {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) userCtx.setToken(storedToken);
  }, []);

  return (
    <div>
      {/* {userCtx.token ? <Home onLogout={userCtx.onLogout} /> : <Welcome />} */}
      <Outlet />
    </div>
  );
}

export default App;

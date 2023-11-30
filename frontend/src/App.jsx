import React, { useContext, useEffect } from "react";
// import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import Welcome from "./pages/authentication/Welcome";
import UserContext from "./store/user-context";
import Home from "./pages/Home";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken){
      userCtx.setToken(storedToken);
      navigate('/home')
    }else{
      navigate('/welcome')
    }
  }, []);

  return (
    <div>
      {/* {userCtx.token ? <Home onLogout={userCtx.onLogout} /> : <Welcome />} */}
      <Outlet />
    </div>
  );
}

export default App;

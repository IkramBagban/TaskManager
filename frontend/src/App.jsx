import React, { useContext, useEffect, useState } from "react";
import Welcome from "./authentication/Welcome";
import UserContext from "./store/user-context";
import Home from "./Home";

function App() {
  // const [token , setToken] = useState("")
  const userCtx = useContext(UserContext);
  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    // console.log("t", t)
    // setToken(t)
    console.log("USERS",userCtx.users);
    // console.log("token", token)

    if(storedToken){
      userCtx.setToken(storedToken)
    }
  },[userCtx.token, userCtx.setToken])

  return <div>{userCtx.token ? <Home onLogout={userCtx.onLogout} /> : <Welcome />}</div>;
}

export default App;

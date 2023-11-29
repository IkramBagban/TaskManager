import React, { useContext, useEffect, useState } from "react";
import Welcome from "./authentication/Welcome";
import UserContext from "./store/user-context";
import Home from "./Home";
import useFetchData from "./customHooks/useFetchData";

function App() {
  const userCtx = useContext(UserContext);
  const { users, isError, isLoading } = useFetchData(
    "http://localhost:3000/users"
  );
  
  useEffect(()=>{
    if(isError){
      console.log("Got some error while fetching the data", isError);
      return;
    }

    userCtx.onSeveUsers(users)
  },[users, isError])

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) userCtx.setToken(storedToken);
  }, []);
  console.log(userCtx.token);

  return (
    <div>
      {userCtx.token ? <Home onLogout={userCtx.onLogout} /> : <Welcome />}
    </div>
  );
}

export default App;

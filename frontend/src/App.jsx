import React, { useContext, useEffect, useState } from "react";
import Welcome from "./authentication/Welcome";
import UserContext from "./store/user-context";
import Home from "./Home";

function App() {
  const userCtx = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }).catch(err=>console.log(err));
  }, []);

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

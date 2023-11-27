import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Welcome() {
    const [showLogin, setShowLogin] = useState(false)
    const [showSingup, setShowSingup] = useState(false)
  const LoginHandler = () => {
    setShowLogin(true);
    setShowSingup(false)
  };
  const SingupHandler = () => {
    setShowLogin(false);
    setShowSingup(true)
  };
  return (
    <div>
      <h1>Welcome To Task Manager App </h1>
      <div>
        <button onClick={LoginHandler}>Login</button>
        <button onClick={SingupHandler}>Singup</button>
      </div>

      <dir>
        {showLogin && <Login />}
        {showSingup && <Signup />}
      </dir>
    </div>
  );
}

export default Welcome;

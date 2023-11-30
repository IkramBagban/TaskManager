import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";

function Welcome() {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };
  const signHandler = () => {
    navigate("/signup");
  };

  console.log("welcome page");
  return (
    <div>
      <h1>Welcome To Task Manager App </h1>
      <div>
        <button onClick={loginHandler}>Login</button>
        <button onClick={signHandler}>Singup</button>
        {/* <Link
          to="/login"
          style={{ color: "blue", textDecoration: "none" }}
        >
          Login
        </Link>{" "}   */}
      </div>

      {/* <dir>
        {activeComponent === "login" && <Login />}
        {activeComponent === "signup" && <Signup />}
      </dir> */}
    </div>
  );
}

export default Welcome;

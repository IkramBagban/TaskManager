import React from "react";
import {  useNavigate } from "react-router-dom";

function Welcome() {
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
           <h1>Welcome Page</h1>

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
    </div>
  );
}

export default Welcome;

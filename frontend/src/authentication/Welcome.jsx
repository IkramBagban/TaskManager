import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Welcome() {
  const [activeComponent,setActiveComponent] = useState(null);
  
  const toggleComponent = (component) =>{
    setActiveComponent(component)
  }
  return (
    <div>
      <h1>Welcome To Task Manager App </h1>
      <div>
        <button onClick={()=> toggleComponent("login")}>Login</button>
        <button onClick={()=> toggleComponent("signup")}>Singup</button>
      </div>

      <dir>
        {activeComponent === "login" && <Login />}
        {activeComponent === "signup" && <Signup />}
      </dir>
    </div>
  );
}

export default Welcome;

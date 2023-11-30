import React, { useContext } from "react";
import UserContext from "../store/user-context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userCtx = useContext(UserContext)
  const navigate = useNavigate()

  const logoutHandler =()=>{
    userCtx.onLogout();
    navigate('/welcome')

  }
  return (
    <div>
      <div>
        <h1>Home </h1>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Home;

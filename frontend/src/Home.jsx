import React, { useContext } from "react";
import UserContext from "./store/user-context";

const Home = ({onLogout}) => {
    const userCtx = useContext(UserContext)
  return (
    <div>
      <div>
        <h1>Home </h1>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;

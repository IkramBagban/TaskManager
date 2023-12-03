import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul style={{ display: "flex", padding: 10 }}>
        <li style={{ margin: "0 30px" }}>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li style={{ margin: "0 30px" }}>
          <NavLink to="/Tasks">Tasks</NavLink>
        </li>
        <li style={{ margin: "0 30px" }}>
          <NavLink to="/profile">profile</NavLink>
        </li>
        {/* <li>
        <NavLink to="/logout">Logout</NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default Header;

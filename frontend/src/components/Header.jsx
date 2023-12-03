import React from "react";
import { NavLink } from "react-router-dom";
import TaskForm from "../pages/taskPages/TaskForm";

const Header = () => {
  return (
    <div>
      <ul style={{ display: "flex", padding: 10 }}>
        <li style={{ margin: "0 30px" }}>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li style={{ margin: "0 30px" }}>
          <NavLink to="/tasks">Tasks</NavLink>
        </li>
        <li style={{ margin: "0 30px" }}>
          <NavLink to="/profile">profile</NavLink>
        </li>
        {/* <li>
        <NavLink to="/logout">Logout</NavLink>
        </li> */}
      </ul>

      {/* <TaskForm /> */}
    </div>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import UserContext from "../store/user-context";
import { getUsers } from "../utils/api";
import { Link } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const userCtx = useContext(UserContext);

  const loginHandler = async () => {
    let users = await getUsers();
    const existing = users?.find((user) => user.email === input.email);

    if (!existing) {
      console.log("User Not Exist");
      return;
    }
    localStorage.setItem("token", existing.id);
    userCtx.setToken(existing.id);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <div>
        <label htmlFor="email">email : </label>
        <input
          type="text"
          name="email"
          id="email"
          value={input.email}
          onChange={inputChangeHandler}
        />
      </div>

      <div>
        <label htmlFor="password">password : </label>
        <input
          type="text"
          name="password"
          id="password"
          value={input.password}
          onChange={inputChangeHandler}
        />
      </div>

      <button onClick={loginHandler}>Login</button>
      <Link to="/signup" >Signup</Link>
    </div>
  );
}

export default Login;

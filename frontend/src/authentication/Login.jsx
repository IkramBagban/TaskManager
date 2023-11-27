import React, { useContext, useState } from "react";
import UserContext from "../store/user-context";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const userCtx = useContext(UserContext);

  const loginHandler = () => userCtx.onLogin(input);

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
    </div>
  );
}

export default Login;

import React, { useContext, useState } from "react";
import UserContext from "../../store/user-context";
import { getUsers } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const userCtx = useContext(UserContext);

  const loginHandler = async () => {
    let users = await getUsers();
    const existingUser = users?.find((user) => user.email === input.email);

    if (!existingUser) {
      console.log("User Not Exist");
      return;
    }

    if(existingUser.password !== input.password){
      const error = new Error("Wrong Password!")
      console.error(error)
      return;
    }
    localStorage.setItem("token", existingUser.id);
    userCtx.setToken(existingUser.id);
    navigate('/home')
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1>Login Page</h1>
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
      <br />
      
      
      <Link to="/signup" style={{textDecoration:"none"}} >Signup</Link>
    </div>
  );
}

export default Login;

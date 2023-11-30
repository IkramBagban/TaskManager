import React, { useState } from "react";
import { getUsers, postData } from "../utils/api";
import { Link } from "react-router-dom";

function Signup() {
  const [input, setInput] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const singupHandler = async () => {
    const users = await getUsers();
    const existing = users?.find((user) => user.email === input.email);

    // if (!input.email || !input.password) {
    if (Object.values(input).some((val) => val.trim() === "")) {
      console.log("Please Provide Valid Email and password");
      return;
    }

    if (existing) {
      console.log("User Already Exists");
      return;
    }

    postData("/users/create", input).then((result) => {
      if (!result) {
        console.log("got error while creating user", result);
        return;
      }
      // userCtx.setToken("1");
      console.log(
        "User created succefully, go on login page and login  ",
        result
      );
    });

    console.log("POST DATA", input);
  };

  // best practice i found
  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    setInput((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username : </label>
        <input type="text" id="username" onChange={inputChangeHandler} />
      </div>

      <div>
        <label htmlFor="phoneNumber">Phone Number : </label>
        <input type="text" id="phoneNumber" onChange={inputChangeHandler} />
      </div>

      <div>
        <label htmlFor="email">Email : </label>
        <input type="text" id="email" onChange={inputChangeHandler} />
      </div>

      <div>
        <label htmlFor="password">Password : </label>
        <input type="text" id="password" onChange={inputChangeHandler} />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password : </label>
        <input type="text" id="confirmPassword" onChange={inputChangeHandler} />
      </div>
      <button onClick={singupHandler}>Singup</button>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { getUsers, postData } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [input, setInput] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const singupHandler = async () => {
    const users = await getUsers();
    const existing = users?.find((user) => user.email === input.email);

    if (Object.values(input).some((val) => val.trim() === "")) {
      console.log("Please Provide Valid Email and password");
      alert('Please Provide Valid Email and password')
      return;
    }

    if (existing) {
      console.log("User Already Exists");
      alert('User Already Exists')
      return;
    }

    if (input.password !== input.confirmPassword){
      console.log("Passwords do not match.");
      alert('Passwords do not match.')
      return;
    }

    postData("/users/create", input).then((result) => {
      if (!result) {
        console.log("got error while creating user", result);
        alert('got error while creating user')
        return;
      }
      console.log(
        "User created succefully, go on login page and login  ",
        result
      );
      navigate("/login");
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
      <h1>Signup Page</h1>

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
      <br />
      <Link style={{ textDecoration: "none" }} to="/login">
        Login
      </Link>
    </div>
  );
}

export default Signup;

import React, { useContext, useState } from "react";
import UserContext from "../store/user-context";

function Signup() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const userCtx = useContext(UserContext);

  const singupHandler = () => userCtx.onSignup(input);

  // best practice i found
  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    setInput((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div>
      <div>
        <label htmlFor="email">email : </label>
        <input type="text" id="email" onChange={inputChangeHandler} />
      </div>

      <div>
        <label htmlFor="password">password : </label>
        <input type="text" id="password" onChange={inputChangeHandler} />
      </div>
      <button onClick={singupHandler}>Singup</button>
    </div>
  );
}

export default Signup;

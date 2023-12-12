import React, { useState } from "react";
import Input from "../Input";

const ResetPassword = ({ onSubmit }) => {
  const [passwordState, setPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPasswordState((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {

    if (!passwordState.password || !passwordState.confirmPassword) {
        alert("Both Feilds are mandatory.");
        return;
    }

    if (passwordState.password !== passwordState.confirmPassword) {
      alert("Password do not match.");
      return;
    }

    onSubmit();
  };

  return (
    <div>
      <div>
        <h1>Reset Password</h1>
      </div>
      <div>
        <Input
          label="Password"
          name="password"
          placeHolder="Enter Your Password"
          value={passwordState.password}
          onInputChange={inputChangeHandler}
        />
        <Input
          label="Confirm Password"
          name="confirm"
          placeHolder="Confirm password"
          value={passwordState.confirmPassword}
          onInputChange={inputChangeHandler}
        />
      </div>
      <button style={{ display: "inline-block" }} onClick={submitHandler}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;

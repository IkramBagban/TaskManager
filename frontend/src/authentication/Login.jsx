import React,{useContext, useState} from "react";
import UserContext from "../store/user-context";

function Login() {
  const [input, setInput]=useState({
    email : '',
    password : '',
  })

  const userCtx = useContext(UserContext)
  const loginHandler =()=>{
    console.log(input)
    userCtx.onLogin(input)
  }

  const emailChangeHandler = (e)=>{
    setInput({
      email: e.target.value,
      password:input.password
    })
  }
  const passwordChangeHandler = (e)=>{
    setInput({
      email:input.email,
      password: e.target.value,
    })
  }

  // const onChangeHandler = (e,mode)=>{
  //   console.log("on change")
  //   if(mode === 'email'){
  //     setInput({
  //       email:input.email,
  //       password: e.target.value,
  //     })
  //   }else{
  //     setInput({
  //       email:input.email,
  //       password: e.target.value,
  //     })
  //   }
  // }

  
  return (
    <div>
      <div>
        <label htmlFor="email" >email : </label>
        <input type="text"  onChange={emailChangeHandler} id="email"/>
      </div>
      <div>
        <label htmlFor="password">password : </label>
        <input type="text" id="password" onChange={passwordChangeHandler} />
      </div>

      <button onClick={loginHandler}>Login</button>
    </div>
  );
}

export default Login;

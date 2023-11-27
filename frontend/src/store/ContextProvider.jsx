import UserContext from "./user-context";
import React, { useEffect, useState } from "react";

const ContextProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || '');

  useEffect (() => {
    localStorage.setItem("token", token);
  }, [token]);

//   const setToken = newToken =>{
    const setTokenState = newToken => {
        setToken(newToken);
      };

  const login = ({email, password}) => {
    const existingUser = users.find(
      (user) => user.email === email && password === user.password
    );
    if (existingUser) {
      localStorage.setItem("token", existingUser.token);
      setToken(existingUser.token)
    } else {
      alert("Please Enter Valid Detail");
    }
  };

  const signup = ({email, password}) => {
    const existingUser = users?.find((user) => user.email === email);
    if (existingUser) {
      alert("This Is An Existing Email.");
      return;
    }
    if (!email || !password) {
      alert("Both The Field Are Mandatory!");
      return;
    }

    const id = users.length < 1 ? 1 : users[users.length-1]?.id + 1;
    const newUser = { email, password, id};
    console.log("new user", newUser)
    setUsers((prevUsers) => [...prevUsers, newUser]);
    localStorage.setItem("token", id?.toString() );
    setToken(id)
    console.log("New User Created",id.toString() );
  };

  const logout= ()=>{
    localStorage.removeItem("token");
    setToken("")
  }
  const value = {
    users: users,
    onLogin: login,
    onSignup: signup,
    onLogout: logout,
    isAuthenticated: !!token,
    token : token,
    setToken:setTokenState
  };
  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};

export default ContextProvider;

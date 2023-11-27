import UserContext from "./user-context";
import React, { useEffect, useState } from "react";

const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
    console.log("users", users);
    console.log("token of new id", token)
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const login = ({ email, password }) => {
    const existingUser = users.find(
      (user) => user.email === email && password === user.password
    );
    console.log('existingUser',existingUser)
    if (existingUser) {
      updateToken(existingUser.id);
      return;
    }

    alert("Please Enter Valid Detail");
  };

  const signup = ({ email, password }) => {
    const existingUser = users?.find((user) => user.email === email);
    if (existingUser) {
      alert("This Is An Existing Email.");
      return;
    }
    if (!email || !password) {
      alert("Both The Field Are Mandatory!");
      return;
    }

    const newUser = { email, password, id: users.length + 1 };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setToken(newUser?.id);
  };

  const logout = () => setToken("");

  const value = {
    users: users,
    onLogin: login,
    onSignup: signup,
    onLogout: logout,
    isAuthenticated: !!token,
    token: token,
    setToken: updateToken,
  };
  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};

export default ContextProvider;

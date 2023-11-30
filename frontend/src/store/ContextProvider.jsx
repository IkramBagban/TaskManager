import UserContext from "./user-context";
import React, { useEffect, useState } from "react";

const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {

    
    console.log("users", users);
    console.log("token of new id", token);
  }, [token]);

  const updateToken = (newToken) => {
    console.log("TOKEN SET ", token)
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = {
    users: users,
    token: token,
    onLogout: logout,
    setToken: updateToken,
  };
  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};

export default ContextProvider;

import React, { useContext, useEffect } from "react";
import UserContext from "./store/user-context";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
// import { useDispatch } from "react-redux";

function App() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  // const dispatch = useDispatch()

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate("/welcome");
      userCtx.setToken(null);
      return;
    }

    userCtx.setToken(storedToken);
    navigate("/home");
    
  }, [userCtx.token]);

  return (
    
    <div>
      {userCtx.token && <Header />}
      <Outlet />
    </div>
  );
}

export default App;

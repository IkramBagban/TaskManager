import React, { useContext, useEffect } from "react";
import UserContext from "./store/user-context";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./pages/taskPages/Tasks";
import TaskForm from "./pages/taskPages/TaskForm";

function App() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      userCtx.setToken(storedToken);
      navigate("/home");
    } else navigate("/welcome");
  }, [userCtx.token]);

  return (
    <div>
      {userCtx.token && <Header />}
      
      <Outlet />
    </div>
  );
}

export default App;

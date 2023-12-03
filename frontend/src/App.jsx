import React, { useContext, useEffect } from "react";
import UserContext from "./store/user-context";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      userCtx.setToken(storedToken);
      navigate("/home");
    } else navigate("/welcome");
  }, []);

  return (
    <div>
      {/* {userCtx.token ? <Home onLogout={userCtx.onLogout} /> : <Welcome />} */}
      {userCtx.token && <Header />}
      <Outlet />
    </div>
  );
}

export default App;

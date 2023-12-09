import React, { useContext, useEffect } from "react";
import UserContext from "./store/user-context";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import useFetch from "./customHooks/useFetch";
import { useDispatch } from "react-redux";
import { addTasksToStore } from "./store/reduxtookit/taskSlice";

function App() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [taskData, isLoading, isError] = useFetch("tasks");

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

  useEffect(() => {
    if (!isError && userCtx.token) {
      dispatch(addTasksToStore(taskData));
    }
  }, [taskData, isError, isLoading, userCtx.token]);
  console.log("taskData", taskData);

  return (
    <div>
      {userCtx.token && <Header />}
      <Outlet />
    </div>
  );
}

export default App;

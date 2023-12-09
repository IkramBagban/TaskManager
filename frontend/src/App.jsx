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
    console.log('token',userCtx.token)
    if (taskData && userCtx.token ) {
      const userTasks = taskData.filter(task => task.userId === userCtx.token)
      console.log("userTasks", userTasks);
      dispatch(addTasksToStore(userTasks));
    }
  }, [taskData, isError, isLoading, userCtx.token]);

  return (
    <div>
      {userCtx.token && <Header />}
      <Outlet />
    </div>
  );
}

export default App;

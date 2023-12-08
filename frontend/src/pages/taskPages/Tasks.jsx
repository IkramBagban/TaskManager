import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Task from "../../components/Task";
import useFetch from "../../customHooks/useFetch";
import { TaskContext } from "../../store/TaskContext";
// import { useDispatch, useSelector } from "react-redux";
// import { addTasksToStore } from "../../store/reduxtookit/taskSlice";

const Tasks = () => {
  const navigate = useNavigate();
  const [taskData, isLoading, isError] = useFetch("tasks");
  const taskCtx = useContext(TaskContext);

  useEffect(() => {
    if (!isError) taskCtx.setTasksToStore(taskData);
  }, [taskData, isError, isLoading,taskCtx]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/tasks/taskform");
        }}
      >
        Add Task
      </button>
      <Outlet />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {taskCtx.tasks?.map((task) => {
          return (
            <Link
              style={{ width: "100%" }}
              to={`tasks/${task._id}`}
              state={task}
              key={task._id + Math.random()}
            >
              <Task task={task} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;

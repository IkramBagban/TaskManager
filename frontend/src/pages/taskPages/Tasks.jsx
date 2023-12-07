import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Task from "../../components/Task";
import useFetch from "../../customHooks/useFetch";

const Tasks = () => {
  const navigate = useNavigate();
  const [taskData, isLoading, isError] = useFetch("tasks");
  const [tasks, setTasks] = useState(null);
  
  const { state } = useLocation();


  useEffect(() => {
    if (!isError) setTasks(taskData);
  }, [taskData, isError, isLoading]);

  useEffect(() => {
    const isExsting = tasks?.some((t) => t?._id === state?.newTask?._id);
    if (isExsting) return; // prevent doubling items.
    if (state?.newTask) setTasks((prev) => [...prev, state?.newTask]);
  }, [state?.newTask]);
  

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
        {tasks?.map((task) => {
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

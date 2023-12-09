import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Task from "../../components/Task";
import { useSelector } from "react-redux";

const Tasks = () => {
  const navigate = useNavigate();
  const tasks = useSelector(state => state.task.tasks)

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
              to={`tasks/${task?._id}`}
              state={task}
              key={task?._id + Math.random()}
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

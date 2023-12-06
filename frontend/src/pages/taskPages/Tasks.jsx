import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Task from "../../components/Task";
import { getTasks } from "../../utils/api";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(null);

  const { state } = useLocation();

  useEffect(() => {
    (async function () {
      const tasksData = await getTasks();
      setTasks(tasksData);
    })();
  }, []);

  useEffect(() => {
    if (!state) return;
    setTasks((prev) => [...prev, state]);
  }, [state]);

  return (
    <div>
      <button
        onClick={() => {
          console.log("add task");
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
              state = { task }
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

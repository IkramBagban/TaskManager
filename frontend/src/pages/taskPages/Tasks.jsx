import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Task from "../../components/Task";

const tasks = [
  {
    _id: 1,
    title: "TITLE 1",
    description: " description 1",
    dueDate: "04/12/2023",
    priority: "low",
    status: "To-Do",
  },
  {
    _id: 2,
    title: "TITLE 2",
    description: " description 2",
    dueDate: "24/12/2023",
    priority: "High",
    status: "In Progress",
  },
  {
    _id: 3,
    title: "TITLE 3",
    description: " description 3",
    dueDate: "01/12/2023",
    priority: "high",
    status: "Completed",
  },
];

const Tasks = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          console.log("add task");
          navigate("/taskform");
        }}
      >
        Add Task
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tasks.map((task) => {
          return (
            <Link style={{ width: "100%" }} to={`${task._id}`} key={task.id}>
              <Task task={task} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;

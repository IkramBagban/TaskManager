import React from "react";
import { useNavigate } from "react-router-dom";

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
      {/* <Tasks /> */}
      <h1>Tasks</h1>
    </div>
  );
};

export default Tasks;

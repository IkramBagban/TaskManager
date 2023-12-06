import React from "react";
import { useLocation } from "react-router-dom";

const TaskDetail = () => {
  const { state: task } = useLocation();
  return (
    <div style={{border:'1px solid black', width: '40%'}}>
      <div>
        <div>
          <h1>{task?.title}</h1>
        </div>

        <div>
          <span style={{padding: '0px 5px', border:'1px solid black', margin: '0 3px'}}>{task?.status}</span>
          <span style={{padding: '0px 5px', border:'1px solid black', margin: '0 3px'}}>{task?.priority}</span>
          <span style={{padding: '0px 5px', border:'1px solid black', margin: '0 3px'}}>{task?.dueDate}</span>
        </div>
      </div>

      <div>
        <p>{task?.description}</p>
      </div>
    </div>
  );
};

export default TaskDetail;

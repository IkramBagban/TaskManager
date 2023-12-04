import React from "react";

const Task = ({ task }) => {
  const { title, description, dueDate, priority, status } = task;

  return (
    <div style={{border: '2px solid black', padding: '20px', width: '50%'}}>
      <h1>{title} </h1>
      {/* <p>{description}</p> */}
      {/* <p>{dueDate}</p> */}
      <div style={{display:'flex'}}>

      <p style={{border: '2px solid black', margin:'0px 10px',  padding:'5px'}}>{priority}</p>
      <p style={{border: '2px solid black', margin:'0px 10px',  padding:'5px'}}>{status}</p>
      </div>
    </div>
  );
};

export default Task;

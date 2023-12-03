import React, { useState } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";

const priorityOptions = [
  { value: "Low" },
  { value: "Medium" },
  { value: "High" },
];

const statusOptions = [
  { value: "To-Do" },
  { value: "In Progress" },
  { value: "Completed" },
];

const TaskForm = () => {
  // console.log("TAKSFOMRS")
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "To-Do",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    console.log(`${name} => ${value}`);
  };

  const addTaskHandler = () => {
    navigate('/tasks')
    setInputValues({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "To-Do",
    });

  };
  
  return (
    <div style={{display: "flex", justifyContent:'center' , alignItems:'center', flexDirection:'column'}}>
      <div>
      <Input
        label="Title"
        type="text"
        name="title"
        placeHolder="Write Title"
        onInputChange={inputChangeHandler}
        value={inputValues.title}
      />
      <div>
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          onChange={inputChangeHandler}
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={inputValues.description}
        ></textarea>
      </div>
      <Input
        label="Due Date"
        type="Date"
        name="dueDate"
        onInputChange={inputChangeHandler}
        value={inputValues.dueDate}
      />

      <Dropdown
        onInputChange={inputChangeHandler}
        label="Priority"
        name="priority"
        options={priorityOptions}
        selectedValue={inputValues.priority}
      />

      <Dropdown
        onInputChange={inputChangeHandler}
        label="Status"
        name="status"
        options={statusOptions}
        selectedValue={inputValues.status}
      />

      <button onClick={addTaskHandler}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskForm;

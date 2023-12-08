import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { postData, updateData } from "../../utils/api";
import { TaskContext } from "../../store/TaskContext";

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
  // const isEdit = true;
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "To-Do",
  });

  const taskCtx = useContext(TaskContext)
  const navigate = useNavigate();
  const { state } = useLocation();
  // const {isEditing, task} = state;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    console.log(`${name} => ${value}`);
  };

  const addTaskHandler = async () => {
    if (Object.values(inputValues).some((val) => val.trim() === "")) {
      console.error("All the fields are mandatory.");
      alert("All the fields are mandatory.");
      return;
    }

    const {data :newTask} = await postData("/tasks/addTask", inputValues);
    // const newTask = res?.data;
    taskCtx.addTask(newTask)
    navigate("/tasks");


    setInputValues({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "To-Do",
    });
  };

  useEffect(() => {
    if (!state?.isEditing) return;
    const { title, description, dueDate, priority, status } = state?.task;
    setInputValues({
      title,
      description,
      dueDate,
      priority,
      status,
    });
  }, []);

  const updateTaskHandler = async () => {
    const response = await updateData(
      `tasks/edit/${state?.task?._id}`,
      inputValues
    );
    console.log("res", response);
    if(response){
      navigate('/tasks', {state: {updatedTask : inputValues}})
    }
  };

  const taskButtonHandler = () => {
    if (state?.isEditing) {
      updateTaskHandler(); // editing existing task
      return;
    }

    addTaskHandler(); // create new task
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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

        <button onClick={taskButtonHandler}>
          {!!state?.isEditing ? "Update task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;

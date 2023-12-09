import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { postData, updateData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../store/reduxtookit/taskSlice";
import UserContext from "../../store/user-context";

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
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "To-Do",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state } = useLocation();

  const userCtx = useContext(UserContext)

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const addTaskHandler = async () => {
    if (Object.values(inputValues).some((val) => val.trim() === "")) {
      console.error("All the fields are mandatory.");
      alert("All the fields are mandatory.");
      return;
    }


    const data = {
      ...inputValues,
      userId : userCtx.token
    }

    const { data: newTask } = await postData("/tasks/addTask", data);
    
    if (newTask) {
      console.log(newTask)
      dispatch(addTask(newTask));
      navigate("/tasks");
    }

    setInputValues({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "To-Do",
    });
  };

  // useEffect to fill existing task detail if editing.
  useEffect(() => {
    if (!state?.isEditing) return; // if edit ni kar rahe to ye useEffect yahi per terminate hojayenga.
    const { title, description, dueDate, priority, status } = state?.task;
    // if we click edit task. then the fields will fill with the existing task detail
    setInputValues({ title, description, dueDate, priority, status });
  }, []);

  const updateTaskHandler = async () => {
    const data = {
      ...inputValues,
      userId :userCtx.token
    }
    const response = await updateData(
      `tasks/edit/${state?.task?._id}`,
      data
    );

    if (response) {
      navigate("/tasks");
      dispatch(updateTask(response?.data));
    }
  };

  const taskButtonHandler = () => {
    state?.isEditing ? updateTaskHandler() : addTaskHandler();
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

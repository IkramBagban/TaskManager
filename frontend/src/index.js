import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./store/ContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Welcome from "./pages/authentication/Welcome";
import Home from "./pages/homePages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/profilePages/Profile";
import EditProfile from "./pages/profilePages/EditProfile";
import Tasks from "./pages/taskPages/Tasks";
import TaskDetail from "./pages/taskPages/TaskDetail";
import TaskForm from "./pages/taskPages/TaskForm";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "welcome", Component: Welcome },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "home", Component: Home },
      {
        path: "profile",
        Component: Profile,
        children: [{ path: "profile/:edit", Component: EditProfile }],
      },
      {
        path: "tasks",
        Component: Tasks,
        children: [
          { path: "taskForm", Component: TaskForm },
          { path: "tasks/:taskId", Component: TaskDetail },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />;
    </ContextProvider>
  </React.StrictMode>
);

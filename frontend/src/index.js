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
import { TaskProvider } from "./store/TaskContext";
import store from "./store/reduxtookit/store";
import { Provider } from "react-redux";
import ForgetPassword from "./pages/authentication/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "welcome", element: <Welcome /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "home", element: <Home /> },
      { path: "forget", element: <ForgetPassword /> },
      {
        path: "profile",
        element: <Profile />,
        children: [{ path: ":edit", element: <EditProfile /> }],
      },
      {
        path: "tasks",
        element: <Tasks />,
        children: [
          { path: "taskForm", element: <TaskForm /> },
          { path: "tasks/:taskId", element: <TaskDetail /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <TaskProvider>
          <RouterProvider router={router} />
        </TaskProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

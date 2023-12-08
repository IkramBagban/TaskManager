import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../utils/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../../store/TaskContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const taskCtx = useContext(TaskContext)

  const token = localStorage.getItem("token");
  useEffect(() => {
    getUsers()
      .then((data) => {
        const existingUser = data.find((user) => user.id.toString() === token);
        setUser(existingUser);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (state?.username && state?.phoneNumber && state?.email)
      setUser({ ...state });
  }, [state?.username, state?.phoneNumber, state?.email, state]);

  const editClickHandler = () => {
  console.log('tasks ctx', taskCtx.tasks)
  // console.log('tasks ctx'/)

    navigate(`/profile/${token}`, { state: { user } });
  };


  return (
    <div>
      <Outlet />
      <h3>{user?.username}</h3>
      <p>{user?.email}</p>
      <p>{user?.phoneNumber}</p>
      <button onClick={editClickHandler}>Edit</button>
    </div>
  );
};

export default Profile;

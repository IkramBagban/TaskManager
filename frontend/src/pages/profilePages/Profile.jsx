import React, { useEffect, useState } from "react";
import { getUsers } from "../../utils/api";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    getUsers()
      .then((data) => {
        const existingUser = data.find((user) => user.id.toString() === token);
        setUser(existingUser);
      })
      .catch((err) => console.error(err));
  }, []);

  const editClickHandler = () => {
    navigate(`/profile/${token}`, { state: { user } });
  };
  return (  
    <div>
      <Outlet />
      <h3>{user?.username}</h3>
      <p>{user?.email}</p>
      <p>{user?.phoneNumber}</p>
      <button onClick={editClickHandler}>edit</button>
    </div>
  );
};

export default Profile;

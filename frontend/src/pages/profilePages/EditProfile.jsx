import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { updateData } from "../../utils/api";

const EditProfile = () => {
  const {
    state: { user },
  } = useLocation();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    user &&
      setInputValues({
        username: user?.username,
        phoneNumber: user.phoneNumber,
      });
    console.table(user);
  }, [user]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const editHandler = async () => {
    const data = {
      id: user.id,
      username: inputValues.username,
      phoneNumber: inputValues.phoneNumber,
      email: user.email,
      password: user.password,
    };
    // const response = await updateData(`users/edit/${user?.id}`, data);
    updateData(`users/edit/${user?.id}`, data).then(res =>{
      setInputValues({
        username: res?.username,
        phoneNumber: res?.phoneNumber,
      });
      navigate("/profile", {state : {...data}});
    });

    // if (response) {
     
    // }
  };
  return (
    <div>
      <h1>edit profile</h1>
      <Input
        label={"username"}
        name={"username"}
        value={inputValues.username}
        onInputChange={inputChangeHandler}
      />
      <Input
        label={"Phone Number"}
        name={"phoneNumber"}
        value={inputValues.phoneNumber}
        onInputChange={inputChangeHandler}
      />

      <button onClick={editHandler}>Update Profile</button>
    </div>
  );
};

export default EditProfile;

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Input from "../../components/Input";

const EditProfile = () => {
  // const params = useParams()
  const {
    state: { user },
  } = useLocation();
  const [inputValues, setInputValues] = useState({
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    user &&
      setInputValues({
        username : user?.username,
        phoneNumber : user.phoneNumber
      });
      console.table(user)
  }, [user]);

  const inputChangeHandler = (e) =>{
    const {name, value} = e.target;

    setInputValues(prev =>{
      return {...prev, [name] : value}
    })
    
  }
  console.log("edit", user);
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

      <button>Update Profile</button>
    </div>
  );
};

export default EditProfile;

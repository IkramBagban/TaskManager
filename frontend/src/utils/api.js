const BASE_URL = "http://localhost:4000";
export const getUsers = async () => {
  //   const existingUser = users.find(
  //     (user) => user.email === email && password === user.password
  //   );

  //   console.log("existingUser", existingUser);
  //   if (existingUser) {
  //     updateToken(existingUser.id);
  //     return;
  //   }

  //   alert("Please Enter Valid Detail");

  const res = await fetch(`${BASE_URL}/users`);
  const data = await res.json();
  console.log("data", data);
  return data;
};

export const getTasks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    const data = await res.json();
    return data;
  } catch (err) {
    const error = new Error("got error while fetching tasks", err);
    console.error(error);
  }
};

export const postData = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL + endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // const responseData =
  return await response.json();

  // .then((res) => res.json)
  // .then((data) => data)
  // .catch((err) => err);

  // setUsers((prevUsers) => [...prevUsers, newUser]);
  // setToken(newUser?.id);
};

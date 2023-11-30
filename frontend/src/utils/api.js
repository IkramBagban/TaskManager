const BASE_URL = "http://localhost:3000";
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
  return data;
};

export const postData = async (endpoint, data) => {
  // const existingUser = users?.find((user) => user.email === email);
  // if (existingUser) {
  //   alert("This Is An Existing Email.");
  //   return;
  // }
  // if (!email || !password) {
  //   alert("Both The Field Are Mandatory!");
  //   return;
  // }

  // const newUser = { email, password, id: users.length + 1 };

  return await fetch(`${BASE_URL + endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json)
    .then((data) => data)
    .catch((err) => err);

  // setUsers((prevUsers) => [...prevUsers, newUser]);
  // setToken(newUser?.id);
};

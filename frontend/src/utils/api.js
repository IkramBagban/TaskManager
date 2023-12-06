const BASE_URL = "http://localhost:4000";
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  const data = await res.json();
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
  try {
    const response = await fetch(`${BASE_URL + endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    const error = new Error("got error whileposting the data", err);
    console.error(error);
  }
};

export const BASE_URL = "http://localhost:4000";
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  const data = await res.json();
  return data;
};

export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
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

export const updateData = async (endpoint, data) => {
  console.log('ddd',data)
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(new Error(error));
  }
};

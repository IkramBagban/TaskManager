// const USERS = [
//   { id: "1", email: "email1@gmail.com", password: "pass@1" },
//   { id: "2", email: "email2@gmail.com", password: "pass@2" },
//   { id: "3", email: "email3@gmail.com", password: "pass@3" },
// ];

const Users = require("../models/user");

exports.getUsers = (req, res, next) => {
  Users.getUsers((users) => {
    console.log("GET USERS");
    res.json(users);
  });
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  //   const users = USERS;
  //   const user = { id: users.length + 1, email, password };
  const id = Math.random().toString();
  const user = new Users(id, email, password);
  user.save();

  res.json({
    message: "User Created Successfully",
  });
};

exports.getUser = (req, res, next) => {
  const id = req.params.id;
  Users.getUsers((users) => {
    const user = users.find((u) => u.id === id);
    res.json(user);
  });
};

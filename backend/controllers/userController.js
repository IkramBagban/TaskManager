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
  const { username, phoneNumber, email, password } = req.body;
  
  // Users.getUsers((users) => {
  //   const id = users.length + 1;
  // });

    const user = new Users(null, username, phoneNumber, email, password);
    user.save(res);

   
};

exports.getUser = (req, res, next) => {
  const id = req.params.id;
  Users.getUsers((users) => {
    const user = users.find((u) => u.id === id);
    res.json(user);
  });
};


exports.updateUser = (req,res,next) => {
  const id = req.params.id;
  const {username, phoneNumber, email, password} = req.body;

  console.log('saving user')
  const user = new Users(id, username, phoneNumber, email, password);
  user.save(res);
}
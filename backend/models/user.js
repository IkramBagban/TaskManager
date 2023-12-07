const fs = require("fs");
const path = require("path");

const usersDBPath = path.resolve(__dirname, "..", "database", "users.json");

const getUsersFromDB = (cb) => {
  fs.readFile(usersDBPath, "utf-8", (err, users) => {
    if (err) {
      cb([]);
      return;
    }
    cb(JSON.parse(users));
  });
};

class Users {
  constructor(id, username, phoneNumber, email, password) {
    this.id = id;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
  }

  save(res) {
    getUsersFromDB((users) => {
      // edit existing user.
      if (this.id) {
        const userIndex = users.findIndex(
          (u) => u.id.toString() === this.id.toString()
        );

        if (userIndex === -1) {
          res.status(404).json({ message: "User Not Found." });
          return;
        }

        users[userIndex] = this;

        fs.writeFile(usersDBPath, JSON.stringify(users), (err) => {
          if (err) {
            res.status(500).json({ message: "Error Updating Fail" });
          } else {
            res
              .status(200)
              .json({ message: "User Updated successfully.", data: this });
          }
        });
        return;
      }

      // create new user.
      users.push(this);
      this.id = users.length + 1;
      fs.writeFile(usersDBPath, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).json({ message: "Error Creating User." });
        } else {
          res.status(201).json({
            message: "User Created Successfully",
            data: this,
          });
        }
      });
    });
  }

  static getUsers = (cb) => {
    getUsersFromDB((users) => {
      cb(users);
    });
  };
}

module.exports = Users;

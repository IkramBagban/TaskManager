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
      if (this.id) {
        console.log("edit");
        return;
      }
      users.push(this);
      this.id = users.length + 1;
      fs.writeFile(usersDBPath, JSON.stringify(users), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("File written successfully.");
          res.json({
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

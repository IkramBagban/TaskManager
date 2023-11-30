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
    this.phoneNumber = phoneNumber
    this.email = email;
    this.password = password;
  }
  
  save() {
    getUsersFromDB((users) => {
      const updatedUsers = [...users, this];
      console.log("SAVE", users);
      //   updatedUsers.push(this);
        console.log('UPdate', JSON.stringify(updatedUsers))
        console.log("THIS===>", this);

      fs.writeFile(usersDBPath, JSON.stringify(updatedUsers), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("File written successfully.");
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

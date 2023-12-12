const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const port = process.env.PORT || 4000;
let usersDBPath;

if (port === 4000) {
  usersDBPath = path.resolve(__dirname, "..", "database", "users.json");
} else {
  usersDBPath = path.resolve("/tmp", "users.json");
}

const getUsersFromDB = (cb) => {
  if (!fs.existsSync(usersDBPath)) {
    fs.writeFileSync(usersDBPath, "[]");
  }
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

        users[userIndex] = { ...this };

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

  static saveOTP(email, otp, res) {
    getUsersFromDB((users) => {
      const user = users.find((u) => u.email === email);
      if (!user) {
        res.status(404).json({ message: "User Not Found." });
        return;
      }

      // Hash OTP with a unique salt
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(otp, salt, 1000, 64, `sha512`)
        .toString(`hex`);

      // Set OTP expiry time (e.g., 5 minutes)
      const expiry = Date.now() + 300000;

      // Save hash and expiry in user's record
      user.otpHash = hash;
      user.otpSalt = salt;
      user.otpExpiry = expiry;

      // Save the updated users array back to the file
      fs.writeFile(usersDBPath, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).json({ message: "Error Saving OTP." });
        } else {
          res.status(200).json({ message: "OTP saved and email sent." });
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

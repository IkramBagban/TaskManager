const Users = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const fs = require('fs');
const path = require("path");

usersDBPath = path.resolve(__dirname, "..", "database", "users.json");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.api_key,
    },
  })
);

exports.getUsers = (req, res, next) => {
  Users.getUsers((users) => res.json(users));
};

exports.createUser = (req, res, next) => {  
  const { username, phoneNumber, email, password } = req.body;

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

exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  const { username, phoneNumber, email, password } = req.body;

  const user = new Users(id, username, phoneNumber, email, password);
  user.save(res);
};

// exports.requestOTP = (req, res, next) => {
//   const { email } = req.body;

//   Users.getUsers(async (users) => {
//     const existingUser = users.find((user) => user.email === email);

//     if (!existingUser) {
//       res.status(404).json({ message: "No Account Found" });
//       return;
//     }

//     // const otp = Math.floor(Math.random() * 9999);
    
//   const otp = Math.floor(1000 + Math.random() * 9000).toString();

//     const mailOption = {
//       to: email,
//       from: "bagbanikram@gmail.com",
//       subject: "Your Password Reset OTP",
//       text: `Your OTP for password reset is: ${otp}`,
//     };

//     try {
//       await transporter.sendMail(mailOption);
//       res.status(200).json({ message: "OTP sent to email." });
//     } catch (e) {
//       res.status(500).json({ message: "Failed to send OTP" });
//     }
//   });
// };



exports.requestOTP = (req, res, next) => {
  const { email } = req.body;

  Users.getUsers(async (users) => {
    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
      res.status(404).json({ message: "No Account Found" });
      return;
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Create a unique salt for hashing the OTP
    const salt = crypto.randomBytes(16).toString('hex');
    
    // Create hash for the OTP
    const hash = crypto.pbkdf2Sync(otp, salt, 1000, 64, 'sha512').toString('hex');

    // Set the OTP expiry time (e.g., 5 minutes from now)
    const expiry = Date.now() + (5 * 60 * 1000);

    // Save the hash and expiry in the user's record
    const userIndex = users.findIndex((u) => u.email === email);
    users[userIndex].otpHash = hash;
    users[userIndex].otpSalt = salt;
    users[userIndex].otpExpiry = expiry;

    // Save the updated users array back to the JSON file
    fs.writeFile(usersDBPath, JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error saving OTP to database:", err);
        res.status(500).json({ message: "Failed to save OTP" });
        return;
      }

      // Send the OTP via email
      const mailOption = {
        to: email,
        from: "bagbanikram@gmail.com", // Should be a verified sender in SendGrid
        subject: "Your Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
      };

      transporter.sendMail(mailOption)
        .then(() => {
          res.status(200).json({ message: "OTP sent to email." });
        })
        .catch((error) => {
          console.error("Failed to send OTP email:", error);
          res.status(500).json({ message: "Failed to send OTP" });
        });
    });
  });
};


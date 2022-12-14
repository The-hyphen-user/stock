const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWTSecret = process.env.JWT_SECRET || "secret";
const { hashPassword } = require("../util/password");
const { authLogin, authUser } = require("../util/passport");

exports.register = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const hashedPassword = hashPassword(req.body.password);
  const user = {
    username: req.body.username,
    password: hashedPassword,
    balance: 10000,
  };

  // Save user in the database
  User.create(user)
    .then(() => {
      console.log("user created");
      res.status(200).send({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.login = (req, res) => {//deprecated
  console.log("hit login");
  //validate
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        console.log("user not found");
        res.status(404).send({
          message: "User not found",
        });
        return;
      }
      // console.log('user1: ',user)
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        console.log("invalid password");
        res.status(401).send({
          message: "Invalid Password",
        });
        return;
      }
      const token = jwt.sign({ id: user.id }, JWTSecret, {
        expiresIn: 86400, // 24 hours
      });
      // console.log('user: ',user)
      res.status(200).send({
        id: user.id,
        username: user.username,
        balance: user.balance,
        accessToken: token,
      });
      console.log("user logged in");
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).send({
        message: "Error retrieving User with username=" + req.body.username,
      });
    });
};

exports.logout = (req, res) => {//deprecated
  res.status(200).send({ message: "User logged out" });
};


// module.exports = {
//   register,
//   login,
//   logout,
// };
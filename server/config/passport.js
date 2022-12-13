// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;
// const db = require("../models");
// const User = db.user;
// const expressSession = require("express-session");
// const bcrypt = require("bcryptjs");

// const validatePassword = (userpass, password) => {
//   return bcrypt.compareSync(password, userpass);
// };

// const authUser = (username, password, done) => {
//   User.findOne({ where: { username: username } })
//     .then((user) => {
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//     })
//     .catch((err) => {
//       return done(err);
//     })
//     .then((user) => {
//       if (!validatePassword(user.password, password)) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     })
//     .catch((err) => {
//       return done(err);
//     });
// };

// // const serializeUser = (user, done) => {
// //   done(null, user.id);
// // };

// // const deserializeUser = (id, done) => {
// //   User.findByPk(id)
// //     .then((user) => {
// //       done(null, user);
// //     })
// //     .catch((err) => {
// //       done(err, null);
// //     });
// // };


// module.exports = authUser;
const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { comparePassword } = require("../util/password");

// const authUser = (username, password, done) => {
//   //Search the user, password in the DB to authenticate the user
//   User.findOne({ where: { username: username } }).then((user) => {
//     if (!user) {
//       done(null, false, { message: "Incorrect username." });
//     }
//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) {
//       done(null, false, { message: "Incorrect password." });
//     }
//     const authenticated_user  = {
//       id: user.id,
//       username: user.username,
//       balance: user.balance,
//     };
//   });
//   return done (null, authenticated_user )
// };

const strategy = new LocalStrategy((username, password, done) => {
  // const authUser = (username, password, done) => {
  //Search the user, password in the DB to authenticate the user
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  });
});

const authLogin = () => {
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login",
  });
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const authLogout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

module.exports = {
  strategy,
  // authUser,
  authLogin,
  checkAuthenticated,
  authLogout,
};

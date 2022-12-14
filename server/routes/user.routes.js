//basic user routes for register, login, logout

const express = require("express");
const router = express.Router();

const controllers = require("../controllers");
const userController = controllers.User;

const { authLogin, authLogout } = require("../util/passport");

router.post("/register", userController.register);
router.post(
  "/login",
  authLogin
);
router.post("/logout", authLogout);

router.use((req, res) => {
  console.log("hit /api/user 404");
  console.log("route hit was: ", req.url);
  res.status(404).send("404 not found");
});

module.exports = router;

const controllers = require("../controllers");
const { UserAuth, UserActiveAuth } = require("../middleware");
const router = require("express").Router();

module.exports = (User) => {
  router.post("/register", UserAuth, UserActiveAuth, controllers.User.create);
  router.post("/login", UserAuth, controllers.User.login);
  

  User.use(router);
};

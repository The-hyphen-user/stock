const express = require("express");
const Router = express.Router();

const passport = require("passport");

// const router = Router()

router.use('/api/auth', passport.authenticate('local'), (req, res) => {
  res.send(200)
})

module.exports = router
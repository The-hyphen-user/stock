const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

exports.UserAuth = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  [
    check(username)
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),

    check(email)
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check(password)
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-50")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),
  ],
    (req, res, next) => {
      const error = validationResult(req).formatWith(({ msg }) => msg);

      const hasError = !error.isEmpty();

      if (hasError) {
        res.status(422).json({ error: error.array() });
      } else {
        next();
      }
    };
};

exports.UserActiveAuth = (req, res, next) => {//come up with a better name for this
  // check if user is the same as the one in the token
  const JWTSecretKey = process.env.SECRET_JWT || "asdasdasdasdasdqwsdas";
  
  const username = req.body.username;
  const email = req.body.email;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWTSecretKey);
  const tokenUsername = decodedToken.username;
  const tokenEmail = decodedToken.email;

  if (username !== tokenUsername || email !== tokenEmail) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

// const decodedToken = jwt.verify(token,"secretkeyappearshere" )

// const token = req.headers.authorization.split(' ')[1];
//     //Authorization: 'Bearer TOKEN'
//     if(!token)
//     {
//         res.status(200).json({success:false, message: "Error!Token was not provided."});
//     }
// token = jwt.sign(
//     { userId: existingUser.id, email: existingUser.email },
//     "secretkeyappearshere",
//     { expiresIn: "1h" }

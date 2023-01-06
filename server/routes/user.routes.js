//basic user routes for register, login, logout

const express = require("express");
const router = express.Router();

const controllers = require("../controllers");
const userController = controllers.User;
const passport = require("passport");

const { authLogin, authLogout } = require("../util/passport");
const db = require("../models");
const User = db.User;
const Holding = db.Holding;
const Transaction = db.Transaction;
const Watchlist = db.Watchlist;
const { getStockPrice } = require("../services/getStockPrice");

router.post("/register", userController.register);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const username = req.body.username;
    console.log("✨req: ", req.body.username);
    //get user from db and set it to userDB
    User.findOne({ where: { username: username } })
    .then((user) => {
      const id = user.id;
      const transactions = Transaction.findAll({ where: { userId: id } });
      const holdings = Holding.findAll({ where: { userId: id } });
      const holdingsWithPrice = holdings.then((holdings) => {
        const holdingPromises = holdings.map((holding) => {
          return getStockPrice(holding.symbol).then((price) => {
            holding.dataValues.price = price.c;
            return holding;
          });
        });
        return Promise.all(holdingPromises);
      });
      const watchlists = Watchlist.findAll({ where: { userId: id } })
      const data = Promise.all([transactions, holdings, watchlists, user, holdingsWithPrice]);
      return data;
    })
    .then((data) => {
      const [transactions, , watchlists, user, holdingsWithPrice] = data;
      const payload = {
        user: {
          id: user.id,
          username: user.username,
          balance: user.balance,
        },
        transactions: transactions,
        holdings: holdingsWithPrice,
        watchlists: watchlists
      };
      // console.log("payload: ", payload);
       console.log("holdingsWithPrice: ", holdingsWithPrice);
      res.send(payload);
    });
  }
);


router.post("/logout", authLogout);

//get username based on cookie/token/session
router.get("/", (req, res) => {
  //console.log("--✨User: ", req.user);
});

router.use((req, res) => {
  console.log("hit /api/user 404");
  //console.log("route hit was: ", req.url);
  res.status(404).send("404 not found");
});

module.exports = router;


//old login route
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     const username = req.body.username;
//     console.log("✨req: ", req.body.username);
//     User.findOne({ where: { username: username } })
//       .then((user) => {
//         const id = user.id;
//         const transactions = Transaction.findAll({ where: { userId: id } });
//         const holdings = Holding.findAll({ where: { userId: id } });
//         const watchlists = Watchlist.findAll({ where: { userId: id } });
//         //const data = Promise.all([transactions, holdings, watchlists]);
//         const data = Promise.all([transactions, holdings, watchlists, user]);
//         return data;
//       })
//       .then((data) => {
//         const [transactions, holdings, watchlists, user] = data;
//         const userPayload = {
//           id: req.user.id,
//           username: req.user.username,
//           balance: req.user.balance,
//         };
//         const payload = {
//           user: {
//             id: user.id,
//             username: user.username,
//             balance: user.balance,
//           },
//           transactions: transactions,
//           holdings: holdings,
//           watchlists: watchlists,
//         };
//         // console.log("payload: ", payload);
//         //  console.log("responce: ", res);
//         res.send(payload);
//       });
//   }
// );

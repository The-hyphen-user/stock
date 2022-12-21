const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");
const { getStockPrice } = require("../services/getStockPrice");

router.use((req, res, next) => {
  console.log("transaction route hit: ", req.url);
  next();
});

router.get("/all", transactionController.getAllTransactions);
router.post("/buy", transactionController.buyStock);
router.post("/sell", transactionController.sellStock);

module.exports = router;

/*
get user id, user balance
check for sufficient funds
if sufficient funds, create transaction
update user balance
if holding exists, update holding
if holding does not exist, create holding

*/
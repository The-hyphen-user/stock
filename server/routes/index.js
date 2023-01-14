const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const stockRoutes = require("./stock.routes");
// const holdingsRoutes = require('./holdings.routes');
const transactionRoutes = require('./transaction.routes');
const watchlistRoutes = require('./watchlist.routes');
const {checkAuthenticated} = require('../util/passport')
const syncStocks = require('../util/syncStocks')

router.use((req, res, next) => {
  console.log("index route hit: ", req.url);
  // console.log("req.user: ", req.query)
  next();
});

router.use("/user", userRoutes);
router.use("/stock", stockRoutes);
// router.use('/holdings', holdingsRoutes);
// router.use('/transaction', transactionRoutes);
router.use('/transaction', checkAuthenticated, transactionRoutes);
router.use('/watchlist', checkAuthenticated, watchlistRoutes);


// app.use("/api/sync", (req, res) => {//dev route
router.use('/sync', syncStocks)

router.use((req, res) => {
  console.log("hit /api 404");
  console.log("route hit was: ", req.url);
  res.status(404).send("404 not found");
});

module.exports = router;

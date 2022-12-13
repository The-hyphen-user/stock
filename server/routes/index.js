const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const stockRoutes = require("./stock.routes");
// const holdingsRoutes = require('./holdings.routes');
// const transactionRoutes = require('./transaction.routes');
// const watchlistRoutes = require('./watchlist.routes');

router.use("/user", userRoutes);
router.use("/stock", stockRoutes);
// router.use('/holdings', holdingsRoutes);
// router.use('/transaction', transactionRoutes);
// router.use('/watchlist', watchlistRoutes);

router.use((req, res) => {
  console.log("hit /api 404");
  console.log("route hit was: ", req.url);
  res.status(404).send("404 not found");
});

module.exports = router;

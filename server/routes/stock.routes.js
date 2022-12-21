const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stock.controller");
const  { getStockPrice } = require("../services/getStockPrice");

router.use((req, res, next) => {
  // console.log("stock route hit: ", req.url);
  next();
});
router.get("/symbol", stockController.getStock);
router.get("/search", stockController.searchStock);
router.get('/price', stockController.getPrice)


module.exports = router;

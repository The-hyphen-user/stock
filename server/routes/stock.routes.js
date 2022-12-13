const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stock.controller");

router.get("/:ticker", stockController.getStock);
router.get("/search/:query", stockController.searchStock);

module.exports = router;

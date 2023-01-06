const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlist.controller");

router.post("/", watchlistController.toggleWatchlist);

// router.delete("/delete/:symbol/:username", watchlistController.deleteOne);

// router.post("/deleteAll", watchlistController.deleteAll);

// router.get("/all/:username", watchlistController.findAll);

module.exports = router;

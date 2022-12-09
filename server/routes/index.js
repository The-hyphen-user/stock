const express = require("express");
const router = express.Router();

module.exports = () => {
  app.use("/api/user", require("./user.routes")(router));
  app.use("/api/transaction", require("./transaction.routes")(router));
  app.use("/api/watchlist", require("./watchlist.routes")(router));
  app.use("/api/stock", require("./stock.routes")(router));
  app.use("/api/holding", require("./stock.routes")(router));

  app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
  });
};

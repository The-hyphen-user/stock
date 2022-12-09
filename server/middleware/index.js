const middleware = {}

middleware.UserAuth = require("./userAuth.middleware.js");
middleware.StockAuth = require("./stock.middleware.js");
middleware.TransactionsAuth = require("./transactions.middleware.js");
middleware.HoldingAuth = require("./holding.middleware.js");
middleware.WatchlistAuth = require("./watchlist.middleware.js");


module.exports = middleware;
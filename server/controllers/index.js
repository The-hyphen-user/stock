const controller = {};



controller.User = require("./user.controller.js");
// controller.Holding = require("./holding.controller.js");
// controller.Watchlist = require("./watchlist.controller.js");
controller.Stock = require("./stock.controller.js");
controller.Transaction = require("./transaction.controller.js");





module.exports = controller;

/*
controllers:
user:
    - create (username, email, password)
    - find one (username)
    - delete one (username)
stock:
    - create (symbol, name)
    - find one (symbol)
    - search for many (name)
    - delete one (symbol)
holding:
    - find all (username)
    - find one (username, symbol)
    - create (username, symbol, quantity)
    - update (username, symbol, quantity)   
    - delete one (symbol, username)
    - delete all (username)
watchlist:
    - create (username, symbol)
    - delete one (symbol, username)
    - find all (username)
    - delete all (username)
transaction:
    - create (username, symbol, quantity, price)
    - find all (username)
    - delete one (id)
    - delete all (username)
    




*/

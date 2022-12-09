const db = require("../models");
const Stock = db.Stock;
const Op = db.Sequelize.Op;

//create and save a new stock
exports.create = (req, res) => {
  //validate request
  if (!req.body.symbol || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //create a stock
  const stock = {
    symbol: req.body.symbol,
    name: req.body.name,
  };

  //save stock in the database
  Stock.create(stock)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the stock.",
      });
    });
};

//search for stock using exact symbol
exports.findOne = (req, res) => {
  const symbol = req.params.symbol;
  Stock.findBySymbol(symbol)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving stock with symbol=" + symbol,
      });
    });
};

//search for stock using partial name
exports.findByName = (req, res) => {
  const name = req.params.name;
  const numberOfStocks = req.params.numberOfStocks;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Stock.findAll({ where: condition }, { limit: numberOfStocks })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stocks.",
      });
    });
};

//delete a stock with the specified symbol in the request
exports.delete = (req, res) => {
  const symbol = req.params.symbol;
  Stock.destroy({ where: { symbol: symbol } })
    .then(() => {
      res.send({
        message: "Stock was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete stock with symbol=" + symbol,
      });
    });
}
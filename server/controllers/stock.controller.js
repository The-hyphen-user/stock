const db = require("../models");
const Stock = db.Stock;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWTSecret = process.env.JWT_SECRET;


exports.getStock = (req, res) => {
  if(!req.params.ticker){//check if it needs to be like this req.params['ticker']
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  Stock.findOne({
    where: {
      ticker: req.params.ticker,
    },
  })
    .then((stock) => {
      if (!stock) {
        res.status(404).send({
          message: "Stock not found",
        });
        return;
      }
      res.send(stock);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving stock",
      });
    });
};

exports.searchStock = (req, res) => {
  if(!req.params.query){
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  Stock.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.query}%`,
      },
    }, limit: 50
  })
    .then((stocks) => {
      if (!stocks) {
        res.status(404).send({
          message: "Stock not found",
        });
        return;
      }
      res.send(stocks);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving stock",
      });
    })
};

// module.exports = {
//   getStock,
//   searchStock,
// };
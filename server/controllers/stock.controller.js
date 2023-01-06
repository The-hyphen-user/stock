const db = require("../models");
const Stock = db.Stock;
const Op = db.Sequelize.Op;
const dotenv = require("dotenv").config();
const JWTSecret = process.env.JWT_SECRET;
const axios = require("axios");

const token = 'cb3l2vqad3i8tak12f6g'
// const token = process.env.FINNHUB_API_KEY

exports.getStock = (req, res) => {
  const query = req.query.name;
  console.log("query: ", query);
  if (!req.query.name) {
    res.status(400).send({
      message: "Content can not be empty!1",
    });
    return;
  }
  Stock.findOne({
    where: {
      symbol: req.query.name,
    },
  })
    .then((stock) => {
      if (!stock) {
        console.log("stock not found");
        res.status(404).send({
          message: "Stock not found",
        });
        return;
      }
      getStockPriceFromFinnhub(stock.symbol, token)
      .then((data) => {
        res.send({
          stock,
          price: data.c,
        });
      })
    })
    .catch((err) => {
      res.status(404).send({
        message: "Error retrieving stock",
      });
    });
};

exports.searchStock = (req, res) => {
  console.log("get herer?", req.query);
  if (!req.query.name) {
    res.status(400).send({
      message: "Content can not be empty!2",
    });
    return;
  }
  const query = req.query.name;
  Stock.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
    limit: 50,
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
    });
};

exports.getPrice = (req, res) => {
  const symbol = req.query.name;
  // const token = 'cb3l2vqad3i8tak12f6g'
  const data = getStockPriceFromFinnhub(symbol, token)
  .then((data) => {
    // const price = data.c;
    console.log("price: ", data.c);
    res.status(200).send({"price": data.c});
  })
};

const getStockPriceFromFinnhub = async (symbol, token) => {
  try {
    const finnhubPromise = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}`,{headers: { 'X-Finnhub-Token': token },}
      // `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`
      // `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cb3l2vqad3i8tak12f6g`
    );
    return finnhubPromise.data;
  } catch (error) {
    console.error("error: ", error);
    res.send({"error": error})
  }
};
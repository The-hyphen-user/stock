const dotenv = require("dotenv").config();

exports.token = {

  //get env variable FINNHUB_API_KEY and set it to token
  token: process.env.FINNHUB_API_KEY,
}
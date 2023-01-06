const axios = require('axios');

exports.finnhubURL = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
  headers: { 'X-Finnhub-Token': process.env.FINNHUB_API_KEY },
});

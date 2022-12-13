// // //look up stock price
// // const finnhub = require('finnhub');
// // const dotenv = require('dotenv').config({ path: '../.env' });
// // const env = process.env.FINNHUB_API_key

// // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// // api_key.apiKey = env // Replace this
// // const finnhubClient = new finnhub.DefaultApi()

// const dotenv = require('dotenv')
// dotenv.config();


// const getStockPricev1 = (symbol) => {
//   const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;
//   return axios.get(url)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }



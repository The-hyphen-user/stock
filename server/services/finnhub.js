const finnhub = require('finnhub');


const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  finnhubKey: process.env.FINNHUB_API_KEY
}



const key = process.env.FINNHUB_API_KEY


const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = key
const finnhubClient = new finnhub.DefaultApi()

const getStockPricev2 = (symbol) => {

const data = finnhubClient.quote("AAPL", (error, data, response) => {
  console.log('data: ', data)
  console.log('error: ', error.status)
  // console.log('response: ', response)
})

console.log('data: ', data)
}


const getStockPricev1 = (symbol) => {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cb3l2vqad3i8tak12f6g`;
  return axios.get(url)
    .then((response) => {
      console.log('response.data: ', response.data)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}




// module.exports = {
//   getStockPricev1,
//   getStockPricev2
// }
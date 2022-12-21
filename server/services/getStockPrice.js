const axios = require("axios");
const token = "cb3l2vqad3i8tak12f6g";

exports.getStockPrice = async (symbol) => {
  // console.log("symbol: ", symbol);
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

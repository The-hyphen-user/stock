module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stock", {
    ticker: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Stock;
};

/*
stock
Holding
transaction
watchlist
user




*/
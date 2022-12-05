module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  time: {
    type: Sequelize.DATE
  },
  price: {
    type: Sequelize.FLOAT
  }
  });
  return Transaction;
}
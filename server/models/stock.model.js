module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stock", {
    symbol: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Stock;
};
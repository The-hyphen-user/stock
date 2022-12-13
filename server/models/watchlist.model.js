module.exports = (sequelize, Sequelize) => {
  const Watchlist = sequelize.define("watchlist", {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    symbol: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  });
  return Watchlist;
}
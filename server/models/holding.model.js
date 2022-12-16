module.exports  =  (sequelize, Sequelize) => {
  const  Holding  =  sequelize.define( "holding" , {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    symbol: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return  Holding;
}
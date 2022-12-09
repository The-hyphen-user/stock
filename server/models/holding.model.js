module.exports  =  (sequelize, Sequelize) => {
    const  Holding  =  sequelize.define( "holding" , {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      time: {
        type: Sequelize.DATE
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
    return  Holding;
  }
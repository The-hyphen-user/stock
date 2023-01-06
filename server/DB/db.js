// const dbConfig = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   port: dbConfig.port,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;



// // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// db.User = require("./user.model.js")(sequelize, Sequelize);
// db.Holding = require("./holding.model.js")(sequelize, Sequelize);
// db.Watchlist = require("./watchlist.model.js")(sequelize, Sequelize);
// db.Stock = require("./stock.model.js")(sequelize, Sequelize);
// db.Transaction = require("./transaction.model.js")(sequelize, Sequelize);
// // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);



// db.User.hasMany(db.Holding);
// db.User.hasMany(db.Watchlist);
// db.User.hasMany(db.Transaction);

// db.Holding.hasOne(db.Stock, {foreignKey: 'symbol'});
// db.Watchlist.hasOne(db.Stock, {foreignKey: 'symbol'});
// db.Transaction.hasOne(db.Stock, {foreignKey: 'symbol'});
// db.Holding.hasMany(db.Transaction, {foreignKey: 'holdingId'});


// // db.Transaction.belongsTo(db.Holding, {foreignKey: 'holdingId'});
// // db.Holding.hasOne(db.Transaction, {foreignKey: 'holdingId'});
// // db.Watchlist.hasOne(db.Stock, {foreignKey: 'symbol'});
// // db.Stock.hasMany(db.Holding);
// // db.Stock.hasMany(db.Watchlist);
// // db.Stock.hasMany(db.Transaction);

// module.exports = db;

// /*
// stock
// Holding
// transaction
// watchlist
// user
// */
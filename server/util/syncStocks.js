const db = require("../models");
const Stock = db.Stock;

const numItems = 29;
const fileNames = [];

for (let i = 1; i <= numItems; i++) {
  let data = "data_" + i + ".json";
  fileNames.push(data);
}

const stocksSync = () => {
  db.sequelize.sync({ force: true }).then(() => {
    fileNames.forEach((fileName) => {
      console.log("fileName: ", fileName);
      const data = require(`./data/${fileName}`); /* eslint-disable-line global-require */
      Stock.bulkCreate(data)
        .then(() => {
          console.log("stocks loaded");
        })
        .catch((err) => {
          console.log("error loading stocks", err);
        });
    });
  });
};

stocksSync();
module.exports = { stocksSync };

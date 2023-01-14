
const express = require("express");
const router = express.Router();
const db = require("../models");
const Stock = db.Stock;


router.use((req, res) => {

    const numItems = 29;
    const fileNames = [];
    for (let i = 1; i <= numItems; i++) {
      let data = "data_" + i + ".json";
      fileNames.push(data);
    }
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
    res.status(200).send("stocks synced");
})


module.exports = router;
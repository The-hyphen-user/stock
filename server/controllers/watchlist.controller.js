const db = require("../models");
const Watchlist = db.Watchlist;
const Op = db.Sequelize.Op;

//create and save a new watchlist item
exports.create = (req, res) => {
  //validate request
  if (!req.body.symbol || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //check to see if the watchlist item already exists
  Watchlist.findOne({
    where: { symbol: req.body.symbol, username: req.body.username },
  })
    .then((data) => {
      if (data) {
        res.status(400).send({
          message: "Watchlist item already exists!",
        });
        return;
      } else {
        //create a watchlist item
        const watchlist = {
          symbol: req.body.symbol,
          username: req.body.username,
        };

        //save watchlist item in the database
        Watchlist.create(watchlist)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the watchlist item.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the watchlist item.",
      });
    });
};

//delete a watchlist item with the specified symbol in the request
exports.deleteOne = (req, res) => {
  const symbol = req.params.symbol;
  const username = req.params.username;
  Watchlist.destroy({ where: { symbol: symbol, username: username } })
    .then(() => {
      res.send({
        message: "Watchlist item was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete watchlist item with symbol=" + symbol,
      });
    });
};

//find all watchlist items for a user
exports.findAll = (req, res) => {
  const username = req.params.username;
  Watchlist.findAll({ where: { username: username } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving watchlist items.",
      });
    });
};


//delete all watchlist items for a user
exports.deleteAll = (req, res) => {
    const username = req.params.username;
    Watchlist.destroy({ where: { username: username } })
        .then(() => {
            res.send({
                message: "All watchlist items were deleted successfully!"
            });
        }
        )
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all watchlist items."
            });
        }
        );
};
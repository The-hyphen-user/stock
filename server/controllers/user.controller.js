const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    balance: 10000
  };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findByUsername(username)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with username=" + username
      });
    });
}

exports.delete = (req, res) => {
  const username = req.params.username;

  User.destroy({
    where: { username: username }
  })
    .then(() => {
      res.send({
        message: "Tutorial was deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with username=" + username
      });
    });
}



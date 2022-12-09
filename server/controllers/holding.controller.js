const db = require("../models");
const Holding = db.holding;
const Op = db.Sequelize.Op;
// const Date = require('date-and-time');

// Create and Save a new Holding
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.ticker || !req.body.quantity) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Holding
    const holding = {
        time : Date.now(),
        username: req.body.username,
        ticker: req.body.ticker,
        quantity: req.body.quantity
    };
    
    // Save Holding in the database
    Holding.create(holding)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Holding."
        });
        });
    }

// Retrieve all Holdings for a specific user from the database.
exports.findAll = (req, res) => {
    const username = req.params.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
    
    Holding.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving holdings."
        });
        });
    }
    
// Delete a Holding with the specified ticker in the request
exports.deleteOne = (req, res) => {
    //validate request
    if (!req.params.ticker || !req.params.username || !req.params.quantity) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    const ticker = req.params.ticker;
    const username = req.params.username;
    const quantity = req.params.quantity;

    //check if user has holding and enough quantity to sell
    Holding.findOne({ where: { ticker: ticker, username: username } })
    .then(data => {
        if (data.quantity < quantity) {
            res.status(400).send({
                message: "User does not have enough quantity to sell!"
            });
            return;
        }
        //update quantity
        data.quantity -= quantity;
        data.save();
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Holding with ticker=" + ticker
        });
    });
}

// Delete all Holdings from the database for a specific user
exports.deleteAll = (req, res) => {
    const username = req.params.username;
    Holding.destroy({
        where: { username: username }
    })
        .then(() => {
        res.send({
            message: "Holdings were deleted successfully!"
        });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all holdings."
        });
        });
    }

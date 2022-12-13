// const db = require("../models");
// const Transaction = db.Transaction;
// const Op = db.Sequelize.Op;
// // const Date = require('date-and-time');

// // Create and Save a new Transaction
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.username || !req.body.symbol || !req.body.quantity || !req.body.price) {
//         res.status(400).send({
//         message: "Content can not be empty!"
//         });
//         return;
//     }
    
//     // Create a Transaction
//     const transaction = {
//         username: req.body.username,
//         symbol: req.body.symbol,
//         quantity: req.body.quantity,
//         time: Date.now(),
//         price: req.body.price
//     };
    
//     // Save Transaction in the database
//     User.create(transaction)
//         .then(data => {
//         res.send(data);
//         })
//         .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "Some error occurred while creating the Transaction."
//         });
//         });
//     }

// // Retrieve all Transactions for a specific user from the database.
// exports.findAll = (req, res) => {
//     const username = req.params.username;
//     var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
    
//     User.findAll({ where: condition })
//         .then(data => {
//         res.send(data);
//         })
//         .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "Some error occurred while retrieving transactions."
//         });
//         });
//     }

// // Delete a Transaction with the specified id in the request
// exports.deleteOne = (req, res) => {
//     //validate request
//     if (!req.params.id) {
//         res.status(400).send({
//         message: "Content can not be empty!"
//         });
//         return;
//     }
    
//     const id = req.params.id;
    
//     Transaction.destroy({
//         where: { id: id }
//     })
//         .then(() => {
//         res.send({
//             message: "Transaction was deleted successfully!"
//         });
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error deleting Transaction with id=" + id
//         });
//         });
//     }

// // Delete all Transactions from the database for a specific user
// exports.deleteAll = (req, res) => {
//     const username = req.params.username;
    
//     Transaction.destroy({
//         where: { username: username }
//     })
//         .then(() => {
//         res.send({
//             message: "All Transactions were deleted successfully!"
//         });
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error deleting Transactions with username=" + username
//         });
//         });
//     }

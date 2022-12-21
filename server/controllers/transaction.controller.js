const db = require("../models");
const Transaction = db.Transaction;
const User = db.User;
const Holding = db.Holding;
const Op = db.Sequelize.Op;
const { getStockPrice } = require("../services/getStockPrice");

exports.getAllTransactions = (req, res) => {
  console.log("req: ");
  const user = req.user;
  console.log("user: ", user);
  const userId = user.fulfillmentValue.id;
  console.log("userId: ", userId);
  Transaction.findAll({ where: { userId: userId } })
    .then((transactions) => {
      console.log("transactions: ", transactions);
      res.send(transactions);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(404).send({
        message: "Error retrieving transactions",
      });
    });
};

exports.buyStock = (req, res) => {
  const symbol = req.query.symbol;
  const quantity = Number(req.query.quantity);
  const id = req.user.fulfillmentValue.id;
  // const balance = Number(req.user.fulfillmentValue.balance);
  if (!symbol || !quantity || !id) {
    res.status(404).send({
      message: "Missing symbol or quantity",
    });
  }
  console.log("id", id);
  const user = User.findOne({ where: { id: id } })
    .then((user) => {
      const price = getStockPrice(symbol).then((price) => {
        const previouslyOwned = Holding.findOne({
          where: { userId: id, symbol: symbol },
        }).then((previouslyOwned) => {
          if (user.balance < price.c * quantity) {
            res.status(422).send({
              message: "Insufficient funds",
            });
          } else {
            const newBalance = user.balance - price.c * quantity;
            const newUser = User.update({ balance: newBalance }, { where: { id: id } })
              .then((newUser) => {
                const newTransaction = Transaction.create({ userId: id, symbol: symbol, quantity: quantity, price: price.c, time: Date.now() })
                .then((newTransaction)=>{
                  if (previouslyOwned) {
                    const newQuantity = Number(previouslyOwned.quantity) + quantity
                    const newHolding = Holding.update({userId:id, quantity: newQuantity}, {where: { userId:id}})
                    .then((newHolding) =>{
                      console.log("newHolding: ", newHolding)
                      res.status(200).send({updatedInfo:{balance: newBalance, transaction: newTransaction, holding:{
                        id:previouslyOwned.id,
                        userId:id,
                        quantity: newQuantity,
                        symbol:symbol
                      }}})
                    })
                    
                  } else{
                    Holding.create({ userId:id, quantity:quantity, symbol:symbol})
                    .then((newHolding) =>{
                      res.status(200).send({updatedInfo:{balance: newBalance, transaction: newTransaction, holding:newHolding}})
                    })
                    
                  }
                })
              })
          }
        });
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "Error retrieving stock price",
      });
    });
};

exports.sellStock = (req, res) => {};

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

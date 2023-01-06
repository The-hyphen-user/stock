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
  console.log("symbol: ", symbol, "quantity: ", quantity, "id: ", id);
  // const balance = Number(req.user.fulfillmentValue.balance);
  if (!symbol || !quantity || !id || quantity < 1) {
    res.status(404).send({
      message: "Missing symbol or quantity",
    });
    return
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
            const newUser = User.update(
              { balance: newBalance },
              { where: { id: id } }
            ).then((newUser) => {
              const newTransaction = Transaction.create({
                userId: id,
                symbol: symbol,
                quantity: quantity,
                price: price.c,
                time: Date.now(),
              }).then((newTransaction) => {
                if (previouslyOwned) {
                  const newQuantity =
                    Number(previouslyOwned.quantity) + quantity;
                  const newHolding = Holding.update(
                    { userId: id, quantity: newQuantity },
                    { where: { userId: id, symbol: symbol } }
                  ).then((newHolding) => {
                    console.log("newHolding: ", newHolding);
                    res.status(200).send({
                      updatedInfo: {
                        balance: newBalance,
                        transaction: newTransaction,
                        holding: {
                          id: previouslyOwned.id,
                          userId: id,
                          quantity: newQuantity,
                          symbol: symbol,
                        },
                      },
                    });
                  });
                } else {
                  Holding.create({
                    userId: id,
                    quantity: quantity,
                    symbol: symbol,
                  }).then((newHolding) => {
                    res.status(200).send({
                      updatedInfo: {
                        balance: newBalance,
                        transaction: newTransaction,
                        holding: {
                          id: newHolding.id,
                          userId: id,
                          quantity: quantity,
                          symbol: symbol,
                          price: price.c,
                        },
                      },
                    });
                  });
                }
              });
            });
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
//get user from req
//get holding from user
//get quantity from holding
//get price of stock from getStockPrice
//if quantity > holding.quantity, return error
//if quantity < holding.quantity, update holding
//if quantity === holding.quantity, delete holding
//update user balance
//create transaction
//return updated user, holding, transaction using promises

exports.sellStock = (req, res) => {
  const symbol = req.query.symbol;
  const quantity = Number(req.query.quantity);
  const id = req.user.fulfillmentValue.id;
  if (!symbol || !quantity || !id) {
    res.status(404).send({
      message: "Missing symbol or quantity",
    });
  }
  console.log("id", id, "symbol", symbol, "quantity", quantity);
  const user = User.findOne({ where: { id: id } });
  const holding = Holding.findOne({ where: { userId: id, symbol: symbol } });
  const price = getStockPrice(symbol);
  Promise.all([user, holding, price])
  .then((data) => {
    console.log("user: ", data[0], "holding: ", data[1], "price: ", data[2]);
    const user = data[0];
    const holding = data[1];
    const price = data[2];
    console.log("user2: ", user, "holding2: ", holding, "price2: ", price);
    if (!holding) {
      res.status(404).send({
        message: "No stock to sell",
      });
    } else if (quantity > holding.quantity) {
      res.status(422).send({
        message: "Insufficient quantity",
      });
    } else {
      const newQuantity = holding.quantity - quantity;
      const newHolding =
        newQuantity === 0
          ? Holding.destroy({ where: { userId: id, symbol: symbol } })
          : Holding.update(
              { quantity: newQuantity },
              { where: { userId: id, symbol: symbol } }
            );

      const newBalance = user.balance + price.c * quantity;
      const newUser = User.update(
        { balance: newBalance },
        { where: { id: id } }
      );
      const newTransaction = Transaction.create({
        userId: id,
        symbol: symbol,
        quantity: quantity,
        price: price.c,
        time: Date.now(),
      });
      Promise.all([newHolding, newUser, newTransaction]).then((data) => {
        const newHolding = data[0];
        const newTransaction = data[2];
        console.log("newHolding: ", {
          holding: {
            id: holding.id,
            userId: id,
            quantity: newQuantity,
            symbol: symbol,
          },
        });

        res.status(200).send({
          updatedInfo: {
            balance: newBalance,
            transaction: newTransaction,
            holding: {
              id: holding.id,
              userId: id,
              quantity: newQuantity,
              symbol: symbol,
            },
          },
        });
      });
    }
  });
};

exports.sellStockRealShitMode = (req, res) => {
  const symbol = req.query.symbol;
  const quantity = Number(req.query.quantity);
  const id = req.user.fulfillmentValue.id;
  if (!symbol || !quantity || !id) {
    res.status(404).send({
      message: "Missing symbol or quantity",
    });
  }
  const user = User.findOne({ where: { id: id } }).then((user) => {
    const exsistingHolding = Holding.findOne({
      where: { userId: id, symbol: symbol },
    }).then((exsistingHolding) => {
      if (!exsistingHolding) {
        res.status(404).send({
          message: "No stock to sell",
        });
      } else {
        const price = getStockPrice(symbol).then((price) => {
          const newBalance = user.balance + price.c * quantity;
          const newUser = User.update(
            { balance: newBalance },
            { where: { id: id } }
          ).then((newUser) => {
            const newTransaction = Transaction.create({
              userId: id,
              symbol: symbol,
              quantity: -quantity,
              price: price.c,
              time: Date.now(),
            }).then((newTransaction) => {
              const newQuantity = Number(exsistingHolding.quantity) - quantity;
              const newHolding = Holding.update(
                { userId: id, quantity: newQuantity },
                { where: { userId: id } }
              ).then((newHolding) => {
                res.status(200).send({
                  updatedInfo: {
                    balance: newBalance,
                    transaction: newTransaction,
                    holding: {
                      id: exsistingHolding.id,
                      userId: id,
                      quantity: newQuantity,
                      symbol: symbol,
                    },
                  },
                });
              });
            });
          });
        });
      }
    });
  });
};

exports.buyStock = (req, res) => {
  const symbol = req.query.symbol;
  const quantity = Number(req.query.quantity);
  //cast as a number
  if (!symbol || !quantity) {
    res.status(404).send({
      message: "Missing symbol or quantity",
    });
  }

  console.log("symbol: ", symbol);
  console.log("quantity: ", quantity);

  getStockPrice(symbol)
    .then((price) => {
      return price;
    })
    .then((price) => {
      console.log("price: ", price.c);

      const id = req.user.fulfillmentValue.id;
      User.findOne({ where: { id: id } })
        .then((user) => {
          const balance = user.balance;
          console.log("balance: ", balance);
          if (!balance || balance < price.c * quantity) {
            res.status(404).send({
              message: "Insufficient funds",
            });
          }
          const newBalance = balance - price.c * quantity;
          if (newBalance < 0) {
            res.status(404).send({
              message: "Insufficient funds",
            });
          }
          User.update({ balance: newBalance }, { where: { id: id } })
          
          //create transaction
          const transaction = {
            userId: id,
            symbol: symbol,
            quantity: quantity,
            price: price.c,
            time: Date.now(),
          };
          Transaction.create(transaction);

          Holding.findOne({
            where: { userId: id, symbol: symbol },
          })
          .then((previouslyOwned) => {
          if (previouslyOwned) {
            console.log("previouslyOwned: ", previouslyOwned);
            const newQuantity = previouslyOwned.quantity + quantity;
            Holding.update(
              { quantity: newQuantity },
              { where: { userId: id, symbol: symbol } }
            );
          } else {
            Holding.create({
              userId: id,
              symbol: symbol,
              quantity: quantity,
            });
          }
        })

        .then(() => {
          res.status(200).send({
            message: "Stock purchased",
          });
        })
        .catch((err) => {
          console.log("err: ", err);
          res.status(404).send({
            message: "Error retrieving stock",
          });
        });
    });
  });
};

//crap after this

getStockPrice(symbol)
.then((price) => {
  console.log('user balance: ', user.balance)
  console.log('price: ', price.c)
  //TODO: check to make sure req.user balance updates with User.update 
  if (!balance || balance < price.c * quantity) {
    res.status(404).send({
      message: "Insufficient funds",
    });
  } else {
    const newBalance = balance - price.c * quantity;
    req.session.passport.user.balance = newBalance;
    User.update({ balance: newBalance }, { where: { id: id } })
      .then((user) => {
        console.log("user: ", user);
        User.findOne({ where: { id: id } }).then((user) => {
          console.log("found user: ", user);
          });
          

          
      })

    }
  })
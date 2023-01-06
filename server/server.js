const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");


//dev cors options
// const corsOptions = {
//   origin: 'http://localhost:3000', credentials: true
// }

// docker/nginx cors options
const DOCKER_CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
const corsOptions = {
  origin: DOCKER_CLIENT_ORIGIN, credentials: true
}


const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local")//.Strategy;


const router = require("./routes");



app.use(express.json()); //switch when passport is enabled
app.use(express.urlencoded({extended: false})) //switch when passport is enabled
// app.use(bodyParser.json());

app.use(cors(corsOptions));

const db = require("./models");

app.use(session({ 
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const {strategy} = require('./util/passport')
passport.use(strategy);
passport.serializeUser( (userObj, done) => {
  done(null, userObj)
});
passport.deserializeUser( (userObj, done) => {
  done(null, userObj)
});



app.use((req, res, next) => {
  // const {cookies} = req;
  console.log("route hit was: ", req.url);
  //console.log('URI: ', req)
  // if ('sessionId' in cookies) {
  //   console.log('sessionId cookie found', cookies.sessionId)
  // } else {
  //   console.log('sessionId cookie not found')
  // }
  // console.log('query',req.query)
  next();
});

const User = db.User;
const Holding = db.Holding;
const Transaction = db.Transaction;
const Watchlist = db.Watchlist;
const Stock = db.Stock;

// app.use('/sync', (req, res) => {//docker route
app.use("/api/sync", (req, res) => {//dev route
  console.log("hit sync");
  db.sequelize.sync({ force: true }).then(() => {
    console.log("sync db");
  })
  .then(() => {
    //load some data
    const user1 = User.create({
      balance: 10000,
      username  : "username1",
      password  : "password1",
    });
    const stock1 = Stock.create({
      symbol: "AAPL",
      name: "Apple",
    });
    const stock2 = Stock.create({
      symbol: "MSFT",
      name: "Microsoft",
    });
    const stock3 = Stock.create({
      symbol: "GOOG",
      name: "Google",
    });
    const stock4 = Stock.create({
      symbol: "AMZN",
      name: "Amazon",
    });
    const stock5 = Stock.create({
      symbol: "AMZA",
      name: "Amazing Tree service",
    });
    const holding1 = Holding.create({
      quantity: 10,
      symbol: "AAPL",
      userId: 1,
    });
    const holding2 = Holding.create({
      quantity: 20,
      symbol: "MSFT",
      userId: 1,
    });
    const transaction1 = Transaction.create({
      time: Date.now(),
      price:100,
      quantity: 10,
      symbol: "AAPL",
      userId: 1,
    });
    const watchlist1 = Watchlist.create({
      symbol: "AAPL",
      userId: 1,
    });
    const watchlist2 = Watchlist.create({
      symbol: "MSFT",
      userId: 1,
    });
    return Promise.all([user1, stock1, stock2, stock3, stock4, stock5, holding1, holding2, transaction1, watchlist1, watchlist2]);
  })
  .then(() => {



    res.send("synced db");
  });
});

// app.use("/api", router);//dev route
app.use('/api', router)//docker route

app.get("/test", (req, res) => {
  console.log("test route hit");
  res.send("hello world");
});

app.get("/home", (req, res) => res.send("Home!"));

app.use((req, res) => {
  //left over routes
  console.log("hit 404");
  console.log("route hit was: ", req.url);
  res.status(404).send("404 not found");
});

const PORT = process.env.API_DOCKER_URL || 5000;
app.listen(PORT, () => {
  console.log(`🎇🎇🎇Server is running on port ${PORT}.`);
});

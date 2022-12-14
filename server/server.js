const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const corsOptions = {
  // origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
  origin: "*",
};

const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local")//.Strategy;


const router = require("./routes");



app.use(express.json()); //switch when passport is enabled
app.use(express.urlencoded({extended: false})) //switch when passport is enabled

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
  // if ('sessionId' in cookies) {
  //   console.log('sessionId cookie found', cookies.sessionId)
  // } else {
  //   console.log('sessionId cookie not found')
  // }
  console.log
  next();
});

app.use("/api/sync", (req, res) => {
  console.log("hit sync");
  db.sequelize.sync({ force: true }).then(() => {
    console.log("sync db");
  });
  res.send("synced db");
});

app.use("/api", router);

app.get("/test", (req, res) => {
  console.log("test route hit");
  res.send("hello world");
});

app.get("/", (req, res) => res.send("Home!"));

app.use((req, res) => {
  //left over routes
  console.log("hit 404");
  console.log("route hit was: ", req.url);
  res.status(404).send("404 not found");
});

const PORT = process.env.NODE_DOCKER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

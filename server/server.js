const express = require("express");
const app = express();

const cors = require("cors");
const router = require("./routes");

var corsOptions = {
  // origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
  origin: "*",
};

app.use(express.json()); //switch when passport is enabled
app.use(express.urlencoded({ extended: true })); //switch when passport is enabled

app.use(cors(corsOptions));
const dotenv = require("dotenv");
dotenv.config();

const db = require("./models");

//passport config later
/*
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");
const authUser = require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSIONS_SECRET || "flippintroopsaloottas",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(new LocalStrategy(authUser));
passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

app.post ("/login", passport.authenticate('local', {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
}))
*/

app.use((req, res, next) => {
  console.log("route hit was: ", req.url);
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

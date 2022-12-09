//basic express server
// const keys = require('./config/keys');
const express = require('express');
const app = express();

const cors = require("cors");
const routes = require("./routes");

//cors allowed for localhost 3000
var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/api/test', (req, res) => {
  console.log('test route hit');
  res.send('hello world');
});

// const { getPostgresDbItem } = require('./DB/postgres');
// app.get('/api/db', (req, res) => {
//   getPostgresDbItem(req, res);
// });


//mysql connection
// const { db } = require('./DB/MySQLDB');
// db.connect((err) => {
//   if (err) {
//     console.log('error connecting to mysql db');
//     throw err;
//   }
//   console.log('mysql connected');
// });

const db = require("./models");



app.get('/', (req, res) => res.send('Home!'));

app.get('/a', (req, res) => {
console.log('hit a');
  db.sequelize.sync().then(() => {
    console.log('sync db');
  })
  res.send('synced db');
});



const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// import { deletePostgresItem, getPostgresDbItem, createPostgresDbItem, updatePostgresItem  } from "./postgresdb-item";
// const parser = json();
// app.get('/postgres-item/:id', parser, getPostgresDbItem);
// app.get('/postgres-item', parser, getPostgresDbItem);
// app.post('/postgres-item', parser, createPostgresDbItem);
// app.put('/postgres-item/:id', parser, updatePostgresItem);
// app.delete('/postgres-item/:id', parser, deletePostgresItem);


/*


before
pgClient.on('error', () => console.log('Lost PG connection'));
 
pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

  after
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

*/

//postgress client setup:
/*
const { Client } = require('pg');
const client = new Client({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port,
});
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});
*/





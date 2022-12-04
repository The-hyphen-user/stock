//basic express server
const keys = require('./config/keys');
const express = require('express');
const app = express();
const port = 5000;

//cors allowed for localhost 3000
const cors = require('cors');
app.use(cors(origin = 'http://localhost:3000'));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/test', (req, res) => {
  console.log('test route hit');
  res.send('hello world');
});

const { getPostgresDbItem } = require('./DB/postgres');
app.get('/api/db', (req, res) => {
  getPostgresDbItem(req, res);
});


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



app.get('/', (req, res) => res.send('Home!'));

app.listen(port, () => console.log(`👂 app listening on port ${port}!`));


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
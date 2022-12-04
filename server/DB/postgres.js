const pool = require('../config/postgres');



  async function getPostgresDbItem (req, res) {
  try{
    console.log('hit enpoint db');

    if(pool){
      console.log('pool is good');
    }

    const client = await pool.connect();
    if (client) {
      console.log('client connected');
    }
    if(!req.params.id) {
      const toRet = await client.query('SELECT * from items');
      queryResult = toRet.rows;
    } else {
      const toRet = await client.query('SELECT * from stocks WHERE id = $1', [req.params.id]);
      queryResult = toRet.rows[0];      
    } 
    client.release();
    return res.status(200).json(queryResult);
  } catch (error) {
    return res.status(500).json('Error on getPostgresDbItem' + error)
  }

}

module.exports = { getPostgresDbItem };
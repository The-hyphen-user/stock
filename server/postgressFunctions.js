import { pool } from './config/postgres';



export async function getDBItem(req, res) {
  try{

    const client = await pool.connect();
  } catch (error) {
    return res.status(500).json('Error on getPostgresDbItem' + error)
  }

}
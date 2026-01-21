import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();


//Database connect-------
//Preparing Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }).promise()

const result = await pool.query("SELECT * FROM user");
console.log(result);

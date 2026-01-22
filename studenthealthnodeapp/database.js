import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

//Database connect-------
//Preparing Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//Tests Node's connection to the Database in MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Connection Failed", err.message);
  } else {
    console.log("Database is Connected");
    connection.release();
  }
});

export default pool;

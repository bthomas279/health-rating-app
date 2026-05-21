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
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  }
});

//Tests Node's connection to the Database in MySQL
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database is Connected");
    connection.release();
  } catch (err) {
    console.error("Connection Failed:", err.message);
  }
}
testConnection();

export default pool;



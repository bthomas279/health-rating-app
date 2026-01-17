const mysql = require("mysql2");

//Connection pool. Collection of database connections.
//Used to pre-create multiple connections to the database.
//Avoids creating a new connection for every query.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;

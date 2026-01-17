//Prepares app

const dontenv = require("dotenv");

//Imports express so sever can be created
const express = require("express");

//Creates express application
const app = express();
const port = process.env.PORT || 3000;
dontenv.config();

//Preparing pool
const pool = require("./db_connect")


//Tests API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working." });
});

//Tests SQL Database Connection
//Test using http://localhost:3000/api/test-db
app.get("/api/test-db", (req, res) => {
  pool.query("SELECT 1", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Database is properly connected." });
  });
});

//Query Data in the database (Should be blank because nothing in currently in there.)
//Test using http://localhost:3000/api/users
app.get("/api/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.mesage });
    }
    res.json(results);
  });
});

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port: ", port);
});

import db from "./database.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
//Doing Imports because type is module 

//Creates express application
const app = express();
const port = process.env.PORT

//Tests API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working." });
});

//Tests SQL Database Connection
app.get("/test-db", (req, res) => {
  db.query("SELECT * FROM student_health_schema", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port:", port);
});

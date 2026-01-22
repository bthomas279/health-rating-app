//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";

//
import health_db from "./database.js";

//Dotenv configuration
dotenv.config();

//Creates express application
const app = express();
const port = process.env.PORT;

//Tests API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working." });
});

//Tests Grabbing Values from MySQL Database
const [rows] = await health_db.query("SELECT * FROM users");
console.log(rows);

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port:", port);
});

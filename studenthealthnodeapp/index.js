// import db from "./database.js";
import dotenv from "dotenv";
import express from "express";
import mysql from 'mysql2/promise';
dotenv.config();
//Doing Imports because type is module


//Creates express application
const app = express();
const port = process.env.PORT;

//Tests API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working." });
});


//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port:", port);
});

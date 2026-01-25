//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

//Importing Database
//import health_db from "database.js";

//Dotenv configuration
dotenv.config();

//Creates express application
const app = express();

//Tells app to use ejs
app.set("view-engine", "ejs");

app.use(cors());
app.use(express.json());

//Parse Incoming Requests sent by HTML forms
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const port = process.env.PORT;

//Tests API endpoint
//app.get("/api/test", (req, res) => {
//  res.json({ message: "API is working." });
//});

//Tests Grabbing Values from MySQL Database
//const [rows] = await health_db.query("SELECT * FROM users");
//console.log(rows);

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port:", port);
});

//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

//Importing database to be used in index.js
import health_db from "./database.js";

//Dotenv configuration
dotenv.config();

//Creates express application
const app = express();

//Tells app to use ejs. Use ejs as view engine
app.set("view engine", "ejs");

//Define usage and port
app.use(cors());
//Convert data into json
app.use(express.json());
const port = process.env.PORT;

//Parse Incoming Requests sent by HTML forms
app.use(express.urlencoded({ extended: true }));

//Connect style.css to views
app.use(express.static("public"));

//Render Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

//Render Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

//Register user and sends information from user to MySQL Database-------------------
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    //Protecting user passwords through hash
    const hashPassword = await bcrypt.hash(password, 12);

    //Logs User input
    console.log(
      "The app is sending user data - ",
      "Username:",
      username,
      "Password:",
      hashPassword,
    );

    //Database Querying
    const sql = `INSERT INTO users (username, user_password) VALUES (?, ?)`;
    await health_db.execute(sql, [username, hashPassword]);

    //If Username/Password were added, sends user to login page
    res.redirect("/login");
  } catch (err) {
    //Flags send attempt if username was already used
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).render("/signup", {
        error: "Username already exists. Please select a different username.",
      });
    }
    res.status(201).json({ message: "Account successfully registered!" });
  }
});

//Check if the username and password match ones in the MySQL database.
//If so, logs user in and sends them to home.ejs. 
app.get("/api/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const [rows] = await health_db.execute(
      "SELECT username FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json(rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });

  }
});

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on http://localhost:", port);
});
//Access Using http://localhost:3000

//Tests API endpoint
//app.get("/api/test", (req, res) => {
//  res.json({ message: "API is working." });
//});

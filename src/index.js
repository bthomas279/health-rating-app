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
app.get("/", (req, res) => {
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

    //Database Query
    health_db.query(
      "INSERT INTO users (username, user_password) VALUES (?, ?)",
      [username, hashPassword],
      (err) => {
        if (err) {
          //Flags send attempt if username was already used
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ 
              error: "Username already exists. Please select a different username."
            });
          }
          return res.status(500).json({
            error: "Database error"
          });
        }
        res.status(201).json({ message: "Account successfully registered!" });
      },
    );
  } catch (err) {
    res.json({ error: "Server error" });
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

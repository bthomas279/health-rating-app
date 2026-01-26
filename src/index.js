//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

//Importing database to be used in index.js
import health_db from "database.js";

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
app.use(express.urlencoded({ extended: false }));

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
  try {
     const { username, password } = req.body;

  //Protecting user passwords through hash
  const hashPassword = await bcrypt.hash(password, 12);
  console.log("Data to be sent:", username, hashPassword);

  health_db.query(
    "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
    [username, hashPassword],
    (err) => {
      //Flags send attempt if username was already used
      if (err) {
        return res.status(400).json({ error: "Username already exists" });
      }
      res.json({ message: "Account successfully registered!" });
    }
  );
} catch (err) {
   res.status(500).json({ error: "Server error" });
  }
});
 

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port:", port);
});
//Access Using http://localhost:port

//Tests API endpoint
//app.get("/api/test", (req, res) => {
//  res.json({ message: "API is working." });
//});

//Tests Grabbing Values from MySQL Database
//const [rows] = await health_db.query("SELECT * FROM users");
//console.log(rows);

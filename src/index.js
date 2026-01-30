//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

//Session Middleware import
//This is for the server to remember the user
import session from "express-session";

//Importing database to be used in index.js
import health_db from "./database.js";

//Dotenv configuration
dotenv.config();

//Creates express applications
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

//Express-session configuration.
//Works by storing session ID in a cookie and session data on the server
app.use(session({
  secret: process.env.SESSION_CODE, //Session password
  resave: false, //Controls if session is saved on every user habit data submission 
  saveUnititialized: false //Controls if empty sessions are saved
}))


//PAGE RENDERS------------------------
//Render Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

//Render Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

//Render Home Page
app.get("/home", (req, res) => {
  res.render("home");
});

//Transfer user habit input data to MySQL database------------------
app.post("/home", async (req, res) => {
  const {
    sleep_hours,
    tv_hours,
    diet_quality,
    exercise_frequency_weekly,
    daily_study_hours,
    social_media_hours,
    part_time_job,
    extracurricular_participation,
  } = req.body;
  //Testing grab
  console.log(
    sleep_hours,
    tv_hours,
    diet_quality,
    exercise_frequency_weekly,
    daily_study_hours,
    social_media_hours,
    part_time_job,
    extracurricular_participation,
  );

  try {
    //Log data transfer
    console.log("User habit data is transfering.");

    //Database Querying
    const sql = `INSERT INTO user_habits (sleep_hours, tv_hours, diet_quality, 
    exercise_frequency_weekly,
    daily_study_hours,
    social_media_hours,
    part_time_job,
    extracurricular_participation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await health_db.execute(sql, [
      sleep_hours,
      tv_hours,
      diet_quality,
      exercise_frequency_weekly,
      daily_study_hours,
      social_media_hours,
      part_time_job,
      extracurricular_participation,
    ]);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error inside /home app.post");
  }
});

//Register user and sends information from user to MySQL Database-------------------
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    //Protecting user passwords through hash
    const hashPassword = await bcrypt.hash(password, 12);

    //Logs User input
    console.log(
      "The app is sending username and password",
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
    console.log("Account successfully registered!");
  }
});

//Check if the username and password match ones in the MySQL database-------------
//If so, logs user in and sends them to home.ejs.
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //Testing connection
  console.log("Grabbed data");

  try {
    //Attempt to grab username column and password column from database
    const sql = "SELECT user_password FROM users WHERE username = ?";

    //Use await instead of health_db query due to mysql2/promise
    //data_pull = Resulting in row grab from database or lack thereof
    const [data_pull] = await health_db.execute(sql, [username]);

    //If the user (username) is not found, sends error.
    if (data_pull.length === 0) {
      return res.status(401).send("Username or password is incorrect.");
    }

    //Protecting user passwords through hash
    const hashPassword = data_pull[0].user_password;

    //Logs user info (MAY REMOVE LATER)
    console.log(
      "Checking info entered - Username:",
      username,
      "Password:",
      hashPassword,
    );

    //Var to Compare inputed password and password in database
    const match = await bcrypt.compare(password, hashPassword);

    //If passwords don't match, sends error.
    if (!match) {
      return res.status(401).send("Username or password is incorrect");
    }
    //Successful connection. Send user to home_page.
    res.redirect("/home");

    //With successful connection, opens session for user based on their id
    req.session.

  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error inside /login app.post");
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

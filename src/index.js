//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

//Session Middleware import
//This is for the server to remember the user_id
import session from "express-session";

//Importing routes
import signupRoute from "../routes/signup.js";
import loginRoute from "../routes/login.js";
import homeRoute from "../routes/home.js";
import logoutRoute from "../routes/logout.js";
import uniDirectRoute from "../routes/logout.js";

//Dotenv configuration
dotenv.config();

//Creates express applications
const app = express();
const port = process.env.PORT;

//Tells app to use ejs. Use ejs as view engine.
app.set("view engine", "ejs");

//Middleware----------------------------
//Define usage and port
app.use(cors());
//Convert data into json
app.use(express.json());

//Parse Incoming Requests sent by HTML forms
app.use(express.urlencoded({ extended: true }));

//Connect style.css to views
app.use(express.static("public"));

//Express-session configuration.
//Works by storing session ID in a cookie and session data on the server
app.use(
  session({
    secret: process.env.SESSION_CODE, //Session password
    resave: true, //Controls if session is saved on every user habit data submission
    saveUninitialized: true, //Controls if empty sessions are saved
    cookie: {
      secure: false, //false due to use of  http
    }
  }),
);

//Access all three routes from the routes folder
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/home", homeRoute);
app.use("/logout", logoutRoute);
app.use("/", uniDirectRoute)

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("Server running on http://localhost:",port);
});
//Access Using http://localhost:3000

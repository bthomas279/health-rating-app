//Doing Imports because type is module
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

//Imports to help with deployment
import { fileURLToPath } from 'url';
import path from 'path';
import MySQLStoreFactory from "express-mysql-session";
import health_db from "../src/database.js"

//Session Middleware import
//This is for the server to remember the user_id
import session from "express-session";

//Importing routes
//Allows pages to be used by server
import signupRoute from "../routes/signup.js"; //For signup
import loginRoute from "../routes/login.js"; //For login
import homeRoute from "../routes/home.js"; //For home
import logoutRoute from "../routes/logout.js"; //For logout
import uniDirectRoute from "../routes/universal.js"; //For base url "/"
import visualRoute from "../routes/visuals.js"; //For visuals page

//Dotenv configuration
dotenv.config();

//Creates express applications
const app = express();
const port = process.env.PORT;

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, '../views'));


//Tells app to use ejs. Use ejs as view engine.
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '../public')));

//Middleware----------------------------
//Define usage and port
app.use(cors());
//Convert data into json
app.use(express.json());

//Parse Incoming Requests sent by HTML forms
app.use(express.urlencoded({ extended: true }));

//Connect css files to views
app.use(express.static("public"));

//Express-session configuration.
//Works by storing session ID in a cookie and session data on the server
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000, //15 minutes
  expiration: 86400000, //1 day
  createDatabaseTable: true, //Auto create table if missing
}, health_db);

app.use(
  session({
    secret: process.env.SESSION_CODE, //Session password
    resave: true, //Controls if session is saved on every user habit data submission
    saveUninitialized: true, //Controls if empty sessions are saved
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV,
    }
  }),
);

//Access all routes from the routes folder
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/home", homeRoute);
app.use("/logout", logoutRoute);
app.use("/visuals", visualRoute);
app.use("/", uniDirectRoute);


//Opens and runs the server to allow incoming requests
//app.listen(port, () => {
//  console.log("Server running on http://localhost:",port);
//});

export default app
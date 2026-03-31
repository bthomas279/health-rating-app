import express from "express";
import bcrypt from "bcrypt";
//Importing database to be used in index.js
import health_db from "../src/database.js";

const router = express.Router();

//REST APIs (GET, POST)
//Render Signup Page Route
router.get("/", (req, res) => {
  res.render("signup", {
    reason: req.query.reason
  });
});

//Register user and sends information from user to MySQL Database-------------------
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    //Protecting user passwords through hash
    const hashPassword = await bcrypt.hash(password, 12);

    //Logs User input
    console.log(
      "The app is sending username and password",
      "Username:",
      username
    );

    //Database Querying
    const sql = `INSERT INTO users (username, user_password) VALUES (?, ?)`;
    //Adding username and password to database
    await health_db.execute(sql, [username, hashPassword]);

    //If Username/Password were added, sends user to login page
    res.redirect("/login");

  } catch (err) {
    //Flags send attempt if username was already used
    if (err.code === "ER_DUP_ENTRY") {
      //Database returns "ER_DUP_ENTRY"
      console.log("That username already exists.");
      return res.status(400).redirect("/signup?reason=userExist");
      
    }
    console.log("Account successfully registered!");
  }
});

export default router;

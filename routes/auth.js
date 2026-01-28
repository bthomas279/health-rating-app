import express from "express";
import bcrypt from "bcrypt";
import health_db from "./database.js";

//Defining Router
const router = express.Router();

//Check if the username and password match ones in the MySQL database.
//If so, logs user in and sends them to home.ejs.
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //Attempt to grab username column and password column from database
  const sql = "SELECT user_password, FROM users WJERE username = ?";

  health_db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }

    //If the user (username) is not found, sends error.
    if (results.length === 0) {
      return res.status(401).send("Username or password is incorrect.");
    }

    //Protecting user passwords through hash
    const hashPassword = results[0].password;

    //Var to Compare inputed password and password in database
    const match = await bcrypt.compare(password, hashPassword);

    //If passwords don't match, sends error.
    if (!match) {
      return res.status(401).send("Username or password is incorrect");
    }

    //Successful connection
    res.send("Login successful");

    //Send user to home_page
    res.redirect("/home");
  });
});

export default router;
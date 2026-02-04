import express from "express";
import bcrypt from "bcrypt";
//Importing database
import health_db from "../src/database.js";
//This is for the server to remember the user_id
import session from "express-session";

const router = express.Router();

//REST APIs (GET, POST)
//Render Login Page Route
router.get("/", (req, res) => {
  res.render("login", {
    //Displays reason user was removed from home page if they attempted to enter their habit data.
    reason: req.query.reason 
  });
});


//Check if the username and password match ones in the MySQL database-------------
//If so, logs user in and sends them to home.ejs.
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  //Testing connection
  console.log("Grabbed data");

  try {
    //Attempt to grab user_id, username column and password column from database
    const sql =
      "SELECT user_id, username, user_password FROM users WHERE username = ?";

    //Use await instead of health_db query due to mysql2/promise
    //data_pull = Resulting in row grab from database or lack thereof
    const [data_pull] = await health_db.execute(sql, [username]);

    //If the user (username) is not found, sends error.
    if (data_pull.length === 0) {
      return res.status(401).send("Username or password is incorrect.");
    }

    //Protecting user passwords through hash
    const hashPassword = data_pull[0].user_password;

    //Console log update
    console.log("Checking info entered -", "Username:", username);

    //Var to Compare inputed password and password in database
    const match = await bcrypt.compare(password, hashPassword);

    //If passwords don't match, sends error.
    if (!match) {
      return res.status(401).send("Username or password is incorrect");
    }
    //If passwords match...
    if (match) {
      //Saves the user id and username to the session
      req.session.users = {
        user_id: data_pull[0].user_id,
        username: data_pull[0].username,
      };

      //req.session.userId = data_pull[0].user_id;
      //Saves the username to the session
      //req.session.username = data_pull[0].username;

      //Saves session. Returns to login page if error occurs
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.redirect("login");
        }
      });

      //Successful connection. Send user to home_page.
      console.log("Login successful!");
      //console.log(req.session.userId);
      //console.log(req.session.username)
      res.redirect("/home");
    }

    //Error catch
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error inside login").redirect ;
  }
});

export default router;

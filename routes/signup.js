import express from "express";
import router from express.Router();


//Render Signup Page Route
router.get("/signup", (req, res) => {
  res.render("signup");
});

//Register user and sends information from user to MySQL Database-------------------
router.post("/signup", async (req, res) => {
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
    //Attempt to grab user_id, username column and password column from database
    const sql = "SELECT user_id, user_password FROM users WHERE username = ?";

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
    //Successful connection. Send user to home_page.
    console.log("Login successful!");
    res.redirect("/home");

    //With successful connection, saves session for user based on their user_id
    req.session.userId = data_pull[0].user_id;
    console.log(req.session.userId);

    //Error catch
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error inside login");
  }
});
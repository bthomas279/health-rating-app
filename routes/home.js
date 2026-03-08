import express from "express";
import session from "express-session";
//Importing database to be used in index.js
import health_db from "../src/database.js";

const router = express.Router();

//Middleware user
//Meant to cut user out of home page if they logout/don't have a session
function userAuth(req, res, next) {
  
  //Returns user to login if they attempt to access the home page without a session
  if (!req.session.users) {

    //Displays a message if user attempted to submit habit data in destroyed session
    //Responds only when using router.post
    if (req.method === "POST") {
      return res.redirect("/login?reason=sessionDNE"); //"Route,Query,parameter name=parameter value"
    }
    return res.redirect("/login");
  }

  //Continue if session exists
  next();
}

//Activate function specifically in home router
router.use(userAuth);

//REST APIs (GET, POST)
//Render Home Page Route
router.get("/", (req, res) => {
  res.render("home");
});

//Transfer user habit input data to MySQL database------------------
router.post("/", async (req, res) => {
 
  //Defining userId
  //Used to define users on platform and filling user_id foreign key.
  const userId = req.session.users.user_id;
  
  //Will eventually be used to display the username in the home page.
  const username = req.session.users.username;

  //Check if the user_id is blank. If so, user is kicked to login page.
  if (!userId) {
    return res.redirect("/login");
  }

  //Grab user input values
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
    //Log the data transfer
    console.log("User habit data is transferring.");

    //Database Querying
    const sql = `INSERT INTO user_habits (user_id, sleep_hours, tv_hours, diet_quality, 
    exercise_frequency_weekly,
    daily_study_hours,
    social_media_hours,
    part_time_job,
    extracurricular_participation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    //Send information to MySQL database
    await health_db.execute(sql, [
      userId,
      sleep_hours,
      tv_hours,
      diet_quality,
      exercise_frequency_weekly,
      daily_study_hours,
      social_media_hours,
      part_time_job,
      extracurricular_participation,
    ]);
  
    console.log("Data transfer successful");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error inside home");
  }
});

//POST (alert) for when user sucessfully submits their habit data to the database
//CURRENTLY NOT BEING USED! Does not operate!
//router.post("/home", async (req, res) => {
//res.redirect("/home?success=true")
//});

export default router;

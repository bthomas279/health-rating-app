import express from "express";
import session from "express-session";
//Importing database to be used in form submission
import health_db from "../src/database.js";
//Importing model fetch
import modelCall from "../src/model_call.js";

const router = express.Router();

//Middleware-------------------
//Meant to cut user out of home page if they logout/don't have a session
function userAuth(req, res, next) {
  //Returns user to login if the attempt to access the home page without a session
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
  res.render("home", { regRating: null, classRating: null }); //Prevents a blank rating from automatically appearing
});

router.post("/", async (req, res) => {
  //Transfer user habit input data to MySQL database------------------
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
    rating_type,
    sleep_hours,
    tv_hours,
    diet_quality,
    exercise_frequency_weekly,
    daily_study_hours,
    social_media_hours,
    part_time_job,
    extracurricular_participation,
  } = req.body;
  try {
    //Log the data transfer
    console.log("User habit data attempting transfer to database.");

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
  } catch (db_err) {
    console.error("Database error", db_err);
    return res.status(500).send("Database Server Error inside home");
  }

  //Model calling----------------------
  try {
    console.log("Attempting to call model");

    //Call model
    const response = await modelCall(req.body);

    //Define rating value
    const regModelRating = response.reg_rating;
    const classModelRating = response.class_rating;

    //View connection output
    //Rating
    console.log("The model's Regression rating:", regModelRating);
    console.log("The model's Classification rating:", classModelRating);
    //Values model viewed
    console.log("The model saw this:", response.users_data);

    //Send the mental health data to the MySQL Database
    //mental_health_scores table database querying
    const scoreTableSQL = `INSERT INTO mental_health_scores (app_user_id, reg_mental_health_rating, class_mental_health_rating) VALUES (?, ?, ?)`;

    //Send that data!
    await health_db.execute(scoreTableSQL, [userId, regModelRating, classModelRating]);

    //Render the home page with the rating included.
    //This allows for the user to see their rating in the home page
    res.render("home", {
      regRating: regModelRating,
      classRating: classModelRating,
    });
  } catch (ml_err) {
    //Error message for rating
    console.error("Model error:", ml_err);
    return res
      .status(500)
      .send("FastAPI Server Error inside home (FastAPI server may be off) | Location: Model");
  }
});

export default router;

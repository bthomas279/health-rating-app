import express from "express";
import session from "express-session";
//Importing database to be used in form submission
import health_db from "../src/database.js";
//Importing model fetch
import modelCall from "../src/model_call.js";

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
  //Obj to contain all query parameters (predicted rating  ie. (rating: x)).
  const response = req.query.response.rating || null;
  //Assign req.query.rating to rating value if exists, undefined if not.

  res.render("home", { response });
});

//Transfer user habit input data to MySQL database------------------
router.post("/submit", async (req, res) => {
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
  console.log(req.body);

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
  //Turn strings into integers

  try {
    console.log("Attempting to call model");

    //Call model
    const response = await modelCall(req.body);

    //View connection output
    //Rating
    console.log("The model's rating:",response.rating);
    //Values model viewed
    console.log("The model saw this:",response.users_data)


  } catch (ml_err) {
    //Error message for rating
    console.error("Model error:", ml_err);
    return res
      .status(500)
      .send("Model Server Error inside home (Model server may be off)");
  }
});

export default router;

import express from "express";
//Importing database to be used in index.js
import health_db from "../src/database.js";
//Used to transfer user_id between routes
import session from "express-session";

const router = express.Router();

//Render Home Page Route
router.get("/", (req, res) => {
  res.render("home");
});

//Transfer user habit input data to MySQL database------------------
router.post("/", async (req, res) => {
  //Defining userId
  //Used to define users on platform and filling user_id foreign key
  const userId = req.session.userId;
  const username = req.session.username;
  console.log(userId);

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
    //Log data transfer
    console.log("User habit data is transfering.");

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
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error inside home");
  }
});

export default router;

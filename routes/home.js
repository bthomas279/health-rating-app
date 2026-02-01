import express from "express";

//Importing database to be used in index.js
import health_db from "../src/database.js";


const router = express.Router();

//Render Home Page Route
router.get("/", (req, res) => {
  res.render("home");
});

//Get request to logout. Activates when clicking logout button.
router.get("/logout", (req, res) => {
  //Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/home");
    }
    //Delete Cookie
    res.clearCookie("connect.name");
    res.redirect("login");
  });
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

import express from "express";
//Importing database
import health_db from "../src/database.js";

const router = express.Router();

//REST APIs (GET, POST)
//Render Visual Page Route
router.get("/", (req, res) => {
  res.render("visuals");
});

//POST Router (grab data first)
router.post("/", async (req, res) => {
  //Define the userId from the login page
  const userId = req.session.users.user_id;

  //Check if the userId exists, if not, show a error
  if (!userId) {
    return res.status(500).send("User session/id not found");
  } else {
    console.log("Session found. User Id:", userId); //Remove later
  }

  //Database querying
  const sql = `SELECT app_user_id, mental_health_ratings FROM mental_health_scores 
  WHERE app_user_id = ?`;

  //Variable to grab all mental health rating
  const ratingGrab = await health_db.execute(sql, [userId])

  //Test the grab
  console.log(ratingGrab[0].mental_health_ratings)



  //Grab all the rating data and dates from the user in the session


});

//Export Router
export default router;

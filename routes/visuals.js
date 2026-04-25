import express from "express";
//Importing database
import health_db from "../src/database.js";
//Import chart
import Chart from 'chart.js/auto';

const router = express.Router();

//Middleware-------------------
//Meant to cut user out of visuals page if they logout/don't have a session
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

//Activate function specifically in visuals router
router.use(userAuth);


//REST APIs (GET, POST)
//Render Visual Page Route
router.get("/", (req, res) => {
  res.render("visuals");
});

//POST Router (grab data first)
router.post("/", async (req, res) => {
  //Define the userId from the login page
  const userId = req.session.users.user_id;

  //Grab user request
  const {visual} = req.body

  //Check if the userId exists, if not, show a error
  if (!userId) {
    return res.status(500).send("User session/id not found");
  } else {
    console.log("Session found. User Id:", userId); //Remove later
  }

  //Database querying
  const sql = `SELECT app_user_id, mental_health_rating, created_at FROM mental_health_scores 
  WHERE app_user_id = ?`;

  //Variable to grab all mental health ratings under userId
  const ratingGrab = await health_db.execute(sql, [userId])

  //Test the grab
  console.log(ratingGrab.app_user_id)

  //Create the canvas
  console.log(visual)
  const canvas = document.createElement('canvas');
  canvas.id = 'ratingChart'

  const ratingChart = new Chart(ratingGrab)




});

//Export Router
export default router;

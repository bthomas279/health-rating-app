import express from "express";
//Importing database
import health_db from "../src/database.js";

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
  res.render("visuals", { image: null });
});

//POST Router (grab data first)
router.post("/", async (req, res) => {
  //Define the userId from the login page
  const userId = req.session.users.user_id;

  //Grab user request
  const { visual } = req.body;
  console.log(visual);

  //Check if the userId exists, if not, show a error
  if (!userId) {
    return res.status(500).send("User session/id not found");
  } else {
    console.log("Session found.");
  }

  //Queries to grab the needed MySQL data based on the request
  try {
    if (visual == "regRate" || visual == "classRate") {
      const sql = `SELECT * FROM mental_health_scores WHERE app_user_id = ?`;
      //Grab rating info
      const [data_call] = await health_db.execute(sql, [userId]);

      //Organize needed data
      let userData = data_call.map((row) => ({
        regression_ratings: row.reg_mental_health_rating,
        classification_ratings: row.class_mental_health_rating,
        time: row.created_at,
      }));
      //test
      console.log(visual, userData);

      //Code to call fast api to return plot based off of request given
      const plot_response = await fetch("https://health-rating-app-mlmodel.vercel.app/plot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_request: visual,
          data: userData,
        }),
      });
      //Define generated image
      const { image } = await plot_response.json();
      console.log(image)
      //Render visuals page
      res.render("visuals", {
        image: image,
      });
    }

    //For study/sleep requests
    if (visual == "study" || visual == "sleep") {
      //Code to grab needed habit info
      const sql = `SELECT user_id, sleep_hours, daily_study_hours, created_at FROM user_habits WHERE user_id = ?`;
      const [data_call] = await health_db.execute(sql, [userId]);

      //Organize needed data
      let userData = data_call.map((row) => ({
        study_hours: row.daily_study_hours,
        sleep_hours: row.sleep_hours,
        time: row.created_at,
      }));
      console.log(visual, userData);
      //Code to call fast api to return plot based off of request given
      const plot_response = await fetch("http://127.0.0.1:8000/plot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_request: visual,
          data: userData,
        }),
      });

      //Define generated image
      const { image } = await plot_response.json();
      //Render visuals page
      res.render("visuals", {
        image: image,
      });
    }

    //Error catching
  } catch (plot_err) {
    //Error message for graph
    console.error("Plot error:", plot_err);
    return res
      .status(500)
      .send("Database or FastAPI Server Error inside visuals");
  }
});

//Export Router
export default router;

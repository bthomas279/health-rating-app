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
  res.render("visuals");
});

//POST Router (grab data first)
router.post("/", async (req, res) => {
  //Define the userId from the login page
  const userId = req.session.users.user_id;
  //Test if user_id is present
  console.log(userId);

  //Grab user request
  const { visual, userId } = req.body;

  //Check if the userId exists, if not, show a error
  if (!userId) {
    return res.status(500).send("User session/id not found");
  } else {
    console.log("Session found. User Id:", userId); //Remove later
  }
  //Will remove code below later
  try {
    const sql = `SELECT app_user_id, reg_mental_health_rating, class_mental_health_rating created_at FROM mental_health_scores 
    WHERE app_user_id = ?`;

    //Grab info from database
    await health_db.execute(sql, [userId]);

    //Test grab
    console.log(userId);
  } catch (plot_err) {
    //Error message for graph
    console.error("Plot error:", plot_err);
    return res
      .status(500)
      .send(
        "FastAPI Server Error inside home (FastAPI server may be off) | Location: Plot",
      );
  }
});

//Export Router
export default router;

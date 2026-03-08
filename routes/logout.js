import express from "express";
import session from "express-session";

const router = express.Router();

//REST APIs (GET, POST)
//Get request to logout. Activates when clicking logout button.
router.get("/", (req, res) => {
  //Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/home");
    }
    //Delete Cookie
    res.clearCookie("connect.sid"); //Default name: sid
    //Alert console of successful logout in console
    console.log("User has been logged out.")

    //Return to login page
    res.redirect("/login");
  });
});

export default router;
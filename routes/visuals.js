import express from "express";
//Importing database
import health_db from "../src/database.js";

const router = express.Router();


//REST APIs (GET, POST)
//Render Visual Page Route
router.get("/", (req, res) => {
  res.render("visuals");
});


//Export Router
export default router;
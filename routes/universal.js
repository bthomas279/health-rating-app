import express from "express";

const router = express.Router();

//Activates universal reroute on localhost 3000
//Reroutes to login if on bse http://localhost:3000
router.get("/", (req, res) => {
    res.redirect("/login");
});

export default router;

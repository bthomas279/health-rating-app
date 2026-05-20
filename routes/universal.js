import express from "express";

const router = express.Router();

//Activates universal reroute on host
//Reroutes to login if on host
router.get("/", (req, res) => {
    res.redirect("/login");
});

export default router;

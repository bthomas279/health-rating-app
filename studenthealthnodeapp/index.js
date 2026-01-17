//Prepares app

const dontenv = require("dotenv");

//Imports express so sever can be created
const express = require("express");

//Creates express application
const app = express();
const port = process.env.PORT || 3000;
dontenv.config();

//Tests API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working." });
});

//Opens and runs the server to allow incoming requests
app.listen(port, () => {
  console.log("App is available on port: ", port);
});

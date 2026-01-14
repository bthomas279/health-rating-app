//Prepares app
require("dotenv").config();

//Imports express so sever can be created
const express = require("express")

//Creates express application
const app = express();
const port = 3000;

//Opens and runs the server to allow incoming requests
app.listen(port, () =>  {
    console.log("App is available on port: ", port);
});
# health-rating-app
**IMPORTANT NOTICE: This project is still under development.**

Planned development:
1. Machine learning model requests and responses using FAST API.
2. Mental Health Data visualization talored for each user.

## About
This project is a full-stack student mental health rating system that uses Node.js, EJS, and Javascript to generate mental health ratings based on stored habit data, and provide user-tailored visualizations.

## Features


## Project Structure
```
public/
└──style.css               # Contains styling for login and signup page 

routes/
├──home.js                 # Contains styling for login and signup page 
├──login.js                # Contains REST APIs to run login action, creates a session for the user
├──logout.js               # Contains REST APIs to run logout action and can destroy the session
├──signup.js               # Puts the user into the system (SQL query and REST), enabling ability to login 
└──universal.js            # Global rerouting in case user location is "/"

src/
├──database.js             # Calls database and establishes requests to or from it
└──index.js                # Main hub to activate the routes, sever and app

views/
├──home.ejs                 # Serves as the front end for the home page
├──login.ejs                # Serves as the front end for the login page
└──signup.js                # Serves as the front end for the signup page

```

## File Uses




## Programmer
This project is being developed by Benjamin Thomas as a personal project.
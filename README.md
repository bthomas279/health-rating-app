# health-rating-app
**IMPORTANT NOTICE: This project is still under development.**

Planned development:
1. Mental Health Data visualization talored for each user.

## About
This project is a full-stack student mental health rating system that uses Node.js, EJS, and Javascript to generate mental health ratings based on stored habit data, and provide user-tailored visualizations.
When I first started development, I had the goal to learn how to develop a full-stack system to connect machine learning models outside of the code editor. 

## Features
- User Accounts (Signup, Login, Logout, Password Encryption)
- Databe Querying (Saved user data)
- Machine Learning Model Responses
- Dynamic System Routing

Currently in development:
- User-tailored visualizations via Seaborn called through FastAPI

## Project Structure
```
public/
├──style.css               # Contains styling for login and signup page 
└──nav.css                 # Contains styling for the navigaton on each page

routes/
├──home.js                 # Contains REST APIs to run form submission, database querying, and requests and recieves data from ml model
├──login.js                # Contains REST APIs to run login action, creates a session for the user
├──logout.js               # Contains REST APIs to run logout action and can destroy the session
├──signup.js               # Puts the user into the system (SQL query and REST), enabling ability to login 
├──universal.js            # Global rerouting in case user location is "/"
└──visuals.js              # Graphs user's ratings (database query and REST)

src/
├──database.js             # Calls database and establishes requests to or from it
├──index.js                # Main hub to activate the routes, sever and app
├──model_call.js           # Transforms user inputs to be read by the ml models, and calls it via fetch
└──plot_call.js            # Transforms user imputs for graph details to be sent to FastAPI.

views/
├──home.ejs                 # Serves as the front end for the home page
├──login.ejs                # Serves as the front end for the login page
├──signup.ejs               # Serves as the front end for the signup page
└──visuals.ejs              # Serves as the front end for the visuals page                          

```

## File Uses




## Programmer
This project is being developed by Benjamin Thomas as a personal project.
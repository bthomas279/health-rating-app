//This js file is specifically for calling my model from fast api using fetch
//This file connects home.js
//Function that takes in the user data inputed and sends it to the fast API server.

async function data_grab() {
  //Some data needs to be turned numerical based off of model trainig data
  //Current structure for now, will be changed if I find something more efficent
  const dietChoice = document.getElementById("userDiet").value;
  const jobChoice = document.getElementById("userJob").value;
  const extraChoice = document.getElementById("userExtracurricular").value;

  //Change strings to integers
  let userDiet = Math.floor(Number(dietChoice));
  let userJob = Math.floor(Number(jobChoice));
  let userEP = Math.floor(Number(extraChoice));
  console.log("From Model Call:", userDiet, userJob, userEP); //Included for now to confirm operation

  //Turns string values numeric to match training data
  //Collect Submitted values (in same numerical format as training data)
  const user_data = {
    sleep_hours: document.getElementById("userSleep").value,
    tv_hours: document.getElementById("userTvHours").value,
    diet_quality: userDiet,
    exercise_frequency: document.getElementById("user_sleep").value,
    daily_study_hours: document.getElementById("user_sleep").value,
    social_media_hours: document.getElementById("user_sleep").value,
    part_time_job: userJob,
    extracurricular_participation: userEP,
  };
  console.log(user_data); //Included for now to confirm data is properly collected

  //The fetch request
  //This connects with the ML model using FAST API
  const callModel = await fetch("http://127.0.0.1:8000/grab");
}

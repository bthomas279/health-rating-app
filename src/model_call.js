//Function that takes in the user data inputed and sends it to the fast API server.
async function modelCall(user) {
  //Original data submitted by the user are in string format. I need to change the values to
  //their proper floats and integers. I may do this on the model side in the future.

  //Check what's inside of user
  //console.log("In Model Call, the User contains:", user);
  
  //Some of the data are words. Code to change them into str numbers
  //For diet quality

  let diet_int;
  if (user.diet_quality == "Poor") {
    diet_int = 0;
  } else if (user.diet_quality == "Fair") {
    diet_int = 1;
  } else if (user.diet_quality == "Good") {
    diet_int = 2;
  }

  //For part-time job
  let job_int;
  if (user.part_time_job == "Yes") {
    job_int = 1;
  } else {
    job_int = 0;
  }

  //Extracurricular
  let ep_int;
  if (user.extracurricular_participation == "Yes") {
    ep_int = 1;
  } else {
    ep_int = 0;
  }

  //Change non-decimal strings to integers
  let exercise_int = parseInt(user.exercise_frequency_weekly);

  //Turns decimal string values to floats to match training data
  let tv_ft = parseFloat(user.tv_hours);
  let study_ft = parseFloat(user.daily_study_hours);
  let social_ft = parseFloat(user.social_media_hours);
  let sleep_ft = parseFloat(user.sleep_hours);

  const userInt = {
    sleep_hours: sleep_ft,
    tv_hours: tv_ft,
    diet_quality: diet_int,
    exercise_frequency_weekly: exercise_int,
    daily_study_hours: study_ft,
    social_media_hours: social_ft,
    part_time_job: job_int,
    extracurricular_participation: ep_int,
  };
  //console.log("This is userInt:", userInt);

  //Call model
  const model_response = await fetch("http://127.0.0.1:8000/grab/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInt),
  });
  //Model response as Json file
  return model_response.json();
}

//Export function to be used elsewhere
export default modelCall;

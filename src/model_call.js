//Function that takes in the user data inputed and sends it to the fast API server.
async function modelCall(
  sleep,
  tv,
  diet,
  exercise,
  study,
  social,
  job,
  extracurricular,
) {
  //Original data submitted by the user are in string format. I need to change the values to
  //their proper floats and integers. I may do this on the model side in the future.

  //Some of the data are words. Code to change them into str numbers
  //For diet quality
  if (diet == "Poor") {
    var diet_int = 2
  } else if (diet == "Fair") {
    var diet_int = 0
  } else if (diet == "Good") {
    var diet_int = 1
  } else if (diet == "Other") {
    var diet_int = 3
  }

  //For part-time job
  if (job == "Yes") {
    var job_int = 1
  } else {
    var job_int = 0
  }

  //Extracurricular
if (extracurricular == "Yes") {
    var ep_int = 1
} else {
    var ep_int = 1
}


  //Change non-decimal strings to integers
  let exercise_int = Math.floor(Number(exercise));

  //Turns decimal string values to floats to match training data
  let tv_ft = parseFloat(tv);
  let study_ft = parseFloat(study);
  let social_ft = parseFloat(social);
  let sleep_ft = parseFloat(sleep);

  //Call model
  const model_response = await fetch("http://127.0.0.1:8000/grab/", {
    method: "POST",
    headers: { "Content-Type": "application.json" },
    body: JSON.stringify({
      sleep_hours: sleep_ft,
      tv_hours: tv_ft,
      diet_quality: diet_int,
      exercise_frequency_weekly: exercise_int,
      daily_study_hours: study_ft,
      social_media_hours: social_ft,
      part_time_job: job_int,
      extracurricular_participation: ep_int,
    }),
  });
  //Model response as Json file
  return model_response.json();
}

//Export function to be used elsewhere
export default modelCall;

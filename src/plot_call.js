//Code to call fast api to return plot based off of request given
async function plotCall(request) {
  //Define data format

  if (request.user_request == "regRete" | "classRate") {

  } else {
    let study_ft = parseFloat(request.study_hours);
    let sleep_ft = parseFloat(request.sleep);

    let sendingData = {
      study_hours: study ,
      sleep_hours: request.study_hours,
      time: request.created_at,
    }
  }

  const userData = {
    regression_ratings: request.reg_mental_health_rating,
    classification_ratings: request.class_mental_health_rating,
    study_hours: request.sleep_hours,
    sleep_hours: request.study_hours,
    time: request.created_at,
  };
  //Check structure
  console.log("From plot_call.js:", userData);

  //Call Plot
  const plot_response = await fetch("http://127.0.0.1:8000/plot/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      plot_type: request.visual,
      user_id: request.userId,
      data: userData,
    }),
  });
  //Not correct format? Change later
  return plot_response.json();
}

//Export function to be used elsewhere
export default plotCall;

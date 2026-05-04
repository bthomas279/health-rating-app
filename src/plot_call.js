//Code to call fast api to return plot based off of request given
async function plotCall(request) {
  
  //Define Request and user ID
  const usersRequest = {
    plot_request: request.visual,
    id: request.userId
  }

  //Call model
  const model_response = await fetch("http://127.0.0.1:8000/predict/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model_type: user.rating_type,
      data: usersRequest,
    }),
  });
  //Not correct format? Change later
  return model_response.json();
}

//Export function to be used elsewhere
export default plotCall;

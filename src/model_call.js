//Function that takes in the user data inputed and sends it to the fast API server.
async function modelCall(user_data) {
    
    
    //Call model
    const model_response = await fetch("http://127.0.0.1:8000/grab/", {
        method: "POST",
        headers: {"Content-Type": "application.json"},
        body: JSON.stringify(user_data)

    });
    //Model response as Json file
    return model_response.json()
}    

//Export function to be used elsewhere
export default modelCall;

// want to default to the camera facing the user
var constraints = {
  video: {
    facingMode: "user"
  },
  audio: false
};

//get the html elements that we need
const cameraView = document.querySelector("#camera--view");
const cameraOutput = document.querySelector("#camera--output");
const cameraSensor = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");

// function that will access the camera and stream the video to the camera--view element
function cameraStart() {
  //the getUserMedia method to access the camera
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = track;
    })
    .catch(function(error) {});
}

//add take a picture button click function
cameraTrigger.addEventListener("click", function() {
  //get the camera sensor
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;

  //draw the camera and update class
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
});

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

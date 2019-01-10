$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCXhESW_5-LWOW2qmWJ_FmBPCy7yPuKcOA",
    authDomain: "classwork-8c1aa.firebaseapp.com",
    databaseURL: "https://classwork-8c1aa.firebaseio.com",
    projectId: "classwork-8c1aa",
    storageBucket: "classwork-8c1aa.appspot.com",
    messagingSenderId: "902281358292"
  };
  firebase.initializeApp(config);
  // save the firebase database reference
  var database = firebase.database();

  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var trainData = {
      trainName: $("train-name-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      firstTrainTime: $("#first-train-time-input").val().trim(),
      frequency: $("#frequency-input").val().trim(),
    }

    traindData.firstTrainTime = moment(firstTrainTime, "YYYY-MM-DD").format("X");

    // push into db
    


  })





  //all of my code should be above this line, except for the }) right after this line.
})
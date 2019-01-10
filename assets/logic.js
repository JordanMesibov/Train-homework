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
      trainName: $("#train-name-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      firstTrainTime: $("#first-train-time-input").val().trim(),
      frequency: $("#frequency-input").val().trim(),
    }

    traindData.firstTrainTime = moment(firstTrainTime, "HH:mm").format("X");

    // push into db
    database.ref().push(trainData);

    //clear out the recently filled form elements on the page
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

  });

  // set up the child-added event listener for firebase to send new information to the page every time a new train is added via the submission form
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    //console log the key of the child in case I need it
    console.log(childSnapshot.key);

    //set up math for calculations of next train times
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // create a table row for a train
   var $tr = $("<tr>");
   $tr
     .attr("train-key", childSnapshot.key)
     .append(`<td>${trainName}</td>`)
     .append(`<td>${destination}</td>`)
     .append(`<td>${frequency}</td>`)
     .append(`<td>${nextTrain}</td>`)
     .append(`<td>${tMinutesTillTrain}</td>`);

   // select table's body and append employee table row
   $("tbody#train-info").append($tr);

  })




  //all of my code should be above this line, except for the }) right after this line.
})
var config = {
    apiKey: "AIzaSyC16hD6RkhUT2wn--rZ89HcPUAcMacrIr8",
    authDomain: "train-time-69f7f.firebaseapp.com",
    databaseURL: "https://train-time-69f7f.firebaseio.com",
    projectId: "train-time-69f7f",
    storageBucket: "train-time-69f7f.appspot.com",
    messagingSenderId: "104105440245"
  };
      firebase.initializeApp(config);

      var dataRef = firebase.database();
      var now = moment();
    console.log(now);
dataRef.ref().on("child_added", function(childSnapshot) {
     console.log(childSnapshot.val().trainName);
     console.log(childSnapshot.val().destination);
     console.log(childSnapshot.val().trainTime);
     console.log(childSnapshot.val().frequency);
//I couldn't get the moment feature to work so the time that shows is the current time instead of 
//the next arrival and minutes away.
var firstTrain = moment(childSnapshot.val().firstTrain, 'HH:mm').format("X");
var frequency = childSnapshot.val().frequency;
var timeLeft = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
var mins = moment(frequency - timeLeft);
var nextTrain = moment().add(mins, "m").format("hh:mm A");
console.log(firstTrain);
console.log(frequency);
console.log()
var newRow = $("<tr>");

   var newTrainName = $("<td>");
   var newDestination = $("<td>");
   var newFrequency = $("<td>");
   var newNextArrival = $("<td>");
   var newMinutesLeft = $("<td>");

   newTrainName.html(childSnapshot.val().trainName);
   newDestination.html(childSnapshot.val().destination);
   newFrequency.html(childSnapshot.val().frequency);
   newNextArrival.html(nextTrain);
   newMinutesLeft.html(mins);

    newRow.append(newTrainName);
    newRow.append(newDestination);
    newRow.append(newFrequency);
    newRow.append(newNextArrival);
    newRow.append(newMinutesLeft);
    $("tbody").append(newRow);

});

$("#add-user").on("click", function(event) {
     event.preventDefault();

var trainName = $("#trainNameInput").val().trim();
var destination = $("#destinationInput").val().trim();
var trainTime = moment($("#timeInput").val().trim(), 'hh:mm a').format('HH:mm');
var frequency = $("#frequencyInput").val().trim();



dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#timeInput").val("");
$("#frequencyInput").val("");

});


  
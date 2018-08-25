
var  nextTrain;
var nextTrainTime;

<script src="https://www.gstatic.com/firebasejs/5.4.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNrzBj6kPPP9I_us3p-L0nVkz3HgAAzlE",
    authDomain: "trainapp-63acb.firebaseapp.com",
    databaseURL: "https://trainapp-63acb.firebaseio.com",
    projectId: "trainapp-63acb",
    storageBucket: "trainapp-63acb.appspot.com",
    messagingSenderId: "213569579940"
  };
  firebase.initializeApp(config);
</script>

var database = firebase.database();


$(".submit").on("click", function () {
    var name= $(".name").val();
    var destination = $(".destination").val();
    var first = $(".first").val();
    var frequency = $(".frequency").val();
    console.log(name);
    console.log(destination);
    console.log(first);
    console.log(frequency);
    $(".name").val("");
    $(".destination").val("");
    $(".first").val("");
    $(".frequency").val("");


    firebase.database().ref().push({
        name: name,
        destination:destination,
        first: first,
        frequency: frequency


    });



});



database.ref().on("child_added", function(childSnapshot) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var first = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;
    var firstTime = first;
    var timeFrequency = frequency;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");



    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

 
    var timeRemainder = diffTime % timeFrequency;
    console.log(timeRemainder);


    var timeMinutesTillTrain = timeFrequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + timeMinutesTillTrain);


    nextTrain = moment().add(timeMinutesTillTrain, "minutes");
    nextTrainTime="ARRIVAL TIME: " + moment(nextTrain).format("hh:mm");
    console.log(nextTrain); 
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainTime="ARRIVAL TIME: " + moment(nextTrain).format("hh:mm");


    $(".table").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+first+"</td><td>"+frequency+"</td><td>"+nextTrainTime+"</td></tr>");
    

  });
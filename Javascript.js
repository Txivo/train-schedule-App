
var  nextTrain;
var nextTrainTime;
var config = {
    apiKey: "AIzaSyBOvL-WeYU1553U8Rv-9xZmjwMkz85KX4o",
    authDomain: "traincbc-474ec.firebaseapp.com",
    databaseURL: "https://traincbc-474ec.firebaseio.com",
    projectId: "traincbc-474ec",
    storageBucket: "traincbc-474ec.appspot.com",
    messagingSenderId: "641507904869"
};
firebase.initializeApp(config);
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
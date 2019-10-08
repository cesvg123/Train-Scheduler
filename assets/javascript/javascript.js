$(document).ready(function() {

var firebaseConfig = {
    apiKey: "AIzaSyDU9ZQRoPXC0GZ8x1_PHbTMInsztWfxq1E",
    authDomain: "clickcounter-class-19.firebaseapp.com",
    databaseURL: "https://clickcounter-class-19.firebaseio.com",
    projectId: "clickcounter-class-19",
    storageBucket: "clickcounter-class-19.appspot.com",
    messagingSenderId: "822802462575",
    appId: "1:822802462575:web:3b06450e3d25fb6f199a9a",
    measurementId: "G-HSZ832GWP7"
};

firebaseConfig.initilizeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefaul();
    var TrainName = $("#train-name-input").val().trim();
    var TrainDestination = $("#destination-input").val().trim();
    var FirstTrainTime = $("#first-train-time-input").val().trim();
    var TrainFrequency = $("#train-frequency").val().trim();

    var upComingTrain = {
        Name: TrainName,
        Destination: TrainDestination,
        Begins: FirstTrainTime,
        Frequency: TrainFrequency,
    };

    database.ref().push(upComingTrain);
    console.log(upComingTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#train-frequency").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var TrainName = childSnapshot.val().Name;
    var TrainDestination = childSnapshot.val().Destination;
    var FirstTrainTime = childSnapshot.val().Begins;
    var TrainFrequency = childSnapshot.val().Frequency;

    var TrainFrequency;
    var Begins = 0;

    var ConvertTime = moment(FirstTrainTime, "HH:mm").subtract(1, "years");
    var Time = moment();
    var TimeDifference = moment().diff(moment(ConvertTime), "minutes");
    var TimeReminder = TimeDifference % TrainFrequency;
    var TimeTillArrival = TrainFrequency - TimeReminder;
    var NextTrain = moment().add(TimeTillArrival, "minutes");

    $("#train-table > body").append("<tr><td>" + TrainName + "</td><td>" + TrainDestination + "</td><td>" + TrainFrequency + "</td><td>" + moment(NextTrain).format("HH:mm") + "</td><td>" + TimeTillArrival + "</td></tr>");

});

});
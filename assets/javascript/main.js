moment().format();


var firebaseConfig = {
    apiKey: "AIzaSyCJCW3CbEmWhyUoElq6g78bHslbmAN-tQw",
    authDomain: "train-scheduler-a35df.firebaseapp.com",
    databaseURL: "https://train-scheduler-a35df.firebaseio.com",
    projectId: "train-scheduler-a35df",
    storageBucket: "train-scheduler-a35df.appspot.com",
    messagingSenderId: "421681650201",
    appId: "1:421681650201:web:9a134b0c57613eef642888",
    measurementId: "G-PGJSFNC43S"
};

$(document).ready(() => {

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        var TrainName = $("#train-name-input").val().trim();
        var TrainDestination = $("#destination-input").val().trim();
        var FirstTrainTime = $("#first-train-time-input").val().trim();
        var TrainFrequency = $("#train-frequency").val().trim();

        var upComingTrain = {
            Name: TrainName,
            Destination: TrainDestination,
            Time: FirstTrainTime,
            Frequency: TrainFrequency,
        };
        database.ref().push(upComingTrain);

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#train-frequency").val("");

    });

    database.ref().on("child_added", function (childSnapshot) {

        var TrainName = childSnapshot.val().Name;
        var TrainDestination = childSnapshot.val().Destination;
        var TrainFrequency = childSnapshot.val().Frequency;
        var FirstTrainTime = childSnapshot.val().Time;

        // var TimeTillArrival = moment();
        // // var NextTrain = childSnapshot.val().(calcNextTrain);
        // var NextTrain = TimeTillArrival.diff(FirstTrainTime, "minutes").format("HH:mm");
        // // NextTrain = FirstTrainTime + moment().hours(24);

        // function calcNextTrain() {
            var NextTrain = moment(FirstTrainTime, "HH:mm").subtract(1, "years");
            var firstTimeConverted = moment(FirstTrainTime, "HH:mm").subtract(1, "years");
            var Time = moment();
            var TimeDifference = moment().diff(moment(firstTimeConverted), "minutes");
            var TimeReminder = TimeDifference % TrainFrequency;
            var TimeTillArrival = TrainFrequency - TimeReminder;
            var nextTrain = moment().add(TimeTillArrival, "minutes");
        // }


        $("#tblBody").append(
            `<tr><td>${TrainName}</td>
                            <td>${TrainDestination}</td>
                            <td>${TrainFrequency}</td>
                            <td>${NextTrain}</td>
                            <td>${nextTrain}</td></tr>`);
    });
});
var updates = {};

(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDvTGsfe0o4BIbml_BuqKKeZDUPrKYwOpQ",
    authDomain: "pepfloydrecords.firebaseapp.com",
    databaseURL: "https://pepfloydrecords.firebaseio.com",
    projectId: "pepfloydrecords",
    storageBucket: "pepfloydrecords.appspot.com",
    messagingSenderId: "1010790498361"
  };
  firebase.initializeApp(config);

} ());


function send(evt) {
  var song = document.getElementById("sendSong").value;

  song = parseURL(song);
  
  updates["/inputSong"] = song;
  firebase.database().ref().update(updates);

}

function parseURL(song) {
  var res = song.split("/");
  var code = res[res.length-1];
  // var url = "https://www.youtube.com/embed/" + code + "?autoplay=1";
  return code;
}

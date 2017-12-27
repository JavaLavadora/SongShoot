var lock = 0;
var counter = 0;

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

  //Get elements
  const result = document.getElementById("inputSong");

  //Create Reference
  const dbRefResult = firebase.database().ref().child("inputSong");

  //Sync object changes

  if(lock===0){
    lock = 1;
    dbRefResult.on('value', snap => {
      const name = snap.val();
      add(name);
    });
  }

} ());

function add(name) {
    document.getElementById("inputSong").innerHTML = name;
    //Do not allow changes if already 5 songs
    if(counter<5){
      counter++;
      append();
    }
}

function append() {
  var aux5 = document.getElementById("song5").textContent;
  var aux4 = document.getElementById("song4").textContent;
  var aux3 = document.getElementById("song3").textContent;
  var aux2 = document.getElementById("song2").textContent;
  var aux1 = document.getElementById("song1").textContent;

  //Check if there are empty slots in queue
  if(aux1==="Empty"){
    document.getElementById("song1").innerHTML = document.getElementById("inputSong").innerHTML;
  }

  else if(aux2==="Empty"){
    document.getElementById("song2").innerHTML = document.getElementById("inputSong").innerHTML;
  }

  else if(aux3==="Empty"){
    document.getElementById("song3").innerHTML = document.getElementById("inputSong").innerHTML;
  }

  else if(aux4==="Empty"){
    document.getElementById("song4").innerHTML = document.getElementById("inputSong").innerHTML;
  }
  else{ //Queue is full and song 5 slot is free
    document.getElementById("song5").innerHTML = document.getElementById("inputSong").innerHTML;

  }

  //Reset the entered song field
  document.getElementById("inputSong").innerHTML = "Empty";

  //Now new songs can be added
  lock = 0;
}

function promote() {
   var auxNew = document.getElementById("inputSong").innerHTML;
   document.getElementById("inputSong").innerHTML = "Empty";

  //In other case the queue reamins the same size
  if(auxNew==="Empty"){
    counter--;
  }

  //Discard current song and promote the rest
  document.getElementById("song1").innerHTML = document.getElementById("song2").innerHTML;
  document.getElementById("song2").innerHTML = document.getElementById("song3").innerHTML;
  document.getElementById("song3").innerHTML = document.getElementById("song4").innerHTML;
  document.getElementById("song4").innerHTML = document.getElementById("song5").innerHTML;
  document.getElementById("song5").innerHTML = auxNew;

}
//TODO delete at database level
//TODO see how data can be introduced in the database by the user
//TODO see how can we know when a youtube video has finished to trigger promote


function send(evt) {
  var song = document.getElementById("sendSong").value;
  console.log(song);

  firebase.database().ref().set({
    inputSong: song
  });

}

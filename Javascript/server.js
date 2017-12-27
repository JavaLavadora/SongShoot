var counter = 0;
var lock = 0;

var song1 = "Empty";
var song2 = "Empty";
var song3 = "Empty";
var song4 = "Empty";
var song5 = "Empty";
var songInput = "Empty";

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

  //Get elements
  const result = document.getElementById("inputSong");

  firebase.database().ref().set({
    top1: "Empty",
    top2: "Empty",
    top3: "Empty",
    top4: "Empty",
    top5: "Empty",
    inputSong: "Empty"
  });

  //Create Reference
  const dbRefResult = firebase.database().ref().child("inputSong");
  const dbRefTop1 = firebase.database().ref().child("top1");
  const dbRefTop2 = firebase.database().ref().child("top2");
  const dbRefTop3 = firebase.database().ref().child("top3");
  const dbRefTop4 = firebase.database().ref().child("top4");
  const dbRefTop5 = firebase.database().ref().child("top5");
  //Sync object changes
  dbRefResult.on('value', snap => {
    const name = snap.val();
    console.log(name);
    setInput(name);
    add(name);
  });

  dbRefTop1.on('value', snap => {
    const top1 = snap.val();
    setTop1(top1);
  });

  dbRefTop2.on('value', snap => {
    const top2 = snap.val();
    setTop2(top2);
  });

  dbRefTop3.on('value', snap => {
    const top3 = snap.val();
    setTop3(top3);
  });

  dbRefTop4.on('value', snap => {
    const top4 = snap.val();
    setTop4(top4);
  });

  dbRefTop5.on('value', snap => {
    const top5 = snap.val();
    setTop5(top5);
  });

} ());

function setTop1(songName) {
  song1 = songName;
}

function setTop2(songName) {
  song2 = songName;
}

function setTop3(songName) {
  song3 = songName;
}

function setTop4(songName) {
  song4 = songName;
}

function setTop5(songName) {
  song5 = songName;
}

function setInput(songName) {
  songInput = songName;
}

function getTop1() {
  return song1;
}

function getTop2() {
  return song2;
}

function getTop3() {
  return song3;
}

function getTop4() {
  return song4;
}

function getTop5() {
  return song5;
}

function getInput() {
  return songInput;
}

function add(name) {
    document.getElementById("inputSong").innerHTML = name;
    //Do not allow changes if already 5 songs
    if(counter<6 && lock===0){ //For some reason it performs an iterations with all empty at the begginings
      append();
    }
}

function append() {

  var aux5 = getTop5();
  var aux4 = getTop4();
  var aux3 = getTop3();
  var aux2 = getTop2();
  var aux1 = getTop1();

  counter++;
  lock = 1;
  //Check if there are empty slots in queue
  if(aux1==="Empty"){
    //Front-End
    document.getElementById("song1").innerHTML = getInput();

    updates["/top1"] = getInput();
    firebase.database().ref().update(updates);
  }

  else if(aux2==="Empty"){
    //Front-End
    document.getElementById("song2").innerHTML = getInput();

    updates["/top2"] = getInput();
    firebase.database().ref().update(updates);
 }

  else if(aux3==="Empty"){
    //Front-End
    document.getElementById("song3").innerHTML = getInput();

    updates["/top3"] = getInput();
    firebase.database().ref().update(updates);
  }

  else if(aux4==="Empty"){
    //Front-End
    document.getElementById("song4").innerHTML = getInput();
    
    updates["/top4"] = getInput();
    firebase.database().ref().update(updates);
  }
  else{ //Queue is full and song 5 slot is free
    //Front-End
    document.getElementById("song5").innerHTML = getInput();

    updates["/top5"] = getInput();
    firebase.database().ref().update(updates);
  }

  updates["/inputSong"] = "Empty";
  firebase.database().ref().update(updates);
  document.getElementById("inputSong").innerHTML = "Empty";

  lock = 0;
}

function promote() {
   var auxNew = getInput();

   updates["/inputSong"] = "Empty";
   firebase.database().ref().update(updates);

  //In other case the queue reamins the same size
  if(auxNew==="Empty"){
    counter--;
  }

  //Discard current song and promote the rest

  //Back-End side
  updates["/top1"] = getTop2();
  firebase.database().ref().update(updates);
  //Front-End
  document.getElementById("song1").innerHTML = getTop2();

  updates["/top2"] = getTop3();
  firebase.database().ref().update(updates);
  //Front-End
  document.getElementById("song2").innerHTML = getTop3();

  updates["/top3"] = getTop4();
  firebase.database().ref().update(updates);
  //Front-End
  document.getElementById("song3").innerHTML = getTop4();

  updates["/top4"] = getTop5();
  firebase.database().ref().update(updates);
  //Front-End
  document.getElementById("song4").innerHTML = getTop5();

  updates["/top5"] = auxNew;
  firebase.database().ref().update(updates);
  //Front-End
  document.getElementById("song5").innerHTML = auxNew;

}
//TODO see how can we know when a youtube video has finished to trigger promote


function send(evt) {
  var song = document.getElementById("sendSong").value;
  console.log(song);

  updates["/inputSong"] = song;
  firebase.database().ref().update(updates);
  //Front-End
  document.getElementById("inputSong").innerHTML = song;
}

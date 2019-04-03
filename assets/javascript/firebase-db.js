// Initialize Firebase
var config = {
    apiKey: "AIzaSyA63idtRZz_KQIOY5BguDw2pyDaqCdcM7U",
    authDomain: "movie-tinder-database.firebaseapp.com",
    databaseURL: "https://movie-tinder-database.firebaseio.com",
    projectId: "movie-tinder-database",
    storageBucket: "movie-tinder-database.appspot.com",
    messagingSenderId: "648752297769"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
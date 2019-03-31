// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxECsjpvYp3f73lOo41_dj4TfNIhlczU8",
  authDomain: "movie-tinder-69319.firebaseapp.com",
  databaseURL: "https://movie-tinder-69319.firebaseio.com",
  projectId: "movie-tinder-69319",
  storageBucket: "movie-tinder-69319.appspot.com",
  messagingSenderId: "689316741981"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", '#movie-2000_2009', function () {

  $("#home-page").empty();

  //OMDB api
  var movie = $(this).attr("data-name");
  var apiKeyOmdb = "694640ef";
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);

  })

  //ajax call for UTelly 
  var searchParameter = "";
  var baseUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=";
  var queryUrlUtelly = baseUrl + searchParameter;

  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("X-RapidAPI-Key", "f504da3c21mshe56c513d6a9955dp1b1c63jsn4548cb484cf3");
    },
  });
  $.ajax({

    url: queryUrlUtelly,
    method: "GET",


  }).then(function (response) {

    console.log(response);
  })

})

$(document).on("click", '#movie-2010', function () {

  $("#home-page").empty();

  //OMDB api
  var movie = $(this).attr("data-name");
  var apiKeyOmdb = "694640ef";
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);

  })

  //ajax call for UTelly 
  var searchParameter = "";
  var baseUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=";
  var queryUrlUtelly = baseUrl + searchParameter;

  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("X-RapidAPI-Key", "f504da3c21mshe56c513d6a9955dp1b1c63jsn4548cb484cf3");
    },
  });
  $.ajax({

    url: queryUrlUtelly,
    method: "GET",


  }).then(function (response) {

    console.log(response);
  })

})

//ajax call for OMDB API
var movie = $(this).attr("data-name");
var apiKeyOmdb = "694640ef";
var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {


}) 
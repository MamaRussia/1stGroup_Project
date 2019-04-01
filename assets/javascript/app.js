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

//Global variables --> these variable must remain global
var selectedGenre
var randomYear

//generate a random year between 1980-2019 to be inserted into movie DB API query
var getRandomYear = function (start, range) {
  randomYear = Math.floor((Math.random() * range) + start);
  while (randomYear > range) {
  randomYear = Math.floor((Math.random() * range) + start);

  }

  return randomYear;
}

//store the movie DB genre value as selected from dropdown in the html then feed the genre 
//value into the search query for the movie DB API.
function getSelectedGenre() {

  selectedGenre = document.getElementById("list").value;


}

//set event listener to start function to make the API call, display poster / title / 
//synopsis in the html
$("#searchButton").on("click", function () {
  getSelectedGenre();
  getRandomYear(1980, 2019);

  var apiKeyMovieDb = "api_key=9306a8db10eced7695c9114ed645c899";
  var baseUrlMovieDb = "https://api.themoviedb.org/3/discover/movie?";
  var searchParameterMovieDb = "&with_genre=" + selectedGenre + "&primary_release_year=" + randomYear;
  var queryUrlMovieDb = baseUrlMovieDb + apiKeyMovieDb + searchParameterMovieDb;
  console.log(selectedGenre);
  console.log(randomYear);
  console.log(queryUrlMovieDb);

  $.ajax({

    url: queryUrlMovieDb,
    method: "GET"

  }).then(function (response) {

    console.log(response);
    var movieInfo = response.results;

    var chosenMovie = Math.floor(Math.random() * movieInfo.length);
    var poster = movieInfo[chosenMovie].poster_path;
    var title = movieInfo[chosenMovie].original_title;
    var synopsis = movieInfo[chosenMovie].overview;
    console.log(poster);
    console.log(title);
    console.log(synopsis);

    var posterUrl = "https://image.tmdb.org/t/p/original" + poster;
    var posterPage = $("<img>");
    posterPage.attr("src", posterUrl);
    $("#poster").append(posterPage);

    var displayTitle = $("<h1>");
    displayTitle.text(title);
    $("#poster").prepend(displayTitle);

    var displaySynopsis = $("<p>");
    displaySynopsis.text(synopsis);
    $("#poster").prepend(displaySynopsis);

  })

});


//$(document).on("click", '#movie-2000_2009', function () {

  //$("#home-page").empty();


  //make random number generator to insert as IMDB id (format tt1234567)
  //var idRandom = "";
  //for (var i = 0; i < 6; i++) {

    //var random = Math.floor(Math.random()* 6) +1;
    //idRandom = random + idRandom;
    
  //}
  
  //OMDB API call works with random id generated and inserted into query url.  However, the 
  //database is far to large, and returns extremely obscure movie titles  

  //var movieID = "tt0" + idRandom;
  //var apiKeyOmdb = "&apikey=694640ef";
  //var baseUrlOmdb = "https://www.omdbapi.com/?i=";
  //var queryURL =  baseUrlOmdb + movieID + apiKeyOmdb;
  //console.log(queryURL);
  // $.ajax({

  //   url: queryURL,
  //   method: "GET"

  // }).then(function (response) {

  //   console.log(response);

  // })


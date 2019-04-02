// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyAxECsjpvYp3f73lOo41_dj4TfNIhlczU8",
//     authDomain: "movie-tinder-69319.firebaseapp.com",
//     databaseURL: "https://movie-tinder-69319.firebaseio.com",
//     projectId: "movie-tinder-69319",
//     storageBucket: "movie-tinder-69319.appspot.com",
//     messagingSenderId: "689316741981"
//   };
//   firebase.initializeApp(config);

//   var database = firebase.database();



//Global variables --> these variable must remain global
var selectedGenre;
var randomYear;
var title;
var likedMovies = [];
var dislikedMovies = [];
var response;
var chosenMovie;
var poster;
var synopsis;

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

$("#loveBtn").hide();
$("#hateBtn").hide();

//set event listener to start function to make the API call, display poster / title / 
//synopsis in the html

$("#searchButton").on("click", function () {

  $("#header").hide();
  $("#list").hide();
  $("#searchButton").hide();
  $("#name-input").hide();
  $("#loveBtn").show();
  $("#hateBtn").show();

  getSelectedGenre();
  getRandomYear(2015, 2019);
  $("#name-input").val("");

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


    chosenMovie = Math.floor(Math.random() * movieInfo.length);
    poster = movieInfo[chosenMovie].poster_path;
    title = movieInfo[chosenMovie].original_title;
    synopsis = movieInfo[chosenMovie].overview;
    console.log(poster);
    console.log(title);
    console.log(synopsis);


    var posterUrl = "https://image.tmdb.org/t/p/original" + poster;
    var posterPage = $("<img>");
    posterPage.attr("src", posterUrl);
    posterPage.attr("id", "moviePoster");
    $("#poster").prepend(posterPage);

    var displayTitle = $("<h1>");
    displayTitle.text(title);
    $("#poster").append(displayTitle);

    var displaySynopsis = $("<p>");
    displaySynopsis.text(synopsis);
    $("#poster").append(displaySynopsis);

    $("#loveBtn").on("click", function () {

      if (chosenMovie) {

        chosenMovie = Math.floor(Math.random() * movieInfo.length);
        poster = movieInfo[chosenMovie].poster_path;
        title = movieInfo[chosenMovie].original_title;
        synopsis = movieInfo[chosenMovie].overview;


        var posterUrl = "https://image.tmdb.org/t/p/original" + poster;
        //var posterPage = $("<img>");
        posterPage.attr("src", posterUrl);
        posterPage.attr("id", "moviePoster");
        $("#poster").prepend(posterPage);

        //var displayTitle = $("<h1>");
        displayTitle.text(title);
        $("#poster").append(displayTitle);

        //var displaySynopsis = $("<p>");
        displaySynopsis.text(synopsis);
        $("#poster").append(displaySynopsis);

        /*var movieObj = {
          chosenMovie: Math.floor(Math.random() * movieInfo.length),
          poster: movieInfo[chosenMovie].poster_path,
          title: movieInfo[chosenMovie].original_title,
          synopsis: movieInfo[chosenMovie].overview,
          posterUrl: "https://image.tmdb.org/t/p/original" + movieObj.poster,
          posterPage: $("<img>"),
          src: movieObj.posterPage.attr("src", posterUrl),
          id: movieObj.posterPage.attr("id", "moviePoster"),
          write: $("#poster").prepend(movieObj.posterPage),
          displayTitle: $("<h1>"),
          titleText: movieObj.displayTitle.text(title),
          posterTitle: $("#poster").append(movieObj.displayTitle),
          displaySynopsis: $("<p>"),
          synopsisText: movieObj.displaySynopsis.text(synopsis),
          synopsisDisplayText: $("#poster").append(movieObj.displaySynopsis)
        }*/

        //var moviesChosen = [];
        //moviesChosen.push(movieObj);

        //console.log(moviesChosen);

        /*for (i = 0; i < moviesChosen.length; i++) {
          if (moviesChosen[i] === true) {
            var movieObj = {
              chosenMovie: Math.floor(Math.random() * movieInfo.length),
              poster: movieInfo[chosenMovie].poster_path,
              title: movieInfo[chosenMovie].original_title,
              synopsis: movieInfo[chosenMovie].overview
            }

            var moviesChosen = [];
            moviesChosen.push(movieObj);

            console.log(moviesChosen);
            console.log(chosenMovie);
          };*/


      }

      //while (moviesChosen.indexOf(index) != -1) {
      //index = Math.floor(Math.random()) * moviesChosen.length;





    })
  })

  $("#hateBtn").on("click", function () {

    if (chosenMovie) {

      chosenMovie = Math.floor(Math.random() * movieInfo.length);
      poster = movieInfo[chosenMovie].poster_path;
      title = movieInfo[chosenMovie].original_title;
      synopsis = movieInfo[chosenMovie].overview;

      var posterUrl = "https://image.tmdb.org/t/p/original" + poster;
      //var posterPage = $("<img>");
      posterPage.attr("src", posterUrl);
      posterPage.attr("id", "moviePoster");
      $("#poster").prepend(posterPage);

      //var displayTitle = $("<h1>");
      displayTitle.text(title);
      $("#poster").append(displayTitle);

      //var displaySynopsis = $("<p>");
      displaySynopsis.text(synopsis);
      $("#poster").append(displaySynopsis);



    }
  })



  /*$(document).on("click", '#movie-2000_2009', function () {
 
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
 
    // })*/

});
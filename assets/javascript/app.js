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

$("#myModal").hide();
$(".preference").hide();

//set event listener to start function to make the API call, display poster / title / 
//synopsis in the html

$("#searchButton").on("click", function () {

  $("#header").hide();
  $("#list").hide();
  $("#searchButton").hide();
  $("#name-input").hide();
  $(".preference").show();

  getSelectedGenre();
  getRandomYear(2015, 2019);
  $("#name-input").val("");

  var apiKeyMovieDb = "api_key=9306a8db10eced7695c9114ed645c899";
  var baseUrlMovieDb = "https://api.themoviedb.org/3/discover/movie?";
  var searchParameterMovieDb = "&with_genres=" + selectedGenre + "&primary_release_year=" + randomYear;
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


    chosenMovie = 0;
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

    //<button id="loveBtn">Love It?</button>
    //<button id="hateBtn">Hate It?</button>
    var loveHate = ["Love it", "Hate it"];

    for (var i = 0; i < loveHate.length; i++) {

      var loveHateBtn = $("<button>");
      loveHateBtn.addClass("loveBtn hateBtn preference");
      loveHateBtn.attr("data-preference", loveHate[i]);

      loveHateBtn.text(loveHate[i]);

      $("#preferenceBtns").append(loveHateBtn);
    }


    $(".preference").on("click", function () {

      if (chosenMovie <= 18) {

        chosenMovie++;
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

      } else {
        jQuery.noConflict();
        $("#myModal").modal("show");



        /*var modalP = $("<p>");
        var modalYesBtn = ("<button>");
        var modalNoBtn = ("<button>");

        modalP.attr("id", "modalShow");
        modalYesBtn.attr("id", "modalYesBtn");
        modalNoBtn.attr("id", "modalNoBtn");
        
        $("#modalShow").text("Would you like to change genres?");
        $("#modalYesBtn").text("Yes");
        $("#modalNoBtn").text("No");*/


      }


    })

  })
})


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

//Global variables --> these variable must remain global
var selectedGenre;
var randomYear;
var title;
var response;
var chosenMovie = 0;
var poster;
var synopsis;
var page = 1;
var totalPages = 0;
var movies = [];
//var utellyResponse;
function getMovies() {

  var baseUrlMovieDb = "https://api.themoviedb.org/3/discover/movie";
  //var searchParameterMovieDb = "&with_genres=" + selectedGenre + "&primary_release_year=" + randomYear;
  //var queryUrlMovieDb = baseUrlMovieDb + apiKeyMovieDb + searchParameterMovieDb;
  //console.log(selectedGenre);
  //console.log(randomYear);
  //console.log(queryUrlMovieDb);

  $.ajax({
    url: baseUrlMovieDb,
    method: "GET",
    data: {
      "api_key": "9306a8db10eced7695c9114ed645c899",
      "with_genres": selectedGenre,
      "page": page
    }
  }).then(function (response) {

    console.log(response);
    movies = response.results;
    totalPages = response.total_pages

    poster = movies[chosenMovie].poster_path;
    title = movies[chosenMovie].original_title;
    synopsis = movies[chosenMovie].overview;
    renderMovieData(poster, title, synopsis);

    //variable array for buttons
    var loveHate = ["Love it", "Hate it"];
    //loop through array
    for (var i = 0; i < loveHate.length; i++) {
      //create buttons with classes, and append to id preferenceBtns
      var loveHateBtn = $("<button>");
      loveHateBtn.addClass("loveBtn hateBtn preference");
      loveHateBtn.attr("data-preference", loveHate[i]);
      loveHateBtn.text(loveHate[i]);
      $("#preferenceBtns").append(loveHateBtn);
    }
  })
}

function renderMovieData(poster, title, synopsis) {
  $("#poster").empty();

  var posterUrl = "https://image.tmdb.org/t/p/original" + poster;
  var posterPage = $("<img>");
  posterPage.attr("src", posterUrl);
  posterPage.attr("id", "moviePoster");
  $("#poster").prepend(posterPage);

  var displayTitle = $("<h1>");
  displayTitle.addClass("movie-name");
  displayTitle.attr("data-movie-name", title);
  displayTitle.text(title);
  $("#poster").append(displayTitle);

  var displaySynopsis = $("<p>");
  displaySynopsis.addClass("movie-synopsis");
  displaySynopsis.attr("data-movie-synopsis", synopsis);
  displaySynopsis.text(synopsis);
  $("#poster").append(displaySynopsis);
}
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
$("#utellyBtn").hide();

//set event listener to start function to make the API call, display poster / title / 
//synopsis in the html
$("#searchButton").on("click", function () {

  $("#header").hide();
  $("#list").hide();
  $("#searchButton").hide();
  $("#name-input").hide();
  $(".preference").show();
  $("#utellyBtn").show();

  getSelectedGenre();
  getRandomYear(2015, 2019);
  $("#name-input").val();

  getMovies();

})

$("#yesBtn").on("click", function () {
  window.location.reload()
})

// on click for like and dislike button
$(document).on("click", ".preference", function () {

  var movieName = $("#poster h1.movie-name").attr("data-movie-name");
  var preferenceType = this.getAttribute("data-preference");

  if (preferenceType === "Love it") {

    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-RapidAPI-Key", "f504da3c21mshe56c513d6a9955dp1b1c63jsn4548cb484cf3");
      },
    });
    $.ajax({
      url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title + "&country=us",
      method: "GET",
    }).then(function (response) {

      console.log(response);
      var utellyResponse = response;
      var streamArray = [];
      var userName = $("#name-input").val().trim();

      database.ref().push({
        yourName: userName,
        movieName: movieName,
        preference: preferenceType,
        //utelly: streamArray.join()
      });
    })
  }

  if (chosenMovie == movies.length - 1) {
    if (page < totalPages) {
      page++;
      getMovies();
    } else {
        jQuery.noConflict();
        $("#myModal").modal("show");
      //  no more movies for this genre message
    }
  } else {
    chosenMovie++;
    poster = movies[chosenMovie].poster_path;
    title = movies[chosenMovie].original_title;
    synopsis = movies[chosenMovie].overview;
    renderMovieData(poster, title, synopsis);
  }
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  var cs = childSnapshot.val();

  var userName = cs.yourName;
  var movieName = cs.movieName;
  var preference = cs.preference;
  //var utellyInfo = cs.utelly;

  console.log(userName);
  console.log(movieName);
  console.log(preference);
  //console.log(utellyInfo);

  var newRow = $("<tr>").append(
    $("<td>").text(userName),
    $("<td>").text(movieName),
    //$("<td>").text(this is where the poster would go instead of NA),
    $("<td>").text("NA"),
    $("<td>").text(preference),
    //$("<td>").text(utellyInfo),
    $("<td>").text("NA"),
  );
  $("#tableInfo > tbody").append(newRow);
})


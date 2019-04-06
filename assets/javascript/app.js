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
var pageResults;
//var streamArray;[];
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
    page = response.page;
    //pageResults = page.results;
    totalPages = response.total_pages

    poster = movies[chosenMovie].poster_path;
    title = movies[chosenMovie].original_title;
    synopsis = movies[chosenMovie].overview;
    renderMovieData(poster, title, synopsis);
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
$("#trailerButton").hide();

//set event listener to start function to make the API call, display poster / title / 
//synopsis in the html
$("#searchButton").on("click", function () {

  $("#header").hide();
  $("#list").hide();
  $("#searchButton").hide();
  $("#name-input").hide();
  $(".preference").show();
  $("#utellyBtn").show();
  $("#trailerButton").show();

  getSelectedGenre();
  getRandomYear(2015, 2019);
  $("#name-input").val();

  getMovies();
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
      url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + "Bojack" + "&country=us",
      method: "GET",
    }).then(function (response) {
      var streamArray = [];
      console.log(response);

      var utellyResponse = response.results;
      console.log(utellyResponse);

      if (utellyResponse) {
        for (i = 0; i < utellyResponse.length; i++) {
          var locations = utellyResponse[i].locations;
          if (locations) {
            for (j = 0; j < locations.length; j++) {
              if (locations[j].display_name) {
                if (!streamArray.includes(locations[j].display_name)) {
                  streamArray.push(locations[j].display_name);
                }
              }
            }
          }
        }
      }
      var userName = $("#name-input").val().trim();

      database.ref().push({
        yourName: userName,
        movieName: movieName,
        preference: preferenceType,
        utelly: streamArray.join()
      });

    })


  }

  if (chosenMovie == movies.length - 1) {
    if (page < totalPages) {
      page++;
      chosenMovie = 0;
      getMovies();
      console.log("Chosen movie " + chosenMovie);
      console.log("")
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
})

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  var cs = childSnapshot.val();

  var userName = cs.yourName;
  var movieName = cs.movieName;
  var preference = cs.preference;
  var utellyInfo = cs.utelly;

  console.log(userName);
  console.log(movieName);
  console.log(preference);
  console.log(utellyInfo);

  var newRow = $("<tr>").append(
    $("<td>").text(userName),
    $("<td>").text(movieName),
    //$("<td>").text(this is where the poster would go instead of NA),
    $("<td>").text("NA"),
    $("<td>").text(preference),
    $("<td>").text(utellyInfo),
    //$("<td>").text("NA"),
  );
  $("#tableInfo > tbody").append(newRow);
})
//Call YouTube API and returns the trailer of the movie in the current window
//Trailer opens in smaller popup window and auto plays.  
function openTrailerWindow() {

  var videoData = {

    key: "AIzaSyCIAfHjFbzW0UcHHSa0TrErMrubh86gN2Q",
    part: "snippet",
    q: title + "official trailer",
    maxResults: 1


  }

  $.ajax({

    url: "https://www.googleapis.com/youtube/v3/search",
    method: "GET",
    data: videoData,

  }).then(function (response) {
    console.log(response);

    if (response.items.length === 0) {
      
      $("#myModal").modal("show");

    }
    else {
      var youtubeData = response.items;

      var videoID = youtubeData[0].id.videoId;
      var videoURL = "https://www.youtube.com/embed/" + videoID;
  
      var outputVideo = $('<iframe height="300" width="500">');
      outputVideo.attr("src", videoURL);
      outputVideo.attr("id", "videoWindow");
      $("#results").append(outputVideo);
  
      window.open(videoURL, "_blank", "height=300", "width=500");
    }

   

    


  });
}
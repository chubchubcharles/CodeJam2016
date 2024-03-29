﻿var createQueries = function (queryParameters, shows_rated_already) {

    var genres = queryParameters.genres;
    var created_bys = queryParameters.created_bys;
    var years = queryParameters.years;
    var avgRatingPerGenre = queryParameters.genre_avg_ratings;

    console.log(avgRatingPerGenre);

    // Methods related to summarizing the sample of shows we tell user to rate ; not indicative of user ratings!
    var findMostCountsPerAttrb = function(attributes)
    {
      // e.g. attributes == genres, attributes == created_by, attribtues == year
      currentTopAttrb = attributes[0];
      currentTopAttrbCount = attributes[0].count;
      for (var i = 1; i < attributes.length; i++) {
          if (attributes[i].count >= currentTopAttrbCount) {
              currentTopAttrb = attributes[i];
          }
      }
      return currentTopAttrb;
    }

    var findMostGenreCounts = function () {
      return findMostCountsPerAttrb(genres);
    }

    var findMostCreatedByCounts = function () {
      return findMostCountsPerAttrb(created_bys);
    }

    var findMostYearCounts = function () {
      return findMostCountsPerAttrb(years);
    }

    /**
      To determine the most preferred genre, we use this criteria:
      = (%_of_genre_in_sample_size) * (avg_ratings_for_all_samples_of_genre_class)

      E.g.

      Genre samples = {Action, Action, Family, Action}
      User ratings (corresponding to same order)= {1, 3, 3, 2}

      Intuitively: on average they prefer family more even though only one Family film rating received

      Result from critiera:
      = Score for "Action" genre
      = (3/4)*(2) = 1.5

      = Score for "Family" genre
      = (1/4)*(3) = 1.75

      This works very crudely!

    **/

    var findGenreScores = function(genres){
      function add(a,b){ return a+b;};
      var genre_scores = {};
      var genre_sums = {}
      var genre_counts = genres.map(function(genre){ return genre.count;});
      var sum_genre_counts = genre_counts.reduce(add, 0);
      genres.forEach(function(genre){
        // genre_scores[genre.name] = (genre.count/sum_genre_counts)*avgRatingPerGenre[genre.name];
        genre_scores[genre.id] = avgRatingPerGenre[genre.name];
      })
      return genre_scores;
    }

    var findTopGenres = function(genres_scores){
      var topGenres = []
      var scores = Object.keys( genres_scores ).map(function ( key ) { return genres_scores[key]; });
      var topRating = Math.max.apply( null, scores );
      for (var key in genres_scores){
        console.log(genres_scores[key], " vs. " + topRating);
        if (genres_scores[key] == topRating)
        {
          topGenres.push(key);
        }
      }
      return topGenres;
    }

    mostGenreCounts = findMostGenreCounts();
    mostCreatedByCounts = findMostCreatedByCounts();
    mostYearCounts = findMostYearCounts();

    scores = findGenreScores(genres);
    console.log(scores);
    var topGenres = findTopGenres(scores);
    console.log("There are the genres tied for top:"  + topGenres); // array of topGenres which are tied for the highest avg rating

    var topResults = sendRequest("discover/tv?", "&with_genres=" + topGenres[0]);

    var parsedResults = JSON.parse(topResults).results;

    var alreadyExists = function (newItem, list) {
        for (var i = 0; i < list.length; i++) {
            if (newItem == list[i]) {
                return true;
            }
        }
        return false;
    }

    var resultIds = [];
    while (resultIds.length < 5) {
        for (var i = 0; i < parsedResults.length; i++) {
            if (!(alreadyExists(parsedResults[i].id, shows_rated_already))) {
                resultIds.push(parsedResults[i].id);
            }
        }
    }

    // console.log(resultIds);
    // console.log(shows_rated_already);

    var load = function () {
        window.location.href = "results.html" + "?id1=" + resultIds[0] + "&id2=" + resultIds[1]
            + "&id3=" + resultIds[2] + "&id4=" + resultIds[3] + "&id5=" + resultIds[4];
    }

    load();
}

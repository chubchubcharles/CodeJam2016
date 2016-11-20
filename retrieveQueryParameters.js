var retrieveQueryParameters = function (jsons, shows_rated_already) {

    var genres = []; // array of objects that represent genre with respective name, id, and count attributes
    var created_bys = []; // etc..
    var years = [];

    var checkIfGenreExists = function (current_genre) {
        for (var i = 0; i < genres.length; i++) {
            if (genres[i].id == current_genre.id) {
                genres[i].count++;
                return true;
            }
        }
        return false;
    }

    var checkIfCreatedByExists = function (current_created_by) {
        for (var i = 0; i < created_bys.length; i++) {
            if (created_bys[i].id == current_created_by.id) {
                created_bys[i].count++;
                return true;
            }
        }
        return false;
    }

    var checkIfYearExists = function (current_year) {
        for (var i = 0; i < years.length; i++) {
            if (years[i].year == current_year) {
                years[i].count++;
                return true;
            }
        }
        return false;
    }

    for (var i = 0; i < jsons.length; i++) {
        // check each json object of show and loop through its genres and add the counts to the genres array
        var current_genres = jsons[i].genres;
        if (current_genres) {
            for (var j = 0; j < current_genres.length; j++) {
                if (!checkIfGenreExists(current_genres[j])) {
                    current_genres[j].count = 1;
                    genres.push(current_genres[j]);
                }
            }
        }

        var current_created_bys = jsons[i].created_by;
        if (current_created_bys) {
            for (var j = 0; j < current_created_bys.length; j++) {
                if (!checkIfCreatedByExists(current_created_bys[j])) {
                    current_created_bys[j].count = 1;
                    created_bys.push(current_created_bys[j]);
                }
            }
        }

        var current_year = {};
        if (jsons[i].last_air_date) {
            var year = parseInt(jsons[i].last_air_date.substring(0, 4));
            current_year.year = year;
            if (!checkIfYearExists(current_year.year)) {
                current_year.count = 1;
                years.push(current_year);
            }
        }
    }

    function findAvgRatingPerGenre(genres){
      avg_ratings = {};
      genres.forEach(function(genre){
        genre_name = genre.name
        total_genre_samples = 0;
        for (var i = 0; i < jsons.length; i++){
          jsons[i].genres.forEach(function(g){
            if (g.name == genre_name){
              ur = parseInt(jsons[i].user_rating, 10);
              if (genre_name in avg_ratings){
                avg_ratings[genre_name] += ur;
                total_genre_samples += 1;
                // console.log(parseInt(total_genre_samples) + " seen for genre:" + genre_name);
              }
              else{
                avg_ratings[genre_name] = ur;
                total_genre_samples += 1;
              }
            }
          })
        }
        avg_ratings[genre.name] = avg_ratings[genre.name]/total_genre_samples;
      })
      return avg_ratings;
    }

    var parameters = {};

    parameters.genres = genres;
    parameters.created_bys = created_bys;
    parameters.years = years;
    parameters.genre_avg_ratings = findAvgRatingPerGenre(genres);

    createQueries(parameters, shows_rated_already);
}

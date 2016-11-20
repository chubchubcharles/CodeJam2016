var retrieveQueryParameters = function (jsons) {

    var genres = [];
    var created_bys = [];
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

    var parameters = {};

    parameters.genres = genres;
    parameters.created_bys = created_bys;
    parameters.years = years;

    console.log("parameters:");
    console.log(parameters);

    createQueries(parameters);
}
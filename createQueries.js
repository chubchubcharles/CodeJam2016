var createQueries = function (queryParameters) {

    var genres = queryParameters.genres;
    var created_bys = queryParameters.created_bys;
    var years = queryParameters.years;

    //console.log(genres);
    //console.log(created_bys);
    //console.log(years);

    var findTopGenre = function () {
        currentTopGenre = genres[0];
        currentTopGenreCount = genres[0].count;
        for (var i = 1; i < genres.length; i++) {
            if (genres[i].count >= currentTopGenreCount) {
                currentTopGenre = genres[i];
            }
        }
        return currentTopGenre;
    }

    var findTopCreatedBy = function () {
        currentTopCreatedBy = created_bys[0];
        currentTopCreatedByCount = created_bys[0].count;
        for (var i = 1; i < created_bys.length; i++) {
            if (created_bys[i].count >= currentTopCreatedByCount) {
                currentTopCreatedBy = created_bys[i];
            }
        }
        return currentTopCreatedBy;
    }

    var findTopYear = function () {
        currentTopYear = years[0];
        currentTopYearCount = years[0].count;
        for (var i = 1; i < years.length; i++) {
            if (years[i].count >= currentTopYearCount) {
                currentTopYear = years[i];
            }
        }
        return currentTopYear;
    }

    //var genre_importance = 2;
    //var created_by_importance = 5;
    //var year_importance = 1;

    topGenre = findTopGenre();
    topCreatedBy = findTopCreatedBy();
    topYear = findTopYear();

    var baseURL = "http://hello123.com/lalala/abc/?=";
    var genreURL = "&genre=" + topGenre.id;
    var createdByURL = "&createdby=" + topCreatedBy.id;
    var yearURL = "&year=" + topYear.year;

    var generateQueries = function () {
        queries = [];
        queries.push(baseURL + genreURL + createdByURL + yearURL);
        queries.push(baseURL + genreURL + createdByURL);
        queries.push(baseURL + createdByURL + yearURL);
        queries.push(baseURL + createdByURL);
        queries.push(baseURL + genreURL);
        queries.push(baseURL + yearURL);
        return queries;
    }

    console.log(generateQueries());

    var resultIds = [];

    resultIds.push(1);
    resultIds.push(22);
    resultIds.push(333);
    resultIds.push(4444);
    resultIds.push(55555);

    var load = function () {
        window.location.href = "results.html" + "?id1=" + resultIds[0] + "&id2=" + resultIds[1] 
            + "&id3=" + resultIds[2] + "&id4=" + resultIds[3] + "&id5=" + resultIds[4];
    }

    load();
}


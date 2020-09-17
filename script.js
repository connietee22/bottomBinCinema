//Namespace
const movieApp = {};

movieApp.apiKey = 'dc4483da5e7158fd55c3bc2ecaf212a3';
movieApp.endPoint = 'https://api.themoviedb.org/3/discover/movie';
movieApp.genreEndPoint = 'https://api.themoviedb.org/3/genre/movie/list'


movieApp.getGenresId = () => {
    $.ajax({
        url: movieApp.genreEndPoint,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.apiKey,
        }
    }).then((res) => {

    })
}

movieApp.getMovies = (genres, startDate, endDate) => {
    $.ajax({
        url: movieApp.endPoint,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.apiKey,
            with_genres: genres,
            'primary_release_date.gte': startDate,
            'primary_release_date.lte': endDate,
            'vote_average.lte': 5
        }
    }).then((res) => {
    // movieApp.errorHandling(res);
    movieApp.displayMovie(res);

    })
}




movieApp.displayMovie = (movies) => {
    
    const index = Math.floor(Math.random() * movies.results.length);
    let imageSource = `https://image.tmdb.org/t/p/w500/${movies.results[index].poster_path}`
    let summary = `${ movies.results[index].overview }`
    if (movies.results[index].poster_path === null) {
        //replace with bottom bin logo image
        imageSource = "http://placekitten.com/200/300"
    }

    // function isEmpty(summary) {
    //     return (!summary || 0 === str.length);
    // }

    if (movies.results[index].overview === "") {
        summary = "No summary available for this film, it's just TOO terrible."
    }
    

    $('.recommendedMovie').html(`
    <img src=${imageSource}>
    <span>${movies.results[index].title}</span>
    <span>Vote Average: ${movies.results[index].vote_average}</span>
    <span>Release Date: ${movies.results[index].release_date}</span>
    <span>Summary: ${movies.results[index].overview}</span>
    `)
    
     // console.log(movies.results[0].title);

    
}

//Functions to be called on init
movieApp.init = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        // getting genre id from dropdown menu
        const getGenreValue = $('.genre').val();
        // getting decade value from dropdown menu
        const getDecadeValue = $('.decade').val();
        let startDate;
        let endDate;
        if (getDecadeValue === "1950s") {
            startDate = "1950-01-01";
            endDate = "1959-12-31";
        } else if (getDecadeValue === "1960s") {
            startDate = "1960-01-01";
            endDate = "1969-12-31";
        } else if (getDecadeValue === "1970s") {
            startDate = "1970-01-01";
            endDate = "1979-12-31";
        } else if (getDecadeValue === "1980s") {
            startDate = "1980-01-01";
            endDate = "1989-12-31";
        } else if (getDecadeValue === "1990s") {
            startDate = "1990-01-01";
            endDate = "1999-12-31";
        } else if (getDecadeValue === "2000s") {
            startDate = "2000-01-01";
            endDate = "2009-12-31";
        } else if (getDecadeValue === "2010s") {
            startDate = "2010-01-01";
            endDate = "2019-12-31";
        }
        
    
        // requesting results from API
        movieApp.getMovies(getGenreValue, startDate, endDate)
        
        //***MAY RETURN TO THIS loop through the genre array and compare it to the value from the select menu
     //    const genreArray = movieApp.getGenresId();
     //    genreArray.forEach((item) => {
     //        if (getGenreValue === item.name) {
     //            const genreId = item.id;
     //            console.log(genreId);
     //        }
     //    })
    })

}

//Document ready
$(function () {
    movieApp.init();
});
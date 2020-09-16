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

movieApp.getMovies = (genres, decade) => {
    $.ajax({
        url: movieApp.endPoint,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.apiKey,
            with_genres: genres,
            primary_release_year: decade,
            'vote_average.lte': 5
        }
    }).then((res) => {

    })
}

//Functions to be called on init
movieApp.init = () => {
    $('select').on('change', function () {
        const getGenreValue = $('.genre').val();
        const getDecadeValue = $('.decade').val();
        const genreArray = movieApp.getGenresId();
        //loop through the genre array and compare it to the value from the select menu
        genreArray.forEach((item) => {
            if (getGenreValue === item.name) {
                const genreId = item.id;
                console.log(genreId);


            }
        })
    })

}

//Document ready
$(function () {
    movieApp.init();
});
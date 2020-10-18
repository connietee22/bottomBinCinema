//Namespacing + declaring global variables
const movieApp = {};
movieApp.apiKey = 'dc4483da5e7158fd55c3bc2ecaf212a3';
movieApp.endPoint = 'https://api.themoviedb.org/3/discover/movie';
movieApp.genreEndPoint = 'https://api.themoviedb.org/3/genre/movie/list';
let getGenreValue;
let getDecadeValue;
let startDate;
let endDate;

// API call to grab movies data based on search parameters
movieApp.getMovies = (genres, startDate, endDate) => {
	$.ajax({
		url: movieApp.endPoint,
		method: 'GET',
		dataType: 'json',
		data: {
			api_key: movieApp.apiKey,
			//fetching movies for selected genre
			with_genres: genres,
			//fetching movies for selected decade
			'primary_release_date.gte': startDate,
			'primary_release_date.lte': endDate,
			//fetching movies rated under 5/10
			'vote_average.lte': 5,
		},
	}).then((res) => {
		//using the data to display movie
		movieApp.displayMovie(res);
	});
};

// function to display the movie in the recommended movies section
movieApp.displayMovie = (movies) => {
	// variable that results in a random number representing an index number, and ultimately the random movie to be displayed in the movies.results array
	const index = Math.floor(Math.random() * movies.results.length);

	// defining other required variables
	const title = `${movies.results[index].title}`;
	const voteAverage = `${movies.results[index].vote_average}`;
	const releaseDate = `${movies.results[index].release_date}`;
	let imageSource = `'https://image.tmdb.org/t/p/w500/${movies.results[index].poster_path}' alt='${title} poster'`;
	let summary = `${movies.results[index].overview}`;

	// checks whether movie title has poster
	if (movies.results[index].poster_path === null) {
		//if no poster, replace with our own logo image
		imageSource = `'./assets/bottomBinImageNotAvailable.jpg' alt='placeholder for missing ${title} poster - garbage can illustration from Vecteezy.com'`;
	}

	// checks whether movie title has written summary
	if (summary === '') {
		// if summary is empty/missing, we'll replace with this copy
		summary = "No summary available for this film. It's just TOO terrible.";
	}

	// displaying the recommended movie in the results section
	$('.mainResultsBox').html(`
        <section class="results" id="results">
            <div class="wrapper">
                <div class="recommendedMovie">
                   <div class="posterButtons">
                        <div><img src=${imageSource}></div>
                         <div class="resultBtn">
                                <button class="btn newMovieBtn" aria-label="Click to get another movie">Get another</button>
                                <button class="btn listBtn" href="#list" aria-label="click to add to watch list"> + watchlist</button>
                        </div>
                    </div>
                    <div class="resultText">
                        <h3>${title}</h3>
                        <span><span class="resultLabel">Vote Average:</span> ${voteAverage}/10</span>
                        <span><span class="resultLabel">Release Date:</span> ${releaseDate}</span>
                        <span><span class="resultLabel">Summary:</span> ${summary}</span>
                    </div>
                </div>
        </section>
    `);

	$('.selectedMovies').show();

	// event listener for "add to list" button -- with .one instead of .on, action can only be appended once
	$('.listBtn').one('click', function () {
		$('ul').append(`<li>${title}</li>`);
		// $('.listDisplay').show();

		//listDisplay is initially set to display: none so it doesn't appear on the screen on refresh -- will show and refresh itself once the list button is clicked.
	});

	//allows users to easily select a new movie within the same genre/decade initially selected
	$('.newMovieBtn').on('click', function () {
		movieApp.getMovies(getGenreValue, startDate, endDate);
	});
};

// triggering the sticky nav on window scroll
movieApp.triggerNav = () => {
	$(window).scroll(function () {
		$windowHeight = $(window).height();
		$headerBoxPos = $('.headerBox').scrollTop();

		if ($(this).scrollTop() > $headerBoxPos) {
			$('div.headerBox').addClass('sticky');
		} else {
			$('.headerBox').removeClass('sticky');
		}
		// if ($(this).scrollTop() > ) {
		//     $navBg.addClass('sticky');
		// } else {
		//     $navBg.removeClass('sticky');
		// }
	});
};

//Functions to be called on init
movieApp.init = () => {
	movieApp.triggerNav();
	$('form').on('submit', function (e) {
		e.preventDefault();
		// grabbing genre id from dropdown menu
		getGenreValue = $('.genre').val();
		// grabbing decade value from dropdown menu
		getDecadeValue = $('.decade').val();

		//Error handling if user forgets to select a drop-down item
		if (getGenreValue && getDecadeValue) {
			// looks at the decade chosen, sets the decade's start and end date arguments to be passed inside the ajax call
			if (getDecadeValue === '1950s') {
				startDate = '1950-01-01';
				endDate = '1959-12-31';
			} else if (getDecadeValue === '1960s') {
				startDate = '1960-01-01';
				endDate = '1969-12-31';
			} else if (getDecadeValue === '1970s') {
				startDate = '1970-01-01';
				endDate = '1979-12-31';
			} else if (getDecadeValue === '1980s') {
				startDate = '1980-01-01';
				endDate = '1989-12-31';
			} else if (getDecadeValue === '1990s') {
				startDate = '1990-01-01';
				endDate = '1999-12-31';
			} else if (getDecadeValue === '2000s') {
				startDate = '2000-01-01';
				endDate = '2009-12-31';
			} else if (getDecadeValue === '2010s') {
				startDate = '2010-01-01';
				endDate = '2019-12-31';
			}

			// request the results from API based on genre + decade!
			movieApp.getMovies(getGenreValue, startDate, endDate);

			// to smoothly scroll to results section
			$('html, body').animate(
				{
					scrollTop: $('main').offset().top,
				},
				1000
			);
		} else {
			alert('Pick a genre + decade to start this!');
		}
	});
};

//Document ready
$(function () {
	movieApp.init();
});

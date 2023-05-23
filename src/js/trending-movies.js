import axios from 'axios';
import Notiflix from 'notiflix';
import checkGenre from './genres.js';
const language = 'en-US';
let page = 1;
// let fetchedMovies = []

// const searchParams = new URLSearchParams({
//   api_key: '5e58d3162f5aafaf855cf7d900bbc361',
//   include_adult: false,
//   language: language,
//   page: page,
// });
console.log(checkGenre(28));
// const searchTrendingMoviesURL = `https://api.themoviedb.org/3/search/movie?${searchParams}`;

const fetchTrendingMovies = async page => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=5e58d3162f5aafaf855cf7d900bbc361&include_adult=false&language=en-US&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

const drawTrendingMovies = arrayOfMovies => {
  let markup = '';
  let id = 0;
  arrayOfMovies.results.forEach(movie => {
    markup += `
    <div class="movie-card" id=${id++}>
    <img class="movie-card__poster" id="poster_path"
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    alt=""
    />
    <div class="movie-card__figcaption">
        <p class="movie-card__title" id="title">${movie.title}</p>
        <span class="movie-card__genre" id="genre_ids">Lorem impsum |</span>
        <span class="movie-card__release-date" id="release_date"> ${movie.release_date}</span>
        <!-- in JS need to add a script for changing visibility on Homepage: document.querySelector('.movie-card__rating').classList.add('is-hidden') -->
        <span class="movie-card__rating" id="vote_average">9.5</span>
    </div>
</div>`;
  });
  return markup;
};

const loadTrendingMovies = markup => {
  const movieList = document.querySelector('.movie-list');
  movieList.innerHTML = '';
  movieList.innerHTML = markup;
};

window.addEventListener('load', async () => {
  const movies = await fetchTrendingMovies(page);
  const markup = drawTrendingMovies(movies);
  loadTrendingMovies(markup);
});

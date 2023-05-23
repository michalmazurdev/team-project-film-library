import './sass/main.scss';
import axios from 'axios';
import './sass/main.scss';
import Notiflix from 'notiflix';

const searchFormEl = document.getElementById('searchForm');
const inputEl = document.querySelector('.searchInput');
const movieListEl = document.querySelector('.movie-list');
// let movieArray = [];

const language = 'en-US';
let page = 1;

const URL = 'https://api.themoviedb.org/3/trending/movie/week?';

const thisWeekMovieURL = `https://api.themoviedb.org/3/trending/movie/week?`;
const searchMovieURL = `https://api.themoviedb.org/3/search/movie?`;
const searchAllURL = `https://api.themoviedb.org/3/search/multi?`;
const searchPersonURL = `https://api.themoviedb.org/3/search/person?`;
const searchSeriesURL = `https://api.themoviedb.org/3/search/tv?`;

// LOGIKA BUDOWANIA ADRESU URL - ZMIENNEGO ZALEŻNIE OD ZAPYTANIA
const getURL = () => {
  const searchParams = new URLSearchParams({
    query: inputEl.value,
    api_key: '5e58d3162f5aafaf855cf7d900bbc361',
    include_adult: false,
    language: language,
    page: page,
  });

  let url;
  if (inputEl.value === '') {
    url = `${thisWeekMovieURL}${searchParams}`;
    console.log('this week');
  } else {
    url = `${searchMovieURL}${searchParams}`;
    console.log('search for movies');
  }
  console.log(url);
  return url;
};

// FUNKCJA POBIERAJĄCA DANE Z SERWERA W ZALEŻNOŚCI OD WART URL
const fetchMovies = async () => {
  try {
    const response = await axios.get(getURL());
    console.log(response.data);

    // movieListEl.innerHTML = showMovies();

    showMovies(response.data.results);
    // console.log(searchMovieURL);
    // return response.data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

// PIERWSZE WYWOŁANIE FUNKCJI DO GENEROWALNIA FILMÓW TYGODNIA

const showMovies = movies => {
  //   movieArray.push(movies);
  //   console.log(movies[1].vote_average);
  console.log(movies);
  movieListEl.innerHTML = movies
    .map(movieCard => {
      return `<div class="movie-card" id="1">
        <img class="movie-card__poster" id="poster_path"
        src= 'https://image.tmdb.org/t/p/w500/${movieCard.poster_path}'
        alt='${movieCard.title}'
        />     
      <div class="movie-card__figcaption">
        <p class="movie-card__title" id="title">${movieCard.title}</p>
        <span class="movie-card__genre" id="genre_ids">${movieCard.genre_ids}</span>
        <span class="movie-card__release-date" id="release_date">${movieCard.relese_date}</span>        
        <span class="movie-card__rating" id="vote_average">${movieCard.vote_average}</span>
      </div>
    </div>`;
    })
    .join('');
};

fetchMovies();

searchFormEl.addEventListener('submit', event => {
  event.preventDefault();
  fetchMovies();
  //   clearSearch();
  const data = inputEl.value;
  console.log(data);
  1;
});

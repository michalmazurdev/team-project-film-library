import axios from 'axios';
import Notiflix from 'notiflix';
import { movieTypes } from './genres.js';
const searchFormEl = document.getElementById('form-search');
const inputEl = document.querySelector('.form__input');
const movieListEl = document.querySelector('.movie-list');
// const thisWeekMovieURL = `https://api.themoviedb.org/3/trending/movie/week?`;
const searchMovieURL = `https://api.themoviedb.org/3/search/movie?`;
const searchAllURL = `https://api.themoviedb.org/3/search/multi?`;
const searchPersonURL = `https://api.themoviedb.org/3/search/person?`;
const searchSeriesURL = `https://api.themoviedb.org/3/search/tv?`;

const language = 'en-US';
let page = 1;

const fetchTrendingMovies = async page => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=5e58d3162f5aafaf855cf7d900bbc361&include_adult=false&language=en-US&page=${page}`,
    );
    let data = response.data;
    localStorage.setItem('currentFetch', JSON.stringify(data.results));
    console.log('TRENDING', data);
    return data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

// LOGIKA BUDOWANIA ADRESU URL - ZMIENNEGO ZALEŻNIE OD ZAPYTANIA
const getURL = page => {
  const searchParams = new URLSearchParams({
    query: inputEl.value,
    api_key: '5e58d3162f5aafaf855cf7d900bbc361',
    include_adult: false,
    language: language,
    page: page,
  });
  let url = `${searchMovieURL}${searchParams}`;
  return url;
};

// FUNKCJA POBIERAJĄCA DANE Z SERWERA W ZALEŻNOŚCI OD WART URL
const fetchSearchedMovies = async page => {
  try {
    const response = await axios.get(getURL(page));
    let data = response.data;

    localStorage.setItem('currentFetch', JSON.stringify(data.results));
    console.log('SEARCHED', data);

    return data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

const drawMovies = data => {
  let markup = '';
  let id = 0;
  let arrayOfMovies = data.results;
  arrayOfMovies.forEach(movie => {
    let posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
    let posterUrlRetina = movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
    markup += `
    <div class="movie-card">
    <div class="movie-card__poster-container">
    <img class="movie-card__poster" id="poster_path" data-order=${id++}
    src="${posterUrl}"
    srcset="${posterUrl} 1x, ${posterUrlRetina} 2x"
    alt=""
    />
    </div>
    <div class="movie-card__figcaption">
        <p class="movie-card__title" id="title">${movie.title}</p>
        <span class="movie-card__genre" id="genre_ids">${movieTypes(movie.genre_ids)} |</span>
        <span class="movie-card__release-date" id="release_date"> ${movie.release_date.slice(
          0,
          4,
        )}</span>
        <!-- in JS need to add a script for changing visibility on Homepage: document.querySelector('.movie-card__rating').classList.add('is-hidden') -->
        <span class="movie-card__rating" id="vote_average">${movie.vote_average}</span>
    </div>
</div>`;
  });
  return markup;
};

const loadMovies = markup => {
  movieListEl.innerHTML = '';
  movieListEl.innerHTML = markup;
  // funkcja żeby ukryć rating filmu na stronie Home
  const ratingElements = document.querySelectorAll('.movie-card__rating');
  ratingElements.forEach(element => {
    element.classList.add('is-hidden');
  });
};

window.addEventListener('load', async () => {
  const data = await fetchTrendingMovies(page);
  const markup = drawMovies(data);
  loadMovies(markup);
});

searchFormEl.addEventListener('submit', async event => {
  event.preventDefault();
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data);
  loadMovies(markup);
});

// PAGINATION

const paginationEl = document.querySelector('.pagination');
const previousPage = document.querySelector('.pagination__button--arrow-previous');
const nextPage = document.querySelector('.pagination__button--arrow-next');

paginationEl.addEventListener('click', event => {
  const action = event.target;
  console.log(action);
});

previousPage.addEventListener('click', async event => {
  event.preventDefault();
  page--;
  // const data = (await fetchTrendingMovies(page)) || (await fetchSearchedMovies(page));
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data);
  loadMovies(markup);
});

nextPage.addEventListener('click', async event => {
  event.preventDefault();
  page++;
  // const data = (await fetchTrendingMovies(page)) || (await fetchSearchedMovies(page));
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data);
  loadMovies(markup);
});

// const renderPageNumber = () => {
//   // renderuje current page, -1, -2, +1, +2
// }

// PIERWSZE WYWOŁANIE FUNKCJI DO GENEROWALNIA FILMÓW TYGODNIA

// const showMovies = movies => {
//   //   movieArray.push(movies);
//   //   console.log(movies[1].vote_average);
//   console.log(movies);
//   movieListEl.innerHTML = movies
//     .map(movieCard => {
//       return `<div class="movie-card" id="1">
//         <img class="movie-card__poster" id="poster_path"
//         src= 'https://image.tmdb.org/t/p/w500/${movieCard.poster_path}'
//         alt='${movieCard.title}'
//         />
//       <div class="movie-card__figcaption">
//         <p class="movie-card__title" id="title">${movieCard.title}</p>
//         <span class="movie-card__genre" id="genre_ids">${movieCard.genre_ids}</span>
//         <span class="movie-card__release-date" id="release_date">${movieCard.relese_date}</span>
//         <span class="movie-card__rating" id="vote_average">${movieCard.vote_average}</span>
//       </div>
//     </div>`;
//     })
//     .join('');
// };

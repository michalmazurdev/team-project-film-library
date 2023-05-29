import axios from 'axios';
import Notiflix from 'notiflix';
import { hideLoader, showLoader, showLoaderFor700 } from './loader.js';
import { renderPageNumber } from './pagination.js';
import { movieTypes } from './genres.js';
const searchFormEl = document.getElementById('form-search');
const inputEl = document.querySelector('.form__input');
const movieListEl = document.querySelector('.movie-list');
const movieCardEl = document.querySelector('.movie-card');
const thisWeekMovieURL = `https://api.themoviedb.org/3/trending/movie/week?`;
const searchMovieURL = `https://api.themoviedb.org/3/search/movie?`;
const searchAllURL = `https://api.themoviedb.org/3/search/multi?`;
const searchPersonURL = `https://api.themoviedb.org/3/search/person?`;
const searchSeriesURL = `https://api.themoviedb.org/3/search/tv?`;
const searchErrorEl = document.querySelector('.form__result');

const language = 'en-US';
let page = parseInt(localStorage.getItem('currentPage')) || 1;

const getURL = page => {
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

    // Jeśli inny warunek to można np z local storage pobrać dane
  } else {
    url = `${searchMovieURL}${searchParams}`;
  }

  return url;
};

const fetchSearchedMovies = async page => {
  try {
    const response = await axios.get(getURL(page));
    let data = response.data;
    if (data.results.length !== 0) {
      localStorage.setItem('currentFetch', JSON.stringify(data.results));
      localStorage.setItem('areWeTrending', JSON.stringify(false));
      searchErrorEl.innerHTML = '';
      return data;
    } else {
      searchErrorEl.innerHTML = 'Search result not successful. Enter the correct movie name and';
      throw new Error('No movie results found.');
    }
  } catch (error) {
    console.log(error);
  }
};

export const drawMovies = (movies, collection) => {
  let markup = '';
  let id = 0;
  movies.forEach(movie => {
    let posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
    let posterUrlRetina = movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
    markup += `
    <div class="movie-card" data-collection=${collection}>
    <div class="movie-card__poster-container">
    <img class="movie-card__poster" id="poster_path" data-movieid=${
      movie.id
    } data-collection=${collection}
    src="${posterUrl}"
    srcset="${posterUrl} 1x, ${posterUrlRetina} 2x"
    alt=""
    />
    </div>
    <div class="movie-card__figcaption">
        <p class="movie-card__title" id="title">${movie.title.toUpperCase()}</p>
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

const firstIteration = async page => {
  localStorage.setItem('currentPage', 1);
  page = parseInt(localStorage.getItem('currentPage'));

  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
};

firstIteration(page);

// PAGINATION

searchFormEl.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

// PAGINATION BUTTONS NUMBER OF PAGE:

const pagePrevious = document.getElementById('previous');
const pageFirst = document.getElementById('first');
const pageDot = document.getElementById('dot');
const pageMinus2 = document.getElementById('minus2');
const pageMinus1 = document.getElementById('minus1');
const pageCurrent = document.getElementById('current');
const pagePlus1 = document.getElementById('plus1');
const pagePlus2 = document.getElementById('plus2');
const pageDot2 = document.getElementById('dot2');
const pageLast = document.getElementById('last');
const pageNext = document.getElementById('next');

const pagePreviousLibrary = document.getElementById('previousLibrary');
const pageFirstLibrary = document.getElementById('firstLibrary');
const pageDotLibrary = document.getElementById('dotLibrary');
const pageMinus2Library = document.getElementById('minus2Library');
const pageMinus1Library = document.getElementById('minus1Library');
const pageCurrentLibrary = document.getElementById('currentLibrary');
const pagePlus1Library = document.getElementById('plus1Library');
const pagePlus2Library = document.getElementById('plus2Library');
const pageDot2Library = document.getElementById('dot2Library');
const pageLastLibrary = document.getElementById('lastLibrary');
const pageNextLibrary = document.getElementById('nextLibrary');

pagePrevious.addEventListener('click', async event => {
  event.preventDefault();
  page = parseInt(localStorage.getItem('currentPage')) - 1;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageFirst.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;

  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageMinus2.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageMinus1.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pagePlus1.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pagePlus2.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageLast.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageNext.addEventListener('click', async event => {
  event.preventDefault();
  page = parseInt(localStorage.getItem('currentPage')) + 1;
  const data = await fetchSearchedMovies(page);
  const markup = drawMovies(data.results, 'fetched');
  loadMovies(markup);
  renderPageNumber(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

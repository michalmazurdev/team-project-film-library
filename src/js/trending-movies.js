import axios from 'axios';
import Notiflix from 'notiflix';
import { hideLoader, showLoader, showLoaderFor700 } from './loader.js';
import { movieTypes } from './genres.js';
const searchFormEl = document.getElementById('form-search');
const inputEl = document.querySelector('.form__input');
const movieListEl = document.querySelector('.movie-list');
const thisWeekMovieURL = `https://api.themoviedb.org/3/trending/movie/week?`;
const searchMovieURL = `https://api.themoviedb.org/3/search/movie?`;
const searchAllURL = `https://api.themoviedb.org/3/search/multi?`;
const searchPersonURL = `https://api.themoviedb.org/3/search/person?`;
const searchSeriesURL = `https://api.themoviedb.org/3/search/tv?`;
const searchErrorEl = document.querySelector('.form__result');

console.log('tag html', searchErrorEl);

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

// FUNKCJA POBIERAJĄCA DANE Z SERWERA W ZALEŻNOŚCI OD WART URL

const fetchSearchedMovies = async page => {
  try {
    const response = await axios.get(getURL(page));
    let data = response.data;
    localStorage.setItem('currentFetch', JSON.stringify(data.results));
    // localStorage.setItem('areWeTrending', JSON.stringify(false));
    return data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    // searchErrorEl.classList.remove('is-hidden');
  }
};

// const fetchSearchedMovies = async page => {
//   try {
//     const response = await axios.get(getURL(page));
//     let data = response.data;
//     if (data.results) {
//       localStorage.setItem('currentFetch', JSON.stringify(data.results));
//       localStorage.setItem('areWeTrending', JSON.stringify(false));
//       console.log('SEARCHED', data);
//       return data;
//     } else {
//       throw new Error('No movie results found.');
//     }
//   } catch (error) {
//     console.log(error);
//     // Handle the error appropriately, e.g., show a notification or display an error message on the page.
//   }
// };

const drawMovies = (movies, collection) => {
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
    <div class="movie-card">
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
  renderPageNumber(page, data);
};

firstIteration(page);

// PAGINATION

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

// const paginationBtns = document.querySelector('.pagination');
// USTAWIANIE PAGINACJI NA SAMEJ GÓRZE:
const paginationBtns = document.querySelector('.pagination');
paginationBtns.classList.add('top'); // Dodaje klasę 'top'

const renderPageNumber = (page, totalPages) => {
  // totalPages = data.total_pages;

  pageFirst.innerHTML = 1;
  pageMinus2.innerHTML = Number(page) - 2;
  pageMinus1.innerHTML = Number(page) - 1;
  pageCurrent.innerHTML = page;
  pagePlus1.innerHTML = Number(page) + 1;
  pagePlus2.innerHTML = Number(page) + 2;
  pageLast.innerHTML = Number(+totalPages);

  console.log('TOTAL', +totalPages);
  console.log('PAGE', page);

  if (+totalPages === 1) {
    pagePrevious.classList.add('is-hidden');
    pageFirst.classList.add('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.add('is-hidden');
    pageNext.classList.add('is-hidden');
  } else if (+totalPages === 2) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+totalPages === 3) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+totalPages === 4) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+totalPages === 5) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 1) {
    pagePrevious.classList.add('is-hidden');
    pageFirst.classList.add('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 2) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 3) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 4) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === +totalPages) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.add('is-hidden');
    pageNext.classList.add('is-hidden');
  } else if (+page === +totalPages - 1) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === +totalPages - 2) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === +totalPages - 3) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  }

  // LEFT:

  if (+pageCurrent.innerHTML === 1) {
    pagePrevious.classList.add('is-hidden');
    pageFirst.classList.add('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
  }
  if (+pageMinus2.innerHTML <= 1) {
    pageMinus2.classList.add('is-hidden');
  }
  if (+pageMinus1.innerHTML <= 1) {
    pageMinus1.classList.add('is-hidden');
  }
  if (+pageCurrent.innerHTML === 2) {
    pageDot.classList.add('is-hidden');
  }
  if (+pageMinus1.innerHTML - 1 === 1) {
    pageDot.classList.add('is-hidden');
  }
  if (+pageMinus2.innerHTML - 1 === 1) {
    pageDot.classList.add('is-hidden');
  }

  // RIGHT:

  if (+pageCurrent.innerHTML === +totalPages) {
    pagePlus2.classList.add('is-hidden');
    pagePlus1.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.add('is-hidden');
    pageNext.classList.add('is-hidden');
  }
  if (+pagePlus1.innerHTML >= +totalPages) {
    pagePlus1.classList.add('is-hidden');
  }
  if (+pagePlus2.innerHTML >= +totalPages) {
    pagePlus2.classList.add('is-hidden');
  }
  if (+pageCurrent.innerHTML + 1 === +totalPages) {
    pageDot2.classList.add('is-hidden');
  }
  if (+pagePlus1.innerHTML + 1 === +totalPages) {
    pageDot2.classList.add('is-hidden');
  }
  if (+pagePlus2.innerHTML + 1 === +totalPages) {
    pageDot2.classList.add('is-hidden');
  }
};

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

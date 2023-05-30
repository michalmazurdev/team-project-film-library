import { convertGenres } from './helper_functions';
let page = 1;
localStorage.setItem('currentPage', 1);
const movieListEl = document.querySelector('.movie-list');
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
        <span class="movie-card__genre" id="genre_ids">${convertGenres(movie.genre_ids)} |</span>
        <span class="movie-card__release-date" id="release_date"> ${movie.release_date.slice(
          0,
          4,
        )}</span>
        <span class="movie-card__rating" id="vote_average">${movie.vote_average}</span>
    </div>
</div>`;
  });
  return markup;
};

const paginationBtnsEl = document.querySelector('.pagination');

const loadMovies = markup => {
  movieListEl.innerHTML = '';
  movieListEl.innerHTML = markup;
};

const pagePreviousLibrary = document.getElementById('previousLibrary');
const pageFirstLibrary = document.getElementById('firstLibrary');
const pageMinus2Library = document.getElementById('minus2Library');
const pageMinus1Library = document.getElementById('minus1Library');
const pagePlus1Library = document.getElementById('plus1Library');
const pagePlus2Library = document.getElementById('plus2Library');
const pageLastLibrary = document.getElementById('lastLibrary');
const pageNextLibrary = document.getElementById('nextLibrary');

export const renderPageNumberLibrary = (page, totalPages) => {
  const paginationBtnsEl = document.querySelector('.pagination');
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

  paginationBtnsEl.classList.remove('is-hidden');
  pageDotLibrary.style.cursor = 'default';
  pageDot2Library.style.cursor = 'default';

  if (+page === 1) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else if (+page > 1) {
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({
      top: headerHeight,
      behavior: 'smooth',
    });
  }

  pageFirstLibrary.innerHTML = 1;
  pageMinus2Library.innerHTML = Number(page) - 2;
  pageMinus1Library.innerHTML = Number(page) - 1;
  pageCurrentLibrary.innerHTML = page;
  pagePlus1Library.innerHTML = Number(page) + 1;
  pagePlus2Library.innerHTML = Number(page) + 2;
  pageLastLibrary.innerHTML = Number(+totalPages);

  if (+totalPages === 1) {
    pagePreviousLibrary.classList.add('is-hidden');
    pageFirstLibrary.classList.add('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
    pageMinus1Library.classList.add('is-hidden');

    pagePlus1Library.classList.add('is-hidden');
    pagePlus2Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.add('is-hidden');
    pageNextLibrary.classList.add('is-hidden');
  } else if (+totalPages === 2) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
    pageMinus1Library.classList.add('is-hidden');

    pagePlus1Library.classList.add('is-hidden');
    pagePlus2Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+totalPages === 3) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+totalPages === 4) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+totalPages === 5) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.remove('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.remove('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === 1) {
    pagePreviousLibrary.classList.add('is-hidden');
    pageFirstLibrary.classList.add('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
    pageMinus1Library.classList.add('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.remove('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === 2) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
    pageMinus1Library.classList.add('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.remove('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === 3) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.remove('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === 4) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.remove('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === +totalPages) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.remove('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.add('is-hidden');
    pagePlus2Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.add('is-hidden');
    pageNextLibrary.classList.add('is-hidden');
  } else if (+page === +totalPages - 1) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.remove('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.add('is-hidden');
    pagePlus2Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === +totalPages - 2) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.remove('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else if (+page === +totalPages - 3) {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.remove('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  } else {
    pagePreviousLibrary.classList.remove('is-hidden');
    pageFirstLibrary.classList.remove('is-hidden');
    pageDotLibrary.classList.remove('is-hidden');
    pageMinus2Library.classList.remove('is-hidden');
    pageMinus1Library.classList.remove('is-hidden');

    pagePlus1Library.classList.remove('is-hidden');
    pagePlus2Library.classList.remove('is-hidden');
    pageDot2Library.classList.remove('is-hidden');
    pageLastLibrary.classList.remove('is-hidden');
    pageNextLibrary.classList.remove('is-hidden');
  }

  // LEFT:

  if (+pageCurrentLibrary.innerHTML === 1) {
    pagePreviousLibrary.classList.add('is-hidden');
    pageFirstLibrary.classList.add('is-hidden');
    pageDotLibrary.classList.add('is-hidden');
    pageMinus1Library.classList.add('is-hidden');
    pageMinus2Library.classList.add('is-hidden');
  }
  if (+pageMinus2Library.innerHTML <= 1) {
    pageMinus2Library.classList.add('is-hidden');
  }
  if (+pageMinus1Library.innerHTML <= 1) {
    pageMinus1Library.classList.add('is-hidden');
  }
  if (+pageCurrentLibrary.innerHTML === 2) {
    pageDotLibrary.classList.add('is-hidden');
  }
  if (+pageMinus1Library.innerHTML - 1 === 1) {
    pageDotLibrary.classList.add('is-hidden');
  }
  if (+pageMinus2Library.innerHTML - 1 === 1) {
    pageDotLibrary.classList.add('is-hidden');
  }

  // RIGHT:

  if (+pageCurrentLibrary.innerHTML === +totalPages) {
    pagePlus2Library.classList.add('is-hidden');
    pagePlus1Library.classList.add('is-hidden');
    pageDot2Library.classList.add('is-hidden');
    pageLastLibrary.classList.add('is-hidden');
    pageNextLibrary.classList.add('is-hidden');
  }
  if (+pagePlus1Library.innerHTML >= +totalPages) {
    pagePlus1Library.classList.add('is-hidden');
  }
  if (+pagePlus2Library.innerHTML >= +totalPages) {
    pagePlus2Library.classList.add('is-hidden');
  }
  if (+pageCurrentLibrary.innerHTML + 1 === +totalPages) {
    pageDot2Library.classList.add('is-hidden');
  }
  if (+pagePlus1Library.innerHTML + 1 === +totalPages) {
    pageDot2Library.classList.add('is-hidden');
  }
  if (+pagePlus2Library.innerHTML + 1 === +totalPages) {
    pageDot2Library.classList.add('is-hidden');
  }
};
pageNextLibrary.addEventListener('click', async event => {
  event.preventDefault();
  page = parseInt(localStorage.getItem('currentPage')) + 1;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pagePreviousLibrary.addEventListener('click', async event => {
  event.preventDefault();
  page = parseInt(localStorage.getItem('currentPage')) - 1;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageFirstLibrary.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageMinus2Library.addEventListener('click', async event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageMinus1Library.addEventListener('click', event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pagePlus1Library.addEventListener('click', event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pagePlus2Library.addEventListener('click', event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

pageLastLibrary.addEventListener('click', event => {
  event.preventDefault();
  const page = event.target.innerHTML;
  let data;
  movieCardEl = document.querySelector('.movie-card');
  switch (movieCardEl.dataset.collection) {
    case 'queue':
      data = JSON.parse(localStorage.getItem('queue'));
      break;
    case 'watched':
      data = JSON.parse(localStorage.getItem('watched'));
      break;
  }
  const markup = drawMovies(data[page], movieCardEl.dataset.collection);
  loadMovies(markup);
  renderPageNumberLibrary(page, data.total_pages);
  localStorage.setItem('currentPage', page.toString());
});

import { convertGenres } from './helper_functions.js';
import { showLoader, hideLoader } from './loader.js';
import axios from 'axios';
const modalEl = document.querySelector('.modal__backdrop');
const closeButtonEl = document.querySelector('.modal__close');

const formatRate = rating => {
  return rating.toFixed(1);
};
const closeModal = () => {
  modalEl.classList.toggle('modal__hidden');
};
const removeListeners = () => {
  closeButtonEl.removeEventListener('click', clickedCloseButton);
  document.removeEventListener('keydown', pressedESC);
  modalEl.removeEventListener('click', clickedOutside);
};
const clickedCloseButton = () => {
  closeModal();
  removeListeners();
};

const pressedESC = event => {
  if (event.keyCode === 27) {
    closeModal();
    removeListeners();
  }
};
const clickedOutside = event => {
  if (event.target === modalEl) {
    closeModal();
    removeListeners();
  }
};

const fetchMovieInfo = async movieId => {
  try {
    showLoader();
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=5e58d3162f5aafaf855cf7d900bbc361&language=en-US`,
    );
    hideLoader();
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(`some error😇.`, {
      timeout: 1000,
    });
  }
};

window.addEventListener('click', async event => {
  if (event.target.className !== 'movie-card__poster') {
    return;
  }
  modalEl.classList.toggle('modal__hidden');
  const movieId = event.target.dataset.movieid;
  const clickedMovie = await fetchMovieInfo(movieId);
  console.log(clickedMovie);
  let posterUrl = clickedMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${clickedMovie.poster_path}`
    : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
  let posterUrlRetina = clickedMovie.poster_path
    ? `https://image.tmdb.org/t/p/w780${clickedMovie.poster_path}`
    : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;

  let modalPosterEl = document.querySelector('.modal__poster');
  let titleEl = document.querySelector('.modal__title');
  let ratingEl = document.querySelector('.modal__rating');
  let numOfVotesEL = document.querySelector('.modal__rating--number-of-votes');
  let popularityEl = document.querySelector("dd[data-info='popularity']");
  let longTitle = document.querySelector("dd[data-info='orgtitle']");
  let genresEl = document.querySelector("dd[data-info='genres']");
  let descriptionEl = document.querySelector('.modal__descripton');

  modalPosterEl.src = `${posterUrl}`;
  modalPosterEl.srcset = `${posterUrl} 1x, ${posterUrlRetina} 2x`;
  titleEl.textContent = `${clickedMovie.title}`;
  ratingEl.textContent = `${Number.parseFloat(clickedMovie.vote_average).toFixed(1)}`;
  numOfVotesEL.innerText = `${clickedMovie.vote_count}`;
  popularityEl.innerText = `${clickedMovie.popularity.toFixed(1)}`;
  longTitle.innerText = `${clickedMovie.original_title.toUpperCase()}`;
  genresEl.innerText = `${convertGenres(clickedMovie.genres.map(genre => genre.id))}`;
  descriptionEl.innerText = `${clickedMovie.overview}`;
  modalEl.dataset.movieid = `${clickedMovie.id}`;
  modalEl.dataset.genres = `${clickedMovie.genres.map(genre => genre.id)}`;

  closeButtonEl.addEventListener('click', clickedCloseButton);
  modalEl.addEventListener('click', clickedOutside);
  document.addEventListener('keydown', pressedESC);
});

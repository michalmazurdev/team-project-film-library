import { movieTypes } from './genres.js';

const posterEl = document.querySelector('#poster_path');
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

window.addEventListener('click', event => {
  if (event.target.className !== 'movie-card__poster') {
    return;
  }
  modalEl.classList.toggle('modal__hidden');

  const id = event.target.dataset.order;
  const clickedMovie = JSON.parse(localStorage.getItem('currentFetch'))[id];

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
  ratingEl.textContent = `${formatRate(clickedMovie.vote_average)}`;
  numOfVotesEL.innerText = `${clickedMovie.vote_count}`;
  popularityEl.innerText = `${clickedMovie.popularity}`;
  longTitle.innerText = `${clickedMovie.original_title.toUpperCase()}`;
  genresEl.innerText = `${movieTypes(clickedMovie.genre_ids)}`;
  descriptionEl.innerText = `${clickedMovie.overview}`;
  modalEl.dataset.movieid = `${clickedMovie.id}`;

  closeButtonEl.addEventListener('click', clickedCloseButton);
  modalEl.addEventListener('click', clickedOutside);
  document.addEventListener('keydown', pressedESC);
});

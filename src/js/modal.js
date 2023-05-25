import { movieTypes } from './genres.js';

const posterEl = document.querySelector('#poster_path');
const modalEl = document.querySelector('.modal__backdrop');
const closeButtonEl = document.querySelector('.modal__close');

const formatRate = rating => {
  return rating.toFixed(1);
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
  let orgtitleEl = document.querySelector("dd[data-info='orgtitle']");
  let genresEl = document.querySelector("dd[data-info='genres']");
  let descriptionEl = document.querySelector('.modal__descripton');

  modalPosterEl.src = `${posterUrl}`;
  posterEl.srcset = `${posterUrl} 1x, ${posterUrlRetina} 2x`;
  titleEl.textContent = `${clickedMovie.title}`;
  ratingEl.textContent = `${formatRate(clickedMovie.vote_average)}`;
  numOfVotesEL.innerText = `${clickedMovie.vote_count}`;
  popularityEl.innerText = `${clickedMovie.popularity}`;
  orgtitleEl.innerText = `${clickedMovie.original_title}`;
  genresEl.innerText = `${movieTypes(clickedMovie.genre_ids)}`;
  descriptionEl.innerText = `${clickedMovie.overview}`;
  modalEl.dataset.movieid = `${clickedMovie.id}`;
});

function closeModal() {
  modalEl.classList.remove('modal__hidden');
}
closeButtonEl.addEventListener('click', () => {
  modalEl.classList.toggle('modal__hidden');
});

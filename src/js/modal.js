import { movieTypes } from './genres.js';

const posterEl = document.querySelector('#poster_path');
const modalEl = document.querySelector('.modal__backdrop');
const closeButtonEl = document.querySelector('.modal__close');
const modalContainerEl = document.querySelector('.modal__container');

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

  console.log(modalContainerEl);

  const formatRate = rate => {
    return rate.toFixed(2)
  }
  const formattedRate = formatRate(clickedMovie.vote_average)

  modalContainerEl.innerHTML = `
   <div class="modal__poster-container">
  <img class="modal__poster"
    src="${posterUrl}"
    srcset="${posterUrl} 1x, ${posterUrlRetina} 2x"
    alt=""
    />
   </div>
   <div class="modal__movie-info">
     <h2 class="modal__title">${clickedMovie.title}</h2>
     <dl>
       <dt>Vote / Votes</dt>
       <dd>
         <span class="modal__rating">${formattedRate}</span> /
         <span class="modal__rating modal__rating--number-of-votes">${
           clickedMovie.vote_count
         }</span>
       </dd>
       <br />
       <dt>Popularity</dt>
       <dd>${clickedMovie.popularity}</dd>
       <dt>Original Title</dt>
       <dd>${clickedMovie.original_title}</dd>
       <dt>Genre</dt>
       <dd>${movieTypes(clickedMovie.genre_ids)}</dd>
     </dl>
     <h3 class="modal__descripton-heading">ABOUT</h3>
     <p class="modal__descripton">
     ${clickedMovie.overview}
     </p>
     <div class="modal__buttons-container">
       <button class="modal__button modal__button--watched">ADD TO WATCHED</button>
       <button class="modal__button modal__button--queue">ADD TO QUEUE</button>
     </div>
   </div>`;
});

closeButtonEl.addEventListener('click', () => {
  modalEl.classList.toggle('modal__hidden');
  modalContainerEl.innerHTML = '';
});

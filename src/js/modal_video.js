import Notiflix from 'notiflix';
import axios from 'axios';
const posterEl = document.querySelector('.modal__poster');
const modalVideoEl = document.querySelector('.modal-video__backdrop');
const closeButtonVideoEl = document.querySelector('.modal-video__close');

const closeVideo = () => {
  modalVideoEl.classList.toggle('modal-video__hidden');
  document.querySelector('iframe').removeAttribute('src');
};
const removeListeners = () => {
  closeButtonVideoEl.removeEventListener('click', clickedCloseButton);
  document.removeEventListener('keydown', pressedESC);
  modalVideoEl.removeEventListener('click', clickedOutside);
};
const clickedCloseButton = () => {
  closeVideo();
  removeListeners();
};
const pressedESC = event => {
  if (event.keyCode === 27) {
    closeVideo();
    removeListeners();
  }
};
const clickedOutside = event => {
  if (event.target === modalVideoEl) {
    closeVideo();
    removeListeners();
  }
};

const fetchTrailerIds = async () => {
  try {
    const movieId = document.querySelector('.modal__backdrop').dataset.movieid;
    const intMovieId = Number(movieId);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=5e58d3162f5aafaf855cf7d900bbc361&language=en-US`,
    );
    return response.data.results;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no trailers matching your search query. We are sorry for that😇.',
    );
  }
};

posterEl.addEventListener('click', async event => {
  event.preventDefault();

  modalVideoEl.classList.toggle('modal-video__hidden');
  const response = await fetchTrailerIds();

  const trailerIds = response
    .filter(clip => clip.type == 'Trailer')
    .map(clip => clip.key)
    .slice(0, 1);
  console.log(trailerIds);
  document.querySelector('iframe').src = `https://www.youtube.com/embed/${trailerIds}`;

  document.addEventListener('keydown', pressedESC);
  closeButtonVideoEl.addEventListener('click', clickedCloseButton);
  modalVideoEl.addEventListener('click', clickedOutside);
});

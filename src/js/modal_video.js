import Notiflix from 'notiflix';
import axios from 'axios';
const posterEl = document.querySelector('.modal__poster');
const modalVideol = document.querySelector('.modal-video__backdrop');
const closeButtonVideoEl = document.querySelector('.modal-video__close');
console.log(closeButtonVideoEl);

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
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

posterEl.addEventListener('click', async event => {
  event.preventDefault();

  //   console.log(intMovieId);
  modalVideol.classList.toggle('modal-video__hidden');

  const response = await fetchTrailerIds();

  //   console.log(response);
  const trailerIds = response
    .filter(clip => clip.type == 'Trailer')
    .map(clip => clip.key)
    .slice(0, 1);
  console.log(trailerIds);
  document.querySelector('iframe').src = `https://www.youtube.com/embed/${trailerIds}`;
});

closeButtonVideoEl.addEventListener('click', () => {
  modalVideol.classList.toggle('modal-video__hidden');
  document.querySelector('iframe').removeAttribute('src');
});

// const clickedCloseButton = () => {
//   closeModal();
//   removeListeners();
// };

// const pressedESC = event => {
//   if (event.keyCode === 27) {
//     closeModal();
//     removeListeners();
//   }
// };
// const clickedOutside = event => {
//   if (event.target === modalEl) {
//     closeModal();
//     removeListeners();
//   }
// };

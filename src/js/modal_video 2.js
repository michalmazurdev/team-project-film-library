import Notiflix from 'notiflix';
import axios from 'axios';
const posterEl = document.querySelector('.modal__poster');
const modalVideol = document.querySelector('.modal-video__backdrop');
const closeButtonVideoEl = document.querySelector('.modal-video__close');
console.log(closeButtonVideoEl);

const fetchTrailerIds = async movieId => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/603692/videos?api_key=5e58d3162f5aafaf855cf7d900bbc361&language=en-US`,
    );
    return response;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

posterEl.addEventListener('click', async event => {
  event.preventDefault();
  const movieId = document.querySelector('.modal__backdrop').dataset.movieid;

  console.log(typeof movieId);
  const intMovieId = Number(movieId);

  console.log(typeof intMovieId);
  modalVideol.classList.toggle('modal-video__hidden');

  const response = await fetchTrailerIds(intMovieId);

  console.log(response);
  const trailerIds = response.data.results;
  // .filter(clip => (clip.type = 'Trailer'));
  // .map(clip => clip.key);
  console.log(trailerIds);
});

closeButtonVideoEl.addEventListener('click', () => {
  modalVideol.classList.toggle('modal-video__hidden');
});

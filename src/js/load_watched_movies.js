import { addToWatchedOrQueue } from './firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
let user;

onAuthStateChanged(auth, currentUser => {
  if (currentUser) {
    user = currentUser;
  }
});

if (user) {
  let uid = user.uid;
  const tableFields = document.querySelectorAll('dd');
  let arrayData = Array.from(tableFields);
  arrayData = arrayData.map(el => el.textContent);
  const image = document.querySelector('.modal__poster').src;
  const title = document.querySelector('.modal__title').textContent;
  const ratingNumberOfVotes = document.querySelector('.modal__rating--number-of-votes').textContent;
  const rating = document.querySelector('.modal__rating').textContent;
  const popularity = arrayData[1];
  const fullTitle = arrayData[2];
  const genres = document.querySelector('.modal__backdrop').dataset.genres.split(',');
  const about = document.querySelector('.modal__descripton').textContent;
  const releaseDate = clickedMovie.release_date;
  const posterPath = clickedMovie.poster_path;

  addToWatchedOrQueue(
    image,
    title,
    rating,
    ratingNumberOfVotes,
    popularity,
    fullTitle,
    genres,
    about,
    releaseDate,
    posterPath,
    UniqueFilmId,
    'watched',
    uid,
  );
} else {
  Notify.failure('No user is signed in.');
}

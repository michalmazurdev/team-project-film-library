import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, child, get, update, remove } from 'firebase/database';
import { Notify } from 'notiflix';

const firebaseConfig = {
  apiKey: 'AIzaSyDWoBH83IVZtl5zfAq5CbdguqYq3fE-DS0',
  authDomain: 'js-team-project-gr5.firebaseapp.com',
  projectId: 'js-team-project-gr5',
  storageBucket: 'js-team-project-gr5.appspot.com',
  messagingSenderId: '318653212510',
  appId: '1:318653212510:web:dc27e0d5cca4f8c4cfd1cf',
  measurementId: 'G-WJNSN4TTJV',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbRef = ref(getDatabase());
let loginEmail = document.getElementById('login-email').value;
let loginPassword = document.getElementById('login-password').value;
let user;
let id;
let clickedMovie;

//**************** */

//Funkcję dla logowania i rejestrowania

//******************* */

document.getElementById('log-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      Notify.success('Succesfully logged in');
      user = userCredential.user;
      document.getElementById('login-div').style.display = 'inline';
    })
    .catch(error => {
      const errorMessage = error.message;
      document.getElementById('login-div').style.display = 'inline';
      Notify.failure(`${errorMessage}`);
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  const registerEmail = document.getElementById('register-email').value;
  const registerPassword = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then(userCredential => {
      user = userCredential.user;
      document.getElementById('register-div').style.display = 'inline';
      Notify.success('Succesfully registered! Now log in');
    })
    .catch(error => {
      const errorMessage = error.message;
      document.getElementById('register-div').style.display = 'inline';
      Notify.failure(`${errorMessage}`);
    });
});

//************************************* */

//funkcje zapisu i usunięcia danych z Firebase

//************************************* */

//dodanie filmu do Firebase/watched lub Firebase/queue
function addToWatchedOrQueue(
  picture,
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
  libraryPlace,
  userId,
) {
  get(child(dbRef, userId + '/' + `${libraryPlace}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const updates = {};
        updates[userId + '/' + `${libraryPlace}` + '/' + `${UniqueFilmId}`] = {
          picture: picture,
          title: title,
          rating: rating,
          ratingNumberOfVotes: ratingNumberOfVotes,
          popularity: popularity,
          fullTitle: fullTitle,
          genres: genres,
          about: about,
          releaseDate: releaseDate,
          posterPath: posterPath,
        };
        update(ref(db), updates);
      } else {
        set(ref(db, userId + '/' + `${libraryPlace}` + '/' + `${UniqueFilmId}`), {
          picture: picture,
          title: title,
          rating: rating,
          ratingNumberOfVotes: ratingNumberOfVotes,
          popularity: popularity,
          fullTitle: fullTitle,
          genres: genres,
          about: about,
          releaseDate: releaseDate,
          posterPath: posterPath,
        });
      }
      Notify.success(`added to ${libraryPlace} list`);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

//pobieranie id filmu po kliknięciu na poster
window.addEventListener('click', event => {
  if (event.target.className !== 'movie-card__poster') {
    return;
  }
  id = event.target.dataset.order;
  clickedMovie = JSON.parse(localStorage.getItem('currentFetch'))[id];
  UniqueFilmId = JSON.parse(localStorage.getItem('currentFetch'))[id].id;
});

//wowyłanie funkcji która dodaje film do Firebase do ścieżki /watched
document.querySelector('.modal__button--watched').addEventListener('click', () => {
  if (user) {
    let uid = user.uid;
    const tableFields = document.querySelectorAll('dd');
    let arrayData = Array.from(tableFields);
    arrayData = arrayData.map(el => el.textContent);
    const image = document.querySelector('.modal__poster').src;
    const title = document.querySelector('.modal__title').textContent;
    const ratingNumberOfVotes = document.querySelector(
      '.modal__rating--number-of-votes',
    ).textContent;
    const rating = document.querySelector('.modal__rating').textContent;
    const popularity = arrayData[1];
    const fullTitle = arrayData[2];
    const genres = arrayData[3];
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
});

//wowyłanie funkcji która dodaje film do Firebase do ścieżki /queue
document.querySelector('.modal__button--queue').addEventListener('click', () => {
  if (user) {
    let uid = user.uid;
    const tableFields = document.querySelectorAll('dd');
    let arrayData = Array.from(tableFields);
    arrayData = arrayData.map(el => el.textContent);
    const image = document.querySelector('.modal__poster').src;
    const title = document.querySelector('.modal__title').textContent;
    const ratingNumberOfVotes = document.querySelector(
      '.modal__rating--number-of-votes',
    ).textContent;
    const rating = document.querySelector('.modal__rating').textContent;
    const popularity = arrayData[1];
    const fullTitle = arrayData[2];
    const genres = arrayData[3];
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
      'queue',
      uid,
    );
  } else {
    Notify.failure('No user is signed in.');
  }
});

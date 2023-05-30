import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { renderPageNumberLibrary } from './pagination_library.js';
import axios from 'axios';
import { movieTypes } from './genres.js';
import { getDatabase, ref, set, child, get, update, remove } from 'firebase/database';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const organizeArray = array => {
  let object = {};
  let totalPages = Math.ceil(array.length / 20);
  for (let i = 0; i < totalPages; i++) {
    object[i + 1] = array.slice(i * 20, i * 20 + 20);
  }
  object.total_pages = totalPages;
  return object;
};

const firebaseConfig = {
  apiKey: 'AIzaSyDWoBH83IVZtl5zfAq5CbdguqYq3fE-DS0',
  authDomain: 'js-team-project-gr5.firebaseapp.com',
  projectId: 'js-team-project-gr5',
  storageBucket: 'js-team-project-gr5.appspot.com',
  messagingSenderId: '318653212510',
  appId: '1:318653212510:web:dc27e0d5cca4f8c4cfd1cf',
  measurementId: 'G-WJNSN4TTJV',
};

const movieListEl = document.querySelector('.movie-list');
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbRef = ref(getDatabase());
let loginEmail = document.getElementById('login-email').value;
let loginPassword = document.getElementById('login-password').value;
let user;
let id;
let clickedMovie;

onAuthStateChanged(auth, currentUser => {
  if (currentUser) {
    user = currentUser;
    logged(currentUser.email);
    loadWatchedMoviesOnLibraryEnter();
  } else {
    loggedOut();
  }
});

//******************* */
//funkcjonalność gdy użytkownik jest zalogowany

const logged = email => {
  const loggedEl = document.querySelector('.logged');
  const logoutBtn = document.querySelector('.header__logout');
  const loginForm = document.querySelector('.login__form');
  const logInBtn = document.getElementById('log-btn');
  const registerBtn = document.getElementById('register-btn');
  const registerLink = document.getElementById('register');
  const loginLink = document.getElementById('log-in');
  loggedEl.textContent = `LOGGED IN AS ${email}`;
  loggedEl.style.visibility = 'visible';
  logoutBtn.style.visibility = 'visible';

  loginForm.style.visibility = 'hidden';
  logInBtn.style.visibility = 'hidden';
  registerBtn.style.visibility = 'hidden';
  loginLink.style.color = 'white';
  registerLink.style.color = 'white';
};
const loggedOut = () => {
  const loggedEl = document.querySelector('.logged');
  const logoutBtn = document.querySelector('.header__logout');
  loggedEl.style.visibility = 'hidden';
  logoutBtn.style.visibility = 'hidden';
};
//**************** */

//Funkcję dla logowania i rejestrowania

document.getElementById('log-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      Notify.success(`Succesfully logged in`, {
        timeout: 1000,
      });
      user = userCredential.user;
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
});

document.getElementById('logout-btn').addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      Notify.success(`Succesfully logged out`, {
        timeout: 1000,
      });
    })
    .catch(error => {
      Notify.failure(`An error occured`, {
        timeout: 1000,
      });
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      user = userCredential.user;
      Notify.success(`Succesfully registered! Now log in`, {
        timeout: 1000,
      });
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
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
          backdrop_path: picture,
          title: title,
          vote_average: rating,
          vote_count: ratingNumberOfVotes,
          popularity: popularity,
          original_title: fullTitle,
          genre_ids: genres,
          overview: about,
          release_date: releaseDate,
          poster_path: posterPath,
          id: UniqueFilmId,
        };
        update(ref(db), updates);
      } else {
        set(ref(db, userId + '/' + `${libraryPlace}` + '/' + `${UniqueFilmId}`), {
          backdrop_path: picture,
          title: title,
          vote_average: rating,
          vote_count: ratingNumberOfVotes,
          popularity: popularity,
          original_title: fullTitle,
          genre_ids: genres,
          overview: about,
          release_date: releaseDate,
          poster_path: posterPath,
          id: UniqueFilmId,
        });
      }
      Notify.success(`added to ${libraryPlace} list`, {
        timeout: 1000,
      });
    })
    .catch(error => {
      const errorMessage = error.message;
      Notify.failure(`${errorMessage}`, {
        timeout: 1000,
      });
    });
}

const fetchMovieInfo = async movieId => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=5e58d3162f5aafaf855cf7d900bbc361&language=en-US`,
    );
    return response.data;
  } catch (error) {
    Notify.failure(`some error😇.`, {
      timeout: 1000,
    });
  }
};

//pobieranie id filmu po kliknięciu na poster
window.addEventListener('click', async event => {
  if (event.target.className !== 'movie-card__poster') {
    return;
  }
  const movieId = event.target.dataset.movieid;
  clickedMovie = await fetchMovieInfo(movieId);
  UniqueFilmId = clickedMovie.id;
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
    Notify.failure(`No user is signed in.`, {
      timeout: 1000,
    });
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
      'queue',
      uid,
    );
  } else {
    Notify.failure('No user is signed in.', {
      timeout: 1000,
    });
  }
});

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
    <img class="movie-card__poster" id="poster_path" data-movieid=${movie.id}
    src="${posterUrl}"
    srcset="${posterUrl} 1x, ${posterUrlRetina} 2x"
    alt=""
    />
    </div>
    <div class="movie-card__figcaption">
        <p class="movie-card__title" id="title">${movie.title.toUpperCase()}</p>
        <span class="movie-card__genre" id="genre_ids">${movieTypes(movie.genre_ids)} |</span>
        <span class="movie-card__release-date" id="release_date"> ${movie.release_date.slice(
          0,
          4,
        )}</span>
        <!-- in JS need to add a script for changing visibility on Homepage: document.querySelector('.movie-card__rating').classList.add('is-hidden') -->
        <span class="movie-card__rating" id="vote_average">${movie.vote_average}</span>
    </div>
</div>`;
  });
  return markup;
};

const loadMovies = markup => {
  movieListEl.innerHTML = '';
  movieListEl.innerHTML = markup;
};

//po kliknięciu Watched przekazuje ścieżkę do Firebase/Watched do funkcji
document.querySelector('.button__status').addEventListener('click', () => {
  watchedOrQueue = 'watched';

  passPathToRenderMoviesFrom(watchedOrQueue);
});

//po kliknięciu Queue przekazuje ścieżkę do Firebase/queue do funkcji
document.querySelector('.button__status').nextElementSibling.addEventListener('click', () => {
  watchedOrQueue = 'queue';
  passPathToRenderMoviesFrom(watchedOrQueue);
});

//Przekazuje odpowiednią ścieżkę z obiektami do funkcji renderującej filmy
function passPathToRenderMoviesFrom(watchedOrQueue) {
  if (user) {
    let uid = user.uid;
    get(child(dbRef, uid + '/' + watchedOrQueue)).then(snapshot => {
      moviesAddedToWatch = snapshot.val();
      const arrayOfVideoData = Object.values(moviesAddedToWatch);
      const arrayOfVideoIds = Object.keys(moviesAddedToWatch);
      localStorage.setItem(watchedOrQueue, JSON.stringify(organizeArray(arrayOfVideoData)));
      loadMovies(drawMovies(arrayOfVideoData.slice(0, 20), watchedOrQueue));
      renderPageNumberLibrary(1, organizeArray(arrayOfVideoData).total_pages);
    });
  } else {
    Notify.failure(`Sign in first`, {
      timeout: 1000,
    });
  }
}

//Usuwanie obiektu z Watched lub Queue po właściwości .UniqueId
function deleteVideoFromLibrary(dbRef, userId, watchedOrQueue, UniqueFilmId) {
  remove(child(dbRef, userId + '/' + `${watchedOrQueue}` + '/' + `${UniqueFilmId}`))
    .then(
      Notify.success(`Removed ${UniqueFilmId} from ${watchedOrQueue} list`, {
        timeout: 1000,
      }),
    )
    .catch(function (error) {
      Notify.failure(`Wystąpił błąd podczas usuwania obiektu:`, error, {
        timeout: 1000,
      });
    });
}

function loadWatchedMoviesOnLibraryEnter() {
  if (document.querySelector('.button__status')) {
    if (user) {
      watchedOrQueue = 'watched';
      passPathToRenderMoviesFrom(watchedOrQueue);
      document.querySelector('.button__status').style.backgroundColor = '#ff6b08';
      window.addEventListener('click', () => {
        document.querySelector('.button__status').style.backgroundColor = '';
      });
    } else {
      Notify.failure('No user is signed in.');
    }
  }
}

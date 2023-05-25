// import { drawMovies } from '../js/trending-movies';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, onValue, child, get, push, update } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { Notiflix, Notify } from 'notiflix';
// import { firebaseConfig } from '../js/firebase';

const movieListEl = document.querySelector('.movie-list');

const firebaseConfig = {
  apiKey: 'AIzaSyDWoBH83IVZtl5zfAq5CbdguqYq3fE-DS0',
  authDomain: 'js-team-project-gr5.firebaseapp.com',
  projectId: 'js-team-project-gr5',
  storageBucket: 'js-team-project-gr5.appspot.com',
  messagingSenderId: '318653212510',
  appId: '1:318653212510:web:dc27e0d5cca4f8c4cfd1cf',
  measurementId: 'G-WJNSN4TTJV',
  // databaseURL: 'https://js-team-project-gr5-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
let user;
let moviesAddedToWatch;

// document.getElementById('show-login-btn').addEventListener('click', function () {
//   document.getElementById('login-div').style.display = 'inline';
//   document.getElementById('register-div').style.display = 'none';
// });

// document.getElementById('show-register-btn').addEventListener('click', function () {
//   document.getElementById('register-div').style.display = 'inline';
//   document.getElementById('login-div').style.display = 'none';
// });

document.getElementById('log-btn').addEventListener('click', function () {
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      user = userCredential.user;
      // document.getElementById('result-box').style.display = 'inline';
      // document.getElementById('login-div').style.display = 'none';
      // document.getElementById('result').innerHTML =
      //   'Welcome Back<br>' + loginEmail + ' was Login Succesfully';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // document.getElementById('result-box').style.display = 'inline';
      // document.getElementById('login-div').style.display = 'none';
      // document.getElementById('result').innerHTML = 'Sorry ! <br>' + errorMessage;
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  const registerEmail = document.getElementById('register-email').value;
  const registerPassword = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then(userCredential => {
      user = userCredential.user;
      // document.getElementById('result-box').style.display = 'inline';
      // document.getElementById('register-div').style.display = 'none';
      // document.getElementById('result').innerHTML =
      //   'Welcome<br>' + registerEmail + ' was Registered Succesfully';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // document.getElementById('result-box').style.display = 'inline';
      // document.getElementById('register-div').style.display = 'none';
      // document.getElementById('result').innerHTML = 'Sorry ! <br>' + errorMessage;
    });
});

const drawMovies = movies => {
  let markup = '';
  let id = 0;
  // saveMovieResults(movies);
  movies.forEach(movie => {
    let posterUrl = movie.posterPath
      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
      : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
    let posterUrlRetina = movie.posterPath
      ? `https://image.tmdb.org/t/p/w780${movie.posterPath}`
      : `https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg`;
    markup += `
    <div class="movie-card">
    <div class="movie-card__poster-container">
    <img class="movie-card__poster" id="poster_path" data-order=${id++}
    src="${movie.picture}"
    srcset="${movie.picture} 1x, ${movie.picture} 2x"
    alt=""
    />
    </div>
    <div class="movie-card__figcaption">
        <p class="movie-card__title" id="title">${movie.title}</p>
        <span class="movie-card__genre" id="genre_ids">${movie.genres} |</span>
        <span class="movie-card__release-date" id="release_date"> ${movie.releaseDate.slice(
          0,
          4,
        )}</span>
        <!-- in JS need to add a script for changing visibility on Homepage: document.querySelector('.movie-card__rating').classList.add('is-hidden') -->
        <span class="movie-card__rating" id="vote_average">${movie.rating}</span>
    </div>
</div>`;
  });
  return markup;
};

const loadMovies = markup => {
  movieListEl.innerHTML = '';
  movieListEl.innerHTML = markup;
};

document.querySelector('.button__status').addEventListener('click', () => {
  if (user) {
    let uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, uid + '/' + `watched`)).then(snapshot => {
      moviesAddedToWatch = snapshot.val();
      const arrayOfVideoData = Object.values(moviesAddedToWatch);
      console.log('Tu przechowywane są obiekty z filmami', arrayOfVideoData);
      loadMovies(drawMovies(arrayOfVideoData));
    });
  } else {
    Notify.failure('Sign in first');
  }
});

document.querySelector('.button__status').nextElementSibling.addEventListener('click', () => {
  if (user) {
    let uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, uid + '/' + `queue`)).then(snapshot => {
      moviesAddedToWatch = snapshot.val();
      const arrayOfVideoData = Object.values(moviesAddedToWatch);
      console.log('Tu przechowywane są obiekty z filmami', arrayOfVideoData);
      loadMovies(drawMovies(arrayOfVideoData));
    });
  } else {
    Notify.failure('Sign in first');
  }
});

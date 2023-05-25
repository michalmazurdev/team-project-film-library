import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, onValue, child, get, push, update } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { Notiflix, Notify } from 'notiflix';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
let user;
let loginEmail = document.getElementById('login-email').value;
let loginPassword = document.getElementById('login-password').value;

// document.getElementById('show-login-btn').addEventListener('click', function () {
//   document.getElementById('login-div').style.display = 'inline';
//   document.getElementById('register-div').style.display = 'none';
// });

// document.getElementById('show-register-btn').addEventListener('click', function () {
//   document.getElementById('register-div').style.display = 'inline';
//   document.getElementById('login-div').style.display = 'none';
// });

document.getElementById('log-btn').addEventListener('click', function () {
  loginEmail = document.getElementById('login-email').value;
  loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      Notify.success('Succesfully logged in');
      user = userCredential.user;
      // document.getElementById('result-box').style.display = 'none';
      document.getElementById('login-div').style.display = 'inline';
      // document.getElementById('result').innerHTML =
      //   'Welcome Back<br>' + loginEmail + ' was Login Succesfully';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // document.getElementById('result-box').style.display = 'none';
      document.getElementById('login-div').style.display = 'inline';
      // document.getElementById('result').innerHTML = 'Sorry ! <br>' + errorMessage;
      Notify.failure(`${errorMessage}`);
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  const registerEmail = document.getElementById('register-email').value;
  const registerPassword = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then(userCredential => {
      user = userCredential.user;
      // document.getElementById('result-box').style.display = 'inline';
      document.getElementById('register-div').style.display = 'inline';
      // document.getElementById('result').innerHTML =
      //   'Welcome<br>' + registerEmail + ' was Registered Succesfully';
      Notify.success('Succesfully registered! Now log in');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // document.getElementById('result-box').style.display = 'inline';
      document.getElementById('register-div').style.display = 'inline';
      // document.getElementById('result').innerHTML = 'Sorry ! <br>' + errorMessage;
      Notify.failure(`${errorMessage}`);
    });
});

//************************************* */

//funkcje zapisu i odczytu danych z Firebase

//************************************* */

function addToWatchedOrQueue(
  picture,
  title,
  rating,
  ratingNumberOfVotes,
  popularity,
  fullTitle,
  genres,
  about,
  libraryPlace,
  userId,
) {
  const dbRef = ref(getDatabase());
  const newAddedFilmKey = push(child(ref(db), userId + ' / ' + `${libraryPlace}`)).key;
  get(child(dbRef, userId + '/' + `${libraryPlace}`))
    .then(snapshot => {
      Notify.success(`added to ${libraryPlace} list`);
      if (snapshot.exists()) {
        const updates = {};
        updates[userId + '/' + `${libraryPlace}` + '/' + newAddedFilmKey] = {
          picture: picture,
          title: title,
          rating: rating,
          ratingNumberOfVotes: ratingNumberOfVotes,
          popularity: popularity,
          fullTitle: fullTitle,
          genres: genres,
          about: about,
        };
        update(ref(db), updates);
      } else {
        const db = getDatabase();
        set(ref(db, userId + '/' + `${libraryPlace}` + '/' + newAddedFilmKey), {
          picture: picture,
          title: title,
          rating: rating,
          ratingNumberOfVotes: ratingNumberOfVotes,
          popularity: popularity,
          fullTitle: fullTitle,
          genres: genres,
        });
      }
    })
    .catch(error => {
      Notify.failure(error);
    });
}

document.querySelector('.modal__container').addEventListener('click', () => {
  document.querySelector('.modal__button--watched').addEventListener('click', e => {
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
      const releaseDate = '';
      // console.log(about);
      // console.log(fullTitle, ratingNumberOfVotes, popularity, genres);
      addToWatchedOrQueue(
        image,
        title,
        rating,
        ratingNumberOfVotes,
        popularity,
        fullTitle,
        genres,
        about,
        'watched',
        uid,
      );
    } else {
      // console.log(user);
      Notify.failure('No user is signed in.');
    }
  });

  document.querySelector('.modal__button--queue').addEventListener('click', e => {
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
      addToWatchedOrQueue(
        image,
        title,
        rating,
        ratingNumberOfVotes,
        popularity,
        fullTitle,
        genres,
        about,
        'queue',
        uid,
      );
    } else {
      // console.log(user);
      Notify.failure('No user is signed in.');
    }
  });
});

// filmPictures.addEventListener('click', e => {
//   console.log('test');
// });
// signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(userCredential => {
//   user = userCredential.user;
// });

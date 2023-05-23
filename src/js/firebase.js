import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const database = getDatabase();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDWoBH83IVZtl5zfAq5CbdguqYq3fE-DS0',
  authDomain: 'js-team-project-gr5.firebaseapp.com',
  projectId: 'js-team-project-gr5',
  storageBucket: 'js-team-project-gr5.appspot.com',
  messagingSenderId: '318653212510',
  appId: '1:318653212510:web:dc27e0d5cca4f8c4cfd1cf',
  measurementId: 'G-WJNSN4TTJV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('show-login-btn').addEventListener('click', function () {
  document.getElementById('login-div').style.display = 'inline';
  document.getElementById('register-div').style.display = 'none';
});

document.getElementById('show-register-btn').addEventListener('click', function () {
  document.getElementById('register-div').style.display = 'inline';
  document.getElementById('login-div').style.display = 'none';
});

document.getElementById('log-btn').addEventListener('click', function () {
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      const user = userCredential.user;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('login-div').style.display = 'none';
      document.getElementById('result').innerHTML =
        'Welcome Back<br>' + loginEmail + ' was Login Succesfully';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('login-div').style.display = 'none';
      document.getElementById('result').innerHTML = 'Sorry ! <br>' + errorMessage;
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  const registerEmail = document.getElementById('register-email').value;
  const registerPassword = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then(userCredential => {
      const user = userCredential.user;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('register-div').style.display = 'none';
      document.getElementById('result').innerHTML =
        'Welcome<br>' + registerEmail + ' was Registered Succesfully';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('register-div').style.display = 'none';
      document.getElementById('result').innerHTML = 'Sorry ! <br>' + errorMessage;
    });
});

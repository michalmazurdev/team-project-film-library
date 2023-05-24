// import { drawMovies } from '../js/trending-movies';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, onValue, child, get, push, update } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

document.querySelector('.btn-film-status').addEventListener('click', () => {
  console.log('test');
  console.log(snapshot.val());
});

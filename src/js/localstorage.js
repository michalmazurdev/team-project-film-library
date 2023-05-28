const watchedBtn = document.querySelector('.modal__button--watched');
const queueBtn = document.querySelector('.modal__button--queue');
let clickedMovie = JSON.parse(localStorage.getItem('currentFetch'));
let uniqueMovieId = JSON.parse(localStorage.getItem('currentFetch'));

window.addEventListener('click', event => {
  if (event.target.className !== 'movie-card__poster') {
    return;
  }

  let id = event.target.dataset.order;
  clickedMovie = JSON.parse(localStorage.getItem('currentFetch'))[id];
  uniqueMovieId = JSON.parse(localStorage.getItem('currentFetch'))[id].id;

  checkBtnWatched('watchedMovies', watchedBtn);
  checkBtnQueue('queueMovies', queueBtn);
});

watchedBtn.addEventListener('click', () => {
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  if (!watchedMovies.find(item => item.id === uniqueMovieId)) {
    saveToLocalStorage(watchedMovies, clickedMovie, 'watchedMovies');
    watchedBtn.textContent = 'Remove from watched';
  } else {
    removeToLocalStorage(watchedMovies, 'watchedMovies');
    watchedBtn.classList.add('modal__button');
    watchedBtn.textContent = 'Add to watched';
  }
});

queueBtn.addEventListener('click', () => {
  let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
  if (!queueMovies.find(item => item.id === uniqueMovieId)) {
    saveToLocalStorage(queueMovies, clickedMovie, 'queueMovies');
    queueBtn.textContent = 'Remove from queue';
  } else {
    removeToLocalStorage(queueMovies, 'queueMovies');
    queueBtn.textContent = 'Add to queue';
  }
});

function saveToLocalStorage(name, data, key) {
  name.push(data);
  localStorage.setItem(key, JSON.stringify(name));
}

function removeToLocalStorage(name, key) {
  let index = name.findIndex(item => item.id === uniqueMovieId);
  name.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(name));
}

function checkBtnWatched(key, nameBtn) {
  const array = JSON.parse(localStorage.getItem(key));
  if (array.findIndex(item => item.id === uniqueMovieId) !== -1) {
    nameBtn.classList.add('modal__button--remove');
    nameBtn.textContent = 'Remove from watched';
  } else {
    nameBtn.classList.remove('modal__button--remove');
    nameBtn.textContent = 'Add to watched';
  }
}

function checkBtnQueue(key, nameBtn) {
  const array = JSON.parse(localStorage.getItem(key));
  if (array.findIndex(item => item.id === uniqueMovieId) !== -1) {
    nameBtn.classList.add('modal__button--remove');
    nameBtn.textContent = 'Remove from queue';
  } else {
    nameBtn.classList.remove('modal__button--remove');
    nameBtn.textContent = 'Add to queue';
  }
}

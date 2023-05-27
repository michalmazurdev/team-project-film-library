export function dataService(data) {
  const addwatchedBtn = document.querySelector('.modal__button--watched');
  const addqueueBtn = document.querySelector('.modal__button--queue');

  if (localStorage.getItem('watchedMovie') === null) {
    localStorage.setItem('watchedMovie', '[]');
  }

  if (localStorage.getItem('queueMovie') === null) {
    localStorage.setItem('queueMovie', '[]');
  }

  function onWatchedClick() {
    const watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));

    if (!watchedMovie.find(item => item.id === data.id)) {
      watchedMovie.push(data);
      localStorage.setItem('watchedMovie', JSON.stringify(watchedMovie));
    }
  }

  function onQueueClick() {
    const watchedQueue = JSON.parse(localStorage.getItem('queueMovie'));

    if (!watchedQueue.find(item => item.id === data.id)) {
      watchedQueue.push(data);
      localStorage.setItem('queueMovie', JSON.stringify(watchedQueue));
    }
  }

  addwatchedBtn.addEventListener('click', onWatchedClick);
  addqueueBtn.addEventListener('click', onQueueClick);
}

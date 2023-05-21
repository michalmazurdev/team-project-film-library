const posterEl = document.querySelector('#poster_path');

const modalEl = document.querySelector('.modal__backdrop');

const closeButtonEl = document.querySelector('.modal__close');

const teamLinkEl = document.querySelector('.footer-item__link');

const modalTeamEl = document.querySelector('.modal-team__backdrop');
const closeButtonTeamEl = document.querySelector('.modal-team__close');

function showOrClose() {
  modalEl.classList.toggle('modal__hidden');
}

window.addEventListener('click', event => {
  if (event.target.className !== 'movie-card__poster') {
    return;
  }
  modalEl.classList.toggle('modal__hidden');
});
closeButtonEl.addEventListener('click', () => {
  modalEl.classList.toggle('modal__hidden');
});

teamLinkEl.addEventListener('click', event => {
  event.preventDefault();
  modalTeamEl.classList.toggle('modal-team__hidden');
});
closeButtonTeamEl.addEventListener('click', () => {
  modalTeamEl.classList.toggle('modal-team__hidden');
});

const teamLinkEl = document.querySelector('.footer-item__link');
const modalTeamEl = document.querySelector('.modal-team__backdrop');
const closeButtonTeamEl = document.querySelector('.modal-team__close');

teamLinkEl.addEventListener('click', event => {
  event.preventDefault();
  modalTeamEl.classList.toggle('modal-team__hidden');
});
closeButtonTeamEl.addEventListener('click', () => {
  modalTeamEl.classList.toggle('modal-team__hidden');
});

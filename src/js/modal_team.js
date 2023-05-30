const teamLinkEl = document.querySelector('.footer-item__link');
const modalTeamEl = document.querySelector('.modal-team__backdrop');
const closeButtonTeamEl = document.querySelector('.modal-team__close');

teamLinkEl.addEventListener('click', event => {
  event.preventDefault();
  modalTeamEl.style.display = 'block';

  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      modalTeamEl.style.display = 'none';
    }
  });
});
closeButtonTeamEl.addEventListener('click', () => {
  modalTeamEl.style.display = 'none';
});

const scrollTopButton = document.getElementById('modal-team__btn-scroll');
const modal = document.querySelector('.modal-team');

scrollTopButton.addEventListener('click', () => {
  modal.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

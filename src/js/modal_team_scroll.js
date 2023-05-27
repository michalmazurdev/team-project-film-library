const scrollTopButton = document.getElementById('modal-team__btn-scroll');
const modal = document.querySelector('.modal-team')

scrollTopButton.addEventListener('click', () => {
  modal.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
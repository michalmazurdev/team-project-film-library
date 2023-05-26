$(window).on('load', function () {
  $('.loader-wrapper').fadeOut('slow');
});

export function showLoader() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'flex';
  setTimeout(function () {
    preloader.style.display = 'none';
  }, 3000);
}

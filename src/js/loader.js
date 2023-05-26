$(window).on('load', function () {
  $('.loader-wrapper').fadeOut('slow');
});

export function showLoader(show) {
  const preloader = document.getElementById('preloader');
  if (show) {
    preloader.style.display = 'flex';
  } else {
    preloader.style.display = 'none';
  }
}

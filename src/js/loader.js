// $(window).on('load', function () {
//   $('.loader-wrapper').fadeOut('slow');
// });

export function showLoaderFor700() {
  const preloader = document.getElementById('preloader');
  const minimumDuration = 500;
  preloader.style.display = 'flex';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 700);
}

export function showLoader() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'flex';
}
export function hideLoader() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
}
showLoaderFor700();

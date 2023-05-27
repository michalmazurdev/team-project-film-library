// $(window).on('load', function () {
//   $('.loader-wrapper').fadeOut('slow');
// });

export function showLoader(show) {
  const preloader = document.getElementById('preloader');
  const minimumDuration = 1000;

  if (show) {
    preloader.style.display = 'flex';
  } else {
    setTimeout(() => {
      preloader.style.display = 'none';
    }, minimumDuration);
  }
}

export function showLoaderFor500() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'flex';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
}

export function showLoader() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'flex';
}
export function hideLoader() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
}
showLoaderFor500();

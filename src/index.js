import axios from 'axios';
import './sass/main.scss';
import Notiflix from 'notiflix';

const language = 'en-US';
let page = 1;

const searchParams = new URLSearchParams({
  query: 'matrix',
  api_key: '5e58d3162f5aafaf855cf7d900bbc361',
  include_adult: false,
  language: language,
  page: page,
});

const thisWeekMovieURL = `https://api.themoviedb.org/3/trending/movie/week?${searchParams}`;
const searchMovieURL = `https://api.themoviedb.org/3/search/movie?${searchParams}`;
const searchAllURL = `https://api.themoviedb.org/3/search/multi?${searchParams}`;
const searchPersonURL = `https://api.themoviedb.org/3/search/person?${searchParams}`;
const searchSeriesURL = `https://api.themoviedb.org/3/search/tv?${searchParams}`;

let url = searchMovieURL;

// fetch(`${searchPersonURL}`)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const fetchMovies = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
};

// const fetchMovies = () => {
//     try {
//       axios.get(url).then(response => {
//         console.log(response.data);
//         //   showMovies();
//       });
//     } catch (error) {
//       console.log(error);
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.',
//       );
//     }
//   };

// fetchMovies();

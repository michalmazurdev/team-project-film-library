import axios from 'axios';
const fetchGenres = async () => {
  const genresSimplified = {};
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=5e58d3162f5aafaf855cf7d900bbc361`,
    );
    response.data.genres.forEach(genre => (genresSimplified[genre.id] = genre.name));
    localStorage.setItem('genresSimplified', JSON.stringify(genresSimplified));
  } catch (error) {
    console.log(error);
  }
};
fetchGenres();

export const convertGenres = types => {
  const genres = JSON.parse(localStorage.getItem('genresSimplified'));
  let array = [];

  types.forEach(item => {
    if (genres[+item]) {
      array.push(genres[item]);
    }
  });
  return array.join(', ');
};

export const organizeArray = array => {
  let object = {};
  let totalPages = Math.ceil(array.length / 20);
  for (let i = 0; i < totalPages; i++) {
    object[i + 1] = array.slice(i * 20, i * 20 + 20);
  }
  object.total_pages = totalPages;
  return object;
};

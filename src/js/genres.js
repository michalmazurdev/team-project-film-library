import axios from 'axios';

// export const movieTypes = types => {
//   const genres = {
//     28: 'Action',
//     12: 'Adventure',
//     16: 'Animation',
//     35: 'Comedy',
//     80: 'Crime',
//     99: 'Documentary',
//     18: 'Drama',
//     10751: 'Family',
//     14: 'Fantasy',
//     36: 'History',
//     27: 'Horror',
//     10402: 'Music',
//     9648: 'Mystery',
//     10749: 'Romance',
//     878: 'Science Fiction',
//     10770: 'TV Movie',
//     53: 'Thriller',
//     10752: 'War',
//     37: 'Western',
//   };
//   let array = [];

//   types.forEach(item => {
//     if (genres[+item]) {
//       array.push(genres[item]);
//     }
//   });
//   console.log(array.join(', '));
//   return array.join(', ');
// };

///////////////////

export const movieTypes = async types => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=5e58d3162f5aafaf855cf7d900bbc361`,
    );
    const genres = response.data.genres;
    console.log(genres);

    let array = [];

    types.forEach(item => {
      genres.forEach(el => {
        if (el.id === item) {
          // console.log(el);
          array.push(el.name);
        }
      });
    });

    console.log(array.join(', '));
    return array.join(', ');
  } catch (error) {
    console.log(error);
  }
};

// newGenres([53, 28, 10752, 18, 14]);

import axios from 'axios';

const API_KEY = 'dbdc3735'

export const searchMovies = async ({search}) => {
  if (search === '') return null;

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const movies = response.data.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

  } catch (error) {
    throw new Error('Error');
  }
}
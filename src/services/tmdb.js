import axios from "axios";

const API_KEY = "7e8a521b909409145362608f6e961629";
const BASE_URL = "https://api.themoviedb.org/3";

export default {
  // Mashhur kinolar ro'yxati
  getPopularMovies(page = 1) {
    return axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
  },

  // Kino tafsilotlari
  getMovieDetails(id) {
    return axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
    );
  },

  // Kino qidiruv
  searchMovies(query, page = 1) {
    return axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
  },

  // Kino janrlari
  getGenres() {
    return axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  },
};

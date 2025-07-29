import { defineStore } from "pinia";
import tmdbApi from "@/services/tmdb";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    popularMovies: [],
    currentMovie: null,
    searchResults: [],
    genres: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchPopularMovies(page = 1) {
      try {
        this.isLoading = true;
        const response = await tmdbApi.getPopularMovies(page);
        this.popularMovies = response.data.results;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMovieDetails(id) {
      try {
        this.isLoading = true;
        const response = await tmdbApi.getMovieDetails(id);
        this.currentMovie = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async searchMovies(query, page = 1) {
      try {
        this.isLoading = true;
        const response = await tmdbApi.searchMovies(query, page);
        this.searchResults = response.data.results;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchGenres() {
      try {
        const response = await tmdbApi.getGenres();
        this.genres = response.data.genres;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  getters: {
    getGenreNames: (state) => (genreIds) => {
      return genreIds
        .map((id) => {
          const genre = state.genres.find((g) => g.id === id);
          return genre ? genre.name : "";
        })
        .filter((name) => name);
    },
  },
});

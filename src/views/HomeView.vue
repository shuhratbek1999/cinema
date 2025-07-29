<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <!-- Hero Banner -->
    <div v-if="featuredMovie" class="relative h-96 overflow-hidden">
      <img
        :src="`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`"
        :alt="featuredMovie.title"
        class="w-full h-full object-cover opacity-50"
      />
      <div
        class="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent w-full"
      >
        <h1 class="text-4xl font-bold mb-2">{{ featuredMovie.title }}</h1>
        <p class="text-gray-300 line-clamp-2 mb-4">
          {{ featuredMovie.overview }}
        </p>
        <RouterLink
          :to="`/movie/${featuredMovie.id}`"
          class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg inline-flex items-center"
        >
          Ko'rish <Icon icon="mdi:arrow-right" class="ml-2 w-4 h-4" />
        </RouterLink>
      </div>
    </div>

    <!-- Kategoriyalar -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="fetchMovies(category.url)"
          class="px-4 py-2 rounded-full whitespace-nowrap"
          :class="
            activeCategory === category.id
              ? 'bg-red-600'
              : 'bg-gray-800 hover:bg-gray-700'
          "
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Kinolar ro'yxati -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="mx-1 px-3 py-1 rounded"
          :class="currentPage === page ? 'bg-red-600' : 'bg-gray-800'"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import { Icon } from "@iconify/vue";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const featuredMovie = ref(null);
const movies = ref([]);
const currentPage = ref(1);
const totalPages = ref(5);
const activeCategory = ref("popular");

const categories = [
  { id: "popular", name: "Mashhurlar", url: `movie/popular` },
  { id: "top_rated", name: "Eng yaxshilar", url: `movie/top_rated` },
  { id: "now_playing", name: "Hozir kinoda", url: `movie/now_playing` },
];

const fetchFeaturedMovie = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  featuredMovie.value = res.data.results[Math.floor(Math.random() * 10)];
};

const fetchMovies = async (category = "movie/popular") => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/${category}?api_key=${API_KEY}&page=${currentPage.value}`
  );
  movies.value = res.data.results;
};

onMounted(() => {
  fetchFeaturedMovie();
  fetchMovies();
});
</script>

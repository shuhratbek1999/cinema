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
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
        class="mt-8"
      />
      <!-- Pagination -->
      <!-- <div class="flex justify-center mt-8">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="mx-1 px-3 py-1 rounded-l bg-gray-800 disabled:opacity-50"
        >
          &laquo;
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="mx-1 px-3 py-1 rounded"
          :class="
            currentPage === page
              ? 'bg-red-600'
              : 'bg-gray-800 hover:bg-gray-700'
          "
        >
          {{ page }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="mx-1 px-3 py-1 rounded-r bg-gray-800 disabled:opacity-50"
        >
          &raquo;
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";
import { Icon } from "@iconify/vue";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const route = useRoute();
const router = useRouter();

const featuredMovie = ref(null);
const movies = ref([]);
const currentPage = ref(route.query.page ? parseInt(route.query.page) : 1);
const totalPages = ref(5);
const activeCategory = ref(route.query.category || "popular");

const categories = [
  { id: "popular", name: "Mashhurlar", url: `movie/popular` },
  { id: "top_rated", name: "Eng yaxshilar", url: `movie/top_rated` },
  { id: "now_playing", name: "Hozir kinoda", url: `movie/now_playing` },
];

// Asosiy funksiyalar
const fetchFeaturedMovie = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  featuredMovie.value = res.data.results[Math.floor(Math.random() * 10)];
};

const fetchMovies = async (category = activeCategory.value) => {
  try {
    const categoryObj =
      categories.find((c) => c.id === category) || categories[0];
    const res = await axios.get(
      `https://api.themoviedb.org/3/${categoryObj.url}?api_key=${API_KEY}&page=${currentPage.value}`
    );
    movies.value = res.data.results;
    totalPages.value = res.data.total_pages > 500 ? 500 : res.data.total_pages;
    activeCategory.value = category;
    updateUrl(); // URLni yangilash
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
};
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  updateUrl();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// URLni yangilash
const updateUrl = () => {
  router.replace({
    name: "home",
    query: {
      ...route.query,
      page: currentPage.value > 1 ? currentPage.value : undefined,
    },
  });
};
// Kuzatuvchilar
watch([currentPage, activeCategory], () => {
  fetchMovies();
});

watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.page && parseInt(newQuery.page) !== currentPage.value) {
      currentPage.value = parseInt(newQuery.page);
    }
    if (newQuery.category && newQuery.category !== activeCategory.value) {
      activeCategory.value = newQuery.category;
    }
  },
  { immediate: true }
);

// Dastlabki yuklash
onMounted(() => {
  fetchFeaturedMovie();
  fetchMovies();
});
</script>

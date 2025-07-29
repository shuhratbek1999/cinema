<template>
  <div class="bg-gray-900 text-white min-h-screen py-8">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Barcha Seriallar</h1>
        <div class="relative w-64">
          <input
            v-model="searchQuery"
            @keyup.enter="fetchTvShows"
            type="text"
            placeholder="Seriallar qidirish..."
            class="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Icon
            icon="mdi:magnify"
            class="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
          />
        </div>
      </div>

      <!-- Filtrlar -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="genre in genres"
          :key="genre.id"
          @click="toggleGenre(genre.id)"
          class="px-3 py-1 rounded-full text-sm"
          :class="
            selectedGenres.includes(genre.id)
              ? 'bg-red-600'
              : 'bg-gray-800 hover:bg-gray-700'
          "
        >
          {{ genre.name }}
        </button>
      </div>

      <!-- Yuklash holati -->
      <div v-if="loading" class="flex justify-center py-12">
        <Icon icon="svg-spinners:270-ring" class="w-12 h-12 text-red-500" />
      </div>

      <!-- Seriallar ro'yxati -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <MovieCard
          v-for="tvShow in tvShows"
          :key="tvShow.id"
          :movie="tvShow"
          media-type="tv"
        />
      </div>

      <!-- Pagination -->
      <div v-if="!loading" class="flex justify-center mt-8">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-l bg-gray-800 disabled:opacity-50"
        >
          <Icon icon="mdi:chevron-left" class="w-5 h-5" />
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="px-3 py-1 border-t border-b border-gray-700"
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
          class="px-3 py-1 rounded-r bg-gray-800 disabled:opacity-50"
        >
          <Icon icon="mdi:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { Icon } from "@iconify/vue";
import MovieCard from "@/components/MovieCard.vue";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Data
const tvShows = ref([]);
const genres = ref([]);
const selectedGenres = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

// Computed
const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Methods
const fetchGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
    );
    genres.value = response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

const fetchTvShows = async () => {
  try {
    loading.value = true;
    let url = "";

    if (searchQuery.value.trim()) {
      url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery.value}&page=${currentPage.value}`;
    } else if (selectedGenres.value.length > 0) {
      url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${selectedGenres.value.join(
        ","
      )}&page=${currentPage.value}`;
    } else {
      url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${currentPage.value}`;
    }

    const response = await axios.get(url);
    tvShows.value = response.data.results;
    totalPages.value =
      response.data.total_pages > 500 ? 500 : response.data.total_pages;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
  } finally {
    loading.value = false;
  }
};

const toggleGenre = (genreId) => {
  const index = selectedGenres.value.indexOf(genreId);
  if (index === -1) {
    selectedGenres.value.push(genreId);
  } else {
    selectedGenres.value.splice(index, 1);
  }
  currentPage.value = 1;
  fetchTvShows();
};

const goToPage = (page) => {
  currentPage.value = page;
  fetchTvShows();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchTvShows();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchTvShows();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchGenres();
  fetchTvShows();
});
</script>

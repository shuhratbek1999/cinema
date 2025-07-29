<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Qidiruv paneli -->
      <div class="mb-8 p-4 bg-gray-800 rounded-lg">
        <input
          v-model="query"
          @keyup.enter="searchMovies"
          placeholder="Kino yoki serial nomi..."
          class="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      <!-- Natijalar -->
      <div v-if="loading" class="flex justify-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"
        ></div>
      </div>

      <div
        v-else-if="results.length"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <MovieCard v-for="item in results" :key="item.id" :movie="item" />
      </div>

      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-400">Hech narsa topilmadi 😢</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import.meta.env.VITE_TMDB_API_KEY;
const query = ref("");
const results = ref([]);
const loading = ref(false);

const searchMovies = async () => {
  if (!query.value.trim()) return;
  loading.value = true;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query.value}`
    );
    results.value = res.data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// Agar URL dan query kelgan bo'lsa
const route = useRoute();
if (route.query.q) {
  query.value = route.query.q;
  searchMovies();
}
</script>

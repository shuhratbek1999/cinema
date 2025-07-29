<template>
  <div v-if="movie" class="bg-gray-900 text-white min-h-screen py-32">
    <!-- Banner va asosiy ma'lumot -->
    <div class="relative">
      <img
        :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
        class="w-full h-96 object-cover opacity-40"
      />
      <div class="container mx-auto px-4 absolute inset-0 flex items-end pb-16">
        <div class="flex flex-col md:flex-row gap-8">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="w-64 rounded-lg shadow-xl"
          />
          <div>
            <h1 class="text-4xl font-bold">{{ movie.title }}</h1>
            <div class="flex items-center mt-2 space-x-4">
              <span class="bg-yellow-500 text-black px-2 py-1 rounded text-sm">
                ⭐ {{ movie.vote_average.toFixed(1) }}
              </span>
              <span>{{ movie.runtime }} min</span>
              <span>{{ movie.release_date }}</span>
            </div>
            <p class="mt-4 text-gray-300">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Trailer -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold mb-6">Treyler</h2>
      <div
        class="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden"
      >
        <iframe
          v-if="trailerKey"
          :src="`https://www.youtube.com/embed/${trailerKey}`"
          class="w-full h-96"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div v-else class="flex items-center justify-center h-64 text-gray-500">
          Treyler topilmadi
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold mb-6">Cinema</h2>
      <div
        class="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden"
      >
        <iframe
          v-if="cinemaKey"
          :src="`https://www.youtube.com/embed/${cinemaKey}`"
          class="w-full h-96"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div v-else class="flex items-center justify-center h-64 text-gray-500">
          Cinema topilmadi
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const movie = ref(null);
const trailerKey = ref("");
const cinemaKey = ref("");
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const fetchMovieDetails = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${API_KEY}`
  );
  movie.value = res.data;
};

const fetchTrailer = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${route.params.id}/videos?api_key=${API_KEY}`
  );
  // console.log(res.data.results);
  const trailer = res.data.results.find((video) => video.type === "Trailer");
  const cinema = res.data.results.find((c) => c.type === "Clip");
  cinemaKey.value = cinema?.key;
  trailerKey.value = trailer?.key;
};

onMounted(() => {
  fetchMovieDetails();
  fetchTrailer();
});
</script>

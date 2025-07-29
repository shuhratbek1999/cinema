<template>
  <div v-if="tvShow" class="bg-gray-900 text-white min-h-screen">
    <!-- Banner qismi -->
    <div class="relative">
      <img
        :src="`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`"
        class="w-full h-96 object-cover opacity-40"
      />
      <div class="container mx-auto px-4 absolute inset-0 flex items-end pb-16">
        <div class="flex flex-col md:flex-row gap-8 w-full">
          <img
            :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
            class="w-64 rounded-lg shadow-xl"
          />
          <div class="flex-1">
            <h1 class="text-4xl font-bold">{{ tvShow.name }}</h1>
            <div class="flex items-center mt-2 space-x-4">
              <span
                class="bg-yellow-500 text-black px-2 py-1 rounded text-sm flex items-center"
              >
                <Icon icon="mdi:star" class="mr-1" />
                {{ tvShow.vote_average.toFixed(1) }}
              </span>
              <span
                >{{ tvShow.first_air_date }} -
                {{ tvShow.last_air_date || "Hozirgacha" }}</span
              >
              <span>{{ tvShow.number_of_seasons }} mavsum</span>
              <span>{{ tvShow.number_of_episodes }} qism</span>
            </div>

            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="genre in tvShow.genres"
                :key="genre.id"
                class="px-2 py-1 bg-gray-800 rounded text-sm"
              >
                {{ genre.name }}
              </span>
            </div>

            <p class="mt-4 text-gray-300">{{ tvShow.overview }}</p>

            <div class="mt-6 flex space-x-4">
              <button
                class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center"
              >
                <Icon icon="mdi:play" class="mr-2" /> Treylerni ko'rish
              </button>
              <button
                class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              >
                <Icon icon="mdi:plus" />
              </button>
              <button
                class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              >
                <Icon icon="mdi:share-variant" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Asosiy kontent -->
    <div class="container mx-auto px-4 py-12">
      <!-- Mavsumlar -->
      <div v-if="seasons.length" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Mavsumlar</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <div
            v-for="season in seasons"
            :key="season.id"
            class="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition"
          >
            <img
              :src="
                season.poster_path
                  ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                  : '/no-image.jpg'
              "
              :alt="season.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="font-semibold">{{ season.name }}</h3>
              <p class="text-sm text-gray-400 mt-1">
                {{ season.episode_count }} qism •
                {{ season.air_date?.split("-")[0] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Aktyorlar -->
      <div v-if="cast.length" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Asosiy Aktyorlar</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <RouterLink
            v-for="person in cast.slice(0, 12)"
            :key="person.id"
            :to="`/person/${person.id}`"
            class="group text-center"
          >
            <div
              class="relative overflow-hidden rounded-full aspect-square mb-2 mx-auto w-32 h-32"
            >
              <img
                v-if="person.profile_path"
                :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
                :alt="person.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div
                v-else
                class="w-full h-full bg-gray-700 flex items-center justify-center"
              >
                <Icon icon="mdi:account" class="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <h3 class="font-medium group-hover:text-red-500">
              {{ person.name }}
            </h3>
            <p class="text-sm text-gray-400">{{ person.character }}</p>
          </RouterLink>
        </div>
      </div>

      <!-- O'xshash seriallar -->
      <div v-if="similarTvShows.length" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">O'xshash Seriallar</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <MovieCard
            v-for="show in similarTvShows.slice(0, 5)"
            :key="show.id"
            :movie="show"
            media-type="tv"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Yuklanmoqda... -->
  <div v-else class="flex justify-center items-center h-screen">
    <Icon icon="svg-spinners:270-ring" class="w-12 h-12 text-red-500" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { Icon } from "@iconify/vue";
import MovieCard from "@/components/MovieCard.vue";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const route = useRoute();

const tvShow = ref(null);
const cast = ref([]);
const seasons = ref([]);
const similarTvShows = ref([]);

const fetchTvShowDetails = async () => {
  try {
    const [detailsRes, creditsRes, similarRes] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${API_KEY}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${route.params.id}/credits?api_key=${API_KEY}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${route.params.id}/similar?api_key=${API_KEY}`
      ),
    ]);

    tvShow.value = detailsRes.data;
    cast.value = creditsRes.data.cast;
    seasons.value = detailsRes.data.seasons.filter(
      (s) => s.season_number !== 0
    );
    similarTvShows.value = similarRes.data.results;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
  }
};

onMounted(() => {
  fetchTvShowDetails();
});
</script>

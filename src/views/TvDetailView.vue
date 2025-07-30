<template>
  <div
    v-if="tvShow"
    class="bg-gray-900 text-white min-h-screen pt-[30px] sm:pt-0"
  >
    <!-- Banner qismi -->
    <div class="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
      <img
        :src="`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`"
        class="w-full h-full object-cover opacity-40"
        :alt="tvShow.name"
      />
      <div
        class="container mx-auto px-4 absolute inset-0 flex items-end pb-8 sm:pb-16"
      >
        <div class="flex flex-col md:flex-row gap-6 w-full">
          <img
            :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
            class="w-40 h-56 sm:w-48 sm:h-[240px] md:w-64 md:h-[360px] object-cover rounded-lg shadow-xl self-start"
            :alt="tvShow.name"
          />
          <div class="flex-1">
            <!-- ... qolgan kontent ... -->
          </div>
        </div>
      </div>
    </div>

    <!-- Asosiy kontent -->
    <div class="container mx-auto px-4 py-8 sm:py-12">
      <!-- Mavsumlar -->
      <div v-if="seasons.length" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Mavsumlar</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <div
            v-for="season in seasons"
            :key="season.id"
            class="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition"
          >
            <div class="aspect-[2/3] relative">
              <img
                :src="
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                    : '/no-image.jpg'
                "
                :alt="season.name"
                class="w-full h-full object-cover"
              />
            </div>
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
          class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
        >
          <RouterLink
            v-for="person in cast.slice(0, 12)"
            :key="person.id"
            :to="`/person/${person.id}`"
            class="group text-center"
          >
            <div
              class="aspect-square relative overflow-hidden rounded-full mb-2 mx-auto w-full"
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
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
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

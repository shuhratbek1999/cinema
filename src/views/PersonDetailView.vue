<template>
  <div v-if="person" class="bg-gray-900 text-white min-h-screen py-32">
    <!-- Banner qismi -->
    <div class="relative">
      <img
        v-if="person.profile_path"
        :src="`https://image.tmdb.org/t/p/original${person.profile_path}`"
        class="w-full h-96 object-cover opacity-20"
      />
      <div
        v-else
        class="w-full h-96 bg-gray-800 flex items-center justify-center"
      >
        <Icon icon="mdi:account" class="w-32 h-32 text-gray-600" />
      </div>

      <div class="container mx-auto px-4 absolute inset-0 flex items-end pb-16">
        <div class="flex flex-col md:flex-row gap-8 w-full">
          <div class="w-64 h-96 rounded-lg overflow-hidden bg-gray-800">
            <img
              v-if="person.profile_path"
              :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon icon="mdi:account" class="w-32 h-32 text-gray-600" />
            </div>
          </div>

          <div class="flex-1">
            <h1 class="text-4xl font-bold">{{ person.name }}</h1>

            <div class="flex items-center mt-2 space-x-4">
              <span v-if="person.birthday">
                <Icon icon="mdi:cake" class="inline mr-1" />
                {{ person.birthday }}
                <span v-if="person.deathday"> - {{ person.deathday }}</span>
              </span>
              <span v-if="person.place_of_birth">
                <Icon icon="mdi:map-marker" class="inline mr-1" />
                {{ person.place_of_birth }}
              </span>
            </div>

            <div class="mt-4">
              <h3 class="text-xl font-semibold mb-2">Biografiya</h3>
              <p class="text-gray-300">
                {{ person.biography || "Biografiya mavjud emas" }}
              </p>
            </div>

            <div class="mt-6 flex space-x-4">
              <a
                v-if="person.imdb_id"
                :href="`https://www.imdb.com/name/${person.imdb_id}`"
                target="_blank"
                class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg flex items-center"
              >
                <Icon icon="mdi:imdb" class="mr-2" /> IMDB
              </a>
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
      <!-- Mashhur rollari -->
      <div v-if="knownFor.length" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Mashhur Rollari</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <MovieCard
            v-for="item in knownFor"
            :key="item.id"
            :movie="item"
            :media-type="item.media_type"
          />
        </div>
      </div>

      <!-- Filmografiya -->
      <div v-if="credits.cast.length" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Filmografiya</h2>

        <div class="mb-4 flex space-x-4 overflow-x-auto pb-2">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-4 py-2 rounded-full whitespace-nowrap"
            :class="
              activeFilter === filter.value
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            "
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="bg-gray-800 rounded-lg overflow-hidden">
          <div
            v-for="item in filteredCredits"
            :key="item.id"
            class="border-b border-gray-700 last:border-0 hover:bg-gray-700 transition"
          >
            <RouterLink
              :to="`/${item.media_type}/${item.id}`"
              class="flex items-center p-4"
            >
              <div
                class="w-16 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-700"
              >
                <img
                  v-if="item.poster_path"
                  :src="`https://image.tmdb.org/t/p/w200${item.poster_path}`"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <Icon icon="mdi:image-off" class="w-8 h-8 text-gray-500" />
                </div>
              </div>

              <div class="ml-4 flex-1">
                <h3 class="font-semibold">{{ item.title || item.name }}</h3>
                <p class="text-sm text-gray-400">
                  {{ item.character || item.job || "N/A" }} •
                  {{
                    (item.release_date || item.first_air_date)?.split("-")[0] ||
                    "N/A"
                  }}
                </p>
              </div>

              <div class="flex items-center">
                <span
                  class="bg-gray-700 px-2 py-1 rounded text-sm flex items-center"
                >
                  <Icon icon="mdi:star" class="mr-1 text-yellow-400 w-3 h-3" />
                  {{ item.vote_average?.toFixed(1) || "N/A" }}
                </span>
              </div>
            </RouterLink>
          </div>
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { Icon } from "@iconify/vue";
import MovieCard from "@/components/MovieCard.vue";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const route = useRoute();

const person = ref(null);
const credits = ref({ cast: [], crew: [] });
const knownFor = ref([]);
const activeFilter = ref("all");

const filters = [
  { value: "all", label: "Barchasi" },
  { value: "acting", label: "Aktyorlik" },
  { value: "production", label: "Produserlik" },
];

const fetchPersonDetails = async () => {
  try {
    const [detailsRes, combinedCreditsRes] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/person/${route.params.id}?api_key=${API_KEY}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/person/${route.params.id}/combined_credits?api_key=${API_KEY}`
      ),
    ]);

    person.value = detailsRes.data;
    credits.value = combinedCreditsRes.data;

    // Mashhur rollarni aniqlash
    knownFor.value = combinedCreditsRes.data.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  } catch (error) {
    console.error("Error fetching person details:", error);
  }
};

const filteredCredits = computed(() => {
  const allCredits = [...credits.value.cast, ...credits.value.crew].sort(
    (a, b) => {
      const dateA = a.release_date || a.first_air_date || "9999";
      const dateB = b.release_date || b.first_air_date || "9999";
      return dateB.localeCompare(dateA);
    }
  );

  if (activeFilter.value === "all") return allCredits;
  if (activeFilter.value === "acting") return credits.value.cast;
  if (activeFilter.value === "production") return credits.value.crew;

  return allCredits;
});

onMounted(() => {
  fetchPersonDetails();
});
</script>

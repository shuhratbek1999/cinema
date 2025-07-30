<template>
  <div class="bg-gray-900 text-white min-h-screen py-3">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Aktyorlar</h1>
        <div class="relative w-64">
          <input
            v-model="searchQuery"
            @keyup.enter="fetchActors"
            type="text"
            placeholder="Aktyorlar qidirish..."
            class="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Icon
            icon="mdi:magnify"
            class="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
          />
        </div>
      </div>

      <!-- Yuklash holati -->
      <div v-if="loading" class="flex justify-center py-12">
        <Icon icon="svg-spinners:270-ring" class="w-12 h-12 text-red-500" />
      </div>

      <!-- Aktyorlar ro'yxati -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <RouterLink
          v-for="person in actors"
          :key="person.id"
          :to="`/person/${person.id}`"
          class="group"
        >
          <div class="relative overflow-hidden rounded-lg aspect-[2/3] mb-2">
            <img
              v-if="person.profile_path"
              :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
              :alt="person.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              v-else
              class="w-full h-full bg-gray-800 flex items-center justify-center"
            >
              <Icon icon="mdi:account" class="w-16 h-16 text-gray-600" />
            </div>
          </div>
          <h3 class="font-semibold group-hover:text-red-500 transition">
            {{ person.name }}
          </h3>
          <p class="text-sm text-gray-400 line-clamp-1">
            {{ person.known_for_department }}
          </p>
        </RouterLink>
      </div>
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import axios from "axios";
import { Icon } from "@iconify/vue";
import Pagination from "@/components/Pagination.vue";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const route = useRoute();
const router = useRouter();
// Data
const actors = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const currentPage = ref(route.query.page ? parseInt(route.query.page) : 1);
const totalPages = ref(5);
// Methods
const fetchActors = async () => {
  try {
    loading.value = true;
    let url = "";

    if (searchQuery.value.trim()) {
      url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchQuery.value}&page=${currentPage.value}`;
    } else {
      url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${currentPage.value}`;
    }

    const response = await axios.get(url);
    actors.value = response.data.results;
    totalPages.value =
      response.data.total_pages > 500 ? 500 : response.data.total_pages;
  } catch (error) {
    console.error("Error fetching actors:", error);
  } finally {
    loading.value = false;
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
    name: "actors",
    query: {
      ...route.query,
      page: currentPage.value > 1 ? currentPage.value : undefined,
    },
  });
};
watch(currentPage, () => {
  fetchActors;
});
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.page && parseInt(newQuery.page) !== currentPage.value) {
      currentPage.value = parseInt(newQuery.page);
    }
  },
  { immediate: true }
);
// Lifecycle hooks
onMounted(() => {
  fetchActors();
});
</script>

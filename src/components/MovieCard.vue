<template>
  <RouterLink
    :to="mediaType === 'movie' ? `/movie/${movie.id}` : `/tv/${movie.id}`"
    class="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <div class="relative aspect-[2/3]">
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title || movie.name"
        class="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
      />
      <div
        v-else
        class="w-full h-full bg-gray-800 flex items-center justify-center"
      >
        <Icon icon="mdi:image-off" class="w-16 h-16 text-gray-600" />
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent"
      >
        <div class="flex items-center">
          <Icon icon="mdi:star" class="text-yellow-400 w-4 h-4 mr-1" />
          <span class="text-white text-sm font-semibold">
            {{ movie.vote_average?.toFixed(1) || "N/A" }}
          </span>
        </div>
      </div>
    </div>
    <div class="p-4 bg-gray-800">
      <h3 class="font-bold truncate">{{ movie.title || movie.name }}</h3>
      <div class="flex justify-between items-center mt-2 text-sm text-gray-400">
        <span>{{
          movie.release_date?.split("-")[0] ||
          movie.first_air_date?.split("-")[0] ||
          "N/A"
        }}</span>
        <span
          v-if="mediaType === 'movie'"
          class="px-2 py-1 bg-gray-700 rounded text-xs"
        >
          Film
        </span>
        <span v-else class="px-2 py-1 bg-gray-700 rounded text-xs">
          Serial
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  movie: {
    type: Object,
    required: true,
  },
  mediaType: {
    type: String,
    default: "movie",
  },
});
</script>

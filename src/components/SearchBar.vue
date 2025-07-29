<template>
  <div class="relative">
    <input
      v-model="query"
      @input="handleSearch"
      type="text"
      placeholder="Kinolar qidirish..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="handleSearch"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const query = ref("");

const handleSearch = () => {
  if (query.value.trim()) {
    router.push({ name: "search", query: { q: query.value } });
  }
};
</script>

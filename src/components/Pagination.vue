<template>
  <div class="flex justify-center mt-8 pb-4">
    <button
      @click="goToFirst"
      :disabled="currentPage === 1"
      class="mx-1 px-3 py-1 rounded-l bg-gray-800 disabled:opacity-50"
    >
      &laquo;
    </button>
    <template v-for="page in visiblePages" :key="page">
      <button v-if="page === '...'" disabled class="mx-1 px-3 py-1 bg-gray-800">
        {{ page }}
      </button>
      <button
        v-else
        @click="goToPage(page)"
        class="mx-1 px-3 py-1 rounded"
        :class="
          currentPage === page ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
        "
      >
        {{ page }}
      </button>
    </template>
    <button
      @click="goToLast"
      :disabled="currentPage === totalPages"
      class="mx-1 px-3 py-1 rounded-r bg-gray-800 disabled:opacity-50"
    >
      &raquo;
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisible: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(["page-changed"]);

const visiblePages = computed(() => {
  const pages = [];
  const half = Math.floor(props.maxVisible / 2);
  let start = Math.max(props.currentPage - half, 1);
  let end = Math.min(start + props.maxVisible - 1, props.totalPages);

  if (end - start < props.maxVisible - 1) {
    start = Math.max(end - props.maxVisible + 1, 1);
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < props.totalPages) {
    if (end < props.totalPages - 1) {
      pages.push("...");
    }
    pages.push(props.totalPages);
  }

  return pages;
});

const goToPage = (page) => {
  if (page !== "...") {
    emit("page-changed", page);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("page-changed", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("page-changed", props.currentPage + 1);
  }
};

const goToFirst = () => {
  emit("page-changed", 1);
};

const goToLast = () => {
  emit("page-changed", props.totalPages);
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>

<template>
  <nav class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo va desktop nav -->
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="flex items-center text-white font-bold text-xl"
          >
            <Icon icon="mdi:movie-open" class="w-8 h-8 text-red-500 mr-2" />
            TMDB Vue
          </RouterLink>

          <!-- Desktop navigation -->
          <div class="hidden md:flex ml-10 space-x-4">
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="px-3 py-2 rounded-md text-sm font-medium transition"
              :class="{
                'bg-gray-800 text-white': $route.path === link.path,
                'text-gray-300 hover:text-white hover:bg-gray-700':
                  $route.path !== link.path,
              }"
            >
              {{ link.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Search and user section -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Qidiruv..."
              class="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              v-model="searchQuery"
              @keyup.enter="searchMovies"
            />
            <Icon
              icon="mdi:magnify"
              class="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
            />
          </div>

          <button class="text-gray-300 hover:text-white">
            <Icon icon="mdi:bell-outline" class="w-6 h-6" />
          </button>

          <div class="relative">
            <button
              @click="toggleUserDropdown"
              class="flex items-center space-x-2 focus:outline-none"
            >
              <div
                class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <Icon icon="mdi:account" class="w-5 h-5 text-gray-300" />
              </div>
              <Icon icon="mdi:chevron-down" class="w-4 h-4 text-gray-300" />
            </button>

            <!-- User dropdown -->
            <div
              v-if="isUserDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50"
            >
              <RouterLink
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Profil
              </RouterLink>
              <RouterLink
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Sozlamalar
              </RouterLink>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="text-gray-300 hover:text-white focus:outline-none"
          >
            <Icon
              :icon="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-gray-900 border-t border-gray-800"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="block px-3 py-2 rounded-md text-base font-medium transition"
          :class="{
            'bg-gray-800 text-white': $route.path === link.path,
            'text-gray-300 hover:text-white hover:bg-gray-700':
              $route.path !== link.path,
          }"
          @click="isMobileMenuOpen = false"
        >
          {{ link.name }}
        </RouterLink>

        <div class="pt-4 pb-3 border-t border-gray-800">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <Icon icon="mdi:account" class="w-6 h-6 text-gray-300" />
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">Foydalanuvchi</div>
              <div class="text-sm font-medium text-gray-400">
                user@example.com
              </div>
            </div>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <RouterLink
              to="/profile"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              @click="isMobileMenuOpen = false"
            >
              Profil
            </RouterLink>
            <RouterLink
              to="/settings"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              @click="isMobileMenuOpen = false"
            >
              Sozlamalar
            </RouterLink>
            <button
              @click="logout"
              class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const router = useRouter();
const searchQuery = ref("");
const isUserDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = [
  { name: "Bosh Sahifa", path: "/" },
  { name: "Kinolar", path: "/movies" },
  { name: "Seriallar", path: "/tv-shows" },
  { name: "Aktyorlar", path: "/actors" },
  { name: "About", path: "/about" },
];

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // User dropdownni yopish agar mobile menu ochilgan bo'lsa
  if (isMobileMenuOpen.value) {
    isUserDropdownOpen.value = false;
  }
};

const searchMovies = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/search", query: { q: searchQuery.value } });
    searchQuery.value = "";
    isMobileMenuOpen.value = false;
  }
};

const logout = () => {
  // Logout logikasi
  console.log("User logged out");
  isMobileMenuOpen.value = false;
  isUserDropdownOpen.value = false;
  router.push("/login");
};
</script>

<style scoped>
nav {
  transition: all 0.3s ease;
}

.router-link-active {
  font-weight: 600;
}
</style>

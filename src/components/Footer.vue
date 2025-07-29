<template>
  <footer class="bg-gray-800 text-white pt-12 pb-6">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo va qisqacha ma'lumot -->
        <div class="col-span-1">
          <div class="flex items-center mb-4">
            <Icon icon="mdi:movie-open" class="w-8 h-8 text-red-500 mr-2" />
            <span class="text-xl font-bold">TMDB Vue</span>
          </div>
          <p class="text-gray-400">
            Dunyoning eng yaxshi kinolarini biz bilan kuzatib boring.
          </p>
          <div class="flex mt-4 space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition">
              <Icon icon="mdi:facebook" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition">
              <Icon icon="mdi:twitter" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition">
              <Icon icon="mdi:instagram" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Tez havolalar -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Tez Havolalar</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/"
                class="text-gray-400 hover:text-red-500 transition"
              >
                Bosh Sahifa
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/movies"
                class="text-gray-400 hover:text-red-500 transition"
              >
                Kinolar
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="text-gray-400 hover:text-red-500 transition"
              >
                Biz Haqimizda
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Kontaktlar -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Aloqa</h3>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center">
              <Icon icon="mdi:email" class="mr-2 w-5 h-5" />
              info@tmdbvue.uz
            </li>
            <li class="flex items-center">
              <Icon icon="mdi:phone" class="mr-2 w-5 h-5" />
              +998 90 123 45 67
            </li>
            <li class="flex items-center">
              <Icon icon="mdi:map-marker" class="mr-2 w-5 h-5" />
              Toshkent, Uzbekistan
            </li>
          </ul>
        </div>

        <!-- Yangiliklarga obuna bo'lish -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Yangiliklar</h3>
          <p class="text-gray-400 mb-4">
            Yangi kinolar haqida birinchi bo'lib xabardor bo'ling.
          </p>
          <div class="flex">
            <input
              type="email"
              placeholder="Email manzilingiz"
              class="px-4 py-2 bg-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-500 w-full"
            />
            <button class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg">
              <Icon icon="mdi:send" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Pastki qism (copyright) -->
      <div
        class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-gray-400">
          &copy; 2023 TMDB Vue. Barcha huquqlar himoyalangan.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm"
            >Foydalanish shartlari</a
          >
          <a href="#" class="text-gray-400 hover:text-white text-sm"
            >Maxfiylik siyosati</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
</script>

<style scoped>
footer {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>

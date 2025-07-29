<template>
  <div class="bg-gray-900 text-white min-h-screen py-12">
    <div class="container mx-auto px-4">
      <!-- Sahifa sarlavhasi -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Biz Haqimizda</h1>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          TMDB Vue - bu The Movie Database API asosida yaratilgan kino va
          seriallar platformasi
        </p>
      </div>

      <!-- Loyiha haqida -->
      <div class="bg-gray-800 rounded-xl p-8 mb-12">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="md:w-1/2">
            <img
              src="@/assets/dmb.jpg"
              alt="TMDB Logo"
              class="w-full max-w-md mx-auto"
            />
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-4">Loyiha Haqida</h2>
            <p class="text-gray-300 mb-4">
              Ushbu loyiha Vue 3, Tailwind CSS va TMDB API yordamida ishlab
              chiqilgan. Sayt orqali siz eng so'nggi va mashhur kinolar,
              seriallar va aktyorlar haqida ma'lumot olishingiz mumkin.
            </p>
            <p class="text-gray-300 mb-6">
              Loyiha ochiq manbali bo'lib, GitHubda mavjud. Agar siz ham
              ishtirok etmoqchi bo'lsangiz, quyidagi havola orqali loyiha kodini
              ko'rishingiz mumkin.
            </p>
            <a
              href="https://github.com/sizning-repo-manzilingiz"
              target="_blank"
              class="inline-flex items-center bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition"
            >
              <Icon icon="mdi:github" class="w-6 h-6 mr-2" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      <!-- Ishlab chiquvchilar -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-8 text-center">Ishlab Chiquvchilar</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(developer, index) in developers"
            :key="index"
            class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-16 h-16 rounded-full overflow-hidden bg-gray-700 mr-4"
              >
                <img
                  :src="developer.avatar"
                  :alt="developer.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 class="font-bold text-lg">{{ developer.name }}</h3>
                <p class="text-gray-400">{{ developer.role }}</p>
              </div>
            </div>
            <p class="text-gray-300 mb-4">{{ developer.bio }}</p>
            <div class="flex space-x-3">
              <a
                v-for="(link, key) in developer.links"
                :key="key"
                :href="link.url"
                target="_blank"
                class="text-gray-400 hover:text-white"
                :title="link.label"
              >
                <Icon :icon="link.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- TMDB API haqida -->
      <div class="bg-gray-800 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-4">TMDB API Haqida</h2>
        <p class="text-gray-300 mb-6">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            class="text-red-400 hover:underline"
            >The Movie Database (TMDB)</a
          >
          - bu kino va televideniye dasturlari haqida ma'lumot beruvchi ochiq
          ma'lumotlar bazasi. Ushbu loyiha TMDB API dan foydalanadi, ammo TMDB
          tomonidan tasdiqlanmagan yoki qo'llab-quvvatlanmagan.
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            class="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            <Icon icon="mdi:api" class="mr-2" />
            TMDB API Hujjatlari
          </a>
          <a
            href="https://www.themoviedb.org/terms-of-use"
            target="_blank"
            class="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            <Icon icon="mdi:file-document-outline" class="mr-2" />
            Foydalanish Shartlari
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const developers = [
  {
    name: "Zokirjonov Shuxratbek",
    role: "Asosiy Ishlab Chiquvchi",
    bio: "Vue.js va Frontend dasturchi. 2 yillik tajribaga ega. Kinolar va texnologiyalarga qiziqadi.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    links: [
      { label: "GitHub", url: "https://github.com", icon: "mdi:github" },
      { label: "LinkedIn", url: "https://linkedin.com", icon: "mdi:linkedin" },
      { label: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
    ],
  },
  {
    name: "Ikkinchi Ishlab Chiquvchi",
    role: "Dizayner",
    bio: "UI/UX dizayneri. Tailwind CSS va Figma mutaxassisi. Interfeyslarni sodda va foydali qilishga intiladi.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    links: [
      { label: "GitHub", url: "https://github.com", icon: "mdi:github" },
      { label: "Dribbble", url: "https://dribbble.com", icon: "mdi:dribbble" },
    ],
  },
  {
    name: "Uchinchi Ishlab Chiquvchi",
    role: "Backend Dasturchi",
    bio: "Node.js va Python dasturchi. API loyihalari va ma'lumotlar bazasi bilan ishlashga ixtisoslashgan.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    links: [
      { label: "GitHub", url: "https://github.com", icon: "mdi:github" },
      { label: "Shaxsiy Blog", url: "https://example.com", icon: "mdi:web" },
    ],
  },
];
</script>

<style scoped>
/* Qo'shimcha stil lar */
</style>

<template>
  <div class="bg-gray-900 text-white min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- Profil header -->
      <div
        class="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12"
      >
        <div class="relative">
          <div
            class="w-32 h-32 rounded-full overflow-hidden bg-gray-800 border-4 border-red-500"
          >
            <img
              v-if="user.avatar"
              :src="user.avatar"
              class="w-full h-full object-cover"
              alt="Profile"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon icon="mdi:account" class="w-16 h-16 text-gray-600" />
            </div>
          </div>
          <button
            @click="openAvatarUpload"
            class="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full hover:bg-gray-700 border border-gray-600"
          >
            <Icon icon="mdi:camera" class="w-5 h-5" />
          </button>
          <input
            type="file"
            ref="avatarInput"
            accept="image/*"
            class="hidden"
            @change="handleAvatarUpload"
          />
        </div>

        <div class="flex-1">
          <div class="flex items-center justify-between mb-2">
            <h1 class="text-3xl font-bold">{{ user.name }}</h1>
            <RouterLink
              to="/settings"
              class="text-gray-400 hover:text-white flex items-center"
            >
              <Icon icon="mdi:pencil" class="mr-1" /> Tahrirlash
            </RouterLink>
          </div>
          <p class="text-gray-400 mb-4">{{ user.email }}</p>
          <p class="text-gray-300">{{ user.bio || "Bio qo'shilmagan" }}</p>

          <div class="flex gap-4 mt-4">
            <div class="flex items-center text-gray-400">
              <Icon icon="mdi:calendar" class="mr-1" />
              {{ formatDate(user.joinDate) }} dan beri a'zo
            </div>
            <div class="flex items-center text-gray-400">
              <Icon icon="mdi:map-marker" class="mr-1" />
              {{ user.location || "Manzil ko'rsatilmagan" }}
            </div>
          </div>
        </div>
      </div>

      <!-- Tab menyu -->
      <div class="border-b border-gray-700 mb-8">
        <div class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2 relative"
            :class="{
              'text-white': activeTab === tab.id,
              'text-gray-400 hover:text-white': activeTab !== tab.id,
            }"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
            ></span>
          </button>
        </div>
      </div>

      <!-- Kontent -->
      <div v-if="activeTab === 'watchlist'">
        <h2 class="text-2xl font-bold mb-6">Kuzatuv Ro'yxati</h2>
        <div
          v-if="watchlist.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <MovieCard
            v-for="item in watchlist"
            :key="item.id"
            :movie="item"
            :media-type="item.media_type"
          />
        </div>
        <div v-else class="bg-gray-800 rounded-lg p-8 text-center">
          <Icon
            icon="mdi:movie-open-remove"
            class="w-12 h-12 mx-auto text-gray-600 mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Kuzatuv ro'yxatingiz bo'sh</h3>
          <p class="text-gray-400 mb-4">
            Yoqtirgan filmlaringiz va seriallaringizni saqlash uchun ularga ♡
            bosing
          </p>
          <RouterLink
            to="/movies"
            class="inline-flex items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            <Icon icon="mdi:movie-search" class="mr-2" />
            Kinolar ni ko'rish
          </RouterLink>
        </div>
      </div>

      <div v-else-if="activeTab === 'ratings'">
        <h2 class="text-2xl font-bold mb-6">Baholaringiz</h2>
        <div v-if="ratings.length > 0" class="space-y-4">
          <div
            v-for="rating in ratings"
            :key="rating.id"
            class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
          >
            <div class="flex items-start">
              <RouterLink
                :to="`/${rating.media_type}/${rating.id}`"
                class="w-16 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-700"
              >
                <img
                  v-if="rating.poster_path"
                  :src="`https://image.tmdb.org/t/p/w200${rating.poster_path}`"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <Icon icon="mdi:image-off" class="w-8 h-8 text-gray-500" />
                </div>
              </RouterLink>

              <div class="ml-4 flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <RouterLink
                      :to="`/${rating.media_type}/${rating.id}`"
                      class="font-semibold hover:text-red-500"
                    >
                      {{ rating.title || rating.name }}
                    </RouterLink>
                    <p class="text-sm text-gray-400">
                      {{ rating.media_type === "movie" ? "Film" : "Serial" }} •
                      {{
                        (rating.release_date || rating.first_air_date)?.split(
                          "-"
                        )[0]
                      }}
                    </p>
                  </div>
                  <div class="flex items-center bg-gray-700 px-2 py-1 rounded">
                    <Icon icon="mdi:star" class="text-yellow-400 mr-1" />
                    <span>{{ rating.rating }}/10</span>
                  </div>
                </div>

                <div class="mt-2">
                  <p class="text-gray-300 text-sm" v-if="rating.review">
                    "{{ rating.review }}"
                  </p>
                  <p class="text-gray-500 text-sm" v-else>Sharh qo'shilmagan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-gray-800 rounded-lg p-8 text-center">
          <Icon
            icon="mdi:star-off"
            class="w-12 h-12 mx-auto text-gray-600 mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Baholaringiz mavjud emas</h3>
          <p class="text-gray-400 mb-4">
            Ko'rgan filmlaringiz va seriallaringizga baho bering
          </p>
        </div>
      </div>

      <div v-else-if="activeTab === 'history'">
        <h2 class="text-2xl font-bold mb-6">Ko'rilganlar Tarixi</h2>
        <div
          v-if="history.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <MovieCard
            v-for="item in history"
            :key="item.id"
            :movie="item"
            :media-type="item.media_type"
          />
        </div>
        <div v-else class="bg-gray-800 rounded-lg p-8 text-center">
          <Icon
            icon="mdi:history"
            class="w-12 h-12 mx-auto text-gray-600 mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">Tarix bo'sh</h3>
          <p class="text-gray-400 mb-4">
            Filmlar va seriallarni ko'rishni boshlang
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import MovieCard from "@/components/MovieCard.vue";

const avatarInput = ref(null);

const activeTab = ref("watchlist");

const tabs = [
  { id: "watchlist", label: "Kuzatuv ro'yxati" },
  { id: "ratings", label: "Baholar" },
  { id: "history", label: "Tarix" },
];

const user = ref({
  name: "Foydalanuvchi Ismi",
  email: "user@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Kino ishqibozi. Yiliga 200+ film ko'raman. Tarantino va Nolan filmlarining muxlisi.",
  location: "Toshkent, Uzbekistan",
  joinDate: "2023-01-15",
});

const watchlist = ref([
  {
    id: 1,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    vote_average: 8.4,
    release_date: "2010-07-16",
    media_type: "movie",
  },
  {
    id: 2,
    name: "Breaking Bad",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    vote_average: 8.9,
    first_air_date: "2008-01-20",
    media_type: "tv",
  },
]);

const ratings = ref([
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    media_type: "movie",
    release_date: "1994-09-23",
    rating: 9.5,
    review: "Eng ajoyib filmlardan biri. Har bir sahna mukammal!",
  },
  {
    id: 2,
    name: "Game of Thrones",
    poster_path: "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
    media_type: "tv",
    first_air_date: "2011-04-17",
    rating: 8.0,
    review: "Ajoyib serial, ammo finali unchalik yoqmadi",
  },
]);

const history = ref([
  {
    id: 1,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    vote_average: 8.5,
    release_date: "2008-07-16",
    media_type: "movie",
    watched_at: "2023-05-10",
  },
  {
    id: 2,
    name: "Stranger Things",
    poster_path: "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    vote_average: 8.7,
    first_air_date: "2016-07-15",
    media_type: "tv",
    watched_at: "2023-06-22",
  },
]);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("uz-UZ", options);
};

const openAvatarUpload = () => {
  avatarInput.value.click();
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  // Bu yerda haqiqiy ma'lumotlarni API dan yuklash mumkin
});
</script>

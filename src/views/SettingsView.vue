<template>
  <div class="bg-gray-900 text-white min-h-screen py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8">Sozlamalar</h1>

      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
          Profil Sozlamalari
        </h2>

        <form @submit.prevent="saveProfile">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-gray-400 mb-2">Ism</label>
              <input
                v-model="profileForm.name"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-400 mb-2">Email</label>
              <input
                v-model="profileForm.email"
                type="email"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-400 mb-2">Manzil</label>
              <input
                v-model="profileForm.location"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-400 mb-2">Til</label>
              <select
                v-model="profileForm.language"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="uz">O'zbekcha</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-gray-400 mb-2">Bio</label>
            <textarea
              v-model="profileForm.bio"
              rows="3"
              class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center"
              :disabled="isSaving"
            >
              <Icon icon="mdi:content-save" class="mr-2" />
              {{ isSaving ? "Saqlanmoqda..." : "Saqlash" }}
            </button>
          </div>
        </form>
      </div>

      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
          Xavfsizlik
        </h2>

        <form @submit.prevent="changePassword">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-gray-400 mb-2">Joriy parol</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-400 mb-2">Yangi parol</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-400 mb-2"
                >Yangi parolni tasdiqlang</label
              >
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center"
              :disabled="isChangingPassword"
            >
              <Icon icon="mdi:lock-reset" class="mr-2" />
              {{
                isChangingPassword
                  ? "Amalga oshirilmoqda..."
                  : "Parolni o'zgartirish"
              }}
            </button>
          </div>
        </form>
      </div>

      <div class="bg-gray-800 rounded-xl p-6">
        <h2 class="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
          Hisob
        </h2>

        <div class="mb-6">
          <h3 class="font-semibold mb-2">Hisobni o'chirish</h3>
          <p class="text-gray-400 mb-4">
            Hisobingizni o'chirish bilan barcha ma'lumotlaringiz butunlay yo'q
            qilinadi. Bu amalni qaytarib bo'lmaydi.
          </p>
          <button
            @click="confirmDeleteAccount"
            class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-red-400 flex items-center"
          >
            <Icon icon="mdi:alert-circle-outline" class="mr-2" />
            Hisobni o'chirish
          </button>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">
          Hisobni o'chirishni tasdiqlaysizmi?
        </h3>
        <p class="text-gray-400 mb-6">
          Barcha ma'lumotlaringiz yo'q qilinadi va qayta tiklanmaydi.
          Ishonchingiz komilmi?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            Bekor qilish
          </button>
          <button
            @click="deleteAccount"
            class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 flex items-center"
            :disabled="isDeleting"
          >
            <Icon icon="mdi:delete" class="mr-2" />
            {{ isDeleting ? "O'chirilmoqda..." : "O'chirish" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const profileForm = ref({
  name: "Foydalanuvchi Ismi",
  email: "user@example.com",
  location: "Toshkent, Uzbekistan",
  bio: "Kino ishqibozi. Yiliga 200+ film ko'raman. Tarantino va Nolan filmlarining muxlisi.",
  language: "uz",
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const isSaving = ref(false);
const isChangingPassword = ref(false);
const isDeleting = ref(false);
const showDeleteModal = ref(false);

const saveProfile = () => {
  isSaving.value = true;
  // Bu yerda API ga so'rov yuborish mumkin
  setTimeout(() => {
    isSaving.value = false;
    // Toast yoki notification ko'rsatish mumkin
  }, 1000);
};

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert("Yangi parollar mos kelmadi!");
    return;
  }

  isChangingPassword.value = true;
  // Bu yerda API ga so'rov yuborish mumkin
  setTimeout(() => {
    isChangingPassword.value = false;
    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    // Toast yoki notification ko'rsatish mumkin
  }, 1000);
};

const confirmDeleteAccount = () => {
  showDeleteModal.value = true;
};

const deleteAccount = () => {
  isDeleting.value = true;
  // Bu yerda API ga so'rov yuborish mumkin
  setTimeout(() => {
    isDeleting.value = false;
    showDeleteModal.value = false;
    // Foydalanuvchini chiqarib yuborish va login sahifasiga yo'naltirish
    router.push("/login");
  }, 1500);
};
</script>

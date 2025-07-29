import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movies",
    name: "movies",
    component: () => import("../views/MoviesView.vue"),
  },
  {
    path: "/tv-shows",
    name: "tv-shows",
    component: () => import("../views/TvShowsView.vue"),
  },
  {
    path: "/actors",
    name: "actors",
    component: () => import("../views/ActorsView.vue"),
  },
  {
    path: "/movie/:id",
    name: "movie-detail",
    component: () => import("../views/MovieDetail.vue"),
  },
  {
    path: "/tv/:id",
    name: "tv-detail",
    component: () => import("../views/TvDetailView.vue"),
  },
  {
    path: "/person/:id",
    name: "person-detail",
    component: () => import("../views/PersonDetailView.vue"),
  },
  {
    path: "/about",
    name: "about-detail",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/SettingsView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;

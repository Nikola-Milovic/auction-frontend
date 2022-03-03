import { createRouter, createWebHistory } from "vue-router";
import DetailView from "@/views/DetailView.vue";
import HomeView from "@/views/HomeView.vue";
import NewAuctionView from "@/views/NewAuctionView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { path: "/details/:id", component: DetailView },
    { path: "/new", component: NewAuctionView },
    { path: "/login", component: LoginView },
    { path: "/profile", component: ProfileView },
  ],
});

export default router;

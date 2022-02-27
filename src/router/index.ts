import { createRouter, createWebHistory } from "vue-router";
import DetailView from "@/views/DetailView.vue";
import HomeView from "@/views/HomeView.vue";
import NewAuctionView from "@/views/NewAuctionView.vue";

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
  ],
});

export default router;

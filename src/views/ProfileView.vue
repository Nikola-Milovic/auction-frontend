<script setup lang="ts">
import MainLayout from "../components/layout/MainLayout.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useUserStore } from "@/stores/counter";
import { toRefs, watch } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";

const store = useUserStore();

const { isLoggedIn, user } = toRefs(store);

watch(isLoggedIn, () => {
  if (!isLoggedIn.value || !user.value) router.push("/login");
});

if (!isLoggedIn.value || !user.value) {
  router.push("/login");
}
</script>

<template>
  <MainLayout>
    <div v-if="isLoggedIn" class="profile-container">
      <p>{{user!.name}}</p>
      <p>{{user!.email}}</p>
      <p>{{user!.money}}</p>
    </div>
  </MainLayout>
</template>

<style lang="postcss" scoped>
.profile-container {
  @apply mx-auto flex flex-col p-8 items-center shadow-md;
}
</style>

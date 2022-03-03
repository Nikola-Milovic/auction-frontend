<script setup lang="ts">
import { useUserStore } from "@/stores/counter";
import { toRefs } from "vue";
import { RouterLink } from "vue-router";

const store = useUserStore();

const { isLoggedIn, user } = toRefs(store);
</script>

<template>
  <header class="header">
    <nav class="flex flex-row items-center gap-3">
      <RouterLink class="text-white text-lg" to="/">Home</RouterLink>
      <RouterLink class="text-white text-lg" to="/new">New</RouterLink>
    </nav>

    <RouterLink class="profile group" v-if="isLoggedIn" to="/profile">
      <img
        class="profile-avatar"
        src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt="Profile image"
      />
      <p class="profile-name">{{ user!.name }}</p>
    </RouterLink>
    <div v-else>
      <RouterLink class="login-button" to="/login">Login</RouterLink>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply w-full h-16 bg-secondary-dark flex flex-row items-center gap-3 justify-between px-10;
}

.login-button {
  @apply text-white text-lg bg-secondary p-2 px-3 rounded-md font-medium hover:scale-105;
}

/* Profile */
.profile {
  @apply flex flex-row items-center gap-2 cursor-pointer;
}

.profile-name {
  @apply text-white font-semibold group-hover:scale-105;
}

.profile-avatar {
  @apply inline object-cover w-8 h-8 rounded-full group-hover:scale-105;
}
</style>

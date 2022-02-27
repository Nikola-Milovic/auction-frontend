<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="header">
    <RouterLink class="text-white text-lg" to="/">Home</RouterLink>
    <RouterLink class="text-white text-lg" to="/new">New</RouterLink>
  </header>
</template>


<style lang="postcss">

  .header {
    @apply w-full h-16 bg-secondary-dark flex flex-row items-center gap-3
  }

</style>

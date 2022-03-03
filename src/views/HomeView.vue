<script setup lang="ts">
import { useLoginCheck } from "@/hooks/useLoginCheck";
import PopularBids from "../components/home/PopularBids.vue";
import MainLayout from "../components/layout/MainLayout.vue";

const {error, loading} = useLoginCheck();

</script>

<template>
  <MainLayout>
        <PopularBids></PopularBids>
  </MainLayout>
</template>

<script setup lang="ts">
import router from "@/router";
import type { RootQueryType } from "@/types/types";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import AuctionRow from "./AuctionRow.vue";

const { result, loading, error } = useQuery<RootQueryType>(gql`
  query {
    popularItems {
      id
      title
      description
      endsAt
    }
  }
`);

const items = useResult(result, null, (data) => data.popularItems);

const goToDetails = (id : string) => {
    router.push("/details/" + id)
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div class="flex flex-col gap-4 items-center shadow-md p-5" v-else-if="items">
    <p class="text-2xl text-red-500 font-semibold">Popular Auctions</p>
    <AuctionRow :items="items" @itemClicked="goToDetails"></AuctionRow>
  </div>
</template>

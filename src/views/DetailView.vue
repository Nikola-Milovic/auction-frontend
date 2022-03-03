<script setup lang="ts">
import { useRoute } from "vue-router";
import MainLayout from "../components/layout/MainLayout.vue";
import router from "@/router";
import type { RootQueryType } from "@/types/types";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import VueCountdown from "@chenfengyuan/vue-countdown";

const route = useRoute();

const id = route.params.id;

const { result, loading, error } = useQuery<RootQueryType>(
  gql`
    query GetAuctionDetails($id: Int!) {
      auctionDetails(id: $id) {
        id
        title
        description
        endsAt
      }
    }
  `,
  { id: Number(id) }
);

const item = useResult(result, null, (data) => data.auctionDetails);

const getFormatedEndsAtDate = (endsAt: string) => {
  const endsAtDate = new Date(endsAt);
  return (
    endsAtDate.toLocaleDateString() + " " + endsAtDate.toLocaleTimeString()
  );
};

const getMilisRemaining = (endsAt: string) => {
  return new Date(endsAt).getTime() - new Date().getTime();
};
</script>

<template>
  <MainLayout>
    <p v-if="loading" class="text-blue-500 text-xl">loading...</p>
    <div
      v-else-if="item"
      class="flex flex-col p-2 shadow-md gap-2 items-center"
    >
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
      <p>Ends at: {{getFormatedEndsAtDate(item.endsAt!)}}</p>
      <VueCountdown :time="getMilisRemaining(item.endsAt)" v-slot="{ days, hours, minutes, seconds }">
        Time Remaining：{{ days }} days, {{ hours }} hours,
        {{ minutes }} minutes, {{ seconds }} seconds.
      </VueCountdown>
    </div>
    <p v-else-if="error">{{ error.message }}</p>
  </MainLayout>
</template>

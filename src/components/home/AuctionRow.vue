<script setup lang="ts">
import type { Auction } from "@/types/types";
defineProps<{ auctions: Readonly<Auction[]> }>();
defineEmits<{
  (event: "auctionClicked", id: string): void;
}>();

const getFormatedEndsAtDate = (endsAt: string) => {
  const endsAtDate = new Date(endsAt);
  return (
    endsAtDate.toLocaleDateString() + " " + endsAtDate.toLocaleTimeString()
  );
};
</script>

<template>
  <div class="flex flex-row gap-3" v-if="auctions">
    <!-- TODO add images -->
    <div
      @click="$emit('auctionClicked', auction.id!)"
      class="p-4 shadow-md rounded-md"
      v-for="auction of auctions"
      :key="auction.id!"
    >
      <p>{{ auction.title }}</p>
      <p>{{ auction.description }}</p>
      <!-- <p>   {{ getRemainingTimeinMillis(item.endsAt) }}</p> -->
      <p>Ends at: {{getFormatedEndsAtDate(auction.endsAt!)}}</p>
    </div>
  </div>
</template>

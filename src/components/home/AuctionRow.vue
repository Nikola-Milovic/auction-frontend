<script setup lang="ts">
import type { Item } from "@/types/types";
defineProps<{ items: Readonly<Item[]> }>();
defineEmits<{
  (event: "itemClicked", id: string): void;
}>();

const getFormatedEndsAtDate = (endsAt: string) => {
  const endsAtDate = new Date(endsAt);
  return (
    endsAtDate.toLocaleDateString() + " " + endsAtDate.toLocaleTimeString()
  );
};
</script>

<template>
  <div class="flex flex-row gap-3" v-if="items">
    <!-- TODO add images -->
    <div
      @click="$emit('itemClicked', item.id!)"
      class="p-4 shadow-md rounded-md"
      v-for="item of items"
      :key="item.id!"
    >
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
      <!-- <p>   {{ getRemainingTimeinMillis(item.endsAt) }}</p> -->
      <p>Ends at: {{getFormatedEndsAtDate(item.endsAt!)}}</p>
    </div>
  </div>
</template>

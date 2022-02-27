<script setup lang="ts">
import MainHeader from "./MainHeader.vue";</script>

<template>
  <div class="grid grid-flow-row">
      <MainHeader></MainHeader>
    <main> 
       <slot></slot>
    </main>
  </div>
</template>

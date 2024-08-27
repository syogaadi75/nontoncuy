<template>
  <div class="body">
    <Header />
    <Latest />
    <router-view />
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue'
import Latest from '@/components/Latest.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
</script>
<style></style>

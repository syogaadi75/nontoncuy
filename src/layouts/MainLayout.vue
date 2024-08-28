<template>
  <div class="body">
    <WatchModal />
    <Header />
    <router-view />
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue'
import WatchModal from '@/components/WatchModal.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
</script>
<style></style>

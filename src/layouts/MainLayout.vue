<template>
  <Header />
  <router-view />
</template>
<script setup>
import Header from '@/components/Header.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
</script>
<style></style>

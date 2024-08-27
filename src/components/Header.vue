<template>
  <div class="header">
    <div class="logo-container">
      <img :src="logoImg" alt="logo" />
      <h2 class="julee">Nonton <span class="julee">Cuy</span></h2>
    </div>
    <div class="search-container">
      <v-text-field label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" clearable density="comfortable"></v-text-field>
    </div>
    <div class="items-container">
      <div>Home</div>
      <div>Genre</div>
    </div>
  </div>
</template>
<script setup>
import logoImg from '../assets/logo.png'
</script>
<style></style>

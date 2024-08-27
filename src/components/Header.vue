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
      <div class="item active">
        <div class="text">Home</div>
      </div>
      <div class="item">
        <div class="text">Movies</div>
      </div>
      <div class="item">
        <div class="text">Genre</div>
      </div>
      <div class="item">
        <div class="text">Tahun</div>
      </div>
      <div class="item">
        <div class="text">Negara</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import logoImg from '../assets/logo.png'
</script>
<style></style>

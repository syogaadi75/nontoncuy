<template lang="">
  <v-card color="#060606" class="position-relative bg-dark" style="min-height: 100vh; width: 100%">
    <v-skeleton-loader v-if="isLoading" :loading="isLoading" class="w-100 h-100"></v-skeleton-loader>
    <div v-if="!isLoading" class="d-flex pa-4 justify-space-between w-100" style="backdrop-filter: blur(15px); background: rgba(0, 0, 0, 0); position: absolute">
      <template v-if="!watchMovie?.eps?.isEps">
        <div class="d-flex align-center">
          <v-btn variant="tonal" icon="mdi-arrow-left" @click="goBack()"></v-btn>
          <h2 class="ml-6 julee">{{ watchMovie?.title }}</h2>
        </div>
        <v-btn color="primary">
          <v-icon icon="mdi-movie-open-cog" class="mr-1"></v-icon> Pilih Server

          <v-menu activator="parent">
            <v-list>
              <v-list-item v-for="(item, index) in watchMovie?.servers" :key="index" :value="index">
                <v-list-item-title @click="changeServer(item?.src)"> <v-icon icon="mdi-chevron-right" class="mr-1"></v-icon> {{ item.description }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
      <template v-if="watchMovie?.eps?.isEps">
        <div class="d-flex align-center">
          <v-btn variant="tonal" icon="mdi-arrow-left" @click="goBack()"></v-btn>
          <h2 class="ml-6 julee">{{ watchMovie?.title }}</h2>
        </div> 
      </template>
    </div> 
    <template v-if="!watchMovie?.eps?.isEps">
      <div style="width: 100%; height: 100vh">
        <v-skeleton-loader v-if="loading" :loading="loading" style="width: 100%; height: 100%"></v-skeleton-loader>
        <iframe allowfullscreen v-show="!loading || isLoading" style="width: 100%; height: 100%" :src="watchMovie?.mainServer" frameborder="0" @load="finishLoading()"></iframe>
      </div>
    </template>
    <template v-if="watchMovie?.eps?.isEps">
      <div class="container">
        <div style="width: 100%; height: 65vh; margin-top: 6.5%; margin-bottom: 20px;">
          <v-skeleton-loader v-if="loading" :loading="loading" style="width: 100%; height: 100%"></v-skeleton-loader>
          <iframe allowfullscreen v-show="!loading || isLoading" style="width: 100%; height: 100%" :src="watchMovie?.mainServer" frameborder="0" @load="finishLoading()"></iframe>
        </div>
        <dir class="header-card-container">
          <div class="content-tab">
            <h2 class="julee">List Episode</h2>
          </div> 
        </dir>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <v-btn width="100px" v-for="eps in watchMovie?.eps?.data" :key="eps" @click="changeServer(eps.src)" color="primary" class="mr-2">{{ eps.number }}</v-btn>
        </div>
      </div>
    </template>
  </v-card>
</template>
<script setup>
import { useMoviesStore } from '@/store/moviesStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const url = atob(route.params.url)
const moviesStore = useMoviesStore()
const { isLoading, watchMovie } = storeToRefs(moviesStore)
moviesStore.getWatchlMovie({ url })

const loading = ref(true)

const finishLoading = () => {
  loading.value = false
}

const goBack = () => {
  window.history.back()
}

const changeServer = (url) => {
  const decodeUrl = atob(url)
  watchMovie.value.mainServer = decodeUrl
  loading.value = true 
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  }); 
}
</script>
<style lang=""></style>

<template lang="">
  <v-card color="#060606" class="position-relative bg-dark" style="min-height: 100vh; width: 100%"> 
    <div class="d-flex pa-4 justify-space-between w-100 flex-column flex-md-row" style="gap: 12px; backdrop-filter: blur(15px);">
      <template v-if="!watchMovie?.eps?.isEps">
        <div class="d-flex align-center">
          <v-btn style="text-shadow: 0 0 3px #060606, 0 0 5px #060606;" variant="tonal" icon="mdi-arrow-left" @click="goBack()"></v-btn> 
          <h2 class="ml-6 julee" style="text-shadow: 0 0 3px #060606, 0 0 5px #060606;">{{ watchMovie?.title }}</h2>
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
    <div class="px-4 px-md-16 mt-4 mb-8 height-video" v-if="isLoading">
      <v-skeleton-loader :loading="true" style="width: 100%; height: 100%"></v-skeleton-loader>
    </div>
    <template v-if="!watchMovie?.eps?.isEps">
      <div class="px-4 px-md-16 mt-4 mb-8 height-video">
        <v-skeleton-loader v-if="loading" :loading="loading" style="width: 100%; height: 100%"></v-skeleton-loader>
        <iframe allowfullscreen v-show="!loading || isLoading" style="width: 100%; height: 100%;" allowtransparency="true" :src="watchMovie?.mainServer" frameborder="0" @load="finishLoading()"></iframe>
      </div>
    </template>
    <template v-if="watchMovie?.eps?.isEps">
      <div class="container">
        <div style="width: 100%; margin-bottom: 20px;" class="height-video-eps">
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

isLoading.value = true
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
<style>
.height-video {
  height: 90vh;
}
.height-video-eps {
  height: 60vh;
}

@media (max-width: 768px) {
  .height-video {
    height: 27vh;
  }

  .height-video-eps {
    height: 27vh;
  }
}
</style>

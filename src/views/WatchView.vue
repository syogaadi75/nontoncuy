<template lang="">
  <v-card color="#060606" class="position-relative" style="height: 100vh; width: 100%">
    <div v-show="!isLoading" class="d-flex pa-4 justify-space-between w-100" style="backdrop-filter: blur(15px); background: rgba(0, 0, 0, 0.7)">
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
    </div>

    <v-skeleton-loader v-if="isLoading" :loading="isLoading" class="w-100 h-100"></v-skeleton-loader>
    <div class="w-100 h-100 d-flex justify-center mt-8">
      <v-skeleton-loader v-if="loading" :loading="loading" style="width: 90%; height: 80vh"></v-skeleton-loader>
      <iframe v-show="!loading || isLoading" style="width: 90%; height: 80vh" :src="watchMovie?.mainServer" frameborder="0" @load="finishLoading()"></iframe>
    </div>
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
  const loading = ref(true)
  const decodeUrl = atob(url)
  watchMovie.value.mainServer = decodeUrl
  loading.value = true
}
</script>
<style lang=""></style>

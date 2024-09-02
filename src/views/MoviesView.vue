<template>
  <div class="container">
    <dir class="header-card-container">
      <div class="content-tab">
        <h2 class="julee">Daftar Semua Film</h2>
      </div>
    </dir>
    <div class="pagination-container" v-if="listMovies?.pagination?.currentPage || !isLoading">
      <Pagination :pagination="listMovies.pagination" action="list" />
    </div>
    <div class="card-container">
      <template v-if="isLoading">
        <div class="card" v-for="number in 24" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="50vh"></v-skeleton-loader>
        </div>
      </template>
      <div class="card" v-for="movie in listMovies?.movies" :key="movie" @click="changePage(movie?.href)">
        <div class="card-content-hover">
          <v-btn size="x-large" variant="tonal" color="white" icon="mdi-movie-open"></v-btn>
        </div>
        <v-btn size="small" class="rating font-weight-bold" variant="tonal" color="orange" prepend-icon="mdi-star"> {{ movie.rating || '-' }}</v-btn>
        <v-btn size="small" class="quality font-weight-bold" :color="moviesStore.getColorQuality(movie.quality)" prepend-icon="mdi-movie"> {{ movie.quality || '-' }}</v-btn>
        <v-btn size="small" class="time font-weight-bold" variant="tonal" color="white"> {{ movie.duration || '-' }} Min</v-btn>
        <img :src="movie.imgSrc" :alt="movie.title" />
        <div class="card-content">
          <div style="font-size: 13px">{{ movie.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useMoviesStore } from '@/store/moviesStore'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'

const router = useRouter()
const moviesStore = useMoviesStore()
const modalStore = useModalStore()
const { listMovies, isLoading } = storeToRefs(moviesStore)

moviesStore.getListMovies()

const changePage = (page) => {
  const encodedPage = btoa(page)
  router.push('/detail/' + encodedPage)
}
</script>
<style></style>

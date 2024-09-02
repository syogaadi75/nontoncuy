<template>
  <div class="search-modal-container mb-10" v-show="searchModal">
    <Transition name="slide-fade">
      <div v-if="searchModalContent">
        <dir class="header-card-container">
          <div class="content-tab">
            <h2 class="julee">
              Hasil pencarian <span class="text-primary julee">{{ searchValue }}</span>
            </h2>
          </div>
          <v-btn @click="closeModal()" icon="mdi-close" color="primary"></v-btn>
        </dir>
        <div class="pagination-container" v-if="searchedMovies?.pagination?.currentPage || !isLoading">
          <Pagination :pagination="searchedMovies.pagination" action="search" />
        </div>
        <div class="card-container">
          <template v-if="isLoading">
            <div class="card" v-for="number in 6" :key="number">
              <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="50vh"></v-skeleton-loader>
            </div>
          </template>
          <div v-if="searchedMovies.movies?.length === 0">Movie not found.</div>
          <template v-if="!isLoading">
            <div class="card" v-for="movie in searchedMovies.movies" :key="movie" @click="changePage(movie?.href)">
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
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { useModalStore } from '@/store/modalStore'
import { useMoviesStore } from '@/store/moviesStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { Transition } from 'vue'
import { useRouter } from 'vue-router'
import Pagination from './Pagination.vue'

const router = useRouter()
const moviesStore = useMoviesStore()
const modalStore = useModalStore()
const { searchValue, searchModal, searchModalContent } = storeToRefs(modalStore)
const { searchLoading: isLoading, searchedMovies } = storeToRefs(moviesStore)

const closeModal = () => {
  modalStore.setSearchValue('')
  modalStore.closeSearchModal()
}

const changePage = (page) => {
  const encodedPage = btoa(page)
  router.push('/detail/' + encodedPage)
  closeModal()
}
</script>
<style></style>

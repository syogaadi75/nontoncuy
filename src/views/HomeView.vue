<template>
  <div class="banner-carousel">
    <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="50vh"></v-skeleton-loader>
    <carousel :items-to-show="1" :autoplay="10000" :pauseAutoplayOnHover="true">
      <slide v-for="movie in latest" :key="movie">
        <div class="banner-container">
          <div class="banner-info">
            <h2 class="julee mb-4">
              {{ movie?.title }}
            </h2>
            <p>
              <span class="mr-2">Duration:</span>
              <span class="font-weight-bold">{{ movie?.duration }} Minutes</span>
            </p>
            <p class="mb-4">
              <span class="mr-2">Rating:</span>
              <span class="font-weight-bold">
                <v-icon size="x-small" icon="mdi-star" color="yellow-darken-1"></v-icon>
                {{ movie?.rating }}
              </span>
            </p>
            <v-btn class="mb-8 font-weight-bold" variant="tonal" :color="moviesStore.getColorQuality(movie?.quality)"> {{ movie?.quality }} </v-btn>
            <v-btn prepend-icon="mdi-movie-open" color="primary" @click="changePage(movie?.href)"> Movie Detail </v-btn>
          </div>
          <div class="banner-img">
            <img :src="movie.imgSrc" alt="Film" />
          </div>
        </div>
      </slide>
    </carousel>
  </div>
  <div class="container">
    <dir class="header-card-container">
      <div class="content-tab">
        <h2 class="julee">Latest</h2>
      </div>
      <div>
        <v-btn append-icon="mdi-arrow-right" color="primary">Lihat Lainnya</v-btn>
      </div>
    </dir>
    <div class="card-container">
      <template v-if="isLoading">
        <div class="card" v-for="number in 24" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="50vh"></v-skeleton-loader>
        </div>
      </template>
      <div class="card" v-for="movie in latest" :key="movie" @click="changePage(movie?.href)">
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
  <div class="container">
    <dir class="header-card-container">
      <div class="content-tab">
        <h2 class="julee">Top Views</h2>
      </div>
      <div>
        <v-btn append-icon="mdi-arrow-right" color="primary">Lihat Lainnya</v-btn>
      </div>
    </dir>
    <div class="card-container">
      <template v-if="isLoading">
        <div class="card" v-for="number in 24" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="50vh"></v-skeleton-loader>
        </div>
      </template>
      <div class="card" v-for="movie in topView" :key="movie" @click="changePage(movie?.href)">
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
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useMoviesStore } from '@/store/moviesStore'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const moviesStore = useMoviesStore()
const modalStore = useModalStore()
const { latest, topView, isLoading } = storeToRefs(moviesStore)

moviesStore.getHomeMovies()

const changePage = (page) => {
  const encodedPage = btoa(page)
  router.push('/detail/' + encodedPage)
}
</script>
<style></style>

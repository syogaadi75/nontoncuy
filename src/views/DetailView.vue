<template>
  <div class="banner-carousel" style="height: 58vh">
    <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="58vh"></v-skeleton-loader>
    <div class="banner-container detail">
      <div class="banner-info">
        <h2 class="julee mb-4">{{ detailMovie?.title }}</h2>
        <div class="text-grey-darken-1 mb-2">{{ moviesStore.iFormatDate(new Date(detailMovie?.release_date)) }}</div>
        <p style="font-size: 14px" class="mb-10 line-clamp-8 pr-2">{{ detailMovie?.sinopsis }}</p>
        <div>
          <v-btn prepend-icon="mdi-movie-play" color="primary" @click="tonton(detailMovie?.href)"> Watch </v-btn>
          <v-btn class="ml-3" prepend-icon="mdi-movie-play-outline" color="white" variant="tonal" @click="modalStore.openDetailToggle(detailMovie?.title, detailMovie?.trailer, false)">
            Trailer
          </v-btn>
        </div>
      </div>
      <div class="banner-img" style="display: flex; height: 100%; justify-content: center; align-items: center">
        <img v-if="!isLoading" :src="detailMovie?.imgSrc" alt="Film" />
      </div>
      <div v-if="!isLoading" class="info">
        <v-btn class="font-weight-bold mr-2" v-for="quality in detailMovie?.qualities" :key="quality" :color="`${moviesStore.getColorQuality(quality.name)} mr-2`" size="small" variant="tonal">
          {{ quality.name }}
        </v-btn>
        <v-btn class="font-weight-bold mr-2" color="orange-darken-1" size="small" variant="tonal" prepend-icon="mdi-star">
          {{ detailMovie?.rating?.value || '-' }}, <v-icon class="mx-1" icon="mdi-account-star"></v-icon> {{ detailMovie?.rating?.count || '-' }}
        </v-btn>
        <v-btn class="font-weight-bold" color="blue-darken-1" size="small" variant="tonal" prepend-icon="mdi-timer-outline"> {{ detailMovie?.duration }} </v-btn>
      </div>
    </div>
  </div>

  <div class="container">
    <h2 class="julee mb-6 pl-4" style="border-left: 2px solid #ae231a">Genres</h2>
    <div class="info-container mb-12">
      <template v-if="isLoading">
        <div v-for="number in 5" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100px" height="45px"></v-skeleton-loader>
        </div>
      </template>
      <div class="info" v-for="genre in detailMovie?.genres" :key="genre">{{ genre?.name }}</div>
    </div>
    <h2 class="julee mb-6 pl-4" style="border-left: 2px solid #ae231a">Actors</h2>
    <div class="info-container mb-12">
      <template v-if="isLoading">
        <div v-for="number in 5" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100px" height="45px"></v-skeleton-loader>
        </div>
      </template>
      <div class="info" v-for="actor in detailMovie?.actors" :key="actor">{{ actor?.name }}</div>
    </div>
    <h2 class="julee mb-6 pl-4" style="border-left: 2px solid #ae231a">Directors</h2>
    <div class="info-container mb-12">
      <template v-if="isLoading">
        <div v-for="number in 5" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100px" height="45px"></v-skeleton-loader>
        </div>
      </template>
      <div class="info" v-for="director in detailMovie?.directors" :key="director">{{ director?.name }}</div>
    </div>
    <h2 class="julee mb-6 pl-4" style="border-left: 2px solid #ae231a">Countries</h2>
    <div class="info-container mb-12">
      <template v-if="isLoading">
        <div v-for="number in 5" :key="number">
          <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100px" height="45px"></v-skeleton-loader>
        </div>
      </template>
      <div class="info" v-for="countrie in detailMovie?.countries" :key="countrie">{{ countrie?.name }}</div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue'
import { useModalStore } from '@/store/modalStore'
import { useMoviesStore } from '@/store/moviesStore'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const moviesStore = useMoviesStore()
const modalStore = useModalStore()
const { isLoading, detailMovie, isLoading: loadingNonton, watchMovie } = storeToRefs(moviesStore)

const route = useRoute()
const url = route.params.url
const decodedUrl = atob(url)
watch(
  () => route.params.url,
  (newUrl) => {
    const decodedUrl = atob(newUrl)
    moviesStore.getDetailMovie({ url: decodedUrl })
  }
)

onMounted(() => {
  moviesStore.getDetailMovie({ url: decodedUrl })
})

const router = useRouter()

const tonton = (url) => {
  const encodedPage = btoa(url)
  router.push('/watch/' + encodedPage)
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
<style></style>

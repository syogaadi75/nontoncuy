<template>
  <div class="banner-carousel">
    <v-skeleton-loader v-if="isLoading" :loading="isLoading" width="100%" height="50vh"></v-skeleton-loader>
    <carousel :items-to-show="1" :autoplay="10000" :pauseAutoplayOnHover="true">
      <slide v-for="movie in latest" :key="movie">
            <div class="banner-container">
                <div class="banner-info">
                    <h2 class="julee mb-4">
                        {{ movie?.title}}
                    </h2>
                    <p>
                        <span class="mr-2">Duration:</span>   
                        <span class="font-weight-bold">{{ movie?.duration }} Menit</span>
                    </p>
                    <p class="mb-4">
                        <span class="mr-2">Rating:</span>   
                        <span class="font-weight-bold">
                            <v-icon size="x-small" icon="mdi-star" color="yellow-darken-1"></v-icon> 
                            {{ movie?.rating }}
                        </span>
                    </p>
                    <v-btn class="mb-8 font-weight-bold" variant="tonal" :color="getColorQuality(movie?.quality)"> {{ movie?.quality }}  </v-btn>
                    <v-btn prepend-icon="mdi-movie" color="primary"> Movie Detail </v-btn>
                </div>
                <div class="banner-img">
                    <img :src="movie.imgSrc" alt="Film" />
                </div>
            </div>
      </slide>
    </carousel> 
  </div>
  <div class="latest-container">
    <h2 class="julee mb-6">Latest</h2>
    <div class="card-container">
        <div class="card" v-for="movie in latest" :key="movie">
            <img :src="movie.imgSrc" :alt="movie.title">
            <div class="card-content">
                <div style="font-size: 13px">{{ movie.title }}</div>
            </div>
        </div>
    </div>
  </div>
  <div class="latest-container">
    <h2 class="julee mb-6">Top View</h2>
    <div class="card-container">
        <div class="card" v-for="movie in topView" :key="movie">
            <img :src="movie.imgSrc" :alt="movie.title">
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
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useMoviesStore } from '@/store/moviesStore';

const moviesStore = useMoviesStore()
const { latest, topView, isLoading } = storeToRefs(moviesStore)  

moviesStore.getHomeMovies() 

const getColorQuality = (quality) => {
    switch (quality) {
        case 'FHD':
        return '#008080';
        case 'WEBDL':
            return '#00BFFF';
        case 'WEBRip':
            return '#1E90FF';
        case 'HDRip':
            return '#4169E1';
        case 'HDTV':
            return '#4682B4';
        case 'HDTC':
            return '#5F9EA0';
        case 'HDTS':
            return '#6495ED';
        case 'HDCAM':
            return '#6A5ACD';
        case 'BLU':
            return '#8A2BE2';
        case 'BRRip':
            return '#9400D3';
        case 'DVDRip':
            return '#9932CC';
        case 'HD CAM':
            return '#8B008B';
        case 'HD':
            return 'green';
        case 'SD':
            return 'blue';
        case 'CAM':
            return 'red';
        case 'HS':
            return '#FF6347';
        case 'TRAILER':
            return '#FFD700';
        case 'B:U':
            return '#D3D3D3';
        default:
            return 'grey';
    }
}


</script>
<style></style>

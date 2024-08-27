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
                        <span class="font-weight-bold">{{ movie?.duration }} Minutes</span>
                    </p>
                    <p class="mb-4">
                        <span class="mr-2">Rating:</span>   
                        <span class="font-weight-bold">
                            <v-icon size="x-small" icon="mdi-star" color="yellow-darken-1"></v-icon> 
                            {{ movie?.rating }}
                        </span>
                    </p>
                    <v-btn class="mb-8 font-weight-bold" variant="tonal" :color="getColorQuality(movie?.quality)"> {{ movie?.quality }}  </v-btn>
                    <v-btn prepend-icon="mdi-movie-open" color="primary"> Movie Detail </v-btn>
                </div>
                <div class="banner-img">
                    <img :src="movie.imgSrc" alt="Film" />
                </div>
            </div>
      </slide>
    </carousel> 
  </div>
  <div class="latest-container">
    
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
        <div class="card" v-for="movie in latest" :key="movie">
            <div class="card-content-hover"> 
                <v-btn size="x-large" variant="tonal" color="white" icon="mdi-movie-open"></v-btn> 
            </div>
            <v-btn size="small" class="rating font-weight-bold" variant="tonal" color="orange" prepend-icon="mdi-star"> {{ movie.rating || '-' }}</v-btn>
            <v-btn size="small" class="quality font-weight-bold" :color="getColorQuality(movie.quality)" prepend-icon="mdi-movie"> {{ movie.quality || '-' }}</v-btn>
            <v-btn size="small" class="time font-weight-bold" variant="tonal" color="white"> {{ movie.duration || '-' }} Min</v-btn>
            <img :src="movie.imgSrc" :alt="movie.title">
            <div class="card-content">
                <div style="font-size: 13px">{{ movie.title }}</div>
            </div>
        </div>
    </div>
  </div>
  <div class="latest-container">
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
        <div class="card" v-for="movie in topView" :key="movie">
            <div class="card-content-hover"> 
                <v-btn size="x-large" variant="tonal" color="white" icon="mdi-movie-open"></v-btn> 
            </div>
            <v-btn size="small" class="rating font-weight-bold" variant="tonal" color="orange" prepend-icon="mdi-star"> {{ movie.rating || '-' }}</v-btn>
            <v-btn size="small" class="quality font-weight-bold" :color="getColorQuality(movie.quality)" prepend-icon="mdi-movie"> {{ movie.quality || '-' }}</v-btn>
            <v-btn size="small" class="time font-weight-bold" variant="tonal" color="white"> {{ movie.duration || '-' }} Min</v-btn>
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
            return 'orange-darken-1';
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

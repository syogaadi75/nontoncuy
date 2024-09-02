<template>
  <div class="header">
    <div class="logo-container" style="cursor: pointer" @click="changePage('/')">
      <img :src="logoImg" alt="logo" />
      <h2 class="julee title">Nonton <span class="julee">Cuy</span></h2>
    </div>
    <div class="search-container">
      <v-text-field
        :loading="isLoading"
        :disabled="isLoading"
        v-model="searchValue"
        :label="`${isLoading ? 'Loading...' : 'Search Movie'}`"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        density="comfortable"
        @keyup="searching()"
        @click:clear="clearMovie()"
      ></v-text-field>
    </div>
    <div class="items-container">
      <div class="item" data-url="/" @click="changePage('/')">
        <div class="text">Home</div>
      </div>
      <div class="item" data-url="/movies" @click="changePage('/movies')">
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
  <SearchModal />
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import logoImg from '../assets/logo.png'
import SearchModal from './SearchModal.vue'
import { onMounted, ref, watch } from 'vue'
import { useModalStore } from '@/store/modalStore'
import { useMoviesStore } from '@/store/moviesStore'
import { storeToRefs } from 'pinia'
const router = useRouter()
const route = useRoute()
const payload = ref({})

const modalStore = useModalStore()
const moviesStore = useMoviesStore()
const { searchLoading: isLoading } = storeToRefs(moviesStore)
const { searchValue } = storeToRefs(modalStore)

const typingTimeout = 700
let timeoutId

const searching = () => {
  clearTimeout(timeoutId)
  if (searchValue.value === '') {
    clearMovie()
    return
  }
  if (searchValue.value === payload.value.movie) {
    return
  }
  timeoutId = setTimeout(() => {
    payload.value = { movie: searchValue.value }
    moviesStore.getSearchMovies(payload.value)
    modalStore.openSearchModal()
  }, typingTimeout)
}

const clearMovie = () => {
  payload.value = {}
  modalStore.setSearchValue('')
  modalStore.closeSearchModal()
}

const updateActiveItem = (newPath) => {
  const items = document.querySelectorAll('.items-container .item')
  items.forEach((item) => {
    const url = item.getAttribute('data-url')
    if (url === newPath) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}

onMounted(() => {
  updateActiveItem(route.path)
})

watch(
  () => route.path,
  (newPath) => {
    updateActiveItem(newPath)
  }
)

const changePage = (path) => {
  router.push(path)
}
</script>
<style></style>

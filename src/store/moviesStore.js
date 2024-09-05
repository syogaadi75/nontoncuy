import customAxios from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMoviesStore = defineStore('movies', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const message = ref('')
  const latest = ref([])
  const topView = ref([])
  const detailMovie = ref({})
  const watchMovie = ref({})
  const searchLoading = ref(false)
  const searchedMovies = ref({})
  const listMovies = ref({})

  const getHomeMovies = async (payload) => {
    isLoading.value = true
    isError.value = false
    latest.value = []
    topView.value = []
    try {
      const response = await customAxios.get('/movies')
      latest.value = response?.data?.latest || []
      topView.value = response?.data?.topView || []
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error?.response?.data?.message || ''
      isLoading.value = false
    }
  }

  const getDetailMovie = async (payload) => {
    isLoading.value = true
    isError.value = false
    detailMovie.value = {}
    try {
      const response = await customAxios.get('/detail-movie?url=' + payload.url)
      detailMovie.value = response?.data
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error.response?.data?.message || ''
      isLoading.value = false
    }
  }

  const getWatchlMovie = async (payload) => {
    isLoading.value = true
    isError.value = false
    watchMovie.value = {}
    try {
      const response = await customAxios.get('/watch-movie?url=' + payload.url)
      watchMovie.value = response?.data
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error.response?.data?.message || ''
      isLoading.value = false
    }
  }

  const getSearchMovies = async (payload) => {
    searchLoading.value = true
    isError.value = false
    searchedMovies.value = {}
    try {
      const response = await customAxios.post('/search-movies', payload)
      searchedMovies.value = response?.data
      console.log(response?.data, 'response?.data')
      searchLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error?.response?.data?.message || ''
      searchLoading.value = false
    }
  }

  const getListMovies = async (payload) => {
    isLoading.value = true
    isError.value = false
    listMovies.value = {}
    try {
      const response = await customAxios.post('/list-movies', payload)
      listMovies.value = response?.data
      console.log(response?.data, 'response?.data')
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error?.response?.data?.message || ''
      isLoading.value = false
    }
  }

  const getColorQuality = (quality) => {
    switch (quality) {
      case 'FHD':
        return '#008080'
      case 'WEBDL':
        return '#00BFFF'
      case 'WEBRip':
        return '#1E90FF'
      case 'HDRip':
        return '#4169E1'
      case 'HDTV':
        return '#4682B4'
      case 'HDTC':
        return '#5F9EA0'
      case 'HDTS':
        return 'orange-darken-1'
      case 'HDCAM':
        return '#6A5ACD'
      case 'BLU':
        return '#8A2BE2'
      case 'BRRip':
        return '#9400D3'
      case 'DVDRip':
        return '#9932CC'
      case 'HD CAM':
        return '#8B008B'
      case 'HD':
        return 'green'
      case 'SD':
        return 'blue'
      case 'CAM':
        return 'red'
      case 'HS':
        return '#FF6347'
      case 'TRAILER':
        return '#FFD700'
      case 'B:U':
        return '#D3D3D3'
      default:
        return 'grey'
    }
  }

  const iFormatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' } 
    function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }
    if(!isValidDate(new Date(date))) {
      return "-";
    }
    const formattedDate = new Date(date).toLocaleDateString('id-ID', options)
    return formattedDate;
  }

  return {
    isLoading,
    isError,
    message,
    latest,
    topView,
    detailMovie,
    getHomeMovies,
    getDetailMovie,
    getColorQuality,
    iFormatDate,
    watchMovie,
    getWatchlMovie,
    getSearchMovies,
    searchedMovies,
    getListMovies,
    listMovies,
    searchLoading
  }
})

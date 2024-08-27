import customAxios from '@/api' 
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMoviesStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const message = ref('')
  const latest = ref([])
  const topView = ref([])
  const detailMovie = ref({})

  const getHomeMovies = async (payload) => {
    isLoading.value = true
    isError.value = false
    try {
      const response = await customAxios.get('/movies')
      latest.value = response?.data?.latest || []
      topView.value = response?.data?.topView || []
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error?.response?.data?.message || ""
      isLoading.value = false
    }
  }  

  const getDetailMovies = async (payload) => {
    isLoading.value = true
    isError.value = false
    try {
      const response = await customAxios.get('/detail-movie?url='+payload.url) 
      detailMovie.value = response?.data
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error.response?.data?.message || ""
      isLoading.value = false
    }
  }  

  return {
    isLoading,
    isError,
    message,
    latest,
    topView, 
    detailMovie,
    getHomeMovies,
    getDetailMovies
  }
})

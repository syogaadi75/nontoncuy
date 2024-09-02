import customAxios from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const watchModal = ref(false)
  const title = ref('-')
  const iframeSrc = ref('')
  const searchModal = ref(false)
  const searchModalContent = ref(false)
  const searchValue = ref('')

  const setSearchValue = (v) => {
    searchValue.value = v
  }

  const openSearchModal = () => {
    searchModalContent.value = true
    searchModal.value = true
  }

  const closeSearchModal = () => {
    searchModalContent.value = false
    setTimeout(() => {
      searchModal.value = false
    }, 300)
  }

  const openDetailToggle = (t, i) => {
    watchModal.value = true
    title.value = t
    iframeSrc.value = i
  }

  const closeDetailToggle = () => {
    watchModal.value = false
    title.value = '-'
    iframeSrc.value = ''
  }

  return {
    watchModal,
    openDetailToggle,
    closeDetailToggle,
    title,
    iframeSrc,
    searchModal,
    openSearchModal,
    closeSearchModal,
    searchModalContent,
    setSearchValue,
    searchValue
  }
})

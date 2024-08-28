import customAxios from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const watchModal = ref(false)
  const title = ref('-')
  const iframeSrc = ref('')

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
    iframeSrc
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotifStore = defineStore('notif', () => {
  const isOpen = ref(false)
  const color = ref('')
  const message = ref('')

  const open = (pesan = '', status = 'info') => {
    isOpen.value = true
    message.value = pesan
    color.value =
      status === 'info'
        ? 'blue'
        : status === 'success'
        ? 'green'
        : status === 'error'
        ? 'red'
        : 'blue'
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    color,
    message,
    close,
    open
  }
})

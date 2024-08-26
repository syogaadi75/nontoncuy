<template>
  <div>
    <v-snackbar v-model="isOpen" elevation="24" :color="color" :timeout="3000" location="top right">
      {{ message }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="notifStore.close"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import { useNotifStore } from '@/store/notifStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const notifStore = useNotifStore()
const { isOpen, color, message } = storeToRefs(notifStore)

watch(isOpen, (val) => {
  isOpen.value = val
})

watch(color, (val) => {
  color.value = val
})

watch(message, (val) => {
  message.value = val
})
</script>
<style></style>

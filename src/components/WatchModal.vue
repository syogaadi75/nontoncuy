<template>
  <v-dialog v-model="watchModal" fullscreen>
    <v-card color="#060606" class="position-relative">
      <div class="d-flex pa-4 justify-space-between position-absolute w-100" style="backdrop-filter: blur(15px)">
        <div class="d-flex align-center">
          <v-btn variant="tonal" icon="mdi-arrow-left" @click="modalStore.closeDetailToggle()"></v-btn>
          <h2 class="ml-6 julee">{{ title }}</h2>
        </div>
        <v-btn variant="tonal" icon="mdi-close" @click="modalStore.closeDetailToggle()"></v-btn>
      </div>

      <div class="w-100 h-100 d-flex justify-center align-center">
        <v-skeleton-loader v-if="loading" :loading="loading" class="w-100 h-100"></v-skeleton-loader>
        <iframe v-show="!loading" class="w-100 h-100" :src="iframeSrc" frameborder="0" @load="finishLoading()"></iframe>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useModalStore } from '@/store/modalStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const modalStore = useModalStore()
const { watchModal, title, iframeSrc } = storeToRefs(modalStore)

// State to handle loading
const loading = ref(true)

const finishLoading = () => {
  loading.value = false
}
</script>
<style lang=""></style>

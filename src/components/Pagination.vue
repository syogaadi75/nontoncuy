<template>
  <div class="pagination" v-if="action === 'search' ? searchLoading : isLoading">
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="nav-pagination-width"></v-skeleton-loader>
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="nav-pagination-width"></v-skeleton-loader>
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="square-btn"></v-skeleton-loader>
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="square-btn"></v-skeleton-loader>
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="square-btn"></v-skeleton-loader>
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="nav-pagination-width"></v-skeleton-loader>
    <v-skeleton-loader v-if="action === 'search' ? searchLoading : isLoading" :loading="action === 'search' ? searchLoading : isLoading" class="nav-pagination-width"></v-skeleton-loader>
  </div>
  <div class="pagination" v-if="action === 'search' ? !searchLoading : !isLoading">
    <v-btn @click="jumpPaginate('first', pagination?.first?.href)" variant="tonal" color="white" v-if="pagination?.first?.status"
      ><v-icon class="mr-1" icon="mdi-chevron-double-left"></v-icon> First</v-btn
    >
    <v-btn @click="changePaginate(pagination?.currentPage - 1)" variant="tonal" color="white" v-if="pagination?.isPrev"><v-icon class="mr-1" icon="mdi-chevron-left"></v-icon> Prev</v-btn>
    <v-btn
      @click="changePaginate(index + pagination?.startPage)"
      v-for="(item, index) in pagination?.count"
      :key="index"
      :variant="index + pagination?.startPage === pagination?.currentPage ? 'elevated' : 'tonal'"
      :color="index + pagination?.startPage === pagination?.currentPage ? 'primary' : ''"
      class="square-btn"
      >{{ index + pagination?.startPage }}</v-btn
    >
    <v-btn @click="changePaginate(pagination?.currentPage + 1)" variant="tonal" color="white" v-if="pagination?.isNext">Next <v-icon class="ml-1" icon="mdi-chevron-right"></v-icon></v-btn>
    <v-btn @click="jumpPaginate('last', pagination?.last?.href)" variant="tonal" color="white" v-if="pagination?.last?.status"
      >Last <v-icon class="ml-1" icon="mdi-chevron-double-right"></v-icon
    ></v-btn>
  </div>
</template>
<script setup>
import { useModalStore } from '@/store/modalStore'
import { useMoviesStore } from '@/store/moviesStore'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'

const props = defineProps({
  pagination: Object,
  action: String
})
const modalStore = useModalStore()
const moviesStore = useMoviesStore()
const { searchValue } = storeToRefs(modalStore)
const { isLoading, searchLoading } = storeToRefs(moviesStore)
const { pagination, action } = toRefs(props)

const changePaginate = (page) => {
  const newPayload = {
    page
  }

  if (action.value === 'search') {
    newPayload.movie = searchValue.value
    moviesStore.getSearchMovies(newPayload)
  } else if (action.value === 'list') {
    moviesStore.getListMovies(newPayload)
  }
}

const jumpPaginate = (type, href) => {
  const newPayload = {}

  if (type === 'first') {
    newPayload.first = href
  }
  if (type === 'last') {
    newPayload.last = href
  }

  if (action.value === 'search') {
    newPayload.movie = searchValue.value
    moviesStore.getSearchMovies(newPayload)
  } else if (action.value === 'list') {
    moviesStore.getListMovies(newPayload)
  }
}
</script>
<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.square-btn {
  min-width: 36px;
  min-height: 36px;
  width: 36px;
  height: 36px;
  padding: 0;
}

.nav-pagination-width {
  width: 80px;
  height: 36px;
}
</style>

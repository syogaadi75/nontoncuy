import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/store'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
      {
        path: '/detail/:url',
        name: 'detail',
        component: () => import('@/views/DetailView.vue')
      },
      {
        path: '/movies',
        name: 'movies',
        component: () => import('@/views/MoviesView.vue')
      }
    ]
  },
  {
    path: '/watch/:url',
    name: 'watch',
    component: () => import('@/views/WatchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token')
//   const authStores = useAuthStore()

//   if (to.name !== 'login' && !isAuthenticated) {
//     next({ name: 'login' })
//   } else if (to.name === 'login') {
//     if (isAuthenticated) {
//       next({ name: 'home' })
//     }

//     next()
//   } else {
//     if (from.name !== 'login' && isAuthenticated) {
//       await authStores.me()
//     }

//     next()
//   }
// })

export default router

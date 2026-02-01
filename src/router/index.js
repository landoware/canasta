import HomeView from '@/views/HomeView.vue'
import LobbyView from '@/views/LobbyView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/canasta', component: HomeView, name: 'home' },
    { path: '/canasta/:id', component: LobbyView, name: 'lobby', props: true }
  ],
})

export default router

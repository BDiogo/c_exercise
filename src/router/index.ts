import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'exact-active-link',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    
    }
  ]
})

export default router

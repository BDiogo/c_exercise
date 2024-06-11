import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../HomeView.vue'
import PageNotFound from '../PageNotFound.vue'
import EventsDataView from '../EventsDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'exact-active-link',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

      children: [
        {
          path: '/',
          redirect: '/data'
        },
        {
          path: '/data',
          component: EventsDataView
        },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound }
      ]
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/users',
      name: 'users',
      component: () => import('../views/UserSearch.vue')
    },
    {
      path: '/addPassword/',
      name: 'addPassword',
      component: AddPassword
    },
    {
      path: '/addPassword/:pass',
      name: 'addPassword1',
      component: AddPassword
    },
  ]
})

export default router

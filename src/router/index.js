import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import EditUser from '../views/user/EditUser.vue';
import NewUserView from '../views/NewUserView.vue'
import StockMarketListView from '../views/StockMarketListView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/newUser',
      name: 'newUser',
      component: NewUserView
    },
    {
      path: '/stockMarketList',
      name: 'stockMarketList',
      component: StockMarketListView
    },
    {
      path: '/admin/users',
      name: 'users',
      component: () => import('../views/UserSearch.vue')
    },
    {
      path: '/addPassword/',
      name: 'addPassword',
      component: () => import('../views/AddPassword.vue')
    },
    {
      path: '/users/:id',
      name: 'userEdit',
      component: () => EditUser
    }
  ]
})

export default router

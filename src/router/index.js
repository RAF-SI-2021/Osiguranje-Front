import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import EditUser from '../views/user/EditUser.vue';
import NewUserView from '../views/NewUserView.vue'
import StockMarketListView from '../views/StockMarketListView.vue'
import StockSecuritiesView from '../views/StockSecuritiesView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
      redirect: '/login'
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
    },
    {
      path: '/stock/:symbol',
      name: 'stockInfo',
      component: () => import('../views/StockSecurityInfoView.vue'),
      props: route => ({ query: route.query.q })
    },
    {
      path: '/stock-tabledemo',
      name: 'StockTableDemo',
      component: () => import('../views/StockTableDemo.vue')
    },
    {
      path: '/StockSecuritiesView',
      name: 'StockSecuritiesView',
      component: StockSecuritiesView
    }
  ]
})

const routeNames = [
  'admin', 
  'newUser', 
  'stockMarketList', 
  'stockMarketList', 
  'users', 
  'addPassword', 
  'userEdit', 
  'stockInfo', 
  'StockTableDemo', 
  'StockSecuritiesView'
]

router.beforeEach((to, from, next) => {
  if (routeNames.includes(to.name)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else if (to.name === 'login') {
    const token = localStorage.getItem('token');
    if (token) {
      next('/admin');
    } else {
      next();
    }
  }
})

export default router

import { getToken } from '@/utils/auth'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/home',
    redirect: '/welcome',
    component: () => import('@/views/home/index'),
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/welcome/index')
      },
      {
        path: '/users',
        component: () => import('@/views/users/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const TokenValue = getToken()
  if (!TokenValue) return next('/login')
  next()
})

export default router

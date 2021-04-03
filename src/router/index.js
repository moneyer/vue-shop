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
    // 登录页
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    // 主页
    path: '/home',
    redirect: '/welcome',
    component: () => import('@/views/home/index'),
    children: [
      {
        // 欢迎页
        path: '/welcome',
        component: () => import('@/views/welcome/index')
      },
      {
        // 用户管理页面
        path: '/users',
        component: () => import('@/views/users/index')
      },
      {
        // 权限管理页面
        path: '/rights',
        component: () => import('@/views/rights/index')
      },
      {
        // 权限管理页面
        path: '/roles',
        component: () => import('@/views/roles/index')
      },
      {
        // 数据报表页面
        path: '/reports',
        component: () => import('@/views/report/index')
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

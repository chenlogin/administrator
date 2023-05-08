import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/LayoutDefault.vue'
import Empty from '@/layouts/Empty.vue'
import Home from '@/pages/home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/',
        // Home 将被渲染到 Layout 的 <router-view> 内部
        component: Home,
        name: 'home',
      },
    ],
  },
  {
    path: '/login',
    component: Empty,
    meta: {
      title: '关于',
    },
    children: [
      {
        path: '',
        component: () => import('@/pages/login/LoginPage.vue'),
        name: 'login',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

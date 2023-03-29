import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/prodline'
  },
  {
    path: '/prodLine',
    name: 'prodLine',
    component: () => import('../views/prodLine/index.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index/index.vue')
  }, 
  {
    path: '/firstHandle',
    name: 'firstHandle',
    component: () => import('../views/orderHandle/firstHandle.vue')
  },
  {
    path: '/padPasting',
    name: 'padPasting',
    component: () => import('../views/orderHandle/padPasting.vue')
  },

]

const router = createRouter({
  // history: createWebHashHistory('/eap-web/'),
  history: createWebHashHistory(),
  routes
})

export default router

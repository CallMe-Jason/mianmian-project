import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/questions',
    name: 'question',
    component: () => import('@/views/question'),
    children: [
      {
        path: '/questions/list',
        name: 'List',
        component: () => import('@/views/question/components/list.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

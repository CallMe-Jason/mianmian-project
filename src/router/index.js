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
    component: () => import('@/views/home'),
    children: [
      {
        path: '/subjects/directorys',
        name: 'subjects',
        component: () => import('@/views/subject-catalog'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

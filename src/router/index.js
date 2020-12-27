import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/asd',
    component: () => import('../views/subjects/demo.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    // name: 'home',
    redirect: '/dashboard',
    component: () => import('@/views/home'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard')
      },
      {
        path: '/base/users',
        name: 'BaseUser',
        component: () => import('@/views/base/user')
      },
      {
        path: '/base/menus',
        name: 'BaseMenu',
        component: () => import('@/views/base/menu')
      },
      {
        path: '/base/permissions',
        name: 'BasePermission',
        component: () => import('@/views/base/permission')
      },
      {
        path: '/base/logs',
        name: 'BaseLogs',
        component: () => import('@/views/base/logs')
      },
      {
        path: '/companys/list',
        name: 'CompanysList',
        component: () => import('@/views/companys/list')
      },
      {
        path: '/questions/list',
        name: 'QuestionsList',
        component: () => import('@/views/questions/list')
      },
      {
        path: '/questions/choice',
        name: 'QuestionsChoice',
        component: () => import('@/views/questions/choice')
      },
      {
        path: '/questions/new',
        name: 'QuestionsNew',
        component: () => import('@/views/questions/new')
      },
      {
        path: '/questions/randoms',
        name: 'QuestionsRandoms',
        component: () => import('@/views/questions/randoms')
      },
      {
        path: '/subjects/list',
        name: 'SubjectsList',
        component: () => import('@/views/subjects/list')
      },
      {
        path: '/subjects/directorys',
        name: 'SubjectsDirectorys',
        component: () => import('@/views/subjects/directorys')
      },
      {
        path: '/subjects/tags',
        name: 'SubjectsTags',
        component: () => import('@/views/subjects/tags')
      },
      {
        path: '/articles/list',
        name: 'ArticleList',
        component: () => import('@/views/article/list')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(user)
  if (to.path === '/login') return next()
  if (!store.state.user) {
    return next('/login')
  }
  next()
})

export default router

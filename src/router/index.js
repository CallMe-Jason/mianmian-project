import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
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
        title: '数据概览',
        component: () => import('@/views/dashboard'),
        meta: {
          name: '数据概览'
        }
      },
      {
        path: '/base/users',
        name: 'BaseUser',
        title: '用户',
        component: () => import('@/views/base/user'),
        meta: {
          name: '用户'
        }
      },
      {
        path: '/base/menus',
        name: 'BaseMenu',
        title: '菜单',
        component: () => import('@/views/base/menu'),
        meta: {
          name: '菜单'
        }
      },
      {
        path: '/base/permissions',
        name: 'BasePermission',
        title: '权限',
        component: () => import('@/views/base/permission'),
        meta: {
          name: '权限'
        }
      },
      {
        path: '/base/logs',
        name: 'BaseLogs',
        title: '日志',
        component: () => import('@/views/base/logs'),
        meta: {
          name: '日志'
        }
      },
      {
        path: '/companys/list',
        name: 'CompanysList',
        title: '企业管理',
        component: () => import('@/views/companys/list'),
        meta: {
          name: '企业管理'
        }
      },
      {
        path: '/questions/list',
        name: 'QuestionsList',
        title: '基础题库',
        component: () => import('@/views/questions/list'),
        meta: {
          name: '基础题库'
        }
      },
      {
        path: '/questions/choice',
        name: 'QuestionsChoice',
        title: '精选题库',
        component: () => import('@/views/questions/choice'),
        meta: {
          name: '精选题库'
        }
      },
      {
        path: '/questions/new',
        name: 'QuestionsNew',
        title: '试题录入',
        component: () => import('@/views/questions/new'),
        meta: {
          name: '试题录入'
        }
      },
      {
        path: '/questions/randoms',
        name: 'QuestionsRandoms',
        title: '主题列表',
        component: () => import('@/views/questions/randoms'),
        meta: {
          name: '主题列表'
        }
      },
      {
        path: '/subjects/list',
        name: 'SubjectsList',
        title: '学科',
        component: () => import('@/views/subjects/list'),
        meta: {
          name: '学科'
        }
      },
      {
        path: '/subjects/directorys',
        name: 'SubjectsDirectorys',
        title: '目录',
        component: () => import('@/views/subjects/directorys'),
        meta: {
          name: '目录'
        }
      },
      {
        path: '/subjects/tags',
        name: 'SubjectsTags',
        title: '标签',
        component: () => import('@/views/subjects/tags'),
        meta: {
          name: '标签'
        }
      },
      {
        path: '/articles/list',
        name: 'ArticleList',
        title: '面试技巧',
        component: () => import('@/views/article/list'),
        meta: {
          name: '面试技巧'
        }
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

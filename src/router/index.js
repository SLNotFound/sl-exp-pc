import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/views/layout'
import Login from '@/views/login'
import Dashboard from '@/views/dashboard'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'article', component: Article }
      ]
    }
  ]
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    next()
    return
  }

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  next('/login')
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Applications from './views/Applications.vue'
import Companies from './views/Companies.vue'
import Login from './views/Login.vue'
import Callback from './components/Callback.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // If the route requires auth and is not logged in, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthed) {
    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
    })
  // If the user is logged in and tries to go to the login, redirect to home
  } else if (to.matched.some(record => record.name === 'login') && store.getters.isAuthed) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router

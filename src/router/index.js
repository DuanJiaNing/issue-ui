import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Session from '@/components/Session'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/session/:id',
      name: 'session',
      component: Session,
      props: true
    }
  ]
})

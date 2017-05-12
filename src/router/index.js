import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/Music'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Music',
      component: Music
    }
  ]
})

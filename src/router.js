import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode预设是hash
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about/:id?',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/products',
      name: 'Home',
      component: () => import( /* webpackChunkName: "about" */ './components/Products.vue'),
      // 三种传递
      // props: true,
      // props: {
        // id: 3
      // }
      props: (route)=> {
        return {
          id: route.params.id,
        }
      }
    }
  ]
})
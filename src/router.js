/* ./src/router.css */

import { createRouter, createWebHistory } from 'vue-router'
import About from './components/About.vue'
import Resources from './components/Resources.vue'
import SmartMask from './components/SmartMask.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: SmartMask,
    },
    {
      path: '/resources',
      component: Resources,
    },
    {
      path: '/about',
      component: About,
    }
  ]
})
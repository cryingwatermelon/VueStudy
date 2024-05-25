import { createRouter, createWebHashHistory } from 'vue-router'

import { constantRoute, layoutRoute } from './routes'

const routes = [...constantRoute, ...layoutRoute]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router

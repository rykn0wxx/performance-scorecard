/**
 * Vue Router
 * @library
 */
// Lib imports
import { createRouter, createWebHistory } from 'vue-router'
import { scrollBehavior } from '@/services/core/utilities'
import paths from '@/plugins/router/paths'

const APP_ROUTES = paths.concat([{ path: '/:pathMatch(.*)*', redirect: '/home' }])

const router = createRouter({
  history: createWebHistory(),
  routes: APP_ROUTES,
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'link-exact-active',
  scrollBehavior
})

export default function (app) {
  app.use(router)
}
export { router }

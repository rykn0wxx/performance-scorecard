import { genUuId } from '@/services/core/utilities'

let indexCtr = 0
function normalizePaths(pathObj) {
  const route = { ...pathObj }
  route.id = genUuId()
  route.routeIndex = indexCtr++
  if (route.children) {
    route.children = route.children.map(i => normalizePaths(i))
  }
  return route
}

const routePaths = [
  {
    path: '/',
    name: 'AppLayout',
    component: () => import('../../components/layouts/AppLayout.vue'),
    meta: { isPublic: false },
    redirect: { name: 'Home', path: 'home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../../pages/base/HomePage.vue'),
        meta: { isPublic: false }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../../pages/base/AboutPage.vue'),
        meta: { isPublic: false }
      }
    ]
  },
  {
    path: '/widgets',
    name: 'Widgets',
    component: () => import('../../components/layouts/AppLayout.vue'),
    meta: { isPublic: false },
    children: [
      {
        path: 'button',
        name: 'Buttons',
        component: () => import('../../pages/widgets/ButtonsPage.vue'),
        meta: { isPublic: false }
      }
    ]
  }
]

const routeObj = routePaths.map(p => normalizePaths(p, indexCtr))

export default routeObj

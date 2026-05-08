import { genUuId } from '@/services/core/utilities'

let indexCtr = 0
function backRoutes(routeArr, lvl, parent) {
  let parentLvl = lvl || 0
  let childLvl = 0
  for (let i = 0; i < routeArr.length; i++) {
    routeArr[i] = {
      ...routeArr[i],
      uuid: genUuId(),
      routeIndex: indexCtr++,
      isActive: false,
      depth: parentLvl
    }
    routeArr[i].meta.icon = routeArr[i].meta?.icon || 'pi pi-fw pi-circle'
    const prePath = parent ? (parent.path === '/' ? '' : parent.path.endsWith('/') ? parent.path.slice(0, -1) : parent.path.startsWith('/') ? parent.path : `/${parent.path}`) : ''
    const postPath = routeArr[i].path === '/' ? '/' : routeArr[i].path.endsWith('/') ? routeArr[i].path.slice(0, -1) : routeArr[i].path.startsWith('/') ? routeArr[i].path : `/${routeArr[i].path}`
    routeArr[i].pathRef = prePath + postPath
    if (parent) routeArr[i].parentID = parent.uuid
    if (routeArr[i].children) {
      routeArr[i].isOpen = false
      childLvl = parentLvl + 1
      backRoutes(routeArr[i].children, childLvl, routeArr[i])
    }
  }
}

function normalizeRoutes(pluginRoutes) {
  const routes = [...pluginRoutes]
  backRoutes(routes)
  return routes
}

const routePaths = [
  {
    path: '/',
    name: 'AppLayout',
    component: () => import('../../components/layouts/AppLayout.vue'),
    meta: { isPublic: true },
    redirect: { name: 'Home', path: 'home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../../pages/base/HomePage.vue'),
        meta: { isPublic: true, icon: 'pi pi-fw pi-mobile' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../../pages/base/AboutPage.vue'),
        meta: { isPublic: true, icon: 'pi pi-fw pi-qrcode' }
      }
    ]
  },
  {
    path: '/widgets',
    name: 'Widgets',
    component: () => import('../../components/layouts/AppLayout.vue'),
    meta: { isPublic: true },
    children: [
      {
        path: 'button',
        name: 'Buttons',
        component: () => import('../../pages/widgets/ButtonsPage.vue'),
        meta: { isPublic: false, icon: 'pi pi-fw pi-sitemap' }
      }
    ]
  }
]
const routeObj = normalizeRoutes(routePaths)

export default routeObj

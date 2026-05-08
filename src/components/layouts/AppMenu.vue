<template>
  <ul class="app-menu layout-menu">
    <template v-for="(item, i) in Menus" :key="i" v-if="Menus">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import AppMenuItem from './AppMenuItem.vue'
// const name = 'AppMenu'
const router = useRouter()
const Menus = ref([])

function cleanRoutes(argArr) {
  const route = Object.assign({}, argArr)
  delete route.component
  delete route.redirect
  delete route.path
  if (argArr.children) {
    route.children = argArr.children.map(aa => cleanRoutes(aa))
  } else {
    route.to = argArr.pathRef
    delete route.pathRef
  }
  return route
}

onMounted(() => {
  // const routeMenus = router.options.routes.filter(r => r.meta && r.meta.isPublic)
  Menus.value = router.options.routes
    .filter(r => r.meta && r.meta.isPublic)
    .map(a => cleanRoutes(a))
    .concat([
      {
        name: 'Hierarchy',
        pathRef: '/hierarchy',
        meta: { icon: 'pi pi-fw pi-graduation-cap' },
        children: [
          {
            name: 'Submenu 1',
            pathRef: '/submenu_1',
            meta: { icon: 'pi pi-fw pi-graduation-cap' },
            children: [
              {
                name: 'Submenu 1.1',
                pathRef: '/submenu_1.1',
                meta: { icon: 'pi pi-fw pi-graduation-cap' },
                children: [
                  {
                    name: 'Submenu 1.1.1',
                    pathRef: '/submenu_1.1.1',
                    meta: { icon: 'pi pi-fw pi-graduation-cap' },
                    children: [
                      {
                        name: 'About 1.1.1.1',
                        to: '/about',
                        meta: { icon: 'pi pi-fw pi-graduation-cap' }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ])
})
</script>

<style lang="scss" scoped></style>

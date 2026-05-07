<template>
  <ul class="app-menu layout-menu">
    <template v-for="(item, i) in Menus" :key="i">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import AppMenuItem from './AppMenuItem.vue'
// const name = 'AppMenu'
const Menus = ref([
  {
    label: 'Hierarchy',
    icon: 'pi pi-fw pi-align-left',
    path: '/hierarchy',
    children: [
      {
        label: 'MENU 1',
        icon: 'pi pi-fw pi-gift',
        path: '/submenu_1',
        children: [
          {
            label: 'MENU 1 Submenu 1',
            icon: 'pi pi-fw pi-graduation-cap',
            path: '/submenu_1_1',
            children: [
              {
                label: 'Submenu 1.1.1',
                icon: 'pi pi-fw pi-hammer'
              },
              {
                label: 'Submenu 1.1.2',
                icon: 'pi pi-fw pi-microchip'
              },
              {
                label: 'Submenu 1.1.3',
                icon: 'pi pi-fw pi-percentage'
              }
            ]
          },
          {
            label: 'MENU 1 Submenu 2',
            icon: 'pi pi-fw pi-shop',
            path: '/submenu_1_2',
            children: [
              {
                label: 'Submenu 1.2.1',
                icon: 'pi pi-fw pi-ticket'
              }
            ]
          }
        ]
      },
      {
        label: 'MENU 2',
        icon: 'pi pi-fw pi-wave-pulse',
        path: '/submenu_2',
        children: [
          {
            label: 'MENU 2 Submenu 1',
            icon: 'pi pi-fw pi-wallet',
            path: '/submenu_2_1',
            children: [
              {
                label: 'Submenu 2.1.1',
                icon: 'pi pi-fw pi-users'
              },
              {
                label: 'Submenu 2.1.2',
                icon: 'pi pi-fw pi-truck'
              }
            ]
          },
          {
            label: 'MENU 2 Submenu 2',
            icon: 'pi pi-fw pi-trophy',
            path: '/submenu_2_2',
            children: [
              {
                label: 'Submenu 2.2.1',
                icon: 'pi pi-fw pi-tablet'
              }
            ]
          }
        ]
      }
    ]
  }
])
</script>

<style lang="scss" scoped></style>

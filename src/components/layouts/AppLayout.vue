<template>
  <div class="app-layout app-wrapper layout-wrapper" :class="containerClass">
    <!-- AppHeader -->
    <AppHeader role="banner" />

    <!-- AppSidebar -->
    <!-- <AppSidebar role="menu" /> -->
    <AwesomeSideBar :menu="testMenu" v-model:collapsed="layoutState.staticMenuInactive" vueRouterEnabel keepOneMenuOpenAtAtime paddingTop="56px" :BottomMiniMenuBtn="!1" />

    <!-- AppMain -->
    <main class="app-main content-wrapper layout-main-container min-h-full" role="main">
      <RouterView class="layout-main" />
    </main>
    <!-- AppMain -->
  </div>
</template>

<script setup>
import { useLayout } from '@/services/composables/layout'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
// const name = 'AppLayout'
const { layoutConfig, layoutState } = useLayout()

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.mobileMenuActive,
    'layout-static-inactive': layoutState.staticMenuInactive
  }
})
const testMenu = [
  {
    name: 'Getting Started',
    icon: { text: 'home', class: 'material-icons-outlined' },
    children: [
      {
        name: 'level 1.1',
        href: '/a',
        icon: { text: 'home', class: 'material-icons-outlined' },
        children: [
          {
            href: '/b',
            name: 'level 1.1.1'
          }
        ]
      },
      {
        name: 'level 1.2'
      }
    ]
  },
  {
    header: 'Settings'
  },
  {
    name: 'Dashboard',
    icon: { class: 'material-icons-outlined', text: 'dashboard' },
    children: [
      {
        href: '/c',
        name: 'level 2.1'
      }
    ]
  },
  {
    name: 'close menu',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  }
]
</script>

<style lang="scss" scoped></style>

<template>
  <div class="app-layout app-wrapper layout-wrapper" :class="containerClass">
    <!-- AppHeader -->
    <AppHeader role="banner" />

    <!-- AppSidebar -->
    <AppSidebar role="menu" />

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
</script>

<style lang="scss" scoped></style>

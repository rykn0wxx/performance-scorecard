<template>
  <aside class="app-sidebar main-sidebar layout-sidebar shadow-sidenav" role="menu">
    <AppMenu role="navigation" />
  </aside>
</template>

<script setup>
import { useLayout } from '@/services/composables/layout'
import AppMenu from './AppMenu.vue'
// const name = 'AppSidebar'
const route = useRoute()
const { layoutState, isDesktop } = useLayout()

watch(
  () => route.path,
  newPath => {
    if (isDesktop()) layoutState.activePath = null
    else layoutState.activePath = newPath

    layoutState.overlayMenuActive = false
    layoutState.mobileMenuActive = false
    layoutState.menuHoverActive = false
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>

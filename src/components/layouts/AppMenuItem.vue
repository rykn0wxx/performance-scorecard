<template>
  <li class="menu-item" :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActive, 'child-active': hasActiveItem }">
    <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">
      {{ item.label || item.name }}
    </div>
    <a v-if="(!item.to || item.children) && item.visible !== false" :href="item.url" @click="itemClick($event, item)" class="a-btn" :class="item.class" :target="item.target" tabindex="0" @mouseenter="onMouseEnter">
      <i :class="item.icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text">{{ item.label || item.name }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.children" />
    </a>
    <router-link v-if="item.to && !item.children && item.visible !== false" @click="itemClick($event, item)" class="router-btn" exactActiveClass="active-route" :class="item.class" tabindex="0" :to="item.to" @mouseenter="onMouseEnter">
      <i :class="item.icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text">{{ item.label || item.name }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.children" />
    </router-link>
    <Transition v-if="item.children && item.visible !== false" name="layout-submenu">
      <ul v-show="root ? true : isActive" class="layout-submenu">
        <AppMenuItem v-for="child in item.children" :key="child.label + '_' + (child.to || child.path)" :item="child" :root="false" :parentPath="fullPath" />
      </ul>
    </Transition>
  </li>
</template>

<script setup>
import { useLayout } from '@/services/composables/layout'
// const name = 'AppMenuItem'
const route = useRoute()
const { layoutState, isDesktop } = useLayout()
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  },
  parentPath: {
    type: String,
    default: null
  }
})

const fullPath = computed(() => (props.item.path ? (props.parentPath ? props.parentPath + props.item.path : props.item.path) : null))

const isActive = computed(() => {
  // return props.item.pathRef ? layoutState.activePath?.startsWith(fullPath.value) : layoutState.activePath === props.item.to
  return props.item.path ? layoutState.activePath?.startsWith(fullPath.value) : layoutState.activePath === props.item.to
})

const hasActiveItem = computed(() => props.item.children && !!props.item.children.find(itm => route.path.startsWith(itm.to)))

function itemClick(event, item) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item })
  }

  if (item.children) {
    if (isActive.value) {
      layoutState.activePath = layoutState.activePath.replace(item.path, '')
    } else {
      layoutState.activePath = fullPath.value
      layoutState.menuHoverActive = true
    }
  } else {
    layoutState.overlayMenuActive = false
    layoutState.mobileMenuActive = false
    layoutState.menuHoverActive = false
  }
}

function onMouseEnter() {
  if (isDesktop() && props.root && props.item.children && layoutState.menuHoverActive) {
    layoutState.activePath = fullPath.value
  }
}
</script>

<style lang="scss" scoped></style>

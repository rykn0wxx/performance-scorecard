const drawerConfig = reactive({
  menuMode: 'static',
  symbolID: Symbol('uuid'),
  emit: null,
  emitName: null
})

const drawerState = reactive({
  menu: null,
  activeMenuID: null
})

export function useDrawer() {
  const { menu, activeMenuID } = toRefs(drawerState)
}

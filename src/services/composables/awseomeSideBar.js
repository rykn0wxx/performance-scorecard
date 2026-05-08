export function useAwsomeSideBar(props, context) {
  const {
    menu,
    menuType,
    miniMenu: miniMenuProp,
    collapsed,
    animationDuration,
    width,
    widthMiniMenu,
    removeIconSpace,
    closeOnClickOutSide,
    overLayerOnOpen,
    childrenOpenAnimation,
    position,
    collapseBreakPoint,
    dark,
    vueRouterEnabel,
    keepChildrenOpen,
    checkButtonActive,
    ChildrenOpenActiveRoute,
    closeOpenMenuOnHrefPush,
    keepOneMenuOpenAtAtime,
    rtl
  } = toRefs(props)
  const isCollapsed = ref(collapsed.value)
  const menuMounted = ref(false)
  const MenuScroll = ref(false)
  const miniMenu = ref(miniMenuProp.value)
  const MenuHover = ref(false)
  const CurrantItemHover = ref(null)
  const CurranContainerHover = ref(null)
  const routerPushBlockList = ref('')

  const symbolId = Symbol('id')
  let id = 3

  function getRandomUid() {
    return id++
  }

  function addIdToMenuItems(arr) {
    let array = [...arr]
    function backTrack(array) {
      for (let i = 0; i < array.length; i++) {
        array[i][symbolId] = getRandomUid()
        if (array[i].children) {
          backTrack(array[i].children)
        }
      }
    }
    backTrack(array)
    return array
  }

  function pushToRouterPush(id) {
    routerPushBlockList.value = id
  }
  const getSlotByName = slotName => {
    return context.slots.hasOwnProperty(slotName) ? context.slots[slotName] : null
  }
  const updateIsCollapsed = val => {
    isCollapsed.value = val
  }
  const updateMenuScroll = () => {
    MenuScroll.value = !MenuScroll.value
  }
  const updateMenuHover = val => {
    MenuHover.value = val
  }
  const updateCurrantItemHover = id => {
    CurrantItemHover.value = id
  }
  const updateCurranContainerHover = id => {
    CurranContainerHover.value = id
  }
  const menuDirection = computed(() => {
    return rtl.value ? 'right' : 'left'
  })
  const emitOut = (event, item) => {
    context.emit(event, item)
  }
  const updateminiMenu = val => {
    miniMenu.value = val
  }
  let userAgentHeight = navigator.userAgent.indexOf('Firefox') != -1 ? '-moz-max-content' : 'fit-content'
  onMounted(() => {
    menuMounted.value = true
  })
  provide('sidebarProps', {
    menu,
    menuType,
    collapsed: isCollapsed,
    miniMenu,
    animationDuration,
    width,
    widthMiniMenu,
    removeIconSpace,
    closeOnClickOutSide,
    overLayerOnOpen,
    childrenOpenAnimation,
    position,
    collapseBreakPoint,
    vueRouterEnabel,
    checkButtonActive,
    ChildrenOpenActiveRoute,
    closeOpenMenuOnHrefPush,
    keepChildrenOpen,
    dark,
    rtl,
    keepOneMenuOpenAtAtime
  })
  provide('getSlotByName', getSlotByName)
  provide('routerPushBlockList', routerPushBlockList)
  provide('pushToRouterPush', pushToRouterPush)
  provide('symbolId', symbolId)
  provide('browserAgent', userAgentHeight)
  provide('menuMounted', menuMounted)
  provide('miniMenu', miniMenu)
  provide('MenuScroll', MenuScroll)
  provide('MenuHover', MenuHover)
  provide('getRandomUid', getRandomUid)
  provide('updateCurrantItemHover', updateCurrantItemHover)
  provide('updateCurranContainerHover', updateCurranContainerHover)
  provide('CurrantItemHover', CurrantItemHover)
  provide('CurranContainerHover', CurranContainerHover)
  provide('menuDirection', menuDirection)
  provide('updateIsCollapsed', updateIsCollapsed)
  provide('emitOut', emitOut)
  return {
    getIsCollapsed: isCollapsed,
    getIsminiMenu: miniMenu,
    updateIsCollapsed,
    getSlotByName,
    updateminiMenu,
    menuMounted,
    updateMenuScroll,
    updateMenuHover,
    menuDirection,
    addIdToMenuItems
  }
}

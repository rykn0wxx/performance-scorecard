export function useAwsomeRouter(props, context) {
  const { autoCollapse, collapsed, relative, width, widthCollapsed, rtl } = toRefs(props)
  const currentRoute = ref(window.location)

  function isSameUrl(url, location = currentRoute.value) {
    return location.href === location.origin + url || location.pathname + location.hash === url || location.pathname + location.search === url || location.href === url || location.hash === url
  }
  function extractChildrenRoutes(obj, keyToFind) {
    if (!obj) return
    return Object.entries(obj).reduce((acc, [key, value]) => (key === keyToFind ? acc.concat(value) : typeof value === 'object' ? acc.concat(extractChildrenRoutes(value, keyToFind)) : acc), [])
  }
  //  if(autoCollapse.value){
  //  }
  const updateCurrentRoute = val => {
    currentRoute.value = Object.assign({}, val)
  }
  provide('currentRoute', currentRoute)
  provide('updateCurrentRoute', updateCurrentRoute)
  provide('isSameUrl', isSameUrl)
  provide('extractChildrenRoutes', extractChildrenRoutes)
  return {
    isSameUrl,
    extractChildrenRoutes,
    currentRoute,
    updateCurrentRoute
  }
}

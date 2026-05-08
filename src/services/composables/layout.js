const layoutConfig = reactive({
  preset: 'Aura',
  primary: 'emerald',
  surface: null,
  darkTheme: false,
  menuMode: 'static'
})
const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,

  staticMenuInactive: false,
  sidebarExpanded: false,
  activePath: null
})

export function useLayout() {
  function executeDarkModeToggle() {
    layoutConfig.darkTheme = !layoutConfig.darkTheme
    document.documentElement.classList.toggle('app-dark')
  }

  function toggleDarkMode() {
    if (!document.startViewTransition) {
      executeDarkModeToggle()
      return
    }
    document.startViewTransition(() => executeDarkModeToggle())
  }

  const isDesktop = () => window.innerWidth > 991

  function toggleMenu() {
    setTimeout(() => {
      if (isDesktop()) {
        if (layoutConfig.menuMode === 'static') {
          layoutState.staticMenuInactive = !layoutState.staticMenuInactive
        }
        if (layoutConfig.menuMode === 'overlay') {
          layoutState.overlayMenuActive = !layoutState.overlayMenuActive
        }
      } else {
        layoutState.mobileMenuActive = !layoutState.mobileMenuActive
      }
    }, 100)
  }

  function toggleConfigSidebar() {
    layoutState.mobileMenuActive = false
  }

  function changeMenuMode(event) {
    layoutConfig.menuMode = event.value
    layoutState.staticMenuInactive = false
    layoutState.mobileMenuActive = false
    layoutState.sidebarExpanded = false
    layoutState.menuHoverActive = false
    layoutState.anchored = false
  }

  function setActiveMenuItem(item) {
    layoutState.activeMenuItem = item.value || item
  }

  const isDarkTheme = computed(() => layoutConfig.darkTheme)
  const hasOpenOverlay = computed(() => layoutState.overlayMenuActive)

  const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive)
  const getPrimary = computed(() => layoutConfig.primary)
  const getSurface = computed(() => layoutConfig.surface)

  return {
    layoutConfig,
    layoutState,
    toggleMenu,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
    toggleConfigSidebar,
    changeMenuMode,
    isDesktop,
    hasOpenOverlay
  }
}

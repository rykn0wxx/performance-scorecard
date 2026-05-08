/**
 * Vue Sidebar
 * @library
 */
// Lib imports
import AwesomeSideBar from './components/Menu.vue'

const awesomeSideBarPlugin = {
  install: app => {
    app.component('AwesomeSideBar', AwesomeSideBar)
  }
}

export default function (app) {
  app.use(awesomeSideBarPlugin)
}

export { AwesomeSideBar }

/**
 * Vue
 * @Library
 */
// Lib Imports
import { createApp } from 'vue'

// Application plugins
import { registerPlugins } from '@/services/core/plugins'

// Application Directive
// import MdRipple from '@/components/ui/md-ripple/MdRipple.vue'

// Application imports
import App from './App.vue'
import './assets/main.css'
import './sass/app.scss'

// Application startup
const app = createApp(App)
// app.directive('winResize', WinResize)
registerPlugins(app)

// app.directive('mdRipple', MdRipple)
app.mount('#app')

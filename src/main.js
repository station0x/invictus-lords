import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'
import store from './store'
import VueNumber from 'vue-number-animation'
import Hotjar from 'vue-hotjar'
import VueCarousel from 'vue-carousel'
// tailwind
import './style.css'
import 'flowbite'

Vue.prototype.ethereum = window.ethereum

Vue.use (Hotjar, {
  id: '3169193',
  isProduction: true,
  snippetVersion: 6
})
Vue.use(VueCarousel)
Vue.use(VueNumber)
Vue.use(VueGtag, {
  config: { id: "G-8N6VLD41K5" },
  appName: 'Invictus Lords',
  pageTrackerScreenviewEnabled: true
}, router)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'
import Element from 'element-ui'
import './styles/element-variables.scss'
// import './plugins/element.js'

import '@/assets/fonts/iconfont.css'
// 导入全局样式
import '@/styles/index.scss'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

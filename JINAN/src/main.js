import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// import request from '@/utils/request'

import '@/icons' // icon
import '@/permission' // permission control
import api from './utils/request'

import {fetchPost,fetchGet} from '@/utils/request'
Vue.prototype.$api = api
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.rfetchPosteq = fetchPost
Vue.prototype.fetchGet = fetchGet

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

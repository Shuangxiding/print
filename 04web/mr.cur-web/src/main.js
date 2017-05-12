// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入核心组件
import Vue from 'vue'
import ElementUI from 'element-ui'
// 引入全局样式

// 引入功能组件
import router from '@/config/router'
import store from '@/store'
import BaiduMap from 'vue-baidu-map'
import App from './App'
// import * as filters from '@/util/filters'
import helper from '@/util/helper'
import * as directives from '@/util/directive'
import * as filters from '@/util/filters'
Vue.config.productionTip = false

// 安装组件
Vue.use(ElementUI)
Vue.use(helper)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'lHaYCXlRADlhW0fnv8tpIhCfqD85pTSr'
})
// 安装自定义指令
if (directives) {
  for (let [key, fun] of Object.entries(directives)) {
    Vue.directive(key, fun)
  }
}

// 安装自定义过滤器
if (filters) {
  for (let [key, fun] of Object.entries(filters)) {
    Vue.filter(key, fun)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 判断是否开启数据模拟
if (process.env.MOCK) require('./mock/mock.js')

// let socket = new WebSocket('ws://192.168.1.62:9009/reminderMessage')
// console.log(socket)
// socket.onopen = function (...args) {
//   console.log(args)
// }
// let a = 0
// socket.onmessage = function (...args) {
//   console.log(args)
//   if (a === 0) {
//     a++
//     socket.send('JWNIFYHB1w8m8kulDc1jJWn-gZ6MJ9nTOgZGBpYy')
//   }
// }

if (process.env.BUILD_TIME) {
  console.log('版本发布时间' + new Date(process.env.BUILD_TIME))
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// JavaScript 的standard标准要求所有 import 要写在上边
import Vue from 'vue'
import App from './App'
// 默认向router 文件夹下找路由实例  './router' = './router/index,js'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共css
import './assets/css/style.css'
import MyAxios from './plugins/MyAxios'
// 引入moment
import moment from 'moment'
// 引入面包屑组件
import MyBreadcrumb from '@/components/myBreadcrumb'

Vue.config.productionTip = false
// 全局过滤器 格式化日期
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString)
})

// 注册全局组件
Vue.component(MyBreadcrumb.name, MyBreadcrumb)

// 注册MyAxios插件
Vue.use(MyAxios)

// 注册elementUI插件
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

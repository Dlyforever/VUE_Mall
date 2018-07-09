import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Login from '@/views/login'
import Home from '@/views/home'

Vue.use(Router)
// 设计路由
// 配置标识相对应的组件
export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})

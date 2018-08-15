import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Login from '@/views/login'
import Home from '@/views/home'
import Users from '@/views/users/users.vue'
import Roles from '@/views/roles/roles'
import Rights from '@/views/roles/rights'

Vue.use(Router)
// 设计路由
// 配置标识相对应的组件
export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // 子路由 将来子路由的切换是在home组件中完成的
      // 子路由使用之前 home组件已创建完成
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        }
        // {
        //   name: 'users',
        //   path: '/users',
        //   component: Users
        // },
        // {
        //   name: 'users',
        //   path: '/users',
        //   component: Users
        // },
      ]

    }
  ]
})

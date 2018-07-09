<template>
  <el-container class = 'container'>
    <el-header class = 'header'>
      <el-row>
        <el-col :span="2">
          <img src="/static/logo.png" alt="">
        </el-col>
        <el-col class = 'middle' :span="21">
          <h2>电商后台管理</h2>
        </el-col>
        <el-col :span="1">
          <a class = 'logout' @click.prevent = "handleLogout">
            退出
          </a>
        </el-col>
    </el-row>
    </el-header>
    <el-container class = 'container'>
      <el-aside class = 'aside' width="200px">
        <el-menu
        :router = "true"
        :unique-opened="true"
      class="menu">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/users">
            <i class="el-icon-location"></i>
            用户列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/roles">
            <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
          <el-menu-item index="/rights">
            <i class="el-icon-menu"></i>
            权限列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-menu"></i>
            分类参数
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-menu"></i>
            商品分类
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <i class="el-icon-menu"></i>
            订单列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <i class="el-icon-menu"></i>
            数据列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main class = 'main'>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 判断是否已登录 即 是否存在token
  beforeCreate () {
    const token = sessionStorage.getItem('token')
    // 如果不存在 跳转到登录页、
    if (!token) {
      this.$router.push({ name: 'login' })
      // 提示登录
      this.$message.warning('请先登录')
    }
  },
  methods: {
    // 处理退出
    handleLogout () {
      //  1 销毁token
      sessionStorage.clear()
      // 2  跳转到登录页
      this.$router.push({ name: 'login' })
      // 3 提示退出成功
      this.$message.success('退出成功')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .middle {
  line-height: 60px;
  color: #fff;
  text-align: center;
}
.header .logout {
  color: yellowgreen;
  line-height: 60px;
  text-align: center;
  text-decoration: none;
}
.aside {
  background-color: #d3dce6;
  height: 100%;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>

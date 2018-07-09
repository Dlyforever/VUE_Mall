<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索区域 -->
    <el-row class = "searchArea">
      <el-col :span = "24">
        <el-input class = "searchInput" clearable :placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button class = "addUser" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 用户列表数据
      list: [

      ]
    }
  },
  created () {
    // 发送请求获取数据
    this.loadData()
  },
  methods: {
    // 发送异步请求 获取数据
    async loadData () {
      // 发送请求之前获取token
      const token = sessionStorage.getItem('token')
      // 在请求投中设置token
      console.log(token)
      console.log(1)
      this.$http.defaults.headers.commom['Authorization'] = token
      const res = await this.$http.get('users?pagenum=1&pagesize=10')
      // 获取响应数据
      const data = res.data
      // meta中的status 和 msg
      const { meta: { status, msg } } = data
      if (status === 200) {
        const { data: { users } } = data
        this.list = users
      } else {
        this.$message.error(msg)
      }
    }

  }
}
</script>

<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchInput {
  width: 350px;
}
.addUser {
  vertical-align: bottom;
}
</style>

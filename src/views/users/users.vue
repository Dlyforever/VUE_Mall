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
        <el-input v-model = "searchValue" class = "searchInput" clearable placeholder="请输入内容">
          <el-button @click = "handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button class = "addUser" @click = "addUserDialogVisible = true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <!-- 组件内部自动循环渲染 -->
    <el-table
      v-loading="loading"
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
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建日期">
        <!-- scope.row 是当前绑定的数据对象 -->
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态" width = "100">
        <template slot-scope = "scope">
          <!-- scope.row就是当前绑定的数据对象 -->
          <el-switch
          @change = "handleSwitchChange(scope.row)"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope = "scope" width = "200">
          <el-button plain @click="handleShowEditDialog(scope.row)" size = "mini" type="primary" icon="el-icon-edit" ></el-button>
          <el-button plain @click = "handleDelete(scope.row.id)" size = "mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain @click ="handleShowSetRoleDialog(scope.row)" size = "mini" type="success" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" @closed = 'handleClosed' :visible.sync="addUserDialogVisible">
      <el-form :model="formData"
        ref = "myform"
        :rules = "formRules"
        label-width="100px">
        <el-form-item prop = "username" label="用户名" >
          <el-input  type="text" v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop = "password" label="密码" >
          <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop = "eamil" label="邮箱" >
          <el-input v-model="formData.eamil" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop = "mobile" label="电话" >
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" @closed ="handleClosed" :visible.sync="editUserDialogVisible">
      <el-form :model="formData"
        ref = "myform"
        :rules = "formRules"
        label-width="100px">
        <el-form-item  prop = "username" label="用户名" >
          <el-input disabled type="text" v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop = "password" label="密码" >
          <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop = "eamil" label="邮箱" >
          <el-input v-model="formData.eamil" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop = "mobile" label="电话" >
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click = "handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" @closed ="handleClosed" :visible.sync="setRoleDialogVisible">
      <el-form :model="formData"
        label-width="100px">
        <el-form-item  prop = "username" label="用户名" >
          {{ currentUserName }}
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model = "currentRoleId" >
            <el-option disabled label = "请选择" :value = '-1'>
            </el-option>
            <el-option
              v-for = 'item in roles'
              :key = 'item.id'
              :label = 'item.roleName'
              :value = 'item.id'>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button  type="primary"@click = "handleSetRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 用户列表数据
      list: [],
      loading: true,
      pagenum: 1,
      pagesize: 2,
      total: 0,
      searchValue: '',
      editUserDialogVisible: false,
      // 添加用户的对话框的显示隐藏
      addUserDialogVisible: false,
      // 分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      currentUserName: '',
      currentRoleId: -1,
      roles: [],
      currentUserId: -1,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 发送请求获取数据
    this.loadData()
  },
  methods: {
    // 分页事件
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
    },
    // 发送异步请求 获取数据
    async loadData () {
      // 在发送异步请求之前
      this.loading = true
      // 发送请求之前获取token
      const token = sessionStorage.getItem('token')
      // 在请求投中设置token
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`)
      // 异步请求结束
      this.loading = false
      // 获取响应数据
      const data = res.data
      // meta中的status 和 msg
      const { meta: { status, msg } } = data
      if (status === 200) {
        const { data: { users, total } } = data
        this.list = users
        this.total = total
      } else {
        this.$message.error(msg)
      }
    },
    // 搜索按钮
    handleSearch () {
      this.loadData()
    },
    // 开关状态发生改变
    async handleSwitchChange (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // 响应对象 res = { data, status }
      // 服务器返回的数据格式 res.data = { data: {}, meta: {} }
      const data = res.data
      const { meta: { status, msg } } = data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    async handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        const { meta: { status, msg } } = res.data
        if (status === 200) {
          // 删除成功 重新加载数据
          this.pagenum = 1
          this.loadData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message.error(msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleAdd () {
      // 验证表单
      this.$refs.myform.validate(async (valid) => {
        // 如果失败  return 不再往下执行  提示信息
        if (!valid) {
          return this.$message.error('请完整输入信息')
        }
        // 添加成功
        const res = await this.$http.post(`users`, this.formData)
        const data = res.data
        const { meta: { status, msg } } = data
        // 添加成功 返回状态码201
        if (status === 201) {
          // 添加成功 隐藏对话框
          this.addUserDialogVisible = false
          // 提示成功
          this.$message.success(msg)
          // 重新渲染
          this.loadData()
          // 清空表单
          for (let key in this.formData) {
            this.formData[key] = key
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 点击编辑按钮 弹出编辑对话框
    handleShowEditDialog (user) {
      // 显示对话框
      this.editUserDialogVisible = true
      // 文本框显示用户信息
      this.formData.username = user.username
      this.formData.email = user.email
      this.formData.password = user.password
      this.formData.mobile = user.mobile
    },
    async handleEdit () {
      const res = await this.$http.put(`users/${this.formData.id}`, {
        mobile: this.formData.mobile,
        email: this.formData.email
      })
      const { meta: { status, msg } } = res.data
      if (status === 200) {
        // 修改成功
        // 提示成功
        this.$message.success(msg)
        // 关闭对话框
        this.editUserDialogVisible = false
        // 重新渲染列表
        this.loadData()
        // // 清空文本框
        // for (let key in this.formData) {
        //   this.formData[key] = ''
        // }
      } else {
        this.$message.error(msg)
      }
    },
    handleClosed () {
      for (let key in this.formData) {
        this.formData[key] = ''
      }
    },
    // 点击分配权限的按钮 打开分配权限的对话框
    async handleShowSetRoleDialog (user) {
      // 记录当前用户的id
      this.currentUserId = user.id
      this.currentUserName = user.username
      // 显示对话框
      this.setRoleDialogVisible = true
      // 获取所有角色
      const res = await this.$http.get('roles')
      this.roles = res.data.data
      // 根据用户id查询用户对象角色id
      const res1 = await this.$http.get(`users/${user.id}`)
      this.currentRoleId = res1.data.data.rid
    },
    async handleSetRole () {
      const res = await this.$http.put(`users/${this.currentUserId}/role`,
      { 
        rid: this.currentRoleId
      })
      const data = res.data
      const { meta: { status, msg } } = data
      if (status ===200) {
        // 成功
        // 隐藏对话框
        this.setRoleDialogVisible = false
        // 提示
        this.$message.success(msg)
        // 重置数据
        this.currentUserName = ''
        this.currentUserId = -1
        this.currentRoleId = -1
      } else {
        // 失败
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

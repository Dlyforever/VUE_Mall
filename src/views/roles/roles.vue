<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1 = "角色管理" level2 = "角色列表"></my-breadcrumb>
    <el-row class = 'row-add'>
      <el-col :span = '24'>
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type = "index"
        width = "50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="编辑">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
  .row-add {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

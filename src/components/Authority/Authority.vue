<template>
  <el-card class="box-card" body-style="{padding:0}">
    <!-- 面包屑导航 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->

    <!-- 表格 -->
    <el-table :data="authForm" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="280"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="280"></el-table-column>
      <el-table-column prop="path" label="路径" width="280"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mixins from './Authority-mixins.js'
export default {
    mixins:[mixins]
};
</script>

<style>
.box-card {
  height: 100%;
  padding: 0 10px 0 10px;
  background-color: #eeeeee;
  overflow: auto;
}
.el-card__body {
  padding: 0;
}
.box-card .bread {
  height: 50px;
  background-color: rgb(133, 173, 226);
  padding-left: 10px;
  position: relative;
}
.bread .el-breadcrumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>

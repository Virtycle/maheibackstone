<template>
  <el-card class="box-card" body-style="{padding:0}">
    <!-- 面包屑导航 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <!-- 添加按钮 -->
    <el-row class="addbtn">
      <el-col :span="4" :offset="10">
        <el-button type="success" plain @click="AddRoleSwich = true">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="roleForm" border stripe style="width: 100%" v-loading="loading">
      <!-- 权限展开 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 一级权限 -->
          <el-row v-for="item in scope.row.children" :key="item.id" class="level1">
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="handleClose(scope.row,item.id)"
              >{{item.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 -->
              <el-row v-for="item1 in item.children" :key="item1.id" class="level2">
                <el-col :span="4">
                  <el-tag
                    closable
                    @close="handleClose(scope.row,item1.id)"
                    type="info"
                  >{{item1.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag
                    class="level3"
                    closable
                    @close="handleClose(scope.row,item2.id)"
                    type="warning"
                    v-for="item2 in item1.children"
                    :key="item2.id"
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">没有分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="280"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="280"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            plain
            @click="editOpen(scope.row)"
          ></el-button>
          <!-- 分配权限 -->
          <el-button
            type="info"
            icon="el-icon-setting"
            size="small"
            plain
            @click="roleSetting(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            plain
            @click="deleteRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="editDialogSwich" width="50%">
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedList"
        :props="defaultProps"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogSwich = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleRights">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import mixins from "./Role-mixins.js";
export default {
  mixins: [mixins]
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
.level3 {
  margin-left: 3px;
}
/* .level1 {
  margin-bottom: 40px;
}
.level2 {
  margin-bottom: 40px;
} */
</style>

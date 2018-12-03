<template>
  <el-card class="box-card" body-style="{padding:0}">
    <!-- 面包屑导航 -->
    <my-bread level1="用户管理" level2="用户列表"></my-bread>
    <!-- <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <!-- 搜索框 -->
    <el-row class="search-row">
      <el-col :span="16">
        <el-input placeholder="请输入内容" v-model="searchText" clearable class="input-with-select">
          <el-button slot="append" @click="keyWordSearch" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="4">
        <el-button type="success" plain @click="AddDialogSwich = true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="usersTableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{scope.row.create_time | formatDate('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="stateChange(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            plain
            @click="editDialogOpen(scope.row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-setting"
            size="small"
            plain
            @click="userRole(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            plain
            @click="deleteUser(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
    <!-- 用户角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialog">
      <el-form :model="roles" label-width="100px">
        <el-form-item label="用户名">{{roles.name}}</el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="roles.rid">
            <el-option label="请选" :value="-1" disabled></el-option>
            <el-option
              v-for="(item) in roles.arr"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="edituserrole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="AddDialogSwich" width="65%">
      <el-form
        :model="addUsrs"
        :rules="addrules"
        label-width="70px"
        label-position="right"
        ref="addform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUsrs.username" autocomplete="off" autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUsrs.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addUsrs.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addUsrs.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddDialogSwich = false">取 消</el-button>
        <el-button type="primary" @click="handleAdduser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogSwich" width="50%">
      <el-form :model="editUsrs" label-width="70px" label-position="right" ref="editform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUsrs.username" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUsrs.email" autocomplete="off" autofocus></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editUsrs.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogSwich = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import mixins from './users-mixins.js'
export default {
  mixins:[mixins]
};
</script>

 <style>
.box-card {
  height: 100%;
  padding: 0 10px 0 10px;
  background-color: #eeeeee;
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
.box-card .search-row {
  margin-top: 10px;
}
.pagination {
  margin-top: 10px;
}
</style>
 

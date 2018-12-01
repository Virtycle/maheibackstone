<template>
  <el-card class="box-card" body-style="{padding:0}">
    <!-- 面包屑导航 -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索框 -->
    <el-row class="search-row">
      <el-col :span="16">
        <el-input placeholder="请输入内容" v-model="searchText" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="4">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="usersTableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | formatDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="small" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>

export default {
  data() {
    return {
      searchText: "",
      usersTableData: []
    };
  },
  methods: {
    async getAllusers() {
      const {
        data: {
          data,
          meta: { status, msg }
        }
      } = await this.$http.get("/users?pagenum=1&pagesize=6");
      if (status === 200) {
        this.$message({
          type: "success",
          message: msg
        });
        console.log(data);
        this.usersTableData = data.users;
      } else {
        this.$message({
          type: "error",
          message: msg
        });
      }
    }
  },
  created() {
    this.getAllusers();
  }
};
</script>

 <style>
.box-card {
  height: 100%;
  padding: 0 10px 0 10px;
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
</style>
 

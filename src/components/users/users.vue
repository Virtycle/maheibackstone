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
        <el-form-item label="用户名">
          <el-input v-model="roles.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="roles.arr" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
export default {
  data() {
    return {
      // 用户角色
      roleDialog:false,
      roles : {
        id : '',
        name:'',
        arr:[]
      },
      // 添加用户
      AddDialogSwich: false,
      addUsrs: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑用户
      editDialogSwich: false,
      editUsrs: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      // 表单验证
      addrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      // 搜索数据
      searchText: "",
      // 表格数据
      usersTableData: [],
      // 分页数据
      currentPage: 1,
      totalPage: 0,
      pagesize: 5,
      pageSizes: [3, 5, 7, 10]
    };
  },
  created() {
    this.getAllusers();
  },

  methods: {
    userRole(user) {
      this.roleDialog = true
      this.roles.name =username

    },
    edituserrole () {
      this.roleDialog = false
    },
    // 删除用户
    async deleteUser(user) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const _this = this;
          const {
            data: {
              meta: { msg, status }
            }
          } = await this.$http.delete(`users/${user.id}`);
          if (status === 200) {
            this.$message({
              type: "success",
              message: msg
            });
            if (this.usersTableData.length === 1 && this.currentPage !== 1)
              this.currentPage--;
            window.setTimeout(_this.getAllusers, 1000);
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑用户
    editDialogOpen(user) {
      this.editDialogSwich = true;
      this.editUsrs.username = user.username;
      this.editUsrs.email = user.email;
      this.editUsrs.mobile = user.mobile;
      this.editUsrs.id = user.id;
    },
    async handleEdit() {
      const _this = this;
      const {
        data: {
          meta: { msg, status }
        }
      } = await this.$http.put(`users/${this.editUsrs.id}`, this.editUsrs);
      if (status === 200) {
        this.$message({
          type: "success",
          message: msg
        });
        this.editDialogSwich = false;
        window.setTimeout(_this.getAllusers, 1000);
      } else {
        this.$message.warning(msg);
      }
    },
    // 添加用户
    handleAdduser() {
      this.$refs.addform.validate(async valid => {
        if (!valid) {
          this.$message.warning("表单错误");
          return;
        }
        const _this = this;
        const {
          data: {
            meta: { msg, status }
          }
        } = await this.$http.post("users", this.addUsrs);
        if (status === 201) {
          this.$message({
            type: "success",
            message: msg
          });
          this.$refs.addform.resetFields();
          this.AddDialogSwich = false;
          window.setTimeout(_this.getAllusers, 1000);
        } else {
          this.$message({
            type: "error",
            message: msg
          });
        }
      });
    },
    async stateChange(val) {
      const {
        data: {
          meta: { msg, status }
        }
      } = await this.$http.put(`users/${val.id}/state/${val.mg_state}`);
      if (status === 200) {
        this.$message({
          type: "success",
          message: msg
        });
      } else {
        this.$message({
          type: "error",
          message: msg
        });
      }
    },
    keyWordSearch() {
      this.getAllusers();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getAllusers();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllusers();
    },

    async getAllusers() {
      const {
        data: {
          data: { pagenum, total, users },
          meta: { status, msg }
        }
      } = await this.$http.get(
        `/users?pagenum=${this.currentPage}&pagesize=${this.pagesize}&query=${
          this.searchText
        }`
      );
      if (status === 200) {
        this.$message({
          type: "success",
          message: msg
        });
        this.usersTableData = users;
        this.totalPage = total;
        this.currentPage = pagenum;
      } else {
        this.$message({
          type: "error",
          message: msg
        });
      }
    }
  }
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
 

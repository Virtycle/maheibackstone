export default {
    data() {
      return {
        // 用户角色
        roleDialog: false,
        roles: {
          // 当前被编辑的用户角色id
          rid: "",
          // 被编辑的用户名
          name: "",
          // 被编辑的用户角色名
          rname: "",
          // 角色库
          arr: [],
          // 被编辑的用户id
          id:''
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
      // 分配角色弹窗
      async userRole(user) {
        // console.log(user);
        this.roleDialog = true;
        this.roles.name = user.username;
        this.roles.id = user.id;
        this.roles.rname = user.role_name;
        const {data} = await this.$http.get('roles')
        this.roles.arr = data.data
        const res = await this.$http.get(`users/${user.id}`)
        // console.log(res)
        this.roles.rid = res.data.data.rid;
  
      },
      // 分配角色
      async edituserrole() {
        const {data:{meta:{status,msg}}} = await this.$http.put(`users/${this.roles.id}/role`,{rid:this.roles.rid})
        if (status === 200) {
          this.roleDialog = false;
          this.$message.success(msg)
          this.getAllusers()
        } else {
          this.$message.warning(msg)
        }
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
  }
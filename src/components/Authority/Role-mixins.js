export default {
    data() {
        return {
            AddRoleSwich : false,
            roleForm:[],
            loading : true,
            editDialogSwich:false,
            // 权限树形数据
            treeData : [],
            defaultProps :{
              label:'authName',
              children: 'children'
            },
            // 选中的树节点key
            checkedList: [],
            // 树形对话框储存的角色id
            curentRoleid:-1
        }
    },
    methods: {
        // 关闭tag标签的请求
        async handleClose(r,rightid) {
            const {data:{data,meta:{msg,status}}} = await this.$http.delete(`roles/${r.id}/rights/${rightid}`)
                // console.log(data)
            if (status === 200) {
              this.$message.success(msg)
              r.children = data
            } else {
              this.$message.warning(msg)
            }

        },
        editOpen() {

        },
        // 树形结构
        async roleSetting(role) {
          this.curentRoleid = role.id
          this.checkedList = []
          this.editDialogSwich =true
          const {data} = await this.$http.get('rights/tree')
          this.treeData = data.data 
          role.children.forEach((i1)=>{
            i1.children.forEach((i2)=>{
              i2.children.forEach((i3)=>{
                this.checkedList.push(i3.id)
              })
            })
          })
        },
        // 处理用户权限
        async submitRoleRights() {
          const arr1 = this.$refs.tree.getCheckedKeys()
          const arr2 = this.$refs.tree.getHalfCheckedKeys()
          const arrToUse = [...arr1,...arr2]
          // console.log(arrToUse.join(','))
          const {data:{data,meta:{msg,status}}} = await this.$http.post(`roles/${this.curentRoleid}/rights`,{
            rids:arrToUse.toString()
          })
          if (status === 200) {
            this.$message.success(msg)
            this.editDialogSwich = false
            this.getRoles()
          }
        },
        deleteRole () {

        },
        async getRoles () {
          const {data} = await this.$http.get('roles')
          this.roleForm = data.data
          // console.log(data);
          this.loading = false
          
        }
    },
    created() {
        this.getRoles()
    }
}
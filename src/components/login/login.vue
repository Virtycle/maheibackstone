<template>
  <div id="container">
    <div class="formWrap">
      <h3>用户登录</h3>
      <el-form label-position="top" label-width="80px" :model="loginData">
        <el-form-item label="用户名" class="label1">
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginData.password"  @keyup.enter.native="tologin"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn" @click="tologin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async tologin() {
      const {data:{data,meta:{status,msg}}} = await this.$http.post("/login", this.loginData)
      if (status === 200) {
        window.sessionStorage.setItem("token",data.token)
        this.$message({
          type:'success',
          message: msg
        })
        this.$router.push('/home')
      } else {
        this.$message({
          type:'error',
          message: msg
        })
      }
    }
  }
};
</script>
<style>
#container {
  width: 100%;
  height: 100%;
  background-color: #324152;
  overflow: hidden;
}
#container .formWrap {
  width: 550px;
  height: 350px;
  background-color: #ffffff;
  margin: 100px auto 0;
  border-radius: 10px;
  padding: 20px;
}
#container .formWrap .label1 {
  margin-top: 15px;
}
#container .formWrap .btn {
  margin-top: 15px;
  width: 100%;
}
</style>
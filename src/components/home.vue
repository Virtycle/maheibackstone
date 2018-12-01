<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header height="60px">
      <el-row>
        <el-col :span="4" class="img">
          <img src="../assets/logo.png">
        </el-col>
        <el-col :span="19" class="title">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="1">
          <a href="javascript:;" @click.prevent="handleLoginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="home-content">
      <!-- 侧边栏 -->
      <el-aside width="350px">
        <el-menu
          default-active="/users"
          class="el-menu-vertical-demo"
          unique-opened=true
          router=true
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="/users">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              商品分类
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    handleLoginout() {
      sessionStorage.clear()
      this.$router.push('/login')
    }

  }
};
</script>
<style>
.el-col {
  height: 60px;
  line-height: 60px;
}
.img {
  padding-top: 2px;
}
.el-header {
  background-color: #b3c0d1;
  padding: 0;
}
.el-header a {
  text-decoration: none;
  color: rgb(235, 135, 148);
  font-size: 16px;
}
.el-header h3 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
}
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
}
.el-menu {
  height: 100%;
}
</style>

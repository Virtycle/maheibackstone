<template>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:'my-bread',
    props:['level1','level2']
}
</script>

<style>
.bread {
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

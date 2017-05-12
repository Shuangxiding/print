<template>
  <div>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">模板类型</template>
        <el-menu-item index="1-1">模板一</el-menu-item>
        <el-menu-item index="1-2">模板二</el-menu-item>
        <el-menu-item index="1-3">模板三</el-menu-item>
      </el-submenu>
    </el-menu>
    <div>
      <notice></notice>
    </div>
  </div>
</template>
<script>
  import Notice from '@/views/customer-manage/Notice'
  export default {
    name: 'loaded-notice',
    components: {
      Notice
    }
  }

</script>

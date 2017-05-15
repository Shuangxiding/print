<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知单模板一" name="first">通知单模板一展示区</el-tab-pane>
      <el-tab-pane label="通知单模板二" name="second">通知单模板二展示区</el-tab-pane>
      <el-tab-pane label="通知单模板三" name="third">通知单模板三展示区</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    name: 'notice-temp',
    data() {
      return {
        activeName: 'second'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }

</script>

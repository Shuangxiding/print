<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知单模板一" name="first">
        <notice-temp-one></notice-temp-one>
      </el-tab-pane>
      <el-tab-pane label="通知单模板二" name="second">
        <notice-temp-two></notice-temp-two>
      </el-tab-pane>
      <el-tab-pane label="通知单模板三" name="third">
        <notice-temp-three></notice-temp-three>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import NoticeTempOne from '@/views/notice-manage/NoticeTempOne'
  import NoticeTempTwo from '@/views/notice-manage/NoticeTempTwo'
  import NoticeTempThree from '@/views/notice-manage/NoticeTempThree'
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
    },
    components: {
      NoticeTempOne,
      NoticeTempTwo,
      NoticeTempThree
    }
  }

</script>

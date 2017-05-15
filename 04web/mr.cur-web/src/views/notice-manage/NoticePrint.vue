<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知单模板一" name="first">
        <notice-temp-one id="notice-one" ref="notice"></notice-temp-one>
        <div class="btns">
          <el-button @click="m1PrintClick">打印</el-button>
          <el-button>打印数据</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知单模板二" name="second">
        <notice-temp-two></notice-temp-two>
        <div class="btns">
          <el-button @click="m2PrintClick">打印</el-button>
          <el-button>打印数据</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知单模板三" name="third">
        <notice-temp-three id="notice-three"></notice-temp-three>
        <div class="btns">
          <el-button>预览</el-button>
          <el-button @click="m3PrintClick">打印</el-button>
          <el-button>打印数据</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import NoticeTempOne from '@/views/notice-manage/NoticeTempOne'
  import NoticeTempTwo from '@/views/notice-manage/NoticeTempTwo'
  import NoticeTempThree from '@/views/notice-manage/NoticeTempThree'

  import printJS from 'print.js/src/index.js'

  export default {
    name: 'notice-print',
    data() {
      return {
        activeName: 'second',
        printThree: ''
      }
    },
    methods: {
      m1PrintClick() {
        this.$refs['notice'].changeStyle()
        printJS('notice-one', 'html')
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      m3PrintClick() {
        printJS('notice-three', 'html')
      },
      m2PrintClick() {}
    },
    components: {
      NoticeTempOne,
      NoticeTempTwo,
      NoticeTempThree
    }
  }

</script>
<style scoped>


</style>

<template>
<<<<<<< HEAD
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知单模板一" name="first">
        <notice-temp-one></notice-temp-one>
        <div class="btns">
          <el-button>预览</el-button>
          <el-button>打印</el-button>
          <el-button>打印数据</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知单模板二" name="second">
        <notice-temp-two></notice-temp-two>
        <div class="btns">
          <el-button>预览</el-button>
          <el-button>打印</el-button>
          <el-button>打印数据</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知单模板三" name="third">
        <notice-temp-three></notice-temp-three>
        <div class="btns">
          <el-button>预览</el-button>
          <el-button>打印</el-button>
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
=======
  <el-col>
    <el-col :span="5">
      <div class="header">请选择贷后催收通知单模板:</div>
    </el-col>
    <el-col class="tab-box">
      <el-tabs type="card">
        <el-tab-pane label="模板一" class="tab-pane" onclick="first">
        </el-tab-pane>
        <el-tab-pane label="模板二" class="tab-pane" onclick="second">
        </el-tab-pane>
        <el-tab-pane label="模板三" class="tab-pane" onclick="third">
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <div class="btns">
      <el-button>打印</el-button>
      <el-button>打印数据</el-button>
    </div>
  </el-col>
</template>
<script>
  import TemplateFirst from '@/views/notice-manage/TemplateFirst'
>>>>>>> 76a7122b2774b6938b91fedf1df0487e56cbf759
  export default {
    name: 'print',
    data() {
      return {
<<<<<<< HEAD
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
=======

      }
    },
    methods: {
      first() {
        console.log('first')
      }
    },
    components: {
      TemplateFirst
>>>>>>> 76a7122b2774b6938b91fedf1df0487e56cbf759
    }
  }

</script>
<<<<<<< HEAD
<style scoped>


</style>
=======
>>>>>>> 76a7122b2774b6938b91fedf1df0487e56cbf759

<template>
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
  export default {
    name: 'print',
    data() {
      return {

      }
    },
    methods: {
      first() {
        console.log('first')
      }
    },
    components: {
      TemplateFirst
    }
  }

</script>

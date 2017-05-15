<template>
  <el-col>
    <el-col>
      <div class="header">请选择贷后催收通知单模板:</div>
    </el-col>
    <el-col class="tab-box">
      <el-tabs>
        <el-tab-pane label="贷后催收通知单模板" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="125px">
              <el-form-item label="催收通知单模板名称:">
                <el-select v-model="templateClass" placeholder="请选择模板">
                  <el-option v-for="item in this.templateClass" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <div>预览区</div>
    <div class="btns">
      <el-button>预览</el-button>
      <el-button>打印</el-button>
      <el-button>打印数据</el-button>
    </div>
  </el-col>
</template>
<script>
  export default {
    name: 'notice-print',
    data() {
      return {
        templateClass: { 1: '一', 2: '二' }
      }
    }
  }

</script>
<style scoped>
  .header {
    margin: 30px 0 30px;
    font-size: 0.875rem;
    color: rgb(31, 45, 61);
    text-align: left;
  }

  .tab-box {
    text-align: left;
  }

</style>

<template>
  <el-col>
    <el-col>
      <div class="header">请选择贷后催收通知单模板:</div>
    </el-col>
    <el-col class="tab-box">
      <el-tabs type="card">
        <el-tab-pane label="贷后催收通知单模板" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="120px">
              <el-form-item label="催收通知单模板名称:">
                <el-select>
                  <el-option>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
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

      }
    }
  }

</script>

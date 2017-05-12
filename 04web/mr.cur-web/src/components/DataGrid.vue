<template>
  <div class="data-grid">
    <el-row type="flex" align="left" class="data-grid-title">
      <span class="iconfont" :class="[iconClass]"></span>
      <span>{{label}}</span>
    </el-row>
    <div class="grid-content row">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'data-grid',
    componentName: 'data-grid',
    props: {
      totalSpan: Number,
      iconClass: String,
      label: String,
      labelWidth: {
        type: Number,
        default: 100
      },
      labelAlign: {
        type: String,
        default: 'center'
      },
      contentAlign: {
        type: String,
        default: 'center'
      }
    },
    data() {
      return {}
    }
  }

</script>
<style lang="less" scoped>
  @import '../styles/variable.less';
  .grid-content {
    border-top: solid 1px @-border-color;
    border-left: solid 1px @-border-color
  }

</style>

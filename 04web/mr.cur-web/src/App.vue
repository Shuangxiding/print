<template>
  <div id="app">
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
    async beforeCreate() {
      // 执行启动逻辑
      await this.$store.dispatch('launch')
    }
  }

</script>

<style lang="less">
  @import '~normalize-css/normalize.css';
  @import 'styles/theme/index.css';
  @import 'styles/layout.css';
  @import 'styles/iconfont.css';
  @import 'styles/common.less';
  @import 'styles/default.less';

</style>

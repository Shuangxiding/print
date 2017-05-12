<template>
  <div class="nav-bar">
    <el-tabs type="card" :value="this.$route.name" @tab-click="handleClick">
      <el-tab-pane v-for="item in current_tabs" :label="item.title" :key="item.path" :name="item.name"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'nav-tab',
    data() {
      return {
        activeName: 'page1'
      }
    },
    computed: {
      ...mapState([
        'current_tabs'
      ])
    },
    methods: {
      ...mapActions([
        'updateTabs'
      ]),
      handleClick(tab) {
        this.$router.push(tab.name)
      }
    },
    /**
     * 初始化进行挂载监听
     * 用于更新tabs
     */
    mounted() {
      this.updateTabs()
      this.$router.afterEach((current, old) => {
        if (!this.current_tabs.some(c => c.name === current.name)) {
          this.updateTabs()
        }
      })
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .nav-bar {
    height: 50px;
  }

</style>

<template>
  <div class="page-home">
    <nav-header></nav-header>
    <el-row type="flex" class="page-container">
      <el-col v-bind:style="{flexBasis:nav_width+'px',minHeight:nav_height+'px'}" class="nav-container">
        <div class="menu-container" @click="navChange">
          <a class="iconfont icon-fenlei"></a>
        </div>
        <nav-bar></nav-bar>
      </el-col>
      <el-col class="view-container col-span">
        <nav-tab></nav-tab>
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import NavHeader from '@/components/NavHeader'
  import NavBar from '@/components/NavBar'
  import NavTab from '@/components/NavTab'
  // 导航栏状态
  const navState = {
    'mini': 55,
    'normal': 224
  }

  export default {
    name: 'home',
    data() {
      return {
        cachePage: /.*/,
        screenHeight: 0,
        timer: 0
      }
    },
    computed: {
      ...mapState([
        'current_tabs',
        'nav_state'
      ]),
      nav_width() {
        return navState[this.nav_state]
      },
      nav_height() {
        return this.screenHeight - 65
      }
    },
    methods: {
      ...mapMutations([
        'navChange' // 映射 this.increment() 为 this.$store.commit('increment')
      ]),
      /**
       * 更新页面缓存列表
       */
      updateCachePage() {
        let pages
        if (this.current_tabs.length > 0) {
          pages = this.current_tabs.map(c => c.name).join(',')
        } else {
          pages = /.*/
        }
        this.cachePage = pages
      },
      calcScreenHeight() {
        this.screenHeight = window.innerHeight
        // if (!this.timer) {
        //   this.timer = setTimeout(function() {
        //     this.screenHeight = window.innerHeight
        //     clearTimeout(this.timer)
        //   }, 400)
        // } else {
        //   clearTimeout(this.timer)
        // }
      }
    },
    components: {
      NavHeader,
      NavBar,
      NavTab
    },
    mounted() {
      this.$router.afterEach((current, last) => {
        if (typeof this.cachePage !== 'string') {
          this.updateCachePage()
          return
        }

        if (!this.cachePage.split(',').includes(current.name)) {
          this.updateCachePage()
        }
      })
      this.$nextTick(this.calcScreenHeight)
      this.screenHeight = window.innerHeight
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../styles/variable.less';
  .page-home {
    height: 100%;
  }
  
  .nav-container {
    background: @-nav-background-color;
  }
  
  .view-container {
    padding: 8px;
  }
  
  .view-container {
    height: 100%;
  }
  
  .menu-container {
    text-align: right;
    height: 50px;
    line-height: 50px;
    color: @-nav-font-focus-color;
    background: @-nav-background-color;
    padding: 0 20px;
  }
  
  .nav-header {
    height: 65px;
  }
  
  .icon-fenlei {
    font-size: 1.5rem;
  }

</style>

<template>
  <el-menu theme="dark" :default-active="$route.path" unique-opened router class="nav-bar fill">
    <template v-for="(item,index) in userMenu" v-if="item.role&&!item.hidden">
      <div @click="handleClickMenu(item)">
        <el-submenu :index="index+''" class="nopadding-menu" :class="{onlyIcon:!navExpand}">
          <template slot="title">
            <el-row class="menu-item">
              <el-col class="menu-item-icon iconfont menu-icon" :span="iconSpan" :class="item.iconCls">
              </el-col>
              <el-col class="menu-item-title" v-show="navExpand" :span="18">{{item.title}}</el-col>
            </el-row>
          </template>
          <el-menu-item v-show="navExpand" v-for="child in item.children" :key="child.name" :index="child.path" v-if="child.role&&!child.hidden">
            <el-row class="sub-menu-item">
              <el-col class="sub-menu-item-icon iconfont icon-xiangyou" :span="iconSpan">
              </el-col>
              <el-col class="sub-menu-item-title" :span="18">{{child.title}}</el-col>
            </el-row>
          </el-menu-item>
        </el-submenu>
      </div>
    </template>
  </el-menu>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'nav-bar',
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'current_tabs'
      ]),
      ...mapGetters([
        'navExpand'
      ]),
      userMenu() {
        return this.$store.state.user_menu
      },
      iconSpan() {
        return this.navExpand ? 6 : 24
      }
    },
    methods: {
      handleClickMenu(item) {
        // 不符合条件不进行跳转
        if (!item || !item.children || item.children.length < 1 || this.navExpand) {
          return
        }
        // 在当前模块不进行跳转
        if (item.children.some(c => c.name === this.$router.currentRoute.name)) {
          return
        }

        this.$router.push(item.children.filter(x => !x.hidden && x.role).find(x => x.name).name)
      }
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../styles/variable.less';
  .nav-bar {
    background-color: @-nav-background-color;
    height: 100%;
    border-top: solid 1px @-nav-border-color;
    .top-menu {
      padding: 0;
    }
  }
  
  .menu-icon {
    font-size: 1.5rem;
  }
  
  .menu-item,
  .sub-menu-item {
    border-bottom: solid 1px @-nav-border-color;
  }
  
  .sub-menu-item-title,
  .menu-item-title {
    text-align: left;
    padding: 0 20px;
    border-left: solid 1px @-nav-border-color;
  }

</style>

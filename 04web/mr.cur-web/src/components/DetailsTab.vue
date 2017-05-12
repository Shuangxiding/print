<template>
  <div class="details-tab">
    <el-row class="btns">
      <el-col v-for="v,i in tabsArr" :key="i" class="btn" :class="{'active':(currentIndex===i)}">
        <div class="son" @click="btnClick(i)">
          {{v.title}}
        </div>
        <div class="triangle"></div>
      </el-col>
    </el-row>
    <el-row class="pane-box">
      <!--pane区域-START-->
      <div v-for="v,i in tabsArr" v-show="isShow(i)">
        <slot class="pane" :name="v.pane"> </slot>
      </div>
      <!--pane区域-END-->
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'DetailsTab',
    componentName: 'DetailsTab',
    props: {
      tabsArr: Array // 选项卡数组[{title: ''，pane: ''}]
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      isShow(index) {
        return index === this.currentIndex
      },
      btnClick(i) {
        console.log(i)
        this.currentIndex = i
      },
      refresh() {
        this.$reset()
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btns {
    height: 60px;
  }
  
  .btn {
    margin-right: 20px;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    margin-top: 10px;
    position: relative;
  }
  
  .btn .triangle {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    border: 10px solid #000;
    border-color: #0092DD transparent transparent transparent;
    ;
    margin: 0 auto;
    bottom: -20px;
    height: 0;
    width: 0;
  }
  
  .btn.active .triangle {
    display: block;
  }
  
  .son {
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
  }
  
  .btn.active {
    background: #0092DD;
    color: #ffffff;
  }
  
  .pane-box {
    position: relative;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }

</style>

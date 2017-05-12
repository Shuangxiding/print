<template>
  <div class="page">
    <el-form>
      <el-form-item label="话术模版类型">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="话术模版名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="话术内容">
        <el-input></el-input>
      </el-form-item>
    </el-form>

    <!--操作按钮-->
    <div class="row center-span" style="padding:10px 0;">
      <el-button @click="submitClick">确定</el-button>
      <el-button @click="cancelClick">取消</el-button>
    </div>
  </div>
</template>
<script>
  //   import server from '@/config/servers'
  //   import net from '@/util/net'

  export default {
    name: 'speech-info',
    data() {
      return {

      }
    },
    computed: {
      //   ...mapState({
      //     caseInfo: state => state.accManage.case_info,
      //     caseNum: state => state.accManage.case_num
      //   })
    },
    methods: {
      /*
       * 取消按钮点击处理
       */
      cancelClick() {
        this.$emit('close')
      }
    },
    components: {},
    mounted() {

    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>

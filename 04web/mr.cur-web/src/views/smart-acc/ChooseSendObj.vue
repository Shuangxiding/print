<template>
  <el-col class="choose-send">
    <el-form ref="form" label-width="100px">
      <div class="header">请选择需要发送的对象:</div>
      <el-form-item label="本人:">
        <el-checkbox-group v-model="custCheck">
          <el-checkbox :label="1">手机号(主)</el-checkbox>
          <el-checkbox :label="0">手机号(次)</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系人列表:">
        <el-checkbox-group v-model="checkList">
          <el-checkbox :label="146" style="font-size:12px">配偶</el-checkbox>
          <el-checkbox :label="147">父母</el-checkbox>
          <el-checkbox :label="148">子女</el-checkbox>
          <el-checkbox :label="153">亲兄弟姐妹</el-checkbox>
          <el-checkbox :label="149">亲属</el-checkbox>
          <el-checkbox :label="151">朋友</el-checkbox>
          <el-checkbox :label="150">同事</el-checkbox>
          <el-checkbox :label="152">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-col class="btns">
      <el-button @click="nextStep">下一步</el-button>
    </el-col>
  </el-col>
</template>
<script>
  export default {
    name: 'choose-send-obj',
    data() {
      return {
        checkList: [],
        custCheck: []
      }
    },
    methods: {
      /**
       * 刷新
       */
      refresh() {
        this.checkList = []
        this.custCheck = []
      },
      /**
       * 短信群发下一步
       */
      nextStep() {
        if ((this.checkList.length === 0) && (this.custCheck.length === 0)) {
          this.$alert('请选择发送对象', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        this.$emit('nextStep', this.checkList, this.custCheck)
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    margin: 30px 0 30px;
    color: rgb(31, 45, 61);
    text-align: left;
  }
  
  .btns {
    margin-bottom: 30px;
    margin-top: 20px;
  }

</style>

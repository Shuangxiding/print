<template>
  <div class="page">
    <el-form ref="form" :model="form">
      <el-form-item label="固定话机ID" label-width="90px" prop="callerId" :rules="[
            { required: true, message: '请输入正确的固定话机ID', trigger: 'blur', pattern: /^[0-9-()（）]{7,18}$/ }
          ]" required>
        <el-col :span="12">
          <el-input v-model="form.callerId"></el-input>
        </el-col>
        <span>(拨#00查询)</span>
      </el-form-item>
      <el-form-item label="主叫号码" prop="callerNum" :rules="[
            {message:'请输入正确的主叫号码',trigger: 'blur', pattern: /^[0-9-()（）]{7,18}$/ }
          ]" label-width="90px">
        <el-col :span="12">
          <el-input v-model="form.callerNum"></el-input>
        </el-col>
      </el-form-item>
    </el-form>

    <!--操作按钮-->
    <div class="row center-span" style="padding:10px 0;">
      <el-button @click="submitClick">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'bind-phone',
    data() {
      return {
        form: {
          callerId: '', // 固定话机ID
          callerNum: '' // 主叫号码
        },
        show: true
      }
    },
    computed: {
      ...mapState({
        realName: state => state.user.realName,
        caller: state => state.accManage.caller_id
      })
    },
    methods: {
      // 添加Mutations
      ...mapMutations([
        'updateCallerId'
      ]),
      /**
       * 确定绑定
       */
      submitClick() {
        this.$refs['form'].validate((valid) => {
          if (!valid) { return }
          net.send({
            server: server.AccManage.bind_phone,
            data: {
              callerId: this.form.callerId,
              caller: this.form.callerNum
            }
          }).then(
            ({ taskData }) => {
              this.$message('绑定成功')
              this.$store.commit('updateCallerInfo', {
                taskId: taskData.taskId,
                caller: taskData.caller
              })
              this.close()
            },
            err => {
              this.$message({
                type: 'info',
                message: err.reason
              })
            }
          )
        })
      },
      /**
       * 取消绑定
       */
      close() {
        this.$emit('close')
      },
      /**
       * 绑定主叫号码显示
       */
      bindPhone() {
        this.form.callerId = this.$store.state.accManage.caller_info.taskId
        this.form.callerNum = this.$store.state.accManage.caller_info.caller
      }
    },
    components: {},
    mounted() {}
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>

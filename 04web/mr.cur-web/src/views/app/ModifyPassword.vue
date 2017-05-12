<template>
  <div class="page">
    <el-form :model="params" :rules="rules" ref="form-data" label-width="120px" class="text-left">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="params.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="params.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input type="password" v-model="params.confirmPassword" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submitForm()">确定</el-button>
    <el-button @click="cancleClick">取消</el-button>
  </div>
</template>

<script>
  import servers from '@/config/servers'
  import net from '@/util/net'

  export default {
    data() {
      /**
       * 验证密码
       */
      let validatePassword = (rule, value, callback) => {
        let pwd = this.params.newPassword
        let repwd = this.params.confirmPassword

        if (pwd !== '' && repwd !== '' && pwd !== repwd) {
          callback(new Error('请确认两次输入密码是否一致'))
        } else {
          callback()
        }
      }

      return {
        // 服务接口列表
        server: {
          modifypassword: servers.app.modify_password,
          resetpassword: servers.app.reset_password
        },
        // 定义请求参数
        params: {
          oldPassword: '',
          confirmPassword: '',
          newPassword: ''
        },
        // 数据校验规则
        rules: {
          oldPassword: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { min: 6, max: 64, message: '密码长度不能小于6位大于64位', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' },
            { min: 6, max: 64, message: '密码长度不能小于6位大于64位', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' },
            { min: 6, max: 64, message: '密码长度不能小于6位大于64位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /**
       * 修改密码确认
       */
      submitForm() {
        this.$refs['form-data'].validate(valid => {
          if (!valid) {
            return
          }
          net.send({
            server: this.server.modifypassword,
            data: {
              oldPassword: this.params.oldPassword,
              newPassword: this.params.newPassword
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '修改密码成功'
            })
            this.$refs['form-data'].resetFields()
            this.$emit('close')
          }, err => {
            this.$message({
              type: 'error',
              message: err.reason
            })
          })
        })
      },
      /**
       * 取消
       */
      cancleClick() {
        this.$refs['form-data'].resetFields()
        this.$emit('close')
      }
    }
  }

</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>


</style>

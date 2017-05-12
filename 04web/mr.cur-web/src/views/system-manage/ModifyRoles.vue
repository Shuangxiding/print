<template>
  <!--修改角色-->
  <div class="page">
    <el-form :rules="rules" class="demo-ruleForm" :model="modifyParams" ref="modify-form" label-width="90px">
      <el-form-item label="角色名称" prop="name" align="left">
        <el-input v-model="modifyParams.name" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="状态" align="left" prop="status">
        <el-col :span="18">
          <el-select v-model="modifyParams.status">
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-col :span="18">
          <el-input type="textarea" v-model="modifyParams.remark" :rows="3" :maxlength="100"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button @click="modifyCommit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import servers from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters } from 'vuex'

  export default {
    name: 'modify-roles',
    data() {
      return {
        servers: {
          modify: servers.SystemManage.modify_role
        },
        // 加载动画
        loading: {
          state: false
        },
        // 修改角色参数
        modifyParams: {
          roleId: '',
          name: '',
          status: '',
          remark: ''
        },
        /**
         * 修改角色校验规则
         */
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      /**
       * 修改角色确定
       */
      modifyCommit() {
        this.$refs['modify-form'].validate((valid) => {
          if (!valid) return false
          this.modifyParams.creator = this.userInfo.realName
          net.send({
            server: this.servers.modify,
            data: this.modifyParams
          }).then((data) => {
            // 修改成功
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            //   关闭修改角色dialog
            this.$emit('close')
            this.$emit('refresh')
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 取消
       */
      cancel() {
        //   关闭修改角色dialog
        this.$emit('close')
        // 重置form表单
        this.$refs['modify-form'].resetFields()
      },
      /**
       * 获取修改行数据
       */
      refresh(modifyData) {
        this.modifyParams.roleId = modifyData.roleId
        this.modifyParams.name = modifyData.name
        this.modifyParams.status = modifyData.status.toString()
        this.modifyParams.remark = modifyData.remark
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../styles/variable.less';
  .data-grid {
    margin-bottom: 10px;
  }
  
  .header {
    border: solid 1px @-border-color;
    border-bottom: 0px;
    height: 40px;
    line-height: 40px
  }

</style>

<template>
  <!--新增角色-->
  <div class="page">
    <el-form :rules="rules" :model="addParams" ref="addform" label-width="90px" class="demo-ruleForm" v-loading="loading.state">
      <el-form-item label="角色名称" prop="name" align="left">
        <el-input v-model="addParams.name" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="状态" align="left" prop="status">
        <el-select v-model="addParams.status">
          <el-option label="启用" value="0"></el-option>
          <el-option label="停用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-col :span="18">
          <el-input type="textarea" v-model="addParams.remark" :rows="3" :maxlength="100"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button @click="addCommit">确定</el-button>
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
    name: 'add-roles',
    data() {
      return {
        servers: {
          add: servers.SystemManage.add_role
        },
        // 加载动画
        loading: {
          state: false
        },
        // 角色增加参数
        addParams: {
          name: '',
          status: '0',
          remark: '',
          roleId: ''
        },
        /**
         * 新增角色校验规则
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
       * 新增角色确认
       */
      addCommit() {
        this.$refs['addform'].validate((valid) => {
          if (!valid) return false
          this.addParams.creator = this.userInfo.realName
          // 提交保存
          net.send({
            server: this.servers.add,
            data: this.addParams,
            loading: this.loading
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
            //   关闭新增角色dialog
            this.$emit('close')
            // 刷新databox
            this.$emit('refresh')
            // 重置form表单
            this.$refs['addform'].resetFields()
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
        //   关闭新增角色dialog
        this.$emit('close')
        // 重置form表单
        this.$refs['addform'].resetFields()
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

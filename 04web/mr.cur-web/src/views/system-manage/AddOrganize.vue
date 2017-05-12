<template>
  <!--添加机构-->
  <div class="page">
    <el-form :rules="addOrganizeRules" :model="addOrgForm" ref="addOrgForm" label-width="130px" v-loading="loading.state">
      <el-form-item label="机构名称" prop="name">
        <el-col :span="18" class="text-left">
          <el-input v-model="addOrgForm.name" size="small"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="状态 " prop="status">
        <el-col :span="10">
          <el-select v-model="addOrgForm.status" size="small">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="18">
          <el-input type="textarea" v-model="addOrgForm.remark" :autosize="{ minRows:2, maxRows:4}" :maxlength="200"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item scope="scope" label-width="0px">
        <el-button @click="addOrganizeCommit">确定</el-button>
        <el-button @click="addOrganizeCanale">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters } from 'vuex'

  export default {
    name: 'add-organize',
    data() {
      return {
        servers: {
          addDepartment: server.SystemManage.post_add_department
        },
        // 加载动画
        loading: {
          state: false
        },
        addOrgForm: {
          name: '',
          pid: '',
          remark: '',
          status: 0,
          creator: ''
        },
        orgNameList: [],
        /**
         * 添加机构信息校验规则
         */
        addOrganizeRules: {
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ]
        }
      }
    },
    props: ['deptId'],
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      /**
       * 添加机构确认
       */
      addOrganizeCommit() {
        console.log(this.deptId)
        this.$refs['addOrgForm'].validate((valid) => {
          if (valid) {
            this.addOrgForm.pid = this.deptId
            this.addOrgForm.creator = this.userInfo.realName
            net.send({
              server: this.servers.addDepartment,
              data: this.addOrgForm,
              loading: this.loading
            }).then((data) => {
              this.$message({
                type: 'success',
                message: '添加机构成功'
              })
              //   关闭dialog
              this.$emit('close')
              //   重置form表单
              this.$refs['addOrgForm'].resetFields()
              //   刷新机构数
              this.$emit('refresh')
            }, err => {
              this.$message({
                type: 'info',
                message: err.reason
              })
            })
          } else {
            return false
          }
        })
      },
      /**
       * 添加机构取消
       */
      addOrganizeCanale() {
        //   重置form表单
        this.$refs['addOrgForm'].resetFields()
        //   关闭dialog
        this.$emit('close')
      }
    },
    components: {

    },
    mounted() {}
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

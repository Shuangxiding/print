<template>
  <!--修改机构-->
  <div class="page">
    <el-form :rules="editOrganizeRules" :model="editOrgForm" ref="editOrgForm" label-width="130px">
      <el-form-item label="机构名称" prop="name" class="text-left">
        <el-col :span="18">
          <el-input v-model="editOrgForm.name" size="small"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="状态 " prop="status">
        <el-col :span="10">
          <el-select v-model="editOrgForm.status" size="small">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="18">
          <el-input type="textarea" v-model="editOrgForm.remark" :autosize="{ minRows:2, maxRows:4}" :maxlength="200"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item scope="scope" label-width="0px">
        <el-button @click="editOrganizeCommit">确定</el-button>
        <el-button @click="editOrganizeCanale">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters } from 'vuex'

  export default {
    name: 'modify-organize',
    data() {
      return {
        servers: {
          updateDepartment: server.SystemManage.post_update_department
        },
        // 加载动画
        loading: {
          state: false
        },
        // 修改机构参数
        editOrgForm: {
          name: '',
          status: '',
          remark: ''
        },
        orgNameList: [],
        /**
         * 添加机构信息校验规则
         */
        editOrganizeRules: {
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ]
        }
      }
    },
    props: [
      'deptId',
      'pid',
      'deptCode'
    ],
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      /**
       * 获取要修改的当前行数据
       */
      refresh(editdata) {
        this.editOrgForm.type = editdata.type
        this.editOrgForm.name = editdata.name
        this.editOrgForm.status = editdata.status
        this.editOrgForm.remark = editdata.remark
      },
      /**
       * 修改机构确认
       */
      editOrganizeCommit() {
        console.log(this.deptCode)
        console.log(this.userInfo.realName)
        this.$refs['editOrgForm'].validate((valid) => {
          if (valid) {
            this.editOrgForm.deptId = this.deptId
            this.editOrgForm.creator = this.userInfo.realName
            this.editOrgForm.pid = this.pid
            this.editOrgForm.deptCode = this.deptCode
            net.send({
              server: this.servers.updateDepartment,
              data: this.editOrgForm
            }).then((data) => {
              this.$message({
                type: 'success',
                message: '修改机构成功'
              })
              // 刷新机构数
              this.$emit('refresh')
              //   关闭dialog
              this.$emit('close')
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
       * 修改机构取消
       */
      editOrganizeCanale() {
        //   重置form表单
        this.$refs['editOrgForm'].resetFields()
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

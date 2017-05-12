<template>
  <!--修改用户-->
  <div class="page">
    <el-form :rules="rules" :model="updateParams" ref="update-form" label-width="100px" class="demo-ruleForm" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="updateParams.realName" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="updateParams.userName" size="small" :minlength="6" :maxlength="25" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="updateParams.phone" size="small" :maxlength="18">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="updateParams.email" size="small" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属机构">
            <el-select v-model="updateParams.deptId" placeholder="请选择" size="small">
              <el-option v-for="item in orgNameList" :key="item.deptId" :label="item.name" :value="item.deptId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="催收类型" prop="degrId">
            <el-select v-model="updateParams.degrId" placeholder="请选择" size="small">
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0020')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态 " prop="status">
            <el-select v-model="updateParams.status" size="small">
              <el-option label="启用" :value="0 "></el-option>
              <el-option label="停用" :value="1 "></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否具有权限" min-width="140px">
            <el-select v-model="updateParams.userManager" size="small">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-col :span="20">
          <el-input type="textarea" v-model="updateParams.remark" :autosize="{ minRows:2, maxRows:4}" :maxlength="200"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0px" align="center">
        <el-button @click="modifyConfirm()">确定</el-button>
        <el-button @click="modifyCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters } from 'vuex'

  export default {
    name: 'modify-user',
    data() {
      return {
        servers: {

        },
        // 加载动画
        loading: {
          state: false
        },
        updateParams: {
          deptId: '',
          userName: '',
          realName: '',
          phone: '',
          email: '',
          status: 0,
          degrId: '',
          remark: '',
          userManager: 0
        },
        orgNameList: [],
        /**
         * 新增用户信息校验规则
         */
        rules: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { message: '请输入汉字或英文字母', trigger: 'blur', pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/ }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { message: '用户名只能包含数字、字母、下划线', trigger: 'blur', pattern: /^([A-Za-z0-9_-]+)$/ },
            { min: 6, message: '请输入6位以上数字、字母、下划线', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { message: '请输入正确的电话号码', trigger: 'blur', pattern: /^[0-9-()（）]{7,18}$/ }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
            { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' }
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
       * 获取要修改的当前行数据
       */
      refresh(updatedata) {
        this.updateParams.deptId = updatedata.departments[0].deptId
        this.updateParams.status = updatedata.status
        this.updateParams.userName = updatedata.userName
        this.updateParams.phone = updatedata.phone
        this.updateParams.email = updatedata.email
        this.updateParams.remark = updatedata.remark
        this.updateParams.userManager = updatedata.userManager
        this.updateParams.realName = updatedata.realName
        this.updateParams.degrId = updatedata.degrId
        this.updateParams.userId = updatedata.userId
      },
      /**
       * 获取组织名称列表
       */
      getOrgNameList() {
        this.orgNameList = this.$store.state.systemManage.org_info.map(v => {
          if ((v.pid === null) && (this.nowOrg === null)) {
            this.nowOrg = v
            this.defaultParams.deptCode = v.deptCode
          }
          return {
            deptId: v.deptId,
            name: v.name
          }
        })
      },
      /**
       * 修改用户确认
       */
      modifyConfirm() {
        this.$refs['update-form'].validate((valid) => {
          if (!valid) return false
          this.updateParams.creator = this.userInfo.realName
          net.send({
            server: server.SystemManage.update_user,
            data: this.updateParams
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '修改用户成功'
            })
            this.$refs['update-form'].resetFields()
            // 刷新databox
            this.$emit('refresh')
            // 关闭修改用户dialog
            this.$emit('close')
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 修改用户取消
       */
      modifyCancel() {
        //   重置form表单
        this.$refs['update-form'].resetFields()
        // 关闭修改用户dialog
        this.$emit('close')
      }
    },
    components: {

    },
    mounted() {
      this.getOrgNameList()
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

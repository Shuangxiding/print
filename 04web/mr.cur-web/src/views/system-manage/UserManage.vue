<template>
  <div class="page">
    <el-row type="flex">
      <el-col style="flex-basis:250px;border:1px solid #e4e4e4;min-height:595px">
        <el-col class="text-right tree-header">
          <el-button @click="onAdd" v-role="0x090105">添加机构</el-button>
        </el-col>
        <origanize-tree @drag="onDrag" @edit="onEdit" @add="onAdd" @remove="onRemove" @change="onChange" ref="orgTree"></origanize-tree>
      </el-col>
      <el-col class="col-span">
        <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="servers.findUser" row-key="userId" autoSearch>
          <!--机构与用户管理-->
          <!--输入区域 -START-->
          <template slot="input">
            <el-form-item label="用户名" v-role="0x090107">
              <el-input v-model="params.userName"></el-input>
            </el-form-item>
            <el-form-item label="姓名" v-role="0x090108">
              <el-input v-model="params.realName"></el-input>
            </el-form-item>
            <el-form-item label="状态" v-role="0x090109">
              <el-select v-model="params.state" placeholder="请选择" clearable>
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!--输入区域 -END-->
          <!--按钮区域 -START-->
          <template slot="button">
            <el-button @click="addUserClick" v-show="status === 0" v-role="0x090101">新增用户</el-button>
            <el-button @click="batchRoleClick" v-show="status === 0" v-role="0x090102">批量分配角色</el-button>
          </template>
          <!--按钮区域 -END-->
          <!--数据列区域 -START-->
          <template slot="column">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index" label="序号" width="40">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="90">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" min-width="90">
            </el-table-column>
            <el-table-column prop="phone" label="电话" min-width="90">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="130">
            </el-table-column>
            <el-table-column prop="belongDepartment" label="所属机构" min-width="90">
              <template scope="scope">
                <span>{{scope.row.departments[0].name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="60">
              <template scope="scope">
                <span v-if="scope.row.status == 0">启用</span>
                <span v-if="scope.row.status == 1">停用</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="更新日期" min-width="90">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
              <template scope="scope">
                <el-button @click="assignRoleClick(scope)" type="text" size="small" v-role="0x090103">分配角色</el-button>
                <el-button @click="updateClick(scope)" type="text" size="small" v-role="0x090104">修改</el-button>
                <el-button type="text" size="small" @click="resetClick(scope)">重置密码</el-button>
              </template>
            </el-table-column>
          </template>
          <!--数据列区域-END-->
        </data-box>
      </el-col>
    </el-row>

    <!--弹出框-START-->
    <!--添加机构-->
    <el-dialog title="添加机构" v-model="addOrganizeFlag" size="tiny" :close-on-click-modal="false" :show-close="false">
      <AddOrganize @close="addOrganizeFlag=false" @refresh="refreshOrg" :deptId="deptId"></AddOrganize>
    </el-dialog>
    <!--修改机构-->
    <el-dialog title="修改机构" @open="getOragnize" v-model="editOrganizeFlag" size="tiny" :close-on-click-modal="false" :show-close="false">
      <ModifyOrganize @refresh="refreshOrg" ref="edit" @close="editOrganizeFlag=false" :deptId="deptId" :pid="pid" :deptCode="deptCode"></ModifyOrganize>
    </el-dialog>
    <!--新增用户-->
    <el-dialog @open="getdeptId" title="新增用户" v-model="addUser" size="small" :close-on-click-modal="false" :show-close="false">
      <AddUser @close="addUser=false" @refresh="refreshs" ref="dept" :deptId="deptId"></AddUser>
    </el-dialog>
    <!--分配角色-->
    <el-dialog title="选择要分配的角色" @open="getRoles" v-model="assignRoleDialogsVisual" size="small" :lock-scroll="false" :close-on-click-modal="false" :show-close="false">
      <AssignRoles @close="assignRoleDialogsVisual=false" ref="get-roles" @refresh="refreshs" :assigndata="assigndata"></AssignRoles>
    </el-dialog>
    <!--批量分配角色-->
    <el-dialog title="选择要分配的角色" v-model="roleBanchDialogsVisual" size="small" :close-on-click-modal="false" :show-close="false">
      <BatchAllocationRole @close="roleBanchDialogsVisual=false" @refresh="refreshs" :selec="selec"></BatchAllocationRole>
    </el-dialog>
    <!--修改用户-->
    <el-dialog title="修改用户" @open="getmodifydata" v-model="updareDialogsVisual" size="small" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <ModifyUser @close="updareDialogsVisual=false" ref="change" @refresh="refreshs"></ModifyUser>
    </el-dialog>
    <!--弹出框-END-->
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters, mapActions } from 'vuex'
  import OriganizeTree from '@/views/system-manage/OrganizeTree'
  import AddUser from '@/views/system-manage/AddUser' // 新增用户
  import ModifyUser from '@/views/system-manage/ModifyUser' // 修改用户
  import BatchAllocationRole from '@/views/system-manage/BatchAllocationRole' // 批量分配角色
  import AssignRoles from '@/views/system-manage/AssignRoles' // 分配角色
  import AddOrganize from '@/views/system-manage/AddOrganize' // 分配角色
  import ModifyOrganize from '@/views/system-manage/ModifyOrganize' // 分配角色

  export default {
    name: 'user-manage',
    data() {
      return {
        // 服务接口列表
        servers: {
          departmentUserList: server.SystemManage.get_departmentUser_list,
          findUser: server.SystemManage.find_user_list,
          deleteDept: server.SystemManage.delete_deleteDept,
          moveDepartment: server.SystemManage.get_move_department,
          resetpassword: server.app.reset_password
        },
        params: {
          userName: '',
          realName: '',
          state: ''
        },
        editdata: {
          deptId: '',
          pid: '',
          deptCode: ''
        },
        roleParams: {
          roleName: '',
          state: 0
        },
        // 加载动画
        loading: {
          state: false
        },
        nowOrg: null,
        assigndata: '',
        status: 0,
        deptId: '',
        pid: '',
        deptCode: '',
        defaultParams: {
          deptCode: ''
        },
        dialog: {
          disabled: false
        },
        orgNameList: [],
        select: [],
        multipleSelection: [],
        assignRoleDialogsVisual: false,
        updareDialogsVisual: false,
        addUser: false,
        roleBanchDialogsVisual: false,
        departmentValue: '',
        form1: '',
        form3: '',
        form4: '',
        // defauletSelectedRow: [],
        reset: false,
        // 机构的增加
        addOrganizeFlag: false,
        selec: '',
        // 机构的修改
        editOrganizeFlag: false,
        // 修改机构
        editOrgForm: {
          name: '',
          status: '',
          remark: ''
        },
        editOrganizeRules: {
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
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
      // 添加ations
      ...mapActions([
        'updateOrgNameInfo'
      ]),
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
       * 刷新机构数
       */
      refreshOrg() {
        this.$refs['orgTree'].refresh()
      },
      getRoles() {
        console.log(111)
        this.$nextTick(() => {
          this.$refs['get-roles'].refreshdata()
        })
      },
      /**
       * 获取修改行数据
       */
      getmodifydata() {
        this.$nextTick(() => {
          this.$refs['change'].refresh(this.updatedata)
        })
      },
      getOragnize() {
        this.$nextTick(() => {
          this.$refs['edit'].refresh(this.editdata)
        })
      },
      getdeptId() {
        this.$nextTick(() => {
          this.$refs['dept'].refresh(this.dept)
        })
      },
      /**
       * 刷新databox
       */
      refreshs() {
        this.$refs['databox'].refresh()
      },
      /**
       * 重置密码
       */
      resetClick(scope) {
        this.reset = true
        this.form4 = scope.row.userId
        this.$confirm('确定要重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: this.servers.resetpassword,
            data: {
              userId: this.form4
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '重置密码成功'
            })
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
      },
      // 组织机构的增删改
      onDrag(...args) {
        net.send({
          server: this.servers.moveDepartment,
          data: {
            deptId: args[0].deptId,
            parentDeptId: args[2].deptId
          }
        }).then((data) => {
          this.$message({
            type: 'success',
            message: '移动成功'
          })
          args[0].deptCode = data.deptCode
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      onChange(value) {
        this.nowOrg = value
        this.deptId = value.deptId
        this.defaultParams.deptCode = value.deptCode
        this.status = value.status
        this.pid = value.pid
        this.deptCode = value.deptCode
        this.$refs['databox'].refresh()
      },
      onEdit(value) {
        this.editOrganizeFlag = true
        this.editdata = value
      },
      onAdd(value) {
        this.addOrganizeFlag = true
      },
      onRemove(value) {
        this.$confirm('此操作将永久删除该组织机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: this.servers.deleteDept,
            data: {
              deptId: this.deptId
            }
          }).then(data => {
            this.$refs['orgTree'].refresh()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      /*
      新增用户
      */
      addUserClick() {
        this.addUser = true
        this.dept = this.deptId
        console.log(this.dept)
      },
      refresh(formName) {
        this.$nextTick(() => {
          this.$refs[formName].refresh()
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      /*
      分配角色
      */
      assignRoleClick(scope) {
        this.assignRoleDialogsVisual = true
        this.assigndata = scope.row
      },
      /*
      批量分配角色
      */
      batchRoleClick() {
        this.selec = this.$refs['databox'].getCurrentSelection()
        if (this.selec.length === 0) {
          this.$alert('请选择要分配角色的用户', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.roleBanchDialogsVisual = true
        }
      },
      /*
      修改用户
      */
      updateClick(scope) {
        this.updareDialogsVisual = true
        this.updatedata = scope.row
      }
    },
    components: {
      DataBox,
      OriganizeTree,
      AddUser,
      ModifyUser,
      BatchAllocationRole,
      AssignRoles,
      AddOrganize,
      ModifyOrganize
    },
    mounted() {
      this.getOrgNameList()
      this.updateOrgNameInfo()
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
  .tree-header {
    padding: 10px 20px;
    border-bottom: 1px solid #e4e4e4;
  }

</style>

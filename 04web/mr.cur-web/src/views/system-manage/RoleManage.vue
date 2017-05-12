<template>
  <div class="page">
    <data-box ref="databox" :params="params" row-key="roleId" :server="server.search" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="角色名称" v-role="0x090206">
          <el-input v-model="params.roleName"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x090207">
          <el-select v-model="params.state" placeholder="请选择" clearable>
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="index" label="序号" width="85">
        </el-table-column>
        <el-table-column prop="name" label="角色名称" min-width="80">
        </el-table-column>
        <el-table-column prop="remark" label="角色描述" min-width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="50">
          <template scope="scope">
            <span v-if="scope.row.status === 0">启用</span>
            <span v-if="scope.row.status === 1">停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间" min-width="100">
        </el-table-column>
        <el-table-column prop="creator" label="操作人" min-width="60">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="modifyClick(scope)" v-role="0x090202">修改</el-button>
            <el-button type="text" size="small" @click="modulePermissClick(scope)" v-role="0x090203">模块权限</el-button>
            <el-button type="text" size="small" @click="userlistClick(scope)" v-role="0x090204">用户列表</el-button>
            <el-button type="text" size="small" @click="deleteClick(scope)" v-role="0x090205">删除</el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="addroleClick" v-role="0x090201">新增角色</el-button>
      </template>
    </data-box>

    <!--新增角色弹出框-->
    <el-dialog title="新增角色" v-model="addrole" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <AddRoles @close="addrole=false" @refresh="refreshDatabox"></AddRoles>
    </el-dialog>

    <!--修改角色弹出框-->
    <el-dialog title="修改角色" @open="getmodifydata" v-model="modifyrole" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <ModifyRoles ref="change" @close="modifyrole=false" @refresh="refreshDatabox"></ModifyRoles>
    </el-dialog>

    <!--角色模块权限弹出框-->
    <el-dialog title="角色模块权限" v-model="moduleDialogShow" @open="refresh('modulePermiss')" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col class="module-box">
        <module-permission ref="modulePermiss">
        </module-permission>
      </el-col>
    </el-dialog>

    <!--用户列表-->
    <el-dialog @open="getRoleId" v-model="userlist" title="用户列表" size="small" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <UserList ref="get"></UserList>
    </el-dialog>

  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import net from '@/util/net'
  import servers from '@/config/servers'
  import ModulePermission from '@/views/system-manage/ModulePermission'
  import AddRoles from '@/views/system-manage/AddRoles' // 新增角色
  import ModifyRoles from '@/views/system-manage/ModifyRoles' // 修改角色
  import UserList from '@/views/system-manage/UserList' // 修改角色
  import { mapGetters } from 'vuex'
  export default {
    name: 'role-manage',
    data() {
      return {
        server: {
          search: servers.SystemManage.get_role_page,
          delete: servers.SystemManage.delete_role
          // usersearch: servers.SystemManage.role_find_user
        },
        params: {
          roleName: '',
          state: '',
          sort: 'createTime,desc'
        },
        // 用户列表参数
        userparams: {
          roleId: '',
          userName: '',
          realName: ''
        },
        userdata: '',
        // 加载动画
        loading: {
          state: false
        },
        // 角色修改参数
        modifyrole: false,
        addrole: false,
        userlist: false,
        // 数据校验规则
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
      ]),
      moduleDialogShow: {
        get() {
          return this.$store.state.systemManage.module_permiss_dialog
        },
        set(value) {
          this.$store.commit('updateModuleDialog', value)
        }
      },
      module_permiss_roleId: {
        get() {
          return this.$store.state.systemManage.module_permiss_roleId
        },
        set(value) {
          this.$store.commit('updateModuleRoleId', value)
        }
      }
    },
    methods: {
      getRoleId() {
        this.$nextTick(() => {
          this.$refs['get'].refresh(this.userdata)
          this.$refs['get'].refreshList()
        })
      },
      /**
       * 获取修改行数据
       */
      getmodifydata() {
        this.$nextTick(() => {
          this.$refs['change'].refresh(this.modifyData)
        })
      },
      /**
       * 刷新databox
       */
      refreshDatabox() {
        this.$refs['databox'].refresh()
      },
      // 用户列表点击事件
      userlistClick(scope) {
        this.userdata = scope.row.roleId
        this.userlist = true
      },
      // 修改角色点击事件
      modifyClick(scope) {
        this.modifyrole = true
        this.modifyData = scope.row
      },
      // 增加角色点击
      addroleClick() {
        this.addrole = true
      },
      // 删除角色操作
      deleteClick(scope) {
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: this.server.delete,
            data: {
              roleId: scope.row.roleId
            }
          }).then((data) => {
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
      },
      // 刷新
      refresh(formName) {
        this.$nextTick(() => {
          this.$refs[formName].refresh()
        })
      },
      /**
       * 模块权限点击
       */
      modulePermissClick(scope) {
        this.moduleDialogShow = true
        this.module_permiss_roleId = scope.row.roleId
      }
    },
    components: {
      DataBox,
      ModulePermission,
      AddRoles,
      ModifyRoles,
      UserList
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .module-box {
    margin-bottom: 30px;
  }

</style>

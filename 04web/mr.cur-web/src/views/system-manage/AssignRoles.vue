<template>
  <!--分配角色-->
  <div class="page">
    <el-form>
      <data-box ref="inDatabox" :params="roleParams" :server="servers.getRoleList" row-key="roleId" :defaultSelection="defauletSelectedRow" autoSearch>
        <template slot="input">
          <el-form-item label="角色名称">
            <el-input v-model="roleParams.roleName"></el-input>
          </el-form-item>
        </template>
        <template slot="column">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" label="序号" width="70">
          </el-table-column>
          <el-table-column prop="name" label="角色名称" min-width="120">
          </el-table-column>
          <el-table-column prop="remark" label="角色描述" min-width="220">
          </el-table-column>
        </template>
      </data-box>
      <el-form-item>
        <el-button @click="roleConfirm">确定分配</el-button>
        <el-button @click="batchRoleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters } from 'vuex'
  import DataBox from '@/components/DataBox'

  export default {
    name: 'assign-role',
    data() {
      return {
        servers: {
          getRoleList: server.SystemManage.get_role_page,
          manyUserAddRole: server.SystemManage.bantch_role,
          userAddRole: server.SystemManage.assign_role
        },
        // 加载动画
        loading: {
          state: false
        },
        form3: '',
        roleParams: {
          roleName: '',
          state: 0
        },
        defauletSelectedRow: []
      }
    },
    props: ['assigndata'],
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      refreshdata() {
        this.$refs['inDatabox'].refresh()
        let rowss = this.assigndata.roles.map(v => {
          return v.roleId
        })
        this.defauletSelectedRow = rowss
      },
      /**
       * 确定分配
       */

      roleConfirm() {
        this.form3 = this.$refs['inDatabox'].getCurrentSelection()
        let roId = this.form3.map(v => {
          return v.roleId
        })
        net.send({
          server: this.servers.userAddRole,
          data: {
            roleIds: roId,
            userId: this.assigndata.userId
          }
        }).then((data) => {
          this.$message({
            type: 'success',
            message: '分配成功'
          })
          //   关闭批量分配角色dialog
          this.$emit('close')
          //   刷新databox
          // this.$refs['inDatabox'].refresh()
          this.$emit('refresh')
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 取消
       */
      batchRoleCancel() {
        //   关闭批量分配角色dialog
        this.$emit('close')
        // 刷新databox
        this.$refs['inDatabox'].refresh()
        this.$emit('refresh')
      }
    },
    components: {
      DataBox
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

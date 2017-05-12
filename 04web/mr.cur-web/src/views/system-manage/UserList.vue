<template>
  <!--用户列表-->
  <div class="page">
    <data-box ref="databox1" :params="userparams" row-key="userId" :server="servers.usersearch">
      <template slot="input">
        <el-form-item label="用户名">
          <el-input v-model="userparams.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="userparams.realName"></el-input>
        </el-form-item>
      </template>
      <!--数据列-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="40">
        </el-table-column>
        <el-table-column label="用户名" prop="userName" min-width="90">
        </el-table-column>
        <el-table-column label="姓名" prop="realName" min-width="90">
        </el-table-column>
        <el-table-column label="电话" prop="phone" min-width="90">
        </el-table-column>
        <el-table-column label="邮箱" prop="email" min-width="130">
        </el-table-column>
        <el-table-column label="所属机构" prop="departments" min-width="90">
          <template scope="scope">
            <span v-if="scope.row.departments.length">{{scope.row.departments[0].name}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </div>
</template>
<script>
  import servers from '@/config/servers'
  import DataBox from '@/components/DataBox'

  export default {
    name: 'user-list',
    data() {
      return {
        servers: {
          usersearch: servers.SystemManage.role_find_user
        },
        // 加载动画
        loading: {
          state: false
        },
        // 用户列表参数
        userparams: {
          roleId: '',
          userName: '',
          realName: ''
        }
      }
    },
    methods: {
      /**
       * 获取列表roleId
       */
      refresh(userdata) {
        this.userparams.roleId = userdata
      },
      /**
       * 刷新databox1
       */
      refreshList() {
        this.$refs['databox1'].refresh()
      }
    },
    components: {
      DataBox
    },
    mounted() {
      this.userparams.roleId = this.userdata
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

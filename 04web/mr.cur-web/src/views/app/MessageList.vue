<template>
  <div class="page">
    <el-row class="text-right">
      <!--按钮区域-->
      <el-button @click="deleteClick" style="margin-right:10px">删除</el-button>
    </el-row>
    <data-box ref="databox" row-key="id" :params="params" :server="servers.message" :size="5" hiddenForm>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="type" label="消息类型" min-width="60">
          <template scope="scope">
            <span :class="{'already-read':(scope.row.state==='Read')}">{{scope.row.type|reminderTypeConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="消息标题" min-width="120" align="left">
          <template scope="scope">
            <div :class="{'already-read':(scope.row.state==='Read')}" style="padding:20px">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="日期" min-width="75">
          <template scope="scope">
            <span :class="{'already-read':(scope.row.state==='Read')}">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="查看详情" min-width="50">
          <template scope="scope">
            <el-button size="small" @click="msgDetailsClick(scope)" v-role="0x010102" type="text">查看</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'message-list',
    data() {
      return {
        // 服务接口列表
        servers: {
          message: server.user.get_message_remind_info,
          deleted: server.user.get_message_deleted_info
        },
        multipleSelection: [],
        params: {
          sort: 'state%2Cdesc&sort=createTime%2Cdesc'
        }
      }
    },
    methods: {
      /**
       * 删除
       */
      deleteClick() {
        this.multipleSelection = this.$refs['databox'].getCurrentSelection()
        console.log(this.multipleSelection)
        if (this.multipleSelection.length === 0) {
          this.$alert('请选择要删除的消息', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          let removeId = this.multipleSelection.map(v => v.id)
          net.send({
            server: this.servers.deleted,
            data: {
              ids: removeId
            }
          }).then((data) => {
            this.$message({
              type: 'info',
              message: '删除成功!'
            })
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }
      },
      /**
       * 消息内容详情
       */
      msgDetailsClick(scope) {
        let data = Object.assign({}, scope.row)
        scope.row.state = 'Read'
        this.$store.commit('updateMessageDetailsDialog', true)
        this.$store.commit('updateMessageDetailsItem', data)
      },
      /**
       * 刷新
       */
      refresh() {
        this.$refs['databox'].refresh()
      }
    },
    components: {
      DataBox
    }
  }

</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../styles/variable.less';
  .already-read {
    color: @-font-color-light;
  }

</style>

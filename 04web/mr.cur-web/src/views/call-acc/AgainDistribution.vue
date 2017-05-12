<template>
  <div>
    <el-col>
      <div class="header">当前催收员:{{cupodata.cupoName}}</div>
    </el-col>
    <el-table :data="cupor" :default-sort="{prop: 'currentAmount', order: 'ascending'}" highlight-current-row max-height="400" @current-change="redialogCurrentChange">
      <el-table-column type="index" label="序号" align="center" width="65"></el-table-column>
      <el-table-column prop="userName" label="催收专员" align="center" min-width="100"></el-table-column>
      <el-table-column prop="caseCount" label="当前持有案件数" align="center" min-width="150"></el-table-column>
      <el-table-column label="可分配案件数" align="center" min-width="140">
        <template scope="scope">
          <span>{{(Math.ceil(todayPer-scope.row.caseCount)<0)?0:Math.ceil(todayPer-scope.row.caseCount)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col class="dialog-footer" align="center">
      <el-button @click="redialogConfirm">确认分配</el-button>
      <el-button @click="$emit('close')">重选案件</el-button>
    </el-col>
  </div>
</template>
<script>
  import net from '@/util/net'
  import servers from '@/config/servers'
  export default {
    name: 'again-distribution',
    data() {
      return {
        // 服务接口列表
        server: {
          cupor: servers.VisitAcc.get_CupoUser,
          todayPer: servers.VisitAcc.get_AvgCaseCount,
          redistribution: servers.VisitAcc.post_redistribution
        },
        cupor: [],
        todayPer: 0,
        tableData: [],
        currentRow: {} // 重新分配表格值
      }
    },
    props: ['cupodata'],
    methods: {
      /**
       * 重新分配选择改变
       */
      redialogCurrentChange(val) {
        this.currentRow = val
      },
      /**
       * 重新分配确认
       */
      redialogConfirm() {
        if (!this.currentRow.userName) {
          this.$alert('请选择催收员', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        if ((this.todayPer < this.currentRow.caseCount) || (this.todayPer === this.currentRow.caseCount)) {
          this.$confirm('该催收员可分配案件数为零，确定分配吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            net.send({
              server: this.server.redistribution,
              data: {
                cupoId: this.cupodata.cupoId,
                userId: this.currentRow.userId,
                userName: this.currentRow.userName
              }
            }).then(() => {
              this.$message({
                type: 'success',
                message: '分配成功!'
              })
              this.$emit('close')
              this.$emit('refresh')
            }, err => {
              this.$message({
                type: 'info',
                message: err.reason
              })
            })
          }).catch(() => {})
        } else {
          net.send({
            server: this.server.redistribution,
            data: {
              cupoId: this.cupodata.cupoId,
              userId: this.currentRow.userId,
              userName: this.currentRow.userName
            }
          }).then(() => {
            this.$message({
              type: 'success',
              message: '分配成功!'
            })
            this.$emit('close')
            this.$emit('refresh')
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }
      },
      /**
       * 获取催收专员分配案件数
       */
      loadCaseNum() {
        net.send({
          server: this.server.todayPer
        }).then((data) => {
          // 更新数据信息
          this.todayPer = data
        }, err => {
          console.log(err)
        })
        net.send({
          server: this.server.cupor
        }).then((data) => {
          // 更新数据信息
          this.cupor = data
        }, err => {
          console.log(err)
        })
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    margin: 10px 0;
    font-size: 0.875rem;
    color: rgb(31, 45, 61);
    text-align: left;
  }
  
  .dialog-footer {
    padding: 20px;
  }

</style>

<template>
  <div>
    <div class="el-alert el-alert--info" style="margin-bottom:20px;">
      <div class="el-alert__content el-alert el-alert--info">
        <span class="el-alert__title">当前已选择{{multipleSelection.length}}个案件，今日人均案件{{todayPer}}个。
                    已分配案件{{allocated}}个，还剩余{{multipleSelection.length-allocated}}个案件待分配。</span>
      </div>
    </div>
    <el-table :data="cupor" height="400" min-width="500">
      <el-table-column type="index" label="序号" align="center" width="45"></el-table-column>
      <el-table-column prop="userName" label="催收专员" align="center" min-width="80"></el-table-column>
      <el-table-column prop="caseCount" label="当前持有案件数" align="center" min-width="105"></el-table-column>
      <el-table-column label="可分配案件数" align="center" min-width="105">
        <template scope="scope">
          <span>{{(Math.ceil(todayPer-scope.row.caseCount)<0)?0:Math.ceil(todayPer-scope.row.caseCount)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="确认分配案件数" align="center" min-width="120">
        <template scope="scope">
          <el-input :min="0" size="small" type="number" :maxlength="2" class="batch" v-model="scope.row.distributionCount" :max="inputMax(scope)" @focus="inputFocus(scope)" @blur="batchInputChange(scope)">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-col class="dialog-footer" align="center">
      <el-button @click="allConfirm">确认分配</el-button>
      <el-button @click="$emit('close')">重选案件</el-button>
    </el-col>
  </div>
</template>
<script>
  import net from '@/util/net'
  import servers from '@/config/servers'
  export default {
    name: 'mass-distribution',
    data() {
      return {
        // 服务接口列表
        server: {
          cupor: servers.VisitAcc.get_CupoUser,
          todayPer: servers.VisitAcc.get_AvgCaseCount,
          batchDistribute: servers.VisitAcc.post_batchDistribute
        },
        todayPer: 0,
        cupor: [],
        allocated: 0
      }
    },
    props: ['multipleSelection'],
    methods: {
      /**
       * 更新allocated
       */
      updateAllocated() {
        let sum = 0
        for (let v = 0; v < this.cupor.length; v++) {
          sum = sum + (isNaN(parseInt(this.cupor[v].distributionCount)) ? 0 : parseInt(this.cupor[v].distributionCount))
        }
        this.allocated = sum
      },
      /**
       * 确认分配
       */
      allConfirm() {
        let cupoUserCountList = this.cupor
        let arr = this.multipleSelection.slice(0, this.allocated)
        let amount = arr.map(v => {
          return v.cupoId
        })
        net.send({
          server: this.server.batchDistribute,
          data: {
            cupoUserCountList: cupoUserCountList,
            caseIds: amount
          }
        }).then((data) => {
          this.$message({
            type: 'success',
            message: `成功分配${this.allocated}个案件！`
          })
          this.$emit('close')
          // 刷新databox
          this.$emit('refesh')
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 输入框最大值
       */
      inputMax(scope) {
        let assignedCase = (Math.ceil(this.todayPer - scope.row.caseCount) < 0) ? 0 : Math.ceil(this.todayPer - scope.row.caseCount)
        let max = ((this.multipleSelection.length - this.allocated) < assignedCase) ? (this.multipleSelection.length - this.allocated) : assignedCase
        return max
      },
      /**
       * 批量分配输 入获取焦点
       */
      inputFocus(scope) {
        this.cupor[scope.$index].distributionCount = 0
        this.updateAllocated()
      },
      /**
       * 批量分配输入改变
       */
      batchInputChange(scope) {
        let item = this.cupor[scope.$index].distributionCount
        if (item < 0 || (item === '')) {
          item = 0
        }
        let max = ((this.multipleSelection.length - this.allocated) > 0) ? (this.multipleSelection.length - this.allocated) : 0
        if (item > max) {
          this.$alert(`当前选择的案件数是${this.multipleSelection.length}个，您分配的案件数已经超过了，请重新输入或者重选案件！`, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.cupor[scope.$index].distributionCount = 0
          this.updateAllocated()
          return
        }
        let canAllot = ((this.todayPer - scope.row.caseCount) < 0) ? 0 : (this.todayPer - scope.row.caseCount)
        if (item > canAllot) {
          this.$confirm('您分配的案件数已超过了催收员可分配案件数，确定分配吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.cupor[scope.$index].distributionCount = item
            this.updateAllocated()
          }).catch(() => {
            this.cupor[scope.$index].distributionCount = 0
            this.updateAllocated()
          })
        } else {
          this.cupor[scope.$index].distributionCount = item
          this.updateAllocated()
        }
      },
      load() {
        /**
         * 获取今日人均案件数
         */
        this.allocated = 0
        net.send({
          server: this.server.todayPer
        }).then((data) => {
          // 更新数据信息
          this.todayPer = data
        }, err => {
          console.log(err)
        })
        /**
         * 获取催收专员案件列表
         */
        net.send({
          server: this.server.cupor
        }).then((data) => {
          // 更新数据信息
          data = data.map(x => {
            x.distributionCount = 0
            return x
          })
          this.cupor = data
        }, err => {
          console.log(err)
        })
        // 刷新databox
        this.$emit('refresh')
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

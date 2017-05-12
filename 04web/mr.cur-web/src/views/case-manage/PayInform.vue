<template>
  <div>
    <el-col class="frame">
      <data-grid label="产品信息" iconClass="icon-chanpinxinxi" :labelWidth="100" labelAlign="right" row-key="orapId" contentAlign="left">
        <data-grid-item label="产品系列：" :span="4" min-width="80px">{{data.product.name}}</data-grid-item>
        <data-grid-item label="产品名称：" :span="4" min-width="80px">{{data.product.productDetailList[0].proName}}</data-grid-item>
        <data-grid-item label="期数(期)：" :span="4" min-width="80px">{{data.product.productDetailList[0].periods}}</data-grid-item>
        <data-grid-item label="年利率(%)：" :span="4" min-width="80px"></data-grid-item>
        <data-grid-item label="还款方式：" :span="4" min-width="80px">{{data.product.productDetailList[0].payment}}</data-grid-item>
        <data-grid-item label="综合利率(%)：" :span="4" min-width="80px">{{data.product.productDetailList[0].multipleRate}}</data-grid-item>
        <data-grid-item label="罚息费率(%/天)：" :span="4" min-width="80px">{{data.product.productDetailList[0].interestRate}}</data-grid-item>
        <data-grid-item label="罚息金额(元/天)：" :span="4" min-width="80px"></data-grid-item>
        <data-grid-item label="合同违约金费率(%)：" :span="4" min-width="80px">{{data.product.productDetailList[0].contractViolateRate}}</data-grid-item>
        <data-grid-item label="提前还款违约金费率(%)：" :span="4" min-width="80px"></data-grid-item>
        <data-grid-item label="分期服务费费率(%/月)：" :span="8" min-width="80px">{{data.product.productDetailList[0].stagingServicesRate}}</data-grid-item>
      </data-grid>
      <data-grid row-key="Id" label="还款信息：" iconClass="icon-huankuanxinxi" :labelWidth="100" labelAlign="right" contentAlign="left">
        <data-grid-item label="还款状态：" :span="3">{{data.message.paymentStatus}}</data-grid-item>
        <data-grid-item label="还款期数：" :span="3">{{data.message.totalPeriods}}</data-grid-item>
        <data-grid-item label="剩余期数：" :span="3">{{data.message.leftPeriods}}</data-grid-item>
        <data-grid-item label="逾期期数：" :span="3">{{data.message.accPeriodsOverdue}}</data-grid-item>
        <data-grid-item label="授信金额(元)：" :span="3">{{data.message.creditMoney}}</data-grid-item>
        <data-grid-item label="合同金额(元)：" :span="3">{{data.message.contractAmount}}</data-grid-item>
        <data-grid-item label="逾期总金额(元)：" :span="3">{{data.message.overDueSumAmount}}</data-grid-item>
        <data-grid-item label="逾期本金(元)：" :span="3">{{data.message.overDueCapital}}</data-grid-item>
        <data-grid-item label="逾期利息(元)：" :span="3">{{data.message.overDueInterest}}</data-grid-item>
        <data-grid-item label="逾期罚息(元)：" :span="3">{{data.message.overDueDisincentive}}</data-grid-item>
        <data-grid-item label="逾期滞纳金(元)：" :span="3">{{data.message.overDueFine}}</data-grid-item>
        <data-grid-item label="已还款金额(元)：" :span="3">{{data.message.hasPayAmount}}</data-grid-item>
        <data-grid-item label="已还款期数：" :span="3">{{data.message.hasPayPeriods}}</data-grid-item>
        <data-grid-item label="最近还款金额(元)：" :span="3">{{data.message.lastPayAmount}}</data-grid-item>
        <data-grid-item label="最近还款日期：" :span="6">{{data.message.lastPayDate}}</data-grid-item>
      </data-grid>
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-huankuanmingxi"></span>
        <span>还款明细</span>
      </el-col>
      <data-box ref="databox" row-key="cupoId" hiddenForm :data="data.payDetail">
        <template slot="column">
          <!--数据列区域-->
          <el-table-column prop="periods" label="还款期数" min-width="60">
          </el-table-column>
          <el-table-column prop="payDate" label="还款日期" min-width="100">
          </el-table-column>
          <el-table-column prop="payStatus" label="还款状态" min-width="60">
          </el-table-column>
          <el-table-column prop="totalAmt" label="应还金额" min-width="60">
          </el-table-column>
          <el-table-column prop="princial" label="应还本金" min-width="60">
          </el-table-column>
          <el-table-column prop="interest" label="应还利息" min-width="60">
          </el-table-column>
          <el-table-column prop="mangementCost" label="应还平台管理费" min-width="105">
          </el-table-column>
          <el-table-column prop="penalty" label="应还罚息" min-width="60">
          </el-table-column>
          <el-table-column prop="penalSum" label="应还违约金" min-width="75">
          </el-table-column>
          <el-table-column prop="overDays" label="逾期天数" min-width="60">
          </el-table-column>
          <el-table-column prop="overPenalty" label="逾期罚息" min-width="60">
          </el-table-column>
          <el-table-column prop="overPenalSum" label="逾期违约金" min-width="75">
          </el-table-column>
          <el-table-column prop="leftPenalty" label="剩余罚息" min-width="60">
          </el-table-column>
          <el-table-column prop="leftPrincipal" label="剩余本金" min-width="60">
          </el-table-column>
          <el-table-column prop="leftInterest" label="剩余利息" min-width="60">
          </el-table-column>
          <el-table-column prop="leftMangementCost" label="剩余管理费" min-width="75">
          </el-table-column>
        </template>
      </data-box>
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-huankuanjilu"></span>
        <span>还款记录</span>
      </el-col>
      <el-table :data="data.record">
        <el-table-column prop="periods" label="期数">
        </el-table-column>
        <el-table-column prop="totalPayment" label="还款总额(元)">
        </el-table-column>
        <el-table-column prop="paymentType" label="还款类型">
          <template scope="scope">
            <span>{{scope.row.paymentType | typeCodeConvert('0042')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="当时状态">
        </el-table-column>
        <el-table-column prop="paymentTime" label="还款时间">
        </el-table-column>
        <el-table-column prop="operator" label="操作人">
        </el-table-column>
        <el-table-column prop="paymentVoucher" label="还款凭证">
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'
  import server from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'pay-inform',
    data() {
      return {
        data: {
          product: {
            productDetailList: [{}]
          },
          message: {},
          payDetail: [],
          record: []
        },
        type: ''
      }
    },
    methods: {
      /**
       * 案件导入的数据更新
       */
      importSend(pay) {
        net.sendAll([{
          server: server.CaseManage.get_product_information, // 案件导入的案件详情还款信息的产品信息
          data: {
            productId: pay.productId
          }
        }, {
          server: server.CaseManage.get_repayment_information, // 案件导入的案件详情还款信息的还款信息
          data: {
            orderId: pay.orderId
          }
        }]).then((data) => {
          if (data[0][0]) {
            this.data.product = data[0][0]
            if (!data[0][0].productDetailList[0]) {
              this.data.product.productDetailList = [{}]
            }
          }
          if (data[1][0]) {
            this.data.message = data[1][0]
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 其他页面的数据更新
       */
      ortherSend(pay) {
        net.sendAll([{
          server: server.CaseManage.get_formalProduct_information, // 案件分配、案件管理、客户查询的案件详情还款信息的产品信息
          data: {
            productId: pay.productId
          }
        }, {
          server: server.CaseManage.get_Repayment_info, // 案件分配、案件管理、客户查询的案件详情还款信息的还款信息
          data: {
            cupoOrdernum: pay.cupoOrdernum
          }
        }, {
          server: server.CaseManage.get_orderPaymentInformation_byOrderNum, // 案件分配、案件管理、客户查询的案件详情还款信息的还款明细、还款记录
          data: {
            orderNum: pay.orderNum
          }
        }]).then((data) => {
          if (data[0]) {
            if (data[0].productDetailList) {
              this.data.product = data[0]
            }
          }
          this.data.message = data[1]
          if (data[2].orderPaymentDetailList) {
            this.data.payDetail = data[2].orderPaymentDetailList
          }
          if (data[2].orderPaymentRecordList) {
            this.data.record = data[2].orderPaymentRecordList
          }
          console.log(data)
          // this.items = data
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 刷新
       */
      refresh(pay) {
        this.data = {
          product: {
            productDetailList: [{}]
          },
          message: {},
          payDetail: [],
          record: []
        }
        this.type = pay.type
        if (pay.type === 'IMPORT') {
          this.importSend(pay)
        } else {
          this.ortherSend(pay)
        }
      }
      // refresh() {
      //   if (this.payServer) {
      //     net.send(this.payServer).then((data) => {
      //       console.log(data)
      //       this.params1 = data
      //       // 接口返回的数据
      //     }, err => {
      //       console.log(err)
      //     })
      //   }
      // }
    },
    components: {
      DataGrid,
      DataBox,
      DataGridItem
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .frame {
    padding: 10px;
  }

</style>

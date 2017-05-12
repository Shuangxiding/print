<template>
  <!--还款审核-->
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="servers.review" row-key="payaId" autoSearch>
      <!--输入区域-START-->
      <template slot="input">
        <el-form-item label="批次号" v-role="0x060203">
          <el-input v-model="params.payaBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x060204">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名" v-role="0x060205">
          <el-input v-model="params.payaCustName"></el-input>
        </el-form-item>
        <el-form-item label="还款类型" v-role="0x060206">
          <el-select v-model="params.payaType" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0032','0039')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款方式" v-role="0x060207">
          <el-select v-model="params.payaStyle" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0027')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态" v-role="0x060208">
          <el-select v-model="params.payaStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0019')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" v-role="0x060209">
          <el-input v-model="params.payaEmpName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="payaPhone" :rules="[validate.truePhoneRules()]" v-role="0x060210">
          <el-input v-model="params.payaPhone"></el-input>
        </el-form-item>
      </template>
      <!--按钮区域-->
      <template slot="button">
        <el-button @click="exportrepaymentClick" v-role="0x060201">导出还款记录</el-button>
      </template>
      <!--数据列区域-START-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="40">
        </el-table-column>
        <el-table-column prop="payaOrderNum" label="案件编号" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="casedetailsClick(scope)">{{scope.row.payaOrderNum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="payaBatch" label="批次号" min-width="90">
        </el-table-column>
        <el-table-column prop="payaPrincipal" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="payaCustName" label="客户姓名" min-width="90">
          <template scope="scope">
            <span>{{scope.row.payaCustName | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaPhone" label="手机号" min-width="90">
          <template scope="scope">
            <span>{{scope.row.payaPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaAmt" label="案件金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="payaPayNum" label="还款金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="payaType" label="还款类型" min-width="80">
          <template scope="scope">
            <span>{{scope.row.payaType | typeCodeConvert('0032','0039')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaStyle" label="还款方式" min-width="55">
          <template scope="scope">
            <span>{{scope.row.payaStyle | typeCodeConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaStatus" label="审核状态" min-width="90">
          <template scope="scope">
            <span>{{scope.row.payaStatus | typeCodeConvert('0019')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaResult" label="审核结果" min-width="80">
          <template scope="scope">
            <el-tooltip v-if="scope.row.payaResult === 180&&scope.row.payaOpinion" class="item" effect="light" :content="scope.row.payaOpinion" placement="bottom">
              <span style="color:red;cursor:pointer">{{scope.row.payaResult | typeCodeConvert('0041')}}</span>
            </el-tooltip>
            <span v-else>{{scope.row.payaResult | typeCodeConvert('0041')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaApplyDate" label="申请日期" min-width="90">
        </el-table-column>
        <el-table-column prop="payaEmpName" label="申请人" min-width="75">
        </el-table-column>
        <el-table-column label="操作 " min-width="90">
          <template scope="scope">
            <el-button @click="auditClick(scope)" type="text" size="small" v-role="0x060202" v-if="scope.row.payaStatus===66">审核</el-button>
          </template>
        </el-table-column>
        <!--数据列区域-END-->
      </template>
    </data-box>
    <!--弹出框-->
    <el-dialog title="审核" @open="uncheck" v-model="dialog.flag" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <template>
        <ReviewReimbursement ref="ReviewReimbursement" @auditClose="dialog.flag=false, $refs['databox'].refresh()"></ReviewReimbursement>
      </template>
    </el-dialog>

    <!--案件详情-->
    <el-dialog title="案件详情" v-model="caseDetailsFlag" size="full" @open="detailsOpen" :modal="false">
      <details-tab :tabsArr="tabsArr" ref="tab">
        <template slot="custInform">
          <cust-inform ref="custInform"></cust-inform>
        </template>
        <template slot="payInform">
          <pay-inform ref="payInform"></pay-inform>
        </template>
        <template slot="attachInform">
          <attach-inform ref="attachInform"></attach-inform>
        </template>
      </details-tab>
    </el-dialog>

  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import ReviewReimbursement from '@/views/approval-manage/ReviewReimbursement'
  import net from '@/util/net'
  import { downloadFile, truePhoneRules } from '@/util/common'
  import { mapState } from 'vuex'
  // 案件详情
  import DetailsTab from '@/components/DetailsTab'
  import CustInform from '@/views/case-manage/CustInform'
  import PayInform from '@/views/case-manage/PayInform'
  import AttachInform from '@/views/case-manage/AttachInform'

  export default {
    name: 'repair-review',
    data() {
      return {
        payaStatus: '',
        servers: {
          review: server.ApprovalManage.get_review_reimbursement,
          exportPayApply: server.ApprovalManage.export_pay_apply,
          getDetailsParams: server.ApprovalManage.get_check_params
        },
        params: {
          payaBatch: '',
          prinId: '',
          payaCustName: '',
          payaType: '',
          payaStyle: '',
          payaStatus: '',
          payaEmpName: '',
          payaApplyDate: '',
          payaPhone: '',
          payaOrderNum: ''
        },
        defaultParams: {
          sort: 'payaApplyDate,desc'
        },
        validate: {
          truePhoneRules
        },
        multipleSelection: [],
        dataName: [],
        dialog: {
          flag: false
        },
        // 案件详情
        tabsArr: [{
          title: '客户信息',
          pane: 'custInform'
        }, {
          title: '还款信息',
          pane: 'payInform'
        }, {
          title: '附件信息',
          pane: 'attachInform'
        }],
        caseDetail: {
          cust: {
            type: '',
            prinCode: '',
            idCardNumber: ''
          },
          pay: {
            type: '',
            cupoOrdernum: '',
            productId: '',
            orderNum: ''
          },
          attach: {
            type: '',
            cupoCasenum: '',
            custId: ''
          }
        },
        caseDetailsFlag: false
      }
    },
    watch: {
      update() {
        this.$refs['databox'].refresh()
      }
    },
    computed: {
      ...mapState({
        update: state => state.approvalManage.update_time
      }),
      repair_paya_id: {
        get() {
          return this.$store.state.approvalManage.repair_paya_id
        },
        set(val) {
          this.$store.commit('updateRepairPayaId', val)
        }
      },
      repair_cupoId: {
        get() {
          return this.$store.state.approvalManage.repair_cupoId
        },
        set(val) {
          this.$store.commit('updateRepairCupoId', val)
        }
      }
    },
    methods: {
      uncheck() {
        this.$nextTick(() => {
          this.$refs['ReviewReimbursement'].refresh(this.payaId)
        })
      },
      /**
       * 审核
       */
      auditClick(scope) {
        this.repair_paya_id = scope.row.payaId
        this.repair_cupoId = scope.row.cupoId
        this.dialog.flag = true
      },
      /**
       * 导出还款记录
       */
      exportrepaymentClick() {
        net.send({
          server: this.servers.exportPayApply,
          data: this.params
        }).then((data) => {
          // 接口返回的数据
          if (data) {
            downloadFile(data, '还款记录')
          } else {
            this.$message({
              type: 'info',
              message: '暂无数据'
            })
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      // 案件详情open事件
      detailsOpen() {
        this.$nextTick(() => {
          this.$refs['payInform'].refresh(this.caseDetail.pay)
          this.$refs['attachInform'].refresh(this.caseDetail.attach)
          this.$refs['custInform'].refresh(this.caseDetail.cust)
        })
      },
      /**
       * 案件详情
       */
      casedetailsClick(scope) {
        net.send({
          server: this.servers.getDetailsParams,
          data: {
            cupoId: scope.row.cupoId
          }
        }).then((data) => {
          this.caseDetail.attach.custId = data.custId
          this.caseDetail.attach.orderNum = data.cupoOrdernum
          this.caseDetail.cust.custId = data.custId
          this.caseDetail.cust.idCardNumber = data.cupoIdcard
          this.caseDetail.pay.productId = data.cupoProid
          this.caseDetail.pay.cupoOrdernum = data.cupoOrdernum
          this.caseDetail.pay.orderNum = data.cupoOrdernum

          this.caseDetailsFlag = true
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      }
    },
    // 获取委托方
    mounted() {
      net.send({
        server: server.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
        console.log(data)
      }, err => {
        console.log(err)
      })
    },
    components: {
      DataBox,
      ReviewReimbursement,
      // 案件详情
      DetailsTab,
      CustInform,
      PayInform,
      AttachInform
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

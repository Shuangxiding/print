<template>
  <!--费用减免审批-->
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.derate" row-key="costReduce" autoSearch>
      <!--输入区域-START-->
      <template slot="input">
        <el-form-item label="批次号" v-role="0x060103">
          <el-input v-model="params.orapBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x060104">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名" v-role="0x060105">
          <el-input v-model="params.orapCustName"></el-input>
        </el-form-item>
        <el-form-item label="减免费用" v-role="0x060106" prop="orapDelayNumMin" :rules="[
            { validator: validate.validateMin(params.orapDelayNumMax), trigger: 'blur' }
          ]">
          <el-input v-model="params.orapDelayNumMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x060106" prop="orapDelayNumMax" :rules="[
            { validator: validate.validateMax(params.orapDelayNumMin), trigger: 'blur' }
          ]">
          <el-input v-model="params.orapDelayNumMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="减免类型" v-role="0x060107">
          <el-select v-model="params.orapStyle" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0013')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批结果" v-role="0x060108">
          <el-select v-model="params.orapStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0017')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="orapPhone" :rules="[validate.truePhoneRules()]" v-role="0x060109">
          <el-input v-model="params.orapPhone"></el-input>
        </el-form-item>
      </template>
      <!--输入区域-END-->

      <!--数据列区域-START-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="orapOrdernum" label="案件编号" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="casedetailsClick(scope)">{{scope.row.orapOrdernum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="orapBatch" label="批次号" min-width="90">
        </el-table-column>
        <el-table-column prop="orapPrincipal" label="委托方" min-width="110">
        </el-table-column>
        <el-table-column prop="orapCustName" label="客户姓名" min-width="90">
          <template scope="scope">
            <span>{{scope.row.orapCustName | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orapPhone" label="手机号" min-width="90">
          <template scope="scope">
            <span>{{scope.row.orapPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orapPayStatus" label="还款状态" min-width="80">
        </el-table-column>
        <el-table-column prop="orapDelay" label="逾期天数" min-width="80">
        </el-table-column>
        <el-table-column prop="orapDelayNum" label="减免费用" min-width="80">
        </el-table-column>
        <el-table-column prop="orapStyle" label="减免类型" min-width="100">
          <template scope="scope">
            <span>{{scope.row.orapStyle | typeCodeConvert('0013')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orapStatus" label="审批结果" min-width="100">
          <template scope="scope">
            <el-tooltip v-if="scope.row.orapStatus === 54&&scope.row.orapOpinion" class="item" effect="light" :content="scope.row.orapOpinion" placement="bottom">
              <span style="color:red;cursor:pointer">{{scope.row.orapStatus | typeCodeConvert('0017')}}</span>
            </el-tooltip>
            <span v-else>{{scope.row.orapStatus | typeCodeConvert('0017')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orapApplyDate" label="申请日期" min-width="90">
        </el-table-column>
        <el-table-column prop="orapEmpName" label="申请人" min-width="75">
        </el-table-column>
        <el-table-column label="操作 " min-width="90">
          <template scope="scope">
            <el-button @click="approvalClickHandle(scope)" type="text" size="small" v-if="scope.row.orapStatus === 52" v-role="0x060101">审批</el-button>
            <el-button @click="followupRecordClickHandle(scope)" type="text" size="small" v-role="0x060102">跟进记录</el-button>
          </template>
        </el-table-column>
        <!--数据列区域-END-->
      </template>
    </data-box>
    <!--弹出框-->
    <el-dialog title="减免审批" @open="uncheck" v-model="approval_click" @close="uncheckClose" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <cost-approval :audit="approvalParam" ref="approvalDialog"></cost-approval>
    </el-dialog>
    <el-dialog title="跟进记录" @open="custFollowOpen" v-model="followupRecordClick" size="large" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <cost-follow ref="costFollow"></cost-follow>
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
  import CostFollow from '@/views/approval-manage/CostFollow'
  import CostApproval from '@/views/approval-manage/CostApproval'
  import net from '@/util/net'
  import { truePhoneRules, validateMin, validateMax } from '@/util/common'
  // 案件详情
  import DetailsTab from '@/components/DetailsTab'
  import CustInform from '@/views/case-manage/CustInform'
  import PayInform from '@/views/case-manage/PayInform'
  import AttachInform from '@/views/case-manage/AttachInform'

  export default {
    name: 'cost-reduce',
    data() {
      return {
        // 服务接口列表
        servers: {
          derate: server.ApprovalManage.get_derate_apply,
          getDetailsParams: server.ApprovalManage.get_check_params
        },
        // 定义请求参数
        params: {
          orapBatch: '',
          prinId: '',
          orapCustName: '',
          orapStyle: '',
          orapStatus: '',
          orapOrdernum: '',
          orapDelayNumMin: '',
          orapDelayNumMax: '',
          deapId: '',
          orapPhone: '',
          orapPayStatus: '',
          orapDelay: '',
          orapApplyDate: '',
          orapEmpName: '',
          userId: '',
          orapName: '',
          sort: 'orapApplyDate,desc'
          // sort: 'orapStatus%2Casc&sort=createTime%2Cdesc'
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        multipleSelection: [],
        followupRecordClick: false,
        approvalParam: [],
        dataName: [],
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
    computed: {
      approval_click: {
        get() {
          return this.$store.state.approvalManage.approval_click
        },
        set(value) {
          this.$store.commit('updateApprovalClick', value)
        }
      }
    },
    methods: {
      /**
       * 关闭减免审批dialog
       */
      uncheckClose() {
        this.$refs['databox'].refresh()
      },
      /**
       * 减免审批open事件
       */
      uncheck() {
        this.$nextTick(() => {
          this.$refs['approvalDialog'].refresh()
        })
      },
      /**
       * 审批
       */
      approvalClickHandle(scope) {
        this.approvalParam = {
          deapId: scope.row.deapId
        }
        this.approval_click = true
      },
      /**
       * 跟进记录
       */
      followupRecordClickHandle(scope) {
        this.$store.commit('updateFollowRecordCupoId', scope.row.orapOrdernum)
        this.followupRecordClick = true
      },
      // 跟进记录open事件
      custFollowOpen() {
        this.$nextTick(() => {
          this.$refs['costFollow'].refresh()
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
      CostFollow,
      CostApproval,
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

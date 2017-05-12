<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.customerCollection" row-key="cupoId">
      <!--输入区域 -START-->
      <template slot="input">
        <el-form-item label="批次号:" v-role="0x070103">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方:" v-role="0x070104">
          <el-select v-model="params.prinId" clearable>
            <el-option v-for="{prinId, prinName} in this.dataPrinc" :key="prinId" :label="prinName" :value="prinId"></el-option>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请省份:" v-role="0x070105">
          <el-select v-model="params.province" placeholder="请选择" clearable>
            <el-option v-for="{id,areaName} in provinceList" :key="id" :label="areaName" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请城市:" v-role="0x070106">
          <el-select v-model="params.city" placeholder="请选择" clearable>
            <el-option v-for="{id,areaName} in cityList" :key="id" :label="areaName" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名:" v-role="0x070107">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" v-role="0x070108" prop="cupoPhone" :rules="[validate.truePhoneRules()]">
          <el-input v-model="params.cupoPhone"></el-input>
        </el-form-item>
      </template>
      <!--输入区域 -END-->
      <!--数据列区域 -START-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="30"></el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号" min-width="100">
          <template scope="scope">
            <el-button @click="casedetailsClick(scope)" type="text" size="small">{{scope.row.cupoCasenum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cupoBatch" label="批次号" min-width="90"></el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="90"></el-table-column>
        <el-table-column prop="cupoCity" label="申请城市" min-width="80"></el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="90"></el-table-column>
        <el-table-column prop="cupoPhone" label="手机号" min-width="80">
          <template scope="scope">
            <span>{{scope.row.cupoPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPaystatus" label="还款状态" min-width="80"></el-table-column>
        <el-table-column prop="cupoOverday" label="逾期天数" min-width="60"></el-table-column>
        <el-table-column prop="cupoAmt" label="案件金额(元)" min-width="80"></el-table-column>
        <el-table-column prop="cupoHandnum" label="案件手数" min-width="60"></el-table-column>
        <el-table-column prop="cupoCharg" label="佣金比例(%)" min-width="80"></el-table-column>
        <el-table-column prop="cupoPrindate" label="委案日期" min-width="90"></el-table-column>
        <el-table-column prop="cupoEndday" label="结案日期" min-width="80"></el-table-column>
        <el-table-column prop="cupoName" label="催收员" min-width="60"></el-table-column>
        <el-table-column label="操作" min-width="90">
          <template scope="scope">
            <el-button @click="followUpRecordClick(scope)" type="text" size="small" v-role="0x070101">跟进记录</el-button>
            <el-button @click="caseTransferClick(scope)" type="text" size="small" v-role="0x070102">案件流转记录</el-button>
            <el-button @click="printNoticeClick(scope)" type="text" size="small">贷后催收通知单</el-button>
          </template>
        </el-table-column>
      </template>
      <!--数据列区域-END-->
    </data-box>

    <el-dialog title="贷后催收通知单" v-model="printNoticeClickHandle" size="small">
      <loaded-notice ref="LoadedNotice"></loaded-notice>
    </el-dialog>

    <el-dialog title="通知单数据录入" v-model="showDataFillFormDialog" size="small">
      <data-fill-form ref="DataFillForm"></data-fill-form>
    </el-dialog>

    <!--弹出框：跟进记录START-->
    <el-dialog title="跟进记录" @open="custFollowOpen" v-model="followUpRecordClickHandle" size="large" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <cost-follow ref="costFollow"></cost-follow>
    </el-dialog>
    <!--弹出框：跟进记录END-->

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

    <!--弹出框：案件流转记录-->
    <el-dialog title="案件流转记录" v-model="caseTransfer.flag" @close="caseTransfer.data = []" size="small">
      <el-col class="text-center" style="padding:20px 20px 30px 20px">
        <el-steps :space="150" :active="caseTransfer.data.length-1" process-status="success" v-if="caseTransfer.data.length > 0">
          <el-step v-for="item in caseTransfer.data" :key="item.index" :title="titleAndName(item)" :description="item.createTime" style="float: left;margin-bottom: 10px;width:150px"></el-step>
        </el-steps>
        <el-col v-else class="text-center">暂无数据</el-col>
      </el-col>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import CostFollow from '@/views/approval-manage/CostFollow'
  import CaseOriginInfo from '@/views/repair-manage/CaseOriginInfo'
  import net from '@/util/net'
  import { getCityJson, truePhoneRules } from '@/util/common'
  // 案件详情
  import DetailsTab from '@/components/DetailsTab'
  import CustInform from '@/views/case-manage/CustInform'
  import PayInform from '@/views/case-manage/PayInform'
  import AttachInform from '@/views/case-manage/AttachInform'

  import LoadedNotice from '@/views/customer-manage/LoadedNotice'
  import DataFillForm from '@/views/customer-manage/DataFillForm'

  export default {
    name: 'customer_query',
    data() {
      return {
        servers: {
          customerCollection: server.CustomerManage.get_customer_list,
          getAccCaseinfoTranlog: server.CustomerManage.get_acc_case_info_tranlog
        },
        params: {
          cupoBatch: '',
          prinId: '',
          cupoPrid: '',
          cupoCityid: '',
          custName: '',
          province: '',
          city: '',
          cupoPhone: ''
        },
        validate: {
          truePhoneRules
        },
        accUserDialogsVisual: false,
        dataPrinc: [],
        provinceList: getCityJson({ level: 1 }), // 省份列表
        followUpRecordClickHandle: false,
        printNoticeClickHandle: false,
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
            custId: '',
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
        caseDetailsFlag: false,
        // 案件流转记录
        caseTransfer: {
          flag: false,
          data: []
        }
      }
    },
    computed: {
      /**
       * 获取2级城市列表
       */
      cityList() {
        return this.params.province ? getCityJson({ level: 1, parentId: this.params.province }) : []
      }
    },
    methods: {
      printNoticeClick(scope) {
        this.printNoticeClickHandle = true
      },
      /**
       * 流转记录title
       */
      titleAndName(item) {
        return `${item.userDep}(${item.catrUser})`
      },
      /*
       * 调用跟进记录传参
       */
      followUpRecordClick(scope) {
        this.$store.commit('updateFollowRecordCupoId', scope.row.cupoCasenum)
        this.followUpRecordClickHandle = true
      },
      custFollowOpen() {
        this.$nextTick(() => {
          this.$refs['costFollow'].refresh()
        })
      },
      provinceId(value) {
        console.log(value[0])
        if (value.length > 0) {
          this.params.cupoPrid = value[0].toString()
        } else {
          this.params.cupoPrid = ''
          this.params.cupoCityid = ''
        }
      },
      cityId(value) {
        console.log(this.params)
        if (value.length > 0) {
          this.params.cupoCityid = value[0].toString()
        } else {
          this.params.cupoCityid = ''
        }
      },
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
        this.caseDetail.attach.custId = scope.row.custId
        this.caseDetail.attach.orderNum = scope.row.cupoOrdernum
        this.caseDetail.cust.custId = scope.row.custId
        this.caseDetail.cust.idCardNumber = scope.row.cupoIdcard
        this.caseDetail.pay.productId = scope.row.cupoProid
        this.caseDetail.pay.cupoOrdernum = scope.row.cupoOrdernum
        this.caseDetail.pay.orderNum = scope.row.cupoOrdernum

        this.caseDetailsFlag = true
      },
      /**
       * 案件流转记录
       */
      caseTransferClick(scope) {
        net.send({
          server: this.servers.getAccCaseinfoTranlog,
          data: {
            cupoCasenum: scope.row.cupoCasenum
          }
        }).then((data) => {
          // 接口返回的数据
          this.caseTransfer.data = data.map((x, index) => {
            x.index = index
            return x
          })
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
        this.caseTransfer.flag = true
      }
    },
    components: {
      DataBox,
      CostFollow,
      CaseOriginInfo,
      // 案件详情
      DetailsTab,
      CustInform,
      PayInform,
      AttachInform,
      LoadedNotice,
      DataFillForm
    },
    mounted() {
      net.send({
        server: server.RepairManage.client_name
      }).then((data) => {
        // 接口返回的数据
        this.dataPrinc = data
      }, err => {
        this.$message({
          type: 'info',
          message: err.reason
        })
      })
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>


</style>

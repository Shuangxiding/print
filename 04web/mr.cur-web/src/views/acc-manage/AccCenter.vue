<template>
  <div class="page">
    <navHeader simple></navHeader>
    <el-row type="flex" style="padding-top:24px;">
      <el-col style="flex-basis:360px;flex-grow:0;max-width:360px;">
        <div class="shadow" style="background:white;padding-bottom:10px;">

          <!--案件列表-->
          <div class="row middle-span" style="height:60px;background:#41586e;padding:0 10px;color:white">
            案件列表
          </div>
          <data-box :buttonWidth="100" :size="10" ref="databox" :params="caseListParams" :defaultParams="caseListDefault" :server="servers.getCaseList" row-key="caseNum">
            <template slot="input">
              <el-form-item label="催收状态">
                <el-select v-model="caseListParams.cupoStatus" clearable>
                  <el-option v-for="{id,name} in this.$helper.getTypeCode('0018')" :key="id" :label="name" :value="id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户姓名">
                <el-input v-model="caseListParams.custName" min-width="40"></el-input>
              </el-form-item>
            </template>
            <template slot="column" @success="refreshCaseList">
              <el-table-column label="案件编号" prop="cupoCasenum" min-width="110">
                <template scope="scope">
                  <el-button type="text" @click="loadingRefresh(scope.row)">{{scope.row.cupoCasenum}}</el-button>
                  <!--<a type='text' :href="`/acc-center/${type}/${scope.row.cupoId}/${scope.row.cupoCasenum}/${scope.row.custId}`">{{scope.row.cupoCasenum}}</a>-->
                </template>
              </el-table-column>
              <el-table-column label="客户姓名" prop="custName" min-width="80">
              </el-table-column>
              <el-table-column label="案件金额" prop="cupoAmt" min-width="70"></el-table-column>
              <el-table-column label="催收状态" prop="cupoStatus" min-width="70">
                <template scope="scope">
                  <el-popover trigger="hover" placement="bottom" v-if="scope.row.cupoStatus===57">
                    <p class="text-left">还款金额: {{ getRepayNum(scope) }}元</p>
                    <p class="text-left">还款日期: {{ getRepayDate(scope) }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text" style="color:green">{{scope.row.cupoStatus | typeCodeConvert('0018')}}</el-button>
                    </div>
                  </el-popover>
                  <span v-else>{{scope.row.cupoStatus | typeCodeConvert('0018')}}</span>
                </template>
              </el-table-column>
            </template>
          </data-box>
        </div>
      </el-col>
      <el-col class="col-span acc-info">
        <!--信息区域-->
        <div class="shadow user-info" style="height:110px;">
          <div class="row between-span" style="height:66px;line-height:66px;background:#f5f5f5;padding:0 20px">
            <div class="userName">
              <span class="block-flag">  
              </span>{{custInfo.custName}}
            </div>
            <div :span="1" class="bold font-14">{{custInfo.sex}}</div>
            <div :span="1" class="bold font-14">{{custInfo.age}}</div>
            <div :span="2" class="bold userPhone" v-if="$store.state.accManage.type_id===69"><span @click="telClick()">{{custInfo.custMobile}}</span>
            </div>
            <div :span="2" class="bold userPhone" v-else>{{custInfo.custMobile}}
            </div>

            <div :span="4" class="bold userAddress" :offset="1" style="min-width:180px">
              <el-tooltip class="item" effect="dark" :content="custInfo.homeAddress" placement="top-start">
                <span @click="saveAddress">{{custInfo.homeAddress|ellipsis(15)}}</span>
              </el-tooltip>
              <span @click="saveAddress" class="iconfont icon-dingwei green"></span>
            </div>
            <div :span="3">
              <span class="label-color">还款状态:</span>
              <span class="payState bold"> {{caseInfo.cupoPaystatus}}</span>
            </div>
            <div>
              <span class="label-color">逾期天数:</span>
              <span class="overDay bold">{{caseInfo.cupoOverday}}</span>天
            </div>
            <div>
              <el-button @click="bindPhoneClick" v-if="$store.state.accManage.type_id===69">绑定主叫号码</el-button>
              <!--<el-button @click="dialog.checkAccTemplate=true" v-if="$store.state.accManage.type_id===69">查看电催话术</el-button>-->
              <el-button @click="casedetailsClick">查看案件详情</el-button>
            </div>
          </div>
          <el-row :gutter="30" style="height:44px;line-height:44px;padding:0 30px">
            <el-col class="row between-span" :span="11">
              <div>
                <span class="label-color">逾期还款金额:</span>
                <span class="overAmount">{{caseInfo.cupoAmt}}</span>
                <span class="overAmountUnit">元</span>
              </div>
              <el-button type="text" @click="dialog.showOverPayDialog=true">逾期还款</el-button>
            </el-col>
            <el-col class="row middle-span center-span" style="height:100%;" :span="2">
              <div class="split"></div>
            </el-col>
            <el-col class="row between-span" :span="11">
              <div>
                <span class="label-color">提前结清应还款金额:</span>
                <span class="earlyAmount">{{caseInfo.cupoEarlymoney}}</span>
                <span class="earlyAmountUnit">元</span>
              </div>
              <el-button type="text" @click="dialog.showEarlyPayDialog=true">提前结清</el-button>
            </el-col>
            <!--<el-col :span="8">
              <el-popover placement="bottom" width="200" trigger="hover">
                <div style="padding:5px;" class="col" v-if="bankInfo">
                  <div class="row">
                    <div class="col">账户类型:</div>
                    <div class="col">{{bankInfo.accountType}}</div>
                  </div>
                  <div class="row">
                    <div class="col">开户城市:</div>
                    <div class="col">{{bankInfo.depositCity}}</div>
                  </div>
                  <div class="row">
                    <div class="col">开户银行:</div>
                    <div class="col">{{bankInfo.depositBank}}</div>
                  </div>
                  <div class="row">
                    <div class="col">银行卡号:</div>
                    <div class="col">{{bankInfo.cardNumber}}</div>
                  </div>
                  <div class="row">
                    <div class="col">开户支行:</div>
                    <div class="col">{{bankInfo.depositBankBra}}</div>
                  </div>
                </div>
                <el-button type="text" slot="reference" class="bold">查看开户信息</el-button>
              </el-popover>
            </el-col>-->
          </el-row>
        </div>

        <!--电催信息-->
        <el-tabs v-if="showCall" class="shadow" value="origin-call-info">
          <el-tab-pane label="联系人信息" name="origin-call-info">
            <origin-call-info ref="originCallInfo" @repair="$refs['addcallRecord'].callRecord()" @repairRecordRefresh="$refs['repairRefresh'].repairRecord()" @mesRecordRefresh="$refs['sendMessageRecord'].refreshMessage()"></origin-call-info>
          </el-tab-pane>
          <el-tab-pane label="修复信息" name="case-repair-info">
            <call-repair-info @repair="$refs['addcallRecord'].callRecord()" ref='repairRefresh' @assistRecordRefresh="$refs['RefreshAssistRecord'].assistRefresh()"></call-repair-info>
          </el-tab-pane>
        </el-tabs>

        <!--外访信息信息-->
        <el-tabs v-if="showVisit" class="shadow" value="origin-visit-info">
          <el-tab-pane label="地址信息" name="origin-visit-info">
            <origin-visit-info></origin-visit-info>
          </el-tab-pane>
          <el-tab-pane label="修复信息" name="visit-repair-info">
            <visit-repair-info ref="visitRepairInfo"></visit-repair-info>
          </el-tab-pane>
        </el-tabs>
        <el-row class="shadow">
          <follow-record @addfollow="$refs['addcallRecord'].addRecord()" ref="follow-record"></follow-record>
        </el-row>
        <!--数据记录-->
        <el-tabs class="shadow" :value="defaultTab">
          <el-tab-pane v-if="showCall" label="跟进记录" name="add-call-record">
            <add-call-record @load="getRepayData" @followrefresh="$refs['follow-record'].refresh()" ref="addcallRecord" @success="refreshCaseList"></add-call-record>
          </el-tab-pane>
          <el-tab-pane v-if="showVisit" label="跟进记录" name="add-visit-record">
            <add-visit-record @load="getRepayData" ref="addvisitRecord" @success="refreshCaseList" @followrefresh="$refs['follow-record'].refresh()"></add-visit-record>
          </el-tab-pane>
          <el-tab-pane label="案件还款" name="case-repay">
            <case-repay ref="refreshCaseRepay" @success="refreshCaseList"></case-repay>
          </el-tab-pane>
          <el-tab-pane label="协催申请记录" name="assist-application-record">
            <assist-application-record :typeId="typeId" ref='RefreshAssistRecord'></assist-application-record>
          </el-tab-pane>
          <el-tab-pane label="发送信息记录" name="send-message-record">
            <send-message-record ref='sendMessageRecord'></send-message-record>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!--预期还款弹出框-->
    <el-dialog :modal-append-to-body="false" title="逾期还款" v-model="dialog.showOverPayDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <over-pay @close="dialog.showOverPayDialog=false" @success="refreshCaseList" @refreshCaserepay="$refs['refreshCaseRepay'].refreshCase()"></over-pay>
    </el-dialog>

    <!--提前结清弹出框-->
    <el-dialog title="提前结清" @over="dialog.showOverPayDialog=false" v-model="dialog.showEarlyPayDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <early-pay @close="dialog.showEarlyPayDialog=false" @success="refreshCaseList" @refreshCaserepay="$refs['refreshCaseRepay'].refreshCase()"></early-pay>
    </el-dialog>

    <!--绑定主叫号码弹出框-->
    <el-dialog @open="bindPhoneCofirm" title="绑定主叫号码" size="tiny" @over="dialog.showBindPhoneDialog=false" v-model="dialog.showBindPhoneDialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <bind-phone @close="dialog.showBindPhoneDialog=false" ref="BindPhone"></bind-phone>
    </el-dialog>
    <!--逾期天数弹出框-->

    <!--查看电催话术弹出框-->
    <!--<el-dialog title="查看电催话术" size="tiny" v-model="dialog.checkAccTemplate" @open="CheckAccTemplateOpen" :close-on-click-modal="false" :close-on-press-escape="false">
      <check-acc-template ref="CheckAccTemplate"></check-acc-template>
    </el-dialog>-->

    <!--案件详情-->
    <el-dialog title="案件详情" v-model="dialog.caseDetailsFlag" size="full" @open="detailsOpen" :modal="false">
      <!--<case-details :custServers="cust" :attachServers="attach" ref="caseDetails" :custflag="custflag" :attachflag="attachflag"></case-details>-->
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
    <!--百度地图弹出框-->
    <el-dialog v-model="addBaiduMap" title="位置信息" size="small" @open="baiduOpen" :close-on-click-modal="false" :close-on-press-escape="false">
      <bd-map ref="bdmap"></bd-map>
    </el-dialog>
    <div v-show="loading.state" v-loading.body="loading.state" class="shield"></div>
  </div>
</template>
<script>
  // 基础组件引入
  import NavHeader from '@/components/NavHeader'
  import DataBox from '@/components/DataBox'
  // 弹出窗口引入
  import OverPay from '@/views/acc-manage/OverPay'
  import EarlyPay from '@/views/acc-manage/EarlyPay'
  import CheckAccTemplate from '@/views/acc-manage/CheckAccTemplate'

  // 子页面引入
  import CallRepairInfo from '@/views/acc-manage/CallRepairInfo'
  import OriginCallInfo from '@/views/acc-manage/OriginCallInfo'
  import VisitRepairInfo from '@/views/acc-manage/VisitRepairInfo'
  import OriginVisitInfo from '@/views/acc-manage/OriginVisitInfo'
  import AddCallRecord from '@/views/acc-manage/AddCallRecord'
  import AddVisitRecord from '@/views/acc-manage/AddVisitRecord'
  import CaseRepay from '@/views/acc-manage/CaseRepay'
  import AssistApplicationRecord from '@/views/acc-manage/AssistApplicationRecord'
  import SendMessageRecord from '@/views/acc-manage/SendMessageRecord'
  import BindPhone from '@/views/acc-manage/BindPhone'
  import FollowRecord from '@/views/acc-manage/FollowRecord'

  // 功能模块引入
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapState, mapMutations, mapActions } from 'vuex'

  // 案件详情
  import DetailsTab from '@/components/DetailsTab'
  import CustInform from '@/views/case-manage/CustInform'
  import PayInform from '@/views/case-manage/PayInform'
  import AttachInform from '@/views/case-manage/AttachInform'

  import BdMap from '@/components/BdMap'

  export default {
    name: 'acc-center',
    data() {
      return {
        allowFilter: 0,
        loading: {
          state: false
        },
        statusFlag: true,
        // 服务接口列表
        servers: {
          getCaseList: server.AccManage.get_case_list
        },
        // 案件列表参数
        caseListParams: {
          custName: '',
          cupoStatus: ''
        },
        // 弹出框状态
        dialog: {
          showOverPayDialog: false,
          showEarlyPayDialog: false,
          showBindPhoneDialog: false,
          checkAccTemplate: false,
          caseDetailsFlag: false
        },
        baiduMapInfo: {
          address: ''
        },
        addBaiduMap: false,
        // 承诺还款
        repayArr: [],
        typeId: '',
        type: '',
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
        }
      }
    },
    computed: {
      ...mapState({
        custId: state => state.accManage.cust_id,
        caseNum: state => state.accManage.case_num,
        custInfo: state => state.accManage.cust_info,
        caseInfo: state => state.accManage.case_info,
        bankInfo: state => state.accManage.cust_info.customerBankInfo
      }),
      showVisit() {
        return this.typeId === 70
      },
      showCall() {
        return this.typeId === 69
      },
      defaultTab() {
        this.loadParams()
        return this.typeId === 69 ? 'add-call-record' : 'add-visit-record'
      },
      caseListDefault() {
        let caseList = {}
        caseList.cupoRectype = this.typeId
        return caseList
      }
    },
    methods: {
      // 刷新数据
      loadingRefresh(row) {
        this.$router.replace(`/acc-center/${this.type}/${row.cupoId}/${row.cupoCasenum}/${row.custId}`)
        // 更新客户信息和案件信息
        this.saveCaseAndCustId({
          type: this.type,
          caseId: row.cupoId,
          caseNum: row.cupoCasenum,
          custId: row.custId
        })
        // 更新客户信息
        this.updateCustInfo()
        // 更新案件信息
        this.updateCaseInfo()

        this.validatePhone()
        this.getMessagetemplateInfo()
        this.getRepayData()

        if (this.typeId === 69) {
          this.$refs['repairRefresh'].refresh()
          this.$refs['addcallRecord'].refresh()
        }
        if (this.typeId === 70) {
          this.$refs['visitRepairInfo'].refresh()
          this.$refs['addvisitRecord'].refresh()
        }
        this.$refs['databox'].refresh()
        this.$refs['follow-record'].refresh()
        this.$refs['refreshCaseRepay'].refreshCase()
        this.$refs['RefreshAssistRecord'].refresh()
        this.$refs['sendMessageRecord'].refreshMessage()
      },
      /**
       * 打开百度地图
       */
      baiduOpen() {
        this.$nextTick(() => {
          this.$refs['bdmap'].addressToLngLat()
        })
      },
      /**
       * 保存地址信息
       */
      saveAddress() {
        this.addBaiduMap = true
        this.baiduMapInfo.address = this.custInfo.homeAddress
        this.$store.commit('updateBaiduMapInfo', this.baiduMapInfo)
      },
      /**
       * 案件列表 催收状态筛选
       */
      // filterTag(value, row) {
      //   console.log(this.allowFilter)
      //   if (this.allowFilter === 0) {
      //     let temp = this.caseListParams.cupoStatus
      //     this.caseListParams.cupoStatus = value
      //     this.$refs['databox'].handleQuery()
      //     this.caseListParams.cupoStatus = temp
      //   }
      //   this.allowFilter += 1
      //   console.log(this.allowFilter)
      //   this.allowFilter = this.allowFilter >= 10 ? 0 : this.allowFilter
      //   return true
      // },
      /**
       * 电话
       */
      telClick() {
        net.send({
          server: server.AccManage.call_phone_info,
          data: {
            taskId: this.$store.state.accManage.caller_info.taskId,
            customer: this.$store.getters.userInfo.userId,
            callee: this.custInfo.custMobile,
            caller: this.$store.state.accManage.caller_info.caller
          },
          loading: this.loading
        }).then((data) => {
          this.$store.commit('updateCallInfo', {
            follPhoneNum: this.custInfo.custMobile,
            // follContype: scope.row.phoneStatus,
            follCust: this.custInfo.custName,
            follTarget: 145,
            // 拨号接口返回数据
            follTaskid: data.taskRecoder.resultTaskId,
            follRecoderid: data.taskRecoder.id,
            follTaskcallerid: data.taskRecoder.taskId,
            follLoad: 0
          })
          this.$emit('repair')
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          /**
           * 打电话数据回显
           */
          this.$refs['addcallRecord'].callRecord()
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 案件详情Open
       */
      detailsOpen() {
        this.$nextTick(() => {
          this.$refs['payInform'].refresh(this.caseDetail.pay)
          this.$refs['attachInform'].refresh(this.caseDetail.attach)
          this.$refs['custInform'].refresh(this.caseDetail.cust)
        })
      },
      /**
       * 案件详情点击
       */
      casedetailsClick() {
        this.caseDetail.attach.custId = this.custId
        this.caseDetail.attach.orderNum = this.caseInfo.cupoOrdernum
        this.caseDetail.cust.custId = this.custId
        this.caseDetail.cust.idCardNumber = this.custInfo.idCardNumber
        this.caseDetail.pay.productId = this.caseInfo.cupoProid
        this.caseDetail.pay.cupoOrdernum = this.caseInfo.cupoOrdernum
        this.caseDetail.pay.orderNum = this.caseInfo.cupoOrdernum

        this.dialog.caseDetailsFlag = true
      },
      /**
       *获取承诺还款数据
       */
      getRepayData() {
        net.send({
          server: server.CaseManage.get_acc_recevice_pool_by_token
        }).then((data) => {
          this.repayArr = data
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       *获取承诺还款的金额
       */
      getRepayNum(scope) {
        let item = this.repayArr.find(x => x.cupoId === scope.row.cupoId)
        if (item) {
          return item.promiseAmt
        }
      },
      /**
       *获取承诺还款的日期
       */
      getRepayDate(scope) {
        let item = this.repayArr.find(x => x.cupoId === scope.row.cupoId)
        if (item) {
          return item.promiseDate
        }
      },
      /**
       * 绑定主叫号码
       */
      bindPhoneClick() {
        this.dialog.showBindPhoneDialog = true
      },
      bindPhoneCofirm() {
        this.$nextTick(() => {
          if (this.$store.state.accManage.caller_info.taskId) {
            this.$refs['BindPhone'].bindPhone()
          }
        })
      },
      refreshCaseList() {
        this.$refs['databox'].refresh()
      },
      // 添加Mutations
      ...mapMutations([
        'saveCaseAndCustId'
      ]),
      // 添加Actions
      ...mapActions([
        'updateCaseInfo',
        'updateCustInfo',
        'validatePhone',
        'getMessagetemplateInfo'
      ]),
      defaultParams() {
        this.loadParams()
        return {
          cupoRectype: this.typeId
        }
      },
      loadParams() {
        if (this.typeId !== '') return

        let { type } = this.$route.params
        this.type = type
        switch (type) {
          case 'visit-case':
            this.typeId = 70
            break
          case 'call-case':
            this.typeId = 69
            break
        }
      }
      // 查看电催话术Open
      // CheckAccTemplateOpen() {
      //   this.$nextTick(() => {
      //     this.$refs['CheckAccTemplate'].refresh()
      //   })
      // }
    },
    components: {
      // 基础组件
      NavHeader,
      DataBox,
      // 弹出组件
      OverPay, // 逾期还款
      EarlyPay, // 提前结清
      CheckAccTemplate, // 查看电催话术
      // 子页面组件
      CallRepairInfo, // 电催修复信息
      OriginCallInfo, //  原始电催信息
      VisitRepairInfo, // 外访修复信息
      OriginVisitInfo, // 原始外访信息
      AddCallRecord, // 外访跟进记录
      AddVisitRecord, // 电催跟进记录
      CaseRepay, // 案件还款
      AssistApplicationRecord, // 协催申请记录
      SendMessageRecord, // 消息发送记录
      BindPhone, // 绑定主叫号码
      FollowRecord, // 跟进记录信息
      // 案件详情
      DetailsTab,
      CustInform,
      PayInform,
      AttachInform,
      BdMap
    },
    /**
     * 创建周期业务逻辑
     */
    created() {
      // 更新客户信息和案件信息
      this.saveCaseAndCustId(this.$route.params)
      // 更新客户信息
      this.updateCustInfo()
      // 更新案件信息
      this.updateCaseInfo()
    },
    mounted() {
      // TODO: 异步加载所以有一定几率无法获取用户ID，用户ID需要存储在localstorage中
      this.validatePhone()
      this.getMessagetemplateInfo()
      this.getRepayData()
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../styles/variable.less';
  .acc-info>* {
    margin-bottom: 15px;
    padding: 5px;
  }
  
  .user-info {
    .block-flag {
      height: 12px;
      width: 12px;
      margin-right: 10px;
      display: inline-block;
      background: @-common-red;
    }
    .userName {
      color: @-common-red;
      font-weight: bold;
      font-size: 18px;
    }
    .userPhone {
      color: @-primary-color;
      font-size: 14px;
    }
    .userAddress {
      font-size: 14px;
    }
    .payState {
      font-size: 14px;
    }
    .overDay {
      font-size: 16px;
      color: @-common-red;
      margin-right: 0.5em;
    }
    .overAmount {
      font-size: 18px;
      color: @-common-red;
      font-weight: bold;
    }
    .overAmountUnit {
      font-size: 14px;
      color: @-common-red;
    }
    .earlyAmount {
      font-size: 18px;
      color: @-common-green;
      font-weight: bold;
    }
    .earlyAmountUnit {
      font-size: 14px;
      color: @-common-green;
    }
  }
  
  .green {
    color: @-common-green;
  }
  
  .label-color {
    color: @-font-color-light
  }
  
  .font-14 {
    font-size: 14px
  }
  
  .split {
    background: @-font-color-light;
    height: 20px;
    width: 1px;
  }
  
  .shield {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

</style>

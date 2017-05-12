<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.getCaseInfoPageList" row-key="cupoBatch" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="批次号" v-role="0x040405">
          <el-input v-model="params.batchNumber"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x040406">
          <el-select v-model="params.prinCode" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请省份" v-role="0x040407">
          <el-select v-model="params.province" placeholder="请选择" clearable>
            <el-option v-for="{id,areaName} in provinceList" :key="id" :label="areaName" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请城市" v-role="0x040408">
          <el-select v-model="params.city" placeholder="请选择" clearable>
            <el-option v-for="{id,areaName} in cityList" :key="id" :label="areaName" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名" v-role="0x040409">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="还款状态" v-role="0x040410">
          <el-select v-model="params.cupoPaystatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" v-role="0x040411" prop="overDueDays1" :rules="[
            { validator: validate.validateMin(params.overDueDays2), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueDays1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x040411" prop="overDueDays2" :rules="[
            { validator: validate.validateMax(params.overDueDays1), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueDays2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x040412">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x040413" prop="overDueAmount1" :rules="[
            { validator: validate.validateMin(params.overDueAmount2), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueAmount1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x040413" prop="overDueAmount2" :rules="[
            { validator: validate.validateMax(params.overDueAmount1), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueAmount2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="案件手数" v-role="0x040414" prop="caseHandnum1" :rules="[
            { validator: validate.validateMin(params.caseHandnum2), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.caseHandnum1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x040414" prop="caseHandnum2" :rules="[
            { validator: validate.validateMax(params.caseHandnum1), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.caseHandnum2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="佣金比例%" v-role="0x040415" prop="commissionRat1" :rules="[
            { validator: validate.validateMin(params.commissionRat2), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.commissionRat1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x040415" prop="commissionRat2" :rules="[
            { validator: validate.validateMax(params.commissionRat1), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.commissionRat2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="委案日期" v-role="0x040416">
          <el-date-picker v-model="params.caseDate1" type="date" placeholder="选择日期" :picker-options="caseDate1" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="-" v-role="0x040416">
          <el-date-picker v-model="params.caseDate2" type="date" placeholder="选择日期" :picker-options="caseDate2" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结案日期" v-role="0x040417">
          <el-date-picker v-model="params.endDate1" type="date" placeholder="选择日期" :picker-options="endDate1" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="-" v-role="0x040417">
          <el-date-picker v-model="params.endDate2" type="date" placeholder="选择日期" :picker-options="endDate2" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" v-role="0x040418">
          <el-select v-model="params.cupoStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0018')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum" :rules="[validate.truePhoneRules()]" v-role="0x040419">
          <el-input v-model="params.phoneNum"></el-input>
        </el-form-item>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="reAllocatClick" v-role="0x040401">重新分配</el-button>
        <el-button @click="exportButionClick" v-role="0x040402">导出跟进记录</el-button>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号" min-width="90">
          <template scope="scope">
            <el-button type="text" size="small" @click="casedetailsClick(scope)">{{scope.row.cupoCasenum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cupoBatch" label="批次号" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoCity" label="申请城市" min-width="60">
        </el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="55">
          <template scope="scope">
            <span>{{scope.row.custName | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPhone" label="手机号" min-width="80">
          <template scope="scope">
            <span>{{scope.row.cupoPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPaystatus" label="还款状态" min-width="55">
        </el-table-column>
        <el-table-column prop="cupoOverday" label="逾期天数" min-width="55">
        </el-table-column>
        <el-table-column prop="cupoAmt" label="案件金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoHandnum" label="案件手数" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoCharg" label="佣金比例(%)" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoPrindate" label="委案日期" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoEndday" label="结案日期" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoDeptname" label="机构名称" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoName" label="催收员" min-width="50">
          <template scope="scope">
            <span>{{scope.row.cupoName || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoStatus" label="状态" min-width="55">
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
        <el-table-column label="操作" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="followRecord(scope)" v-role="0x040403" v-if="scope.row.cupoStatus!==62">跟进记录</el-button>
            <el-button type="text" size="small" @click="caseTransferClick(scope)" v-role="0x040404" v-if="scope.row.cupoStatus!==62">案件流转记录</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-->
    <el-dialog title="选择催收机构或催收员" v-model="accUserDialogsVisual" class="dialog-middle" @close="chooseClose" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <allot-include-tree @close="accUserDialogsVisual=false" @org="orgflag=true" @user="userflag=true" ref="allotTree"></allot-include-tree>
    </el-dialog>
    <!--案件详情-->
    <el-dialog title="案件详情" v-model="caseDetailsFlag" size="full" @open="detailsOpen" :modal="false">
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
    <!--org-->
    <el-dialog title="案件分配" v-model="orgflag" @open="orgOpen" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col>
        <el-table :data="orgData">
          <el-table-column prop="org" label="分配机构" align="center" min-width="120"></el-table-column>
          <el-table-column prop="caseNumber" label="当前持有案件数" align="center" min-width="120"></el-table-column>
          <el-table-column prop="caseNum" label="确认分配案件数" align="center" min-width="120"></el-table-column>
        </el-table>
      </el-col>
      <el-col class="text-center btns">
        <el-button @click="orgPreStep">上一步</el-button>
        <el-button @click="orgConfirm">确认分配</el-button>
        <el-button @click="orgCancel">取消</el-button>
      </el-col>
    </el-dialog>
    <!--user-->
    <el-dialog title="案件分配" v-model="userflag" @open="userOpen" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col class="el-alert el-alert--info" style="margin-bottom:20px">
        <el-col class="el-alert__content">
          <span class="el-alert__title">当前已选择{{multipleSelection.length}}个案件，已分配案件{{allocated}}个，还剩余{{multipleSelection.length-allocated}}个案件待分配。</span>
        </el-col>
      </el-col>
      <el-table :data="cupor" height="400" min-width="595">
        <el-table-column type="index" label="序号" align="center" width="65"></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center" min-width="100"></el-table-column>
        <el-table-column prop="realName" label="催收员" align="center" min-width="100"></el-table-column>
        <el-table-column prop="caseNumber" label="当前持有案件数" align="center" min-width="120"></el-table-column>
        <el-table-column label="确认分配案件数" align="center" min-width="150">
          <template scope="scope">
            <el-input :min="0" size="small" type="number" :maxlength="2" class="batch" v-model="scope.row.distributionCount" :max="inputMax(scope)" @focus="inputFocus(scope)" @blur="batchInputChange(scope)">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-col class="text-center btns">
        <el-button @click="userPreStep">上一步</el-button>
        <el-button @click="userConfirm">确认分配</el-button>
        <el-button @click="userflag = false">取消</el-button>
      </el-col>
    </el-dialog>
    <!--弹出框：跟进记录START-->
    <el-dialog title="跟进记录" @open="custFollowOpen" v-model="followUpRecordClickHandle" size="large" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <cost-follow ref="costFollow"></cost-follow>
    </el-dialog>
    <!--弹出框：跟进记录END-->
    <!--弹出框：案件流转记录-->
    <el-dialog title="案件流转记录" v-model="caseTransfer.flag" size="small" @close="caseTransfer.data = []">
      <el-col class="text-center" style="padding:20px 20px 30px 20px">
        <el-steps :space="150" :active="caseTransfer.data.length-1" process-status="success" v-if="caseTransfer.data.length > 0">
          <el-step v-for="item in caseTransfer.data" :title="titleAndName(item)" :key="item.index" :description="item.createTime" style="float: left;margin-bottom: 10px;width:150px"></el-step>
        </el-steps>
        <el-col v-else class="text-center">暂无数据</el-col>
      </el-col>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import AllotIncludeTree from '@/views/case-manage/AllotIncludeTree'
  import net from '@/util/net'
  import CostFollow from '@/views/approval-manage/CostFollow'
  // import CaseDetails from '@/views/case-manage/CaseDetails'
  import { getCityJson, validateMin, validateMax, downloadFile, truePhoneRules } from '@/util/common'
  // 案件详情
  import DetailsTab from '@/components/DetailsTab'
  import CustInform from '@/views/case-manage/CustInform'
  import PayInform from '@/views/case-manage/PayInform'
  import AttachInform from '@/views/case-manage/AttachInform'

  export default {
    name: 'case-reallocate',
    data() {
      return {
        // 服务接口列表
        servers: {
          getCaseInfoPageList: server.CaseManage.get_case_info_page_list,
          distributeCeaseInfoAgin: server.CaseManage.distribute_cease_info_agin,
          getCaseNums: server.CaseManage.get_case_nums,
          getAccReceivePoolByUserId: server.CaseManage.get_acc_receive_pool_by_userId,
          getAccCaseinfoTranlog: server.CustomerManage.get_acc_case_info_tranlog,
          exportFollowup: server.CaseManage.export_acc_followup,
          getAccMoney: server.AccManage.get_acc_recevice_pool_by_token
        },
        // 定义请求参数
        params: {
          batchNumber: '',
          caseDate1: '',
          caseDate2: '',
          caseHandnum1: '',
          caseHandnum2: '',
          city: '',
          commissionRat1: '',
          commissionRat2: '',
          cupoName: '',
          cupoPaystatus: '',
          endDate1: '',
          endDate2: '',
          custName: '',
          overDueAmount1: '',
          overDueAmount2: '',
          overDueDays1: '',
          overDueDays2: '',
          prinCode: '',
          province: '',
          cupoStatus: '',
          phoneNum: '',
          sort: 'cupoCasenum,asc'
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        provinceList: getCityJson({ level: 1 }), // 省份列表
        multipleSelection: [],
        accUserDialogsVisual: false,
        // 机构
        orgflag: false,
        orgData: [],
        // 用户
        userflag: false,
        cupor: [],
        allocated: 0,
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
        caseDetailsFlag: false,
        /**
         * 获取委案日期
         */
        caseDate1: {
          disabledDate: (time) => {
            let endTime = this.params.caseDate2
            if (endTime) {
              return time.getTime() > endTime.getTime()
            }
          }
        },
        caseDate2: {
          disabledDate: (time) => {
            let startTime = this.params.caseDate1
            if (startTime) {
              return time.getTime() < startTime.getTime()
            }
          }
        },
        /**
         * 获取结案日期
         */
        endDate1: {
          disabledDate: (time) => {
            let endTime = this.params.endDate2
            if (endTime) {
              return time.getTime() > endTime.getTime()
            }
          }
        },
        endDate2: {
          disabledDate: (time) => {
            let startTime = this.params.endDate1
            if (startTime) {
              return time.getTime() < startTime.getTime()
            }
          }
        },
        // 跟进记录
        followUpRecordClickHandle: false,
        dataName: [],
        // 案件流转记录
        caseTransfer: {
          flag: false,
          data: []
        },
        repayArr: []
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
    deactivated() {
      this.caseDetailsFlag = false
    },
    mounted() {
      net.send({
        server: server.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      })
      this.getRepayData()
    },
    methods: {
      /**
       * 获取承诺还款的数据
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
       * 获取承诺还款的金额
       */
      getRepayNum(scope) {
        let item = this.repayArr.find(x => x.cupoId === scope.row.cupoId)
        if (item) {
          return item.promiseAmt
        }
      },
      /**
       * 获取承诺还款的日期
       */
      getRepayDate(scope) {
        let item = this.repayArr.find(x => x.cupoId === scope.row.cupoId)
        if (item) {
          return item.promiseDate
        }
      },
      /**
       * 流转记录title
       */
      titleAndName(item) {
        return `${item.userDep}(${item.catrUser})`
      },
      /**
       * 选择Close
       */
      chooseClose() {
        this.$refs['allotTree'].refresh()
      },
      /**
       * 机构分配Open
       */
      orgOpen() {
        this.$nextTick(() => {
          this.orgData = []
          let obj = {}
          net.send({
            server: this.servers.getCaseNums,
            data: {
              degrId: this.$store.state.caseManage.case_allot_org.deptId
            }
          }).then(data => {
            obj.caseNumber = data
            obj.org = this.$store.state.caseManage.case_allot_org.name
            obj.caseNum = this.multipleSelection.length
            this.orgData.push(obj)
          })
        })
      },
      /**
       * 用户分配Open
       */
      userOpen() {
        this.$nextTick(() => {
          let userIds = this.$store.state.caseManage.case_allot_user.map(v => {
            return v.userId
          })
          net.send({
            server: this.servers.getAccReceivePoolByUserId,
            data: {
              userIds: userIds
            }
          }).then(data => {
            if (data) {
              data = data.map(x => {
                x.distributionCount = 0
                return x
              })
              this.cupor = data
            } else {
              this.cupor = []
            }
          })
        })
      },
      /**
       * 用户分配确认
       */
      userConfirm() {
        let caseIdList = this.multipleSelection.map(v => {
          return v.cupoId
        })
        let caseNumList = this.cupor.map(v => {
          return v.distributionCount
        })
        let userNameList = this.cupor.map(v => {
          return v.userName
        })
        net.send({
          server: this.servers.distributeCeaseInfoAgin,
          data: {
            caseIdList: caseIdList,
            caseNumList: caseNumList,
            userNameList: userNameList,
            disType: 1
          }
        }).then((data) => {
          this.userflag = false
          this.$refs['databox'].refresh()
          this.$message({
            type: 'info',
            message: '分配成功！'
          })
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
        let max = ((this.multipleSelection.length - this.allocated) > 0) ? (this.multipleSelection.length - this.allocated) : 0
        return max
      },
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
      // 批量分配输入获取焦点
      inputFocus(scope) {
        this.cupor[scope.$index].distributionCount = 0
        this.updateAllocated()
      },
      /**
       * 输入框输入改变
       */
      batchInputChange(scope) {
        let item = this.cupor[scope.$index].distributionCount
        if (item < 0) {
          item = 0
        } else {
          let max = this.inputMax(scope)
          if (item > max) {
            item = max
          }
        }
        this.cupor[scope.$index].distributionCount = item
        this.updateAllocated()
      },
      /**
       * 组织机构分配上一步
       */
      orgPreStep() {
        this.orgflag = false
        this.accUserDialogsVisual = true
      },
      /**
       * 用户分配上一步
       */
      userPreStep() {
        this.userflag = false
        this.accUserDialogsVisual = true
      },
      /**
       * 组织机构分配确认
       */
      orgConfirm() {
        let caseIdList = this.multipleSelection.map(v => {
          return v.cupoId
        })
        let caseNumList = []
        caseNumList.push(this.multipleSelection.length)
        let depIdList = []
        depIdList.push(this.$store.state.caseManage.case_allot_org.deptId)
        net.send({
          server: this.servers.distributeCeaseInfoAgin,
          data: {
            caseIdList: caseIdList,
            caseNumList: caseNumList,
            depIdList: depIdList,
            disType: 0
          }
        }).then((data) => {
          this.orgflag = false
          this.$refs['databox'].refresh()
          this.$message({
            type: 'info',
            message: '分配成功'
          })
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 组织机构分配取消
       */
      orgCancel() {
        this.orgflag = false
      },
      /**
       * 重新分配
       */
      reAllocatClick() {
        this.multipleSelection = this.$refs['databox'].getCurrentSelection()
        if (this.multipleSelection.length === 0) {
          this.$alert('请选择要分配的案件', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.accUserDialogsVisual = true
        }
      },
      /**
       * 导出跟进记录
       */
      exportButionClick() {
        net.send({
          server: this.servers.exportFollowup,
          data: this.params
        }).then((data) => {
          // 接口返回的数据
          if (data) {
            downloadFile(data, '跟进记录')
          } else {
            this.$message({
              type: 'info',
              message: '暂无数据'
            })
          }
          // window.open(data, '_blank')
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 案件详情
       */
      casedetailsClick(scope) {
        console.log(scope)
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
       * 案件详情open事件
       */
      detailsOpen() {
        this.$nextTick(() => {
          this.$refs['payInform'].refresh(this.caseDetail.pay)
          this.$refs['attachInform'].refresh(this.caseDetail.attach)
          this.$refs['custInform'].refresh(this.caseDetail.cust)
        })
      },
      /**
       * 跟进记录
       */
      followRecord(scope) {
        this.$store.commit('updateFollowRecordCupoId', scope.row.cupoCasenum)
        this.followUpRecordClickHandle = true
      },
      custFollowOpen() {
        this.$nextTick(() => {
          this.$refs['costFollow'].refresh()
        })
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
          this.caseTransfer.data = data
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
      AllotIncludeTree,
      CostFollow,
      // CaseDetails,
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
  .btns {
    padding: 20px;
  }

</style>

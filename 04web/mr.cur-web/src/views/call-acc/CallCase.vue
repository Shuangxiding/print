<template>
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.search" row-key="cupoId" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名" prop="custName" v-role="0x010103">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x010104" prop="cupoAmtMin" :rules="[
            { validator: validate.validateMin(params.cupoAmtMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x010104" prop="cupoAmtMax" :rules="[
            { validator: validate.validateMax(params.cupoAmtMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMax" type="number"></el-input>
        </el-form-item>
        <!--<el-form-item label="还款状态" v-role="0x010105">
          <el-select v-model="params.cupoPaystatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="cupoPhone" :rules="[validate.truePhoneRules()]" v-role="0x010111">
          <el-input v-model="params.cupoPhone"></el-input>
        </el-form-item>-->
        <el-form-item label="逾期天数" v-role="0x010106" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x010106" prop="overDayMax" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x010107">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x010108">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x010109">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x010110">
          <el-select v-model="params.cupoStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0018')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="batchClick" v-role="0x010101">批量分配</el-button>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号">
          <template scope="scope">
            <router-link :to="{ path: `/acc-center/call-case/${scope.row.cupoId}/${scope.row.cupoCasenum}/${scope.row.custId}`}">{{scope.row.cupoCasenum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="60">
          <template scope="scope">
            <span>{{scope.row.custName | encryptName}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="cupoPhone" label="手机号" min-width="80">
          <template scope="scope">
            <span>{{scope.row.cupoPhone | encryptPhone}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="cupoAmt" label="案件金额(元)" min-width="80">
        </el-table-column>
        <!--<el-table-column prop="cupoPaystatus" label="还款状态" min-width="60">
        </el-table-column>-->
        <el-table-column prop="cupoOverday" label="逾期天数" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoBatch" label="批次号" min-width="90">
        </el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="70">
        </el-table-column>
        <el-table-column prop="cupoName" label="催收员" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoStatus" label="状态" min-width="75">
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
        <el-table-column prop="cupoFtime" sortable label="跟进时间" min-width="120">
        </el-table-column>
        <el-table-column prop="cupoGettime" label="案件流入日期" min-width="90">
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template scope="scope">
            <el-button @click="redistributeClick(scope)" type="text" size="small" v-role="0x010102">重新分配</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--批量分配-->
    <el-dialog title="批量分配" v-model="dialog.disabled" size="small" @open="loadData" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <MassDistribution @close="dialog.disabled=false" @refesh="refresh" ref="refresh" :multipleSelection="multipleSelection"></MassDistribution>
    </el-dialog>

    <!--重新分配-->
    <el-dialog title="选择催收专员" @open="loadCase" v-model="redialog.disabled" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <AgainDistribution @close="redialog.disabled=false" ref="loadnum" :cupodata="cupodata"></AgainDistribution>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import net from '@/util/net'
  import servers from '@/config/servers'
  import { validateMin, validateMax, truePhoneRules } from '@/util/common'
  import { mapState } from 'vuex'
  // 批量分配
  import MassDistribution from '@/views/call-acc/MassDistribution'
  // 重新分配
  import AgainDistribution from '@/views/call-acc/AgainDistribution'

  export default {
    name: 'call-case',
    data() {
      return {
        // 服务接口列表
        server: {
          search: servers.VisitAcc.post_outVisit_query
        },
        // 定义请求参数
        params: {
          custName: '',
          cupoAmtMin: '',
          cupoAmtMax: '',
          overDayMin: '',
          overDayMax: '',
          cupoBatch: '',
          prinId: '',
          cupoName: '',
          cupoId: '',
          cupoStatus: ''
          // cupoPaystatus: '',
          // cupoPhone: ''
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        defaultParams: {
          cupoRectype: '69',
          sort: 'cupoOverday,asc'
        },
        multipleSelection: [],
        todayPer: 0,
        numAmountObj: {},
        cupor: [],
        dialog: {
          disabled: false
        },
        redialog: {
          disabled: false
        },
        cupodata: '',
        batchArr: {},
        dataName: [],
        allocated: 0,
        // 承诺还款
        repayArr: []
      }
    },
    computed: {
      ...mapState({
        update: state => state.callAcc.update_time
      })
    },
    watch: {
      update() {
        this.$refs['databox'].refresh()
      }
    },
    methods: {
      /**
       * 刷新databox
       */
      refresh() {
        this.$refs['databox'].refresh()
      },
      /**
       * 获取催收专员案件数(批量分配)
       */
      loadData() {
        this.$nextTick(() => {
          this.$refs['refresh'].load()
        })
      },
      /**
       * 获取催收专员案件数(重新分配)
       */
      loadCase() {
        this.$nextTick(() => {
          this.$refs['loadnum'].loadCaseNum()
        })
      },
      /**
       * 获取承诺还款数据
       */
      getRepayData() {
        net.send({
          server: servers.CaseManage.get_acc_recevice_pool_by_token,
          cupoRectype: '69'
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
       * 批量分配
       */
      batchClick() {
        this.multipleSelection = this.$refs['databox'].getCurrentSelection()
        if (this.multipleSelection.length === 0) {
          this.$alert('请选择要分配的案件', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.dialog.disabled = true
        }
      },
      /**
       * 重新分配
       */
      redistributeClick(scope) {
        this.cupodata = scope.row
        this.redialog.disabled = true
      }
    },
    mounted() {
      /**
       * 获取承诺还款数据
       */
      this.getRepayData()
      net.send({
        server: servers.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      }, err => {
        this.$message({
          type: 'info',
          message: err.reason
        })
      })
    },
    components: {
      DataBox,
      MassDistribution,
      AgainDistribution
    }
  }

</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
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

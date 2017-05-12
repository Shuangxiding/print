<template>
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.search" row-key="cupoId">
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名" v-role="0x020205">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x020206" prop="cupoAmtMin" :rules="[
            { validator: validate.validateMin(params.cupoAmtMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x020206" :rules="[
            { validator: validate.validateMax(params.cupoAmtMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMax" type="number"></el-input>
        </el-form-item>
        <!--<el-form-item label="还款状态" v-role="0x020207">
          <el-select v-model="params.cupoPaystatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="逾期天数" v-role="0x020208" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x020208" prop="overDayMax" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x020209">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x020210">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x020211">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x020212">
          <el-select v-model="params.cupoStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0018')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="手机号" prop="cupoPhone" :rules="[validate.truePhoneRules()]" v-role="0x020213">
          <el-input v-model="params.cupoPhone"></el-input>
        </el-form-item>-->
        <el-form-item label="归属省份" v-role="0x020214">
          <el-select v-model="params.cupoPrid" clearable>
            <el-option v-for="{id,areaName} in provinceList" :key="id" :label="areaName" :value="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属城市" v-role="0x020215">
          <el-select v-model="params.prinCityid" clearable>
            <el-option v-for="{id,areaName} in cityList" :key="id" :label="areaName" :value="id"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="batchClick" v-role="0x020201">批量分配</el-button>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号" min-width="100">
          <template scope="scope">
            <router-link :to="{ path: `/acc-center/visit-case/${scope.row.cupoId}/${scope.row.cupoCasenum}/${scope.row.custId}`}">{{scope.row.cupoCasenum}}</router-link>
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
        <el-table-column prop="cupoBatch" label="批次号" min-width="100">
        </el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="105">
        </el-table-column>
        <el-table-column prop="cupoCity" label="归属城市" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoName" label="催收员" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoStatus" label="状态" min-width="105">
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
        <el-table-column prop="cupoGettime" label="案件流入日期" min-width="100">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template scope="scope">
            <el-button @click="hangClick(scope)" type="text" size="small" v-if="scope.row.cupoPause === 109" v-role="0x020202">挂起</el-button>
            <el-button @click="unhangClick(scope)" type="text" size="small" v-else v-role="0x020204">取消挂起</el-button>
            <el-button @click="redistributeClick(scope)" type="text" size="small" v-role="0x020203">重新分配</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--批量分配-->

    <el-dialog title="批量分配" v-model="dialog.disabled" size="small" @open="loadData">
      <!--<div class="el-alert el-alert--info" v-show="dialog.disabled" style="margin-bottom:20px;display: none;">
        <div class="el-alert__content">
          <span class="el-alert__title">当前已选择{{multipleSelection.length}}个案件，今日人均案件{{todayPer}}个。
                    已分配案件{{allocated}}个，还剩余{{multipleSelection.length-allocated}}个案件待分配。</span>
        </div>
      </div>
      <el-table :data="cupor" height="400" min-width="500">
        <el-table-column type="index" label="序号" align="center" width="40"></el-table-column>
        <el-table-column prop="userName" label="催收专员" align="center" min-width="60"></el-table-column>
        <el-table-column prop="caseCount" label="当前持有案件数" align="center" min-width="105"></el-table-column>
        <el-table-column label="可分配案件数" align="center" min-width="90">
          <template scope="scope">
            <span>{{(Math.ceil(todayPer-scope.row.caseCount)<0)?0:Math.ceil(todayPer-scope.row.caseCount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="确认分配案件数" align="center" min-width="105">
          <template scope="scope">
            <el-input :min="0" type="number" :maxlength="2" v-model="scope.row.distributionCount" class="batch" @focus="inputFocus(scope)" @blur="batchInputChange(scope)">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-col class="dialog-footer" align="center">
        <el-button @click="allConfirm">确认分配</el-button>
        <el-button @click="dialog.disabled = false">重选案件</el-button>
      </el-col>-->
      <MassDistribution @close="dialog.disabled=false" @refesh="refresh" ref="refresh" :multipleSelection="multipleSelection"></MassDistribution>
    </el-dialog>

    <!--重新分配-->

    <el-dialog title="选择催收专员" @open="loadCase" v-model="redialog.disabled" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <!--<el-col>
        <div class="header">当前催收员:{{redialog.cupor}}</div>
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
        <el-button @click="redialog.disabled = false">重选案件</el-button>
      </el-col>-->
      <AgainDistribution @close="redialog.disabled=false" ref="loadnum" :cupodata="cupodata"></AgainDistribution>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import net from '@/util/net'
  import servers from '@/config/servers'
  import { getCityJson, validateMin, validateMax, truePhoneRules } from '@/util/common'
  import { mapState } from 'vuex'
  // 批量分配
  import MassDistribution from '@/views/call-acc/MassDistribution'
  // 重新分配
  import AgainDistribution from '@/views/call-acc/AgainDistribution'

  export default {
    name: 'visit-case',
    data() {
      return {
        // 定义服务接口
        server: {
          search: servers.VisitAcc.post_outVisit_query,
          redistribution: servers.VisitAcc.post_redistribution,
          hangup: servers.VisitAcc.post_hangup
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
          cupoStatus: '',
          // cupoPaystatus: '',
          // cupoPhone: '',
          cupoCity: '',
          cupoPrid: '',
          prinCityid: ''
        },
        defaultParams: {
          cupoRectype: '70',
          sort: 'cupoOverday,asc'
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        multipleSelection: [],
        todayPer: 0,
        cupodata: '',
        numAmountObj: {},
        cupor: [],
        dialog: {
          disabled: false
        },
        provinceList: getCityJson({ level: 1 }), // 省份列表
        redialog: {
          disabled: false
        },
        batchArr: {},
        dataName: [],
        allocated: 0,
        // 承诺还款
        repayArr: []
      }
    },
    computed: {
      ...mapState({
        update: state => state.visitAcc.update_time
      }),
      /**
       * 获取2级城市列表
       */
      cityList() {
        return this.params.cupoPrid ? getCityJson({ level: 1, parentId: this.params.cupoPrid }) : []
      }
    },
    watch: {
      update() {
        this.getRepayData()
        this.$refs['databox'].refresh()
      }
    },
    activated() {
      this.$refs['databox'].refresh()
    },
    methods: {
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
       * 刷新databox
       */
      refresh() {
        this.$refs['databox'].refresh()
      },
      /**
       * 获取承诺还款数据
       */
      getRepayData() {
        net.send({
          server: servers.CaseManage.get_acc_recevice_pool_by_token,
          cupoRectype: '70'
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
      tableCheck(row, i) {
        console.log(row)
        return false
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
       * 挂起
       */
      hangClick(scope) {
        this.$confirm('该客户被挂起后，就一直停留在此逾期阶段。您确定要挂起吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: this.server.hangup,
            data: {
              cupoId: scope.row.cupoId,
              cupoPause: 1
            }
          }).then(() => {
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '案件挂起成功!'
            })
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      /**
       * 取消挂起
       */
      unhangClick(scope) {
        this.$confirm('您确定要取消挂起吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: this.server.hangup,
            data: {
              cupoId: scope.row.cupoId,
              cupoPause: 2
            }
          }).then(() => {
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '案件取消挂起成功!'
            })
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
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

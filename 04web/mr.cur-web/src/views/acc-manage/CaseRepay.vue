<template>
  <!--案件还款-->
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="servers.getInformation" row-key="payaId" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="申请日期">
          <el-date-picker v-model="params.minApplyDate" type="date" placeholder="选择日期" :picker-options="minApplyDate" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker v-model="params.maxApplyDate" type="date" placeholder="选择日期" :picker-options="maxApplyDate" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还款类型">
          <el-select v-model="params.payaType" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0032','0039')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-select v-model="params.payaResult" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0041')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="params.payaStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0019')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--按钮区域-->
      <template slot="button">
        <el-button @click="endcaseClick">结案</el-button>
      </template>
      <!--数据列区域-->
      <template slot="column">
        <el-table-column width="30" type="index" label="序号"></el-table-column>
        <el-table-column prop="payaApplyDate" label="申请时间" min-width="120">
        </el-table-column>
        <el-table-column prop="payaPayNum" label="还款金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="payaType" label="还款类型" min-width="80">
          <template scope="scope">
            <span>{{scope.row.payaType | typeCodeConvert('0032','0039')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaDelaynum" label="减免金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="payaStyle" label="还款方式" min-width="80">
          <template scope="scope">
            <span>{{scope.row.payaStyle | typeCodeConvert('0027')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaResult" label="审核结果" min-width="80">
          <template scope="scope">
            <span>{{scope.row.payaResult | typeCodeConvert('0041')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaStatus" label="状态" min-width="80">
          <template scope="scope">
            <span>{{scope.row.payaStatus | typeCodeConvert('0019')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payaEmpName" label="申请人" min-width="60">
        </el-table-column>
        <el-table-column label="凭证" min-width="80">
          <template scope="scope">
            <el-button @click="CheckVoucherClick(scope)" type="text" size="small">查看凭证</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="70">
          <template scope="scope">
            <el-button @click="WithdrawClick(scope)" type="text" size="small" v-if="scope.row.payaStatus===66||scope.row.payaStatus===64">撤回</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-->
    <!--结案-->
    <el-dialog title="结案" v-model="endcase" ref="enddata" size="small" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <template style="padding-bottom:20px">
        <data-grid iconClass="icon" :labelWidth="100" labelAlign="left" contentAlign="left">
          <data-grid-item label="客户姓名：" :span="6">{{custInfo.custName}}</data-grid-item>
          <data-grid-item label="身份证号：" :span="6">{{caseInfo.cupoIdcard}}</data-grid-item>
          <data-grid-item label="合同金额：" :span="6">{{caseInfo.cupoContnum}}</data-grid-item>
          <data-grid-item label="逾期天数：" :span="6">{{caseInfo.cupoOverday}}</data-grid-item>
          <data-grid-item label="案件金额：" :span="6">{{caseInfo.cupoAmt}}</data-grid-item>
          <data-grid-item label="实际还款金额：" :span="6">{{caseInfo.cupoPaysum}}</data-grid-item>
        </data-grid>
        <el-form ref="repairApp" label-width="100px" style="margin-top:20px">
          <el-form-item label="结案说明" :rules="[
      { required: true, message: '请选择电话状态', trigger: 'blur'}]">
            <el-input type="textarea" v-model="forms.cupoRemark"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="actionCommit">确定</el-button>
        <el-button @click="endcase=false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'
  import { mapMutations, mapState } from 'vuex'
  import { downloadFile } from '@/util/common'

  export default {
    name: 'case-repay',
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        servers: {
          getInformation: servers.CaseManage.get_case_reimbursement_info,
          getPayProof: servers.ApprovalManage.get_pay_proof
        },
        items: [],
        custId: '',
        forms: {
          cupoRemark: ''
        },
        params: {
          payaApplyDate: '',
          payaPayNum: '',
          payaType: '',
          payaDelaynum: '',
          payaStyle: '',
          payaStatus: '',
          payaEmpName: '',
          payaResult: '',
          payaId: '',
          minApplyDate: '',
          maxApplyDate: '',
          sort: 'payaApplyDate,desc'
        },
        defaultParams: {
          cupoId: this.$store.state.accManage.case_id
        },
        endcase: false
      }
    },
    computed: {
      ...mapState({
        custInfo: state => state.accManage.cust_info,
        caseInfo: state => state.accManage.case_info,
        type: state => state.accManage.type
      }),
      check_img_dialog: {
        get() {
          return this.$store.state.app.check_img_dialog
        },
        set(val) {
          this.$store.commit('updateCheckImgDialog', val)
        }
      },
      check_img_url: {
        get() {
          return this.$store.state.app.check_img_url
        },
        set(val) {
          this.$store.commit('updateCheckImgUrl', val)
        }
      }
    },
    methods: {
      ...mapMutations([
        'saveUpdateTime'
      ]),
      back() {
        this.saveUpdateTime()
        this.$router.push({ name: this.type })
      },
      /**
       * 申请日期
       */
      minApplyDate: {
        disabledDate: (time) => {
          let endTime = this.params.maxApplyDate
          if (endTime) {
            return time.getTime() > endTime.getTime()
          }
        }
      },
      maxApplyDate: {
        disabledDate: (time) => {
          let startTime = this.params.minApplyDate
          if (startTime) {
            return time.getTime() < startTime.getTime()
          }
        }
      },
      refreshCase() {
        this.defaultParams = Object.assign({}, {
          cupoId: this.$store.state.accManage.case_id
        })
      },
      /**
       * 结案
       */
      endcaseClick() {
        this.$confirm('案件结案后，将退出催收任务，您确定要结案吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.endcase = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结案'
          })
        })
      },
      /**
       * 结案确定
       */
      actionCommit() {
        if (this.forms.cupoRemark === '') {
          this.$alert('请输入结案说明', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.caseInfo.cupoPaysum < this.custInfo.cupoAmt) {
          this.$confirm('该案件实际还款金额小于案件金额，确定要结案吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.forms.caseId = this.$store.state.accManage.case_id
            net.send({
              server: servers.CaseManage.get_end_case_info,
              data: this.forms
            }).then((data) => {
              this.$alert('该案件成功结案，如需查看，请前往已处理记录！', '提示', {
                confirmButtonText: '知道了',
                type: 'sucess'
              })
              this.back()
              this.$emit('success')
            }, err => {
              this.$message({
                type: 'info',
                message: err.reason
              })
            })
            this.endcase = false
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消结案'
            })
          })
        } else {
          this.forms.caseId = this.$store.state.accManage.case_id
          net.send({
            server: servers.CaseManage.get_end_case_info,
            data: this.forms
          }).then((data) => {
            this.$alert('该案件成功结案，如需查看，请前往已处理记录！', '提示', {
              confirmButtonText: '知道了',
              type: 'sucess'
            })
            this.endcase = false
            this.$emit('success')
            this.back()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }
      },
      /**
       * 查看凭证
       */
      CheckVoucherClick(scope) {
        this.check_img_url = []
        net.send({
          server: this.servers.getPayProof,
          data: {
            payaId: scope.row.payaId
          }
        }).then((data) => {
          let urlArr = []
          if (data) {
            urlArr = data.filter((v, i) => {
              if (v.type === 'jpg' || v.type === 'png') {
                return true
              } else {
                downloadFile(v.localUrl, v.realName)
                return false
              }
            }).map(v => v.localUrl)
          }
          if (urlArr.length > 0) {
            this.check_img_dialog = true
            this.check_img_url = urlArr
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 撤回
       */
      WithdrawClick(scope) {
        this.params.payaId = scope.row.payaId
        this.$confirm('确定要撤回此条还款申请吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: servers.AccManage.withdraw_info,
            data: {
              payaId: this.params.payaId
              // cupoType: this.$store.state.accManage.type
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '案件已撤回'
            })
            this.$refs['databox'].refresh()
            this.$emit('success')
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回'
          })
        })
      }
    },
    components: {
      DataBox,
      DataGrid,
      DataGridItem
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

<template>
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.search" row-key="reapId" auto-search>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名">
          <el-input v-model="params.custName" v-role="0x020103"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x020104" prop="cupoAmtMin" :rules="[
            { validator: validate.validateMin(params.cupoAmtMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x020104" prop="cupoAmtMax" :rules="[
            { validator: validate.validateMax(params.cupoAmtMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="还款状态" v-role="0x020105">
          <el-select v-model="params.reapPaystatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x020106">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x020107">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" v-role="0x020108">
          <el-input v-model="params.reapEmpname"></el-input>
        </el-form-item>
        <el-form-item label="审批结果" v-role="0x020109">
          <el-select v-model="params.reapAppstatu" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0022')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="reapPhone" :rules="[validate.truePhoneRules()]" v-role="0x020110">
          <el-input v-model="params.reapPhone"></el-input>
        </el-form-item>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="reapOrdernum" label="案件编号" min-width="100">
        </el-table-column>
        <el-table-column prop="reapCust" label="客户姓名" min-width="60">
          <template scope="scope">
            <span>{{scope.row.reapCust | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reapPhone" label="手机号" min-width="80">
          <template scope="scope">
            <span>{{scope.row.reapPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reapAmt" label="案件金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="reapPaystatus" label="还款状态" min-width="60">
        </el-table-column>
        <el-table-column prop="reapOverday" label="逾期天数" min-width="60">
        </el-table-column>
        <el-table-column prop="reapBatch" label="批次号" min-width="100">
        </el-table-column>
        <el-table-column prop="reapPrincipal" label="委托方" min-width="105">
        </el-table-column>
        <el-table-column prop="reapEmpname" label="申请人" min-width="60">
        </el-table-column>
        <el-table-column prop="reapAppstatu" label="审批结果" min-width="60">
          <template scope="scope">
            <span>{{scope.row.reapAppstatu | typeCodeConvert('0022')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请日期" min-width="100">
        </el-table-column>
        <el-table-column label="操作" min-width="45">
          <template scope="scope">
            <div v-if="scope.row.reapAppstatu === 77">
              <el-button @click="applicateClick(scope)" type="text" size="small" v-role="0x020101">审批</el-button>
            </div>
            <div v-else>
              <el-button @click="checkClick(scope)" type="text" size="small" v-role="0x020102">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--查看-->

    <el-dialog title="查看" v-model="checkDialog.show" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col class="text-left">
        <el-form ref="form" :model="checkDialog.form" label-width="100px">
          <el-form-item label="协催说明">
            <el-input type="textarea" v-model="checkDialog.form.reapRemark" readonly></el-input>
          </el-form-item>
          <el-form-item label="审批结果">
            <el-radio-group v-model="checkDialog.form.reapAppstatu" disabled>
              <el-radio :label="78">同意</el-radio>
              <el-radio :label="79">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审批意见">
            <el-input type="textarea" v-model="checkDialog.form.reapOpinion" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-dialog>

    <!--审批-->

    <el-dialog title="协催审批" v-model="approvalDialog.show" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col class="text-left">
        <el-form ref="approvalForm" :model="approvalDialog.form" :rules="approvalDialog.rules" label-width="100px">
          <el-form-item label="协催说明">
            <el-input type="textarea" v-model="approvalDialog.form.reapRemark" readonly></el-input>
          </el-form-item>
          <el-form-item label="审批结果" prop="reapAppstatu">
            <el-radio-group v-model="approvalDialog.form.reapAppstatu">
              <el-radio label="agree">同意</el-radio>
              <el-radio label="refuse">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审批意见" prop="reapOpinion">
            <el-input type="textarea" v-model="approvalDialog.form.reapOpinion"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-button @click="confirmApply">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import net from '@/util/net'
  import servers from '@/config/servers'
  import { validateMin, validateMax, truePhoneRules } from '@/util/common'
  import { mapState } from 'vuex'

  export default {
    name: 'assist-application',
    data() {
      return {
        // 服务接口列表
        server: {
          search: servers.VisitAcc.post_AssistApply_query,
          apply: servers.VisitAcc.post_AssistApply
        },
        // 定义请求参数
        params: {
          custName: '',
          cupoAmtMin: '',
          cupoAmtMax: '',
          cupoBatch: '',
          prinId: '',
          reapAppstatu: '',
          reapPaystatus: '',
          reapEmpname: '',
          reapPhone: ''
        },
        defaultParams: {
          sort: 'createTime,desc'
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        checkDialog: {
          show: false,
          form: {
            reapRemark: '',
            reapOpinion: '',
            reapAppstatu: null
          }
        },
        approvalDialog: {
          show: false,
          type: '同意',
          disabled: false,
          id: 0,
          form: {
            reapRemark: '',
            reapOpinion: '',
            reapAppstatu: null
          },
          // 数据校验规则
          rules: {
            reapAppstatu: [
              { required: true, message: '请选择审批结果', trigger: 'change' }
            ],
            reapOpinion: [
              { required: true, message: '请输入审批意见', trigger: 'blur' }
            ]
          }
        },
        dataName: []
      }
    },
    computed: {
      ...mapState({
        update: state => state.visitAcc.update_time
      })
    },
    watch: {
      update() {
        this.$refs['databox'].refresh()
      }
    },
    mounted() {
      net.send({
        server: servers.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      })
    },
    methods: {
      /**
       * 取消
       */
      cancel() {
        this.approvalDialog.show = false
        this.$refs['approvalForm'].resetFields()
      },
      /**
       * 审批
       */
      applicateClick(scope) {
        this.dialogRefresh()
        this.approvalDialog.id = scope.row.reapId
        this.approvalDialog.show = true
        this.approvalDialog.form.reapRemark = scope.row.reapRemark
      },
      /**
       * 查看
       */
      checkClick(scope) {
        this.checkDialog.show = true
        this.checkDialog.form = scope.row
      },
      /**
       * 确认
       */
      confirmApply() {
        this.$refs['approvalForm'].validate((valid) => {
          if (valid) {
            net.send({
              server: this.server.apply,
              data: {
                id: this.approvalDialog.id,
                result: this.approvalDialog.form.reapAppstatu,
                reapOpinion: this.approvalDialog.form.reapOpinion
              }
            }).then(data => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.$refs['databox'].refresh()
              this.$refs['approvalForm'].resetFields()
              this.approvalDialog.show = false
            }, err => {
              this.$message({
                type: 'info',
                message: err.reason
              })
            })
          } else {
            return false
          }
        })
      },
      /**
       * 审批弹窗重置
       */
      dialogRefresh() {
        this.approvalDialog.form = {
          reapRemark: '',
          reapOpinion: '',
          reapAppstatu: null
        }
      }
    },
    components: {
      DataBox
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-left {
    text-align: left;
    padding-bottom: 20px;
  }
  
  .dialog-footer {
    text-align: center;
  }

</style>

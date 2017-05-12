<template>
  <!--减免审批-->
  <div>
    <el-col class="frame" :params="params" ref="dataGrid">
      <data-grid iconClass="icon" :labelWidth="80" labelAlign="right" contentAlign="center">
        <data-grid-item label="客户姓名：" :span="4">{{ params.accDerateApply.orapCustName }}</data-grid-item>
        <data-grid-item label="身份证号：" :span="4">{{ params.cupoIdcard }}</data-grid-item>
        <data-grid-item label="手机号：" :span="4">{{ params.accDerateApply.orapPhone }}</data-grid-item>
        <data-grid-item label="合同金额(元)：" :span="4">{{ params.cupoContnum }}</data-grid-item>
        <data-grid-item label="期数(期)：" :span="4">{{ params.cupoPeriods }}</data-grid-item>
        <data-grid-item label="逾期天数：" :span="4">{{ params.cupoOverday }}</data-grid-item>
        <data-grid-item label="逾期还款应还总额：" :labelWidth="200" :span="12"></data-grid-item>
        <data-grid-item label="逾期应支付本金：" :labelWidth="200" :span="12"></data-grid-item>
        <data-grid-item label="应支付利息：" :labelWidth="200" :span="12"></data-grid-item>
        <data-grid-item label="应支付逾期罚息：" :labelWidth="200" :span="12"></data-grid-item>
        <data-grid-item label="应支付逾期还款合同违约金：" :labelWidth="200" :span="12"></data-grid-item>
        <data-grid-item label="应支付分期服务费：" :labelWidth="200" :span="12"></data-grid-item>
        <data-grid-item label="减免费用小计：" :labelWidth="200" :span="12">{{params.accDerateApply.orapDelayNum}}</data-grid-item>
        <data-grid-item label="减免费用备注：" :labelWidth="200" :span="12">{{ params.accDerateApply.orapRemark }}</data-grid-item>
        <data-grid-item label="审批结果：" :labelWidth="200" :span="12">
          <template>
            <el-radio class="radio" :label="53" v-model="commit.orapStatus">同意</el-radio>
            <el-radio class="radio" :label="54" v-model="commit.orapStatus">拒绝</el-radio>
          </template>
        </data-grid-item>
        <data-grid-item ref="opinion" :labelWidth="200" label="审批意见：" :span="12">
          <el-input type="textarea" v-model="commit.orapOpinion"></el-input>
        </data-grid-item>
      </data-grid>
    </el-col>
    <el-col style="padding:20px 0">
      <el-button @click="confirmHandle">确定</el-button>
      <el-button @click="cancleHandle">取消</el-button>
    </el-col>
  </div>
</template>

<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'cost-approval',
    data() {
      return {
        orapStatus: '',
        // 服务接口列表
        servers: {
          approval: server.ApprovalManage.get_handle_derate
        },
        // 定义请求参数
        params: {
          accDerateApply: {
            createTime: '',
            creator: '',
            cupoId: '',
            custId: '',
            deapId: '',
            orapApplyDate: '',
            orapBatch: '',
            orapCustName: '',
            orapDelay: '',
            orapDelayNum: '',
            orapEmpName: '',
            orapName: '',
            orapOpinion: '',
            orapOrdernum: '',
            orapPayStatus: '',
            orapPaynum: '',
            orapPhone: '',
            orapPrincipal: '',
            orapRemark: '',
            orapStatus: '',
            orapStyle: '',
            payaId: '',
            prinId: '',
            userId: ''
          },
          cupoContnum: '',
          cupoIdcard: '',
          cupoOverday: '',
          cupoPeriods: ''
        },
        commit: {
          orapStatus: '',
          orapOpinion: ''
        },
        multipleSelection: []
      }
    },
    props: [
      'audit'
    ],
    components: {
      DataGrid,
      DataGridItem
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      approval_click: {
        get() {
          return this.$store.state.approvalManage.approval_click
        },
        set(val) {
          this.$store.commit('updateApprovalClick', val)
        }
      }
    },
    mounted() {
      net.send({
        server: server.ApprovalManage.get_handle_derate,
        data: {
          deapId: this.audit.deapId
        }
      }).then((data) => {
        this.params = data[0]
      }, err => {
        console.log(err)
      })
    },
    methods: {
      ...mapMutations([
        'approvalSaveUpdateTime'
      ]),
      /**
       * 确定
       */
      confirmHandle() {
        this.params.orapStatus = this.orapStatus
        console.log(this.commit.orapStatus)
        if (this.commit.orapStatus === '') {
          this.$message({
            type: 'info',
            message: '请选择审批结果'
          })
          return false
        }
        if ((this.commit.orapStatus === 54) && (this.commit.orapOpinion === '')) {
          this.$message({
            type: 'info',
            message: '请输入审批意见'
          })
          return false
        }
        net.send({
          server: server.ApprovalManage.put_update_derate,
          data: {
            userId: this.userInfo.userId,
            orapName: this.userInfo.realName,
            orapOpinion: this.commit.orapOpinion,
            orapStatus: this.commit.orapStatus,
            orapDelayNum: this.params.accDerateApply.orapDelayNum,
            payaId: this.params.accDerateApply.payaId,
            cupoId: this.params.accDerateApply.cupoId,
            deapId: this.params.accDerateApply.deapId
          }
        }).then((data) => {
          this.approval_click = false
          this.$message({
            type: 'info',
            message: '审批成功'
          })
          this.approvalSaveUpdateTime()
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 取消
       */
      cancleHandle() {
        this.approval_click = false
      },
      /**
       * 刷新
       */
      refresh() {
        this.commit = {
          orapStatus: '',
          orapOpinion: ''
        }
        net.send({
          server: server.ApprovalManage.get_handle_derate,
          data: {
            deapId: this.audit.deapId
          }
        }).then((data) => {
          this.params = data[0]
        }, err => {
          console.log(err)
        })
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

<template>
  <!--减免审批-->
  <div>
    <el-col class="frame" :params="params" ref="dataGrid">
      <data-grid iconClass="icon" :labelWidth="100" labelAlign="left" contentAlign="left">
        <data-grid-item label="客户姓名：" :span="4">{{ params.payaCustName }}</data-grid-item>
        <data-grid-item label="身份证号：" :span="4">{{ params.idCardNumber }}</data-grid-item>
        <data-grid-item label="手机号：" :span="4">{{ params.payaPhone }}</data-grid-item>
        <data-grid-item label="批次号：" :span="4">{{ params.payaBatch }}</data-grid-item>
        <data-grid-item label="委托方：" :span="4">{{ params.payaPrincipal }}</data-grid-item>
        <data-grid-item label="还款类型" :span="4">{{ params.payaType | typeCodeConvert }}</data-grid-item>
        <data-grid-item label="还款金额(元)：" :span="4">{{ params.payaPayNum }}</data-grid-item>
        <data-grid-item label="减免金额(元)：" :span="4">{{ params.orapDelayNum }}</data-grid-item>
        <data-grid-item label="还款方式：" :span="4">{{ params.payaStyle | typeCodeConvert }}</data-grid-item>
        <data-grid-item label="申请日期：" :span="4">{{ params.payaApplyDate }}</data-grid-item>
        <data-grid-item label="凭证：" :span="8">{{ params.loanDate }}
          <el-button type="text" @click="getPayProof">查看</el-button>
        </data-grid-item>
        <data-grid-item label="审批结果：" :span="12">
          <template>
            <el-radio class="radio" :label="67" :value="67" v-model="params.payaStatus">入账</el-radio>
            <el-radio class="radio" :label="68" :value="68" v-model="params.payaStatus">驳回</el-radio>
          </template>
        </data-grid-item>
        <data-grid-item ref="opinion" label="审批意见：" :span="12">
          <el-input type="textarea" v-model="params.payaOpinion"></el-input>
        </data-grid-item>
      </data-grid>
    </el-col>
    <el-col style="padding:10px 0 20px 0 ">
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
  // import { mapState, mapMutations, mapActions } from 'vuex'
  import { downloadFile } from '@/util/common'

  export default {
    name: 'review-reimbursement',
    data() {
      return {
        // 服务接口列表
        servers: {
          approval: server.ApprovalManage.get_reimbursement,
          getPayProof: server.ApprovalManage.get_pay_proof
        },
        // 定义请求参数
        params: {
          payaCustName: '',
          idCardNumber: '',
          payaPhone: '',
          payaBatch: '',
          payaPrincipal: '',
          periods: '',
          orapRemark: '',
          payaStatus: '',
          orapOpinion: '',
          userId: '',
          orapName: '',
          payaId: '',
          cupoId: '',
          payaOpinion: ''
        },
        multipleSelection: []
      }
    },
    components: {
      DataGrid,
      DataGridItem
    },
    computed: {
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
      },
      // 查看凭证
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
      /**
       * 查看凭证
       */
      getPayProof() {
        this.check_img_url = []
        net.send({
          server: this.servers.getPayProof,
          data: {
            payaId: this.repair_paya_id
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
      refresh() {
        net.send({
          server: server.ApprovalManage.get_reimbursement,
          data: {
            payaId: this.$store.state.approvalManage.repair_paya_id
          }
        }).then((data) => {
          // 更新数据信息
          this.params.payaCustName = data.payaCustName
          this.params.idCardNumber = data.idCardNumber
          this.params.orapDelayNum = data.orapDelayNum
          this.params.payaApplyDate = data.payaApplyDate
          this.params.payaBatch = data.payaBatch
          this.params.payaPayNum = data.payaPayNum
          this.params.payaPhone = data.payaPhone
          this.params.payaPrincipal = data.payaPrincipal
          this.params.payaStyle = data.payaStyle
          this.params.payaType = data.payaType
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 确定
       */
      confirmHandle() {
        if (this.params.payaStatus === '') {
          this.$alert('请选择审批结果', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        if ((this.params.payaStatus === 68) && (this.params.payaOpinion === '')) {
          this.$alert('请填写审批意见', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        net.send({
          server: server.ApprovalManage.get_process_audit_information,
          data: {
            payaStatus: this.params.payaStatus,
            payaOpinion: this.params.payaOpinion,
            cupoId: this.repair_cupoId,
            payaId: this.repair_paya_id
          }
        }).then((data) => {
          this.params.payaStatus = ''
          this.params.payaOpinion = ''
          this.$message({
            type: 'info',
            message: '审核成功'
          })
          this.$emit('auditClose')
          this.$reset()
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
        this.params.payaStatus = ''
        this.params.payaOpinion = ''
        this.$emit('auditClose')
        this.$reset()
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

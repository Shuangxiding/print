<template>
  <div class="page">
    <!--客户信息数据-->
    <data-grid class="data-grid" :labelWidth="70" labelAlign="center" contentAlign="left">
      <data-grid-item label="客户姓名:" :span="4">{{caseInfo.custName}}</data-grid-item>
      <data-grid-item label="身份证号:" :span="4">{{caseInfo.cupoIdcard}}</data-grid-item>
      <data-grid-item label="手机号:" :span="4">{{caseInfo.cupoPhone}}</data-grid-item>
      <data-grid-item label="合同金额(元):" :span="4">{{caseInfo.cupoContnum}}</data-grid-item>
      <data-grid-item label="期数(期):" :span="4">{{caseInfo.cupoSumper}}</data-grid-item>
      <data-grid-item label="逾期天数:" :span="4">{{caseInfo.cupoOverday}}</data-grid-item>
    </data-grid>

    <!--逾期还款数据-->
    <div class="header">
      提前结清应还总额:
      <span>{{(caseInfo.cupoEarlymoney).toFixed(2)}}元</span>
    </div>
    <data-grid class="data-grid" :labelWidth="100" labelAlign="center" contentAlign="left">
      <data-grid-item label="还款类型:" :span="12">
        <el-radio v-for="item of $helper.getTypeCode('0039')" :key="item.id" v-model="repayType" :label="item.id">{{item.name}}</el-radio>
      </data-grid-item>
      <data-grid-item label="减免金额:" :span="12" v-show="repayType===135">
        <el-row>
          <el-col :span="8">
            <el-input v-model="derateFee" :maxlength="10" placeholder="请输入减免金额" type="number" @change="degreeAmt" @blur="derate"></el-input>
          </el-col>
          <el-col :span="1" :offset="1">
            <span style="line-height:30px;">元</span>
          </el-col>
        </el-row>
      </data-grid-item>
      <data-grid-item label="减免费用备注:" :span="12" v-show="repayType===135">
        <el-input v-model="derateDescripton" type="textarea" placeholder="请输入内容"></el-input>
      </data-grid-item>
      <data-grid-item label="还款金额:" :span="12">
        <el-row>
          <el-col :span="8">
            <el-input v-model="repayAmount" placeholder="请输入内容" :readonly="repayType === 134||repayType === 135" type="number" @blur="repay"></el-input>
          </el-col>
          <el-col :span="1" :offset="1">
            <span style="line-height:30px;">元</span>
          </el-col>
        </el-row>
      </data-grid-item>
      <data-grid-item label="还款方式:" :span="12">
        <el-select v-model="repayMethod" placeholder="请选择">
          <el-option v-for="item of $helper.getTypeCode('0027')" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </data-grid-item>
      <data-grid-item label="上传凭证:" :span="12">
        <FileUpload ref="file-upload" multiple></FileUpload>
      </data-grid-item>
    </data-grid>

    <!--操作按钮-->
    <div class="row center-span" style="padding:10px 0;">
      <el-button @click="submitClick">确定</el-button>
      <el-button @click="cancelClick">取消</el-button>
    </div>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'
  import { mapState } from 'vuex'
  import FileUpload from '@/components/FileUpload'

  export default {
    name: 'early-pay',
    data() {
      return {
        repayType: '',
        repayAmount: '',
        repayMethod: '',
        uploadUrl: '',
        derateFee: '',
        derateDescripton: ''
      }
    },
    watch: {
      repayType() {
        if (this.repayType === 134) {
          this.repayAmount = (this.caseInfo.cupoEarlymoney).toFixed(2)
        } else {
          this.repayAmount = ''
        }
      }
    },
    computed: {
      ...mapState({
        caseInfo: state => state.accManage.case_info,
        caseNum: state => state.accManage.case_num,
        cupoRectype: state => state.accManage.type_id
      })
    },
    methods: {
      /**
       * 还款金额失去焦点事件（输入金额不小于0）
       */
      repay() {
        if (this.repayAmount < 0) {
          this.repayAmount = 0
        }
      },
      /**
       * 减免金额失去焦点事件(输入金额不小于0)
       */
      derate() {
        if (this.derateFee < 0) {
          this.derateFee = 0
        }
      },
      /**
       * 计算还款金额(减免提前结清)
       */
      degreeAmt() {
        if ((this.repayType === 135) && (this.derateFee > 0)) {
          this.repayAmount = (this.caseInfo.cupoEarlymoney - this.derateFee).toFixed(2)
          if (this.derateFee > this.caseInfo.cupoEarlymoney) {
            this.derateFee = (this.caseInfo.cupoEarlymoney).toFixed(2)
            this.repayAmount = 0
          }
        }
      },
      /**
       * 提交逾期还款
       */
      submitClick() {
        if (this.repayType === '' || this.repayAmount === '' || this.repayMethod === '') {
          this.$alert('还款类型，还款金额和还款方式为必填', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.repayAmount.length > 13) {
          this.$alert('还款金额不能超过十亿', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        net.send({
          server: server.AccManage.repayment,
          data: {
            payaType: this.repayType,
            paymentType: this.repayMethod,
            payAmt: this.repayAmount,
            cupoId: this.$store.state.accManage.case_id,
            cupoRectype: this.cupoRectype,
            derateFee: this.derateFee,
            derateDescripton: this.derateDescripton,
            fileIds: this.$refs['file-upload'].getFileList().map(x => x.id)
          }
        }).then(
          data => {
            this.$message({
              type: 'success',
              message: '还款成功'
            })
            this.$emit('success')
            this.$reset()
            this.$refs['file-upload'].reset()
            this.$emit('close')
          },
          err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          }
        )
        this.cancelClick()
      },
      /**
       * 取消按钮点击处理
       */
      cancelClick() {
        // 重置当前对象
        this.$reset()
        this.$refs['file-upload'].reset()
        this.$emit('close')
      }
    },
    components: {
      DataGrid,
      DataGridItem,
      FileUpload
    },
    mounted() {

    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../styles/variable.less';
  .data-grid {
    margin-bottom: 10px;
  }
  
  .header {
    border: solid 1px @-border-color;
    border-bottom: 0px;
    height: 40px;
    line-height: 40px
  }

</style>

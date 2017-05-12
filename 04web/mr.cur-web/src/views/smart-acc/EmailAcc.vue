<template>
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.search" row-key="cupoId" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名" v-role="0x030202">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数" v-role="0x030203" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x030203" prop="overDayMax" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x030204">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x030205">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x030206">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="batchClick" v-role="0x030201">电子邮件群发</el-button>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号" min-width="100">
        </el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="60">
          <template scope="scope">
            <span>{{scope.row.custName | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPhone" label="手机号" min-width="75">
          <template scope="scope">
            <span>{{scope.row.cupoPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoAmt" label="案件金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoPaystatus" label="还款状态" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoOverday" label="逾期天数" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoBatch" label="批次号" min-width="100">
        </el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="90">
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
        <el-table-column prop="cupoGettime" label="案件流入日期" min-width="90">
        </el-table-column>
      </template>
    </data-box>

    <!--电子邮件群发-->
    <el-dialog title="电子邮件群发" size="small" v-model="nextDialog.disabled" @open="emailBatchRefresh" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <email-batch-send ref="emailBatchSend" @close="nextDialog.disabled=false" @emailChange="emailChange"></email-batch-send>
    </el-dialog>
    <!--修改手机号-->
    <el-dialog title="修改邮箱地址" v-model="changePhone.flag" @open="changePhoneOpen" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col>
        <el-form :model="changePhoneForm" ref="phoneForm" label-width="100px">
          <el-form-item prop="phone" label="电子邮箱" :rules="[
      { required: true,type:'email', message: '请输入电子邮箱', trigger: 'blur' }
      ]" class="text-left">
            <el-input v-model="changePhoneForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="修复说明" prop="remark" :rules="[
      { required: true, message: '请输入修复说明', trigger: 'blur' }
      ]">
            <el-input type="textarea" v-model="changePhoneForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="dialog-footer">
        <el-button @click="changePhoneConfirm">确 定</el-button>
        <el-button @click="changePhone.flag = false">取 消</el-button>
      </el-col>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import net from '@/util/net'
  import servers from '@/config/servers'
  import { validateMin, validateMax } from '@/util/common'
  // 电子邮件群发
  import EmailBatchSend from '@/views/smart-acc/EmailBatchSend'

  export default {
    name: 'email-acc',
    data() {
      return {
        // 服务接口列表
        server: {
          search: servers.SmartAcc.get_smart_list,
          emailChange: servers.SmartAcc.post_phoneNumOrEmail_change
        },
        // 定义请求参数
        params: {
          custName: '',
          overDayMin: '',
          overDayMax: '',
          cupoBatch: '',
          prinId: '',
          cupoName: ''
        },
        validate: {
          validateMin,
          validateMax
        },
        defaultParams: {
          cupoRectype: '72',
          sort: 'cupoOverday,asc'
        },
        multipleSelection: [],
        nextDialog: {
          disabled: false
        },
        dataName: [],
        changePhone: {
          flag: false,
          custId: '',
          index: ''
        },
        changePhoneForm: {
          phone: '',
          remark: ''
        },
        repayArr: []
      }
    },
    methods: {
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
       *获取承诺还款的金额
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
       * 修改手机号Open
       */
      changePhoneOpen() {
        this.changePhoneForm = {
          phone: '',
          remark: ''
        }
      },
      /**
       * 修改手机号确定
       */
      changePhoneConfirm() {
        this.$refs['phoneForm'].validate((valid) => {
          if (!valid) {
            return false
          }
          net.send({
            server: this.server.emailChange,
            data: {
              custId: this.changePhone.custId,
              newEmailNum: this.changePhoneForm.phone,
              remark: this.changePhoneForm.remark
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.changePhone.flag = false
            this.$refs['emailBatchSend'].updateSendData(this.changePhone.index, this.changePhoneForm.phone)
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 电子邮件群发
       */
      batchClick() {
        this.multipleSelection = this.$refs['databox'].getCurrentSelection()
        if (this.multipleSelection.length === 0) {
          this.$alert('请选择要分配的案件', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.nextDialog.disabled = true
        }
      },
      /**
       * 修改邮箱
       */
      emailChange(scope) {
        this.changePhone.index = scope.$index
        this.changePhone.flag = true
        this.changePhone.custId = scope.row.custId
      },
      /**
       * 邮件群发Open
       */
      emailBatchRefresh() {
        this.$nextTick(() => {
          this.$refs['emailBatchSend'].refresh(this.multipleSelection)
        })
      }
    },
    mounted() {
      this.getRepayData()
      // 获取委托方
      net.send({
        server: servers.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      })
    },
    components: {
      DataBox,
      EmailBatchSend
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog-footer {
    padding-top: 10px;
    padding-bottom: 20px;
  }

</style>

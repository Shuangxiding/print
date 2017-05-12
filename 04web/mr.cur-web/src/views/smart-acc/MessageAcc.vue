<template>
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.search" row-key="cupoId" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名" v-role="0x030102">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数" v-role="0x030103" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x030103" prop="overDayMax" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x030104">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x030105">
          <el-select v-model="params.prinId" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x030106">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="batchClick" v-role="0x030101">短信群发</el-button>
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
        <el-table-column prop="cupoPhone" label="手机号" min-width="80">
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
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="105">
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
        <el-table-column prop="cupoGettime" label="案件流入日期" min-width="80">
        </el-table-column>
      </template>
    </data-box>

    <!--一键发送-->

    <el-dialog title="选择发送对象" v-model="dialog.disabled" @open="firstStepRefresh" size="small" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <choose-send-obj ref="chooseSendObj" @nextStep="nextStep"></choose-send-obj>
    </el-dialog>

    <!--配置发送-->

    <el-dialog title="短信群发" v-model="nextDialog.disabled" size="small" @open="nextStepRefresh" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <message-batch-send ref="messageBatchSend" @preStep="preStep" @close="nextDialog.disabled=false" @phoneChange="phoneChange"></message-batch-send>
    </el-dialog>

    <!--修改手机号-->
    <el-dialog title="修改手机号" v-model="changePhone.flag" @open="changePhoneOpen" size="tiny" :show-close="false" style="line-height:30px" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col>
        <el-form :model="changePhoneForm" ref="phoneForm" label-width="100px">
          <el-form-item prop="phone" label="手机号" :rules="[
      { required: true, message: '请输入手机号', trigger: 'blur', pattern:/^1(3|4|5|7|8)\d{9}$/}
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
  // 选择发送对象
  import ChooseSendObj from '@/views/smart-acc/ChooseSendObj'
  // 短信群发
  import MessageBatchSend from '@/views/smart-acc/MessageBatchSend'

  export default {
    name: 'message-acc',
    data() {
      return {
        // 服务接口列表
        server: {
          search: servers.SmartAcc.get_smart_list,
          phoneChange: servers.SmartAcc.post_phoneNumOrEmail_change
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
          cupoRectype: '71',
          sort: 'cupoOverday,asc'
        },
        multipleSelection: [],
        dialog: {
          disabled: false,
          checkList: [],
          custCheck: []
        },
        nextDialog: {
          disabled: false
        },
        dataName: [],
        changePhone: {
          flag: false,
          custId: '',
          relation: '',
          name: '',
          index: '',
          i: ''
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
            server: this.server.phoneChange,
            data: {
              custId: this.changePhone.custId,
              relation: this.changePhone.relation,
              newPhoneNum: this.changePhoneForm.phone,
              remark: this.changePhoneForm.remark,
              name: this.changePhone.name
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$refs['messageBatchSend'].updateSendData(this.changePhone.index, this.changePhone.i, this.changePhoneForm.phone)
            this.changePhone.flag = false
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 修改手机号
       */
      phoneChange(scope, i) {
        this.changePhone.i = i
        this.changePhone.index = scope.$index
        this.changePhone.flag = true
        this.changePhone.custId = scope.row.custId
        this.changePhone.name = scope.row.nameList[i]
        this.changePhone.relation = scope.row.relation[i]
      },
      /**
       * 短信群发
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
       * 短信群发下一步
       */
      nextStep(checkList, custCheck) {
        this.dialog.disabled = false
        this.nextDialog.disabled = true
        this.dialog.custCheck = custCheck
        this.dialog.checkList = checkList
      },
      /**
       * 短信群发上一步
       */
      preStep() {
        this.dialog.disabled = true
        this.nextDialog.disabled = false
        this.dialog.custCheck = []
        this.dialog.checkList = []
      },
      /**
       * 短信群发第一步Open
       */
      firstStepRefresh() {
        this.$nextTick(() => {
          this.$refs['chooseSendObj'].refresh()
        })
      },
      /**
       * 短信群发第二步Open
       */
      nextStepRefresh() {
        this.$nextTick(() => {
          let selected = '1'
          if (this.dialog.custCheck.length === 0) {
            selected = '0'
          }
          this.$refs['messageBatchSend'].refresh(this.multipleSelection, selected, this.dialog.checkList)
        })
      }
    },
    components: {
      DataBox,
      MessageBatchSend,
      ChooseSendObj
    },
    mounted() {
      this.getRepayData()
      net.send({
        server: servers.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      })
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog-footer {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  
  .header {
    margin: 30px 0 30px;
    color: rgb(31, 45, 61);
    text-align: left;
  }
  
  .btns {
    margin-bottom: 30px;
    margin-top: 20px;
  }

</style>

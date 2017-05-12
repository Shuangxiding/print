<template>
  <div class="page">
    <div class="row end-span">
      <!--<el-button @click="oneKeyCall">一键呼叫</el-button>-->
      <el-button @click="oneKeySms">一键发送短信</el-button>
      <!--<el-button @click="oneKeyVoice">一键发送语音</el-button>-->
      <el-button @click="RepairApplication">修复申请</el-button>
      <el-button @click="RepairInfoClick">修复信息</el-button>
    </div>
    <data-box ref="databox" :maxHeight="200" row-key="id" :model="form" :server="server.getInformation" :defaultParams="defaultParams" hiddenForm autoSearch :pagination="false">
      <!--数据列区域-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="relation" label="关系" min-width="30">
          <template scope="scope">
            <span>{{scope.row.relation | typeCodeConvert('0034')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="30">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="40">
          <template scope="scope">
            <el-button type="text" size="small" @click="telClick(scope)">{{scope.row.phone}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phoneStatus" label="电话状态" min-width="35">
          <template scope="scope">
            <span>{{scope.row.phoneStatus | typeCodeConvert('0023')}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="60" prop="updateTime" label="更新时间">
        </el-table-column>
        <el-table-column label="数据来源" min-width="40">
          <template scope="scope">
            <span>修复</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" min-width="30">
        </el-table-column>
        <el-table-column label="操作" min-width="30">
          <template scope="scope">
            <el-button @click="telClick(scope)" type="text" size="small">电话</el-button>
            <el-button @click="messageClick(scope)" type="text" size="small">短信</el-button>
            <!--<el-button @click="voiceClick(scope)" type="text" size="small">语音</el-button>-->
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--修复申请-->
    <el-dialog title="修复申请" v-model="repairApplicationModel" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form ref="repairApp" :model="aplayParams" label-width="100px">
        <el-form-item label="修复说明" prop="orapRemark" :rules="[{ message: '请输入修复说明', required: true, trigger:'blur'}]">
          <el-input type="textarea" v-model="aplayParams.orapRemark" :autosize="{ minRows:4, maxRows:6,cols:16}"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="actionCommit">确定</el-button>
      <el-button @click="actionCancel">取消</el-button>
    </el-dialog>
    <!--发送短信-->
    <el-dialog title="发送短信" v-model="sendMessage" :close-on-click-modal="false" :close-on-press-escape="false" @open="getRow">
      <MessageSend ref="sendsmg" @close="sendMessage=false" @openChangePhone="changePhone=true"></MessageSend>
    </el-dialog>
    <!--发送语音-->
    <!--<el-dialog title="发送语音" v-model="SendVoice">
      <el-col>
        <el-col>
          <div class="header">短信将会发送给以下用户的手机号:</div>
        </el-col>
        <el-table :data="params" header-align="center" max-height="500" border class="no-padding-cell">
          <el-table-column type="index" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column prop="name" label="客户姓名" align="center" min-width="100">
          </el-table-column>
          <el-table-column prop="relation" label="关系" align="center" min-width="80">
            <template scope="scope">
              <span>{{scope.row.relation | typeCodeConvert('0034')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" colSpan="3" min-width="150">
          </el-table-column>
          <el-table-column prop="phoneStatus" label="状态" align="center" min-width="80">
            <template scope="scope">
              <span>{{scope.row.phoneStatus | typeCodeConvert('0023')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="250">
            <template scope="scope">
              <el-button @click="phoneChange(scope)" type="text" size="small">修改联系电话</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col>
          <div class="header">请选择语音模板:</div>
        </el-col>
        <el-col class="tab-box">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <div class="tab-pane">
              <el-form label-width="120px">
                <el-form-item label="语音模板类别:">
                  <el-select v-model="templateClass" @change="templateClassChange">
                    <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="语音模板名称:">
                  <el-select v-model="templateVal" @change="templateValChange">
                    <el-option v-for="item in templateArr" :key="item" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="语音内容:">
                  <el-input type="textarea" v-model="templateContent" :autosize="{ minRows: 4}" readonly></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tabs>
        </el-col>
        <div class="btns">
          <el-button type="primary" @click="massMsg">发送</el-button>
        </div>
      </el-col>
    </el-dialog>-->
    <!--修复信息-->
    <el-dialog title="修复信息" v-model="repairInformation" @close="$refs['databox'].refresh()" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <template>
        <CustomerRepairInfo ref='mm' @success="$refs['databox'].refresh()" @close="repairInformation = false" :editState="-1" :custId="$store.state.accManage.cust_id"></CustomerRepairInfo>
      </template>
    </el-dialog>
    <!--修改联系电话-->
    <el-dialog title="修改联系电话" v-model="changePhone" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="changePhoneNum" ref="phoneNum" label-width="100px">
        <el-form-item prop="newPhoneNum" label="手机号" :rules="[
      { required: true, message: '请输入手机号', trigger: 'blur', pattern:/^1(3|4|5|7|8)\d{9}$/}
      ]">
          <el-input style="float:left" v-model="changePhoneNum.newPhoneNum"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="修改说明" :rules="[
      { required: true, message: '请输入修复说明', trigger: 'blur' }
      ]">
          <el-input type="textarea" v-model="changePhoneNum.remark" :autosize="{ minRows:4, maxRows:6,cols:16}"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="changePhoneConfirm">确 定</el-button>
      <el-button @click="changePhoneCancle">取 消</el-button>
    </el-dialog>
    <!--一键发送短信-->
    <el-dialog title="短信群发" v-model="GroupMessage" :close-on-click-modal="false" :close-on-press-escape="false">
      <GroupMessageSend @close="GroupMessage=false" @openChangePhone="changePhone=true" ref="sendsmg"></GroupMessageSend>
    </el-dialog>
    <!--一键发送语音-->
    <!--<el-dialog title="语音群发" v-model="GroupVoice">
      <GroupVoiceSend @openChangePhoneNum="changePhone=true"></GroupVoiceSend>
    </el-dialog>-->
    <!--打电话遮罩层-->
    <div v-show="loading.state" v-loading.body="loading.state" class="shield"></div>
  </div>
</template>

<script>
  import servers from '@/config/servers'
  import net from '@/util/net'
  import DataBox from '@/components/DataBox'
  import DetailsTab from '@/components/DetailsTab'
  import { mapGetters } from 'vuex'
  import CustomerRepairInfo from '@/views/repair-manage/CustomerRepairInfo'
  // 短信群发
  import GroupMessageSend from '@/views/acc-manage/GroupMessageSend'
  import GroupVoiceSend from '@/views/acc-manage/GroupVoiceSend'
  // 发送短信
  import MessageSend from '@/views/acc-manage/MessageSend'

  export default {
    name: 'call-repair-info',
    data() {
      return {
        // 遮罩层
        loading: {
          state: false
        },
        /**
         * 服务接口列表
         */
        server: {
          getInformation: servers.RepairManage.get_visit_repair_info
        },
        aplayParams: {
          cupoId: '',
          orapRemark: '',
          custId: ''
        },
        defaultParams: {
          custId: this.$store.state.accManage.cust_id,
          reminderType: '69'
        },
        params: [],
        form: {
          id: ''
        },
        repairApp: {
          desc: ''
        },
        name: '',
        // 修改电话
        changePhoneNum: {
          newPhoneNum: '',
          remark: ''
        },
        changePhone: false,
        repairApplicationModel: false,
        // 对话框显示控制
        oneKeyVisualForm: false,
        repairInformation: false,
        GroupMessage: false,
        // GroupVoice: false,
        // SendVoice: false,
        sendMessage: false,
        change: false
      }
    },
    computed: {
      ...mapGetters([
        'userToken'
      ])
    },
    methods: {
      /**
       * 获取列表当前行数据（点击短信）
       */
      getRow() {
        this.$nextTick(() => {
          this.$refs['sendsmg'].refresh()
        })
      },
      refresh(custId) {
        this.custId = custId
        this.defaultParams = Object.assign({}, {
          custId: this.$store.state.accManage.cust_id,
          reminderType: '69'
        })
      },
      /**
       * 刷新databox
       */
      repairRecord() {
        this.$refs['databox'].refresh()
      },
      /**
       * 修复申请确定
       */
      actionCommit() {
        this.$refs['repairApp'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.aplayParams.cupoId = this.$store.state.accManage.case_id
          net.send({
            server: servers.RepairManage.repair_application,
            data: this.aplayParams
          }).then((data) => {
            // 更新数据信息
            this.params = data
            this.$refs['repairApp'].resetFields()
            this.$emit('assistRecordRefresh')
            this.$message({
              type: 'info',
              message: '申请成功'
            })
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
          this.repairApplicationModel = false
        })
      },
      /**
       * 修复申请取消
       */
      actionCancel() {
        this.repairApplicationModel = false
        this.$refs['repairApp'].resetFields()
      },
      /**
       * 一键短信回调
       */
      oneKeySms() {
        this.form = Object.assign({}, this.params)
        this.GroupMessage = true
      },
      /**
       * 一件语音回调
       */
      // oneKeyVoice() {
      //   this.GroupVoice = true
      // },
      /**
       * 修复申请回调
       */
      RepairApplication() {
        this.repairApplicationModel = true
      },
      /**
       * 修复信息回调
       */
      RepairInfoClick() {
        this.repairInformation = true
      },
      /**
       * 电话
       */
      telClick(scope) {
        this.form.phone = scope.row.phone
        console.log(this.$store.state.accManage.caller_info.taskId, this.$store.state.accManage.caller_info.caller, 'call')
        net.send({
          server: servers.AccManage.call_phone_info,
          data: {
            taskId: this.$store.state.accManage.caller_info.taskId,
            customer: this.$store.getters.userInfo.userId,
            callee: this.form.phone,
            caller: this.$store.state.accManage.caller_info.caller
          },
          loading: this.loading
        }).then((data) => {
          this.$store.commit('updateCallInfo', {
            follPhoneNum: scope.row.phone,
            follContype: scope.row.phoneStatus,
            follCust: scope.row.name,
            follTarget: scope.row.relation,
            // 拨号接口返回数据
            follTaskid: data.taskRecoder.resultTaskId,
            follRecoderid: data.taskRecoder.id,
            follTaskcallerid: data.taskRecoder.taskId,
            follLoad: 0
          })
          this.$emit('repair')
          this.$message({
            type: 'success',
            message: '发送成功'
          })
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 短信
       */
      messageClick(scope) {
        this.msgTemplateData = this.$store.state.accManage.template_info
        let arrA = []
        let arrB = []
        this.msgTemplateData.map(v => {
          if (v.type === 34) {
            arrA.push(v)
          }
          if (v.type === 35) {
            arrB.push(v)
          }
        })
        this.accTemplateData = arrA
        this.remindTemplateData = arrB
        this.$store.commit('updateMessageInfo', [scope.row])
        this.sendMessage = true
      },
      /**
       * 修改联系电话
       */
      phoneChange(scope) {
        this.changePhone = true
        this.change = false
        this.changePhoneNum.relation = scope.row.relation
        this.changePhoneNum.name = scope.row.name
      },
      /**
       * 修改联系电话确定
       */
      changePhoneConfirm() {
        this.$refs['phoneNum'].validate((valid) => {
          if (!valid) {
            return false
          }
          let relation = this.$refs['sendsmg'].getRelation()
          let name = this.$refs['sendsmg'].getName()
          net.send({
            server: servers.AccManage.modify_phone_email_info,
            data: {
              custId: this.$store.state.accManage.cust_id,
              relation: relation,
              newPhoneNum: this.changePhoneNum.newPhoneNum,
              remark: this.changePhoneNum.remark,
              name: name
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$refs['sendsmg'].changePhone(this.changePhoneNum.newPhoneNum)
            this.repairRecord()
            this.changePhone = false
            this.$refs['phoneNum'].resetFields()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 取消电话修改
       */
      changePhoneCancle() {
        this.changePhone = false
        this.$refs['phoneNum'].resetFields()
      }
      /**
       * 语音
       */
      // voiceClick(scope) {
      //   this.params[0] = scope.row
      //   this.SendVoice = true
      // }
    },
    components: {
      DataBox,
      DetailsTab,
      CustomerRepairInfo,
      GroupMessageSend,
      GroupVoiceSend,
      MessageSend
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    margin: 30px 0 30px;
    font-size: 0.875rem;
    color: rgb(31, 45, 61);
    text-align: left;
  }
  
  .btns {
    margin-bottom: 30px;
    margin-top: 20px;
  }
  
  .tab-pane {
    height: 250px;
  }
  
  .redcolor {
    color: #ff5722;
    font-size: 0.875rem;
  }
  
  .red-font {
    color: #ff5722;
    font-size: 0.875rem;
    text-align: left;
    margin: 10px 0 20px;
  }
  
  .tab-box {
    text-align: left;
  }
  
  .item {
    height: 48px;
    border-bottom: 1px solid rgb(223, 230, 236);
    line-height: 48px;
    text-align: center;
  }
  
  .item:last-child {
    border: 0px;
  }
  
  .dialog-footer {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  
  .shield {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

</style>

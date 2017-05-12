<template>
  <!--按钮区域-->
  <div>
    <div class="row end-span">
      <!--<el-button type="primary" @click="oneKeyCall">一键呼叫</el-button>-->
      <el-button @click="oneKeySms">一键发送短信</el-button>
      <!--<el-button type="primary" @click="oneKeyVoice">一键发送语音</el-button>-->
    </div>

    <data-box :maxHeight="200" ref="databox" :model="params" :data="contacts" row-key="contactIDCard" hiddenForm :pagination="false">
      <!--数据列区域-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="relation" label="关系" min-width="30">
          <template scope="scope">
            <span>{{scope.row.relation | typeCodeConvert('0034')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contactName" label="姓名" min-width="30">
        </el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" min-width="50">
          <template scope="scope">
            <el-button type="text" size="small" @click="telClick(scope)">{{scope.row.contactPhone}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="contactPhoneStatus" label="电话状态" min-width="35">
          <template scope="scope">
            <span>{{scope.row.contactPhoneStatus | typeCodeConvert('0023')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contactMail" label="电子邮件" min-width="80">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="60">
        </el-table-column>
        <el-table-column prop="dataSource" label="数据来源" min-width="40">
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template scope="scope">
            <el-button @click="telClick(scope)" type="text" size="small">电话</el-button>
            <el-button @click="messageClick(scope)" type="text" size="small">短信</el-button>
            <!--<el-button @click="voiceClick(scope)" type="text" size="small">语音</el-button>-->
            <el-button @click="emailClick(scope)" type="text" size="small" v-if="scope.row.relation===145">邮件</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-->
    <!--发送短信-->
    <el-dialog title="发送短信" v-model="sendMessage" @open="getRow" :close-on-click-modal="false" :close-on-press-escape="false">
      <SendMessage ref="send" @close="sendMessage=false" @openChangePhone="changePhone=true,change=true" @refresh="refreshRecord"></SendMessage>
    </el-dialog>
    <!--发送语音-->
    <!--<el-dialog title="发送语音" v-model="sendVoice">
      <el-col>
        <el-table :data="params" header-align="center" max-height="500" border class="no-pad.ding-cell">
          <el-table-column type="index" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column prop="relation" label="关系" align="center" min-width="80">
          </el-table-column>
          <el-table-column prop="contactName" label="姓名" align="center" min-width="100">
          </el-table-column>
          <el-table-column prop="contactPhone" label="联系电话" align="center" colSpan="3" min-width="150">
          </el-table-column>
          <el-table-column prop="contactPhoneStatus" label="电话状态" align="center" min-width="80">
            <template scope="scope">
              <span>{{scope.row.contactPhoneStatus | typeCodeConvert('0023')}}</span>
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
          <el-button @click="massMsg">发送</el-button>
        </div>
      </el-col>
    </el-dialog>-->
    <!--发送邮件-->
    <el-dialog title="发送邮件" @open="getmeg" v-model="sendEmail" :close-on-click-modal="false" :close-on-press-escape="false">
      <EmailSend ref="sendemail" @openChangePhone="changeEmail=true" @close="sendEmail=false" @refresh="refreshRecord"></EmailSend>
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
    <!--修改电子邮箱-->
    <el-dialog title="修改电子邮箱" v-model="changeEmail" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-col>
        <el-form :model="changeEmailNum" ref="EmailNum" label-width="100px">
          <el-form-item prop="newEmailNum" label="电子邮箱" :rules="[
      { required: true,type:'email', message: '请输入电子邮箱', trigger: 'blur' }
      ]">
            <el-input style="float:left" v-model="changeEmailNum.newEmailNum"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="修改说明" :rules="[
      { required: true, message: '请输入修改说明', trigger: 'blur' }
      ]">
            <el-input type="textarea" v-model="changeEmailNum.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="dialog-footer">
        <el-button @click="changeEmailConfirm">确 定</el-button>
        <el-button @click="changeEmailConcle">取 消</el-button>
      </el-col>
    </el-dialog>
    <!--一键发送短信-->
    <el-dialog title="短信群发" v-model="GroupMessage" :close-on-click-modal="false" :close-on-press-escape="false">
      <SendGroupMessage @close="GroupMessage=false" @openChangePhone="changePhone=true" ref="send"></SendGroupMessage>
    </el-dialog>
    <!--一键发送语音-->
    <!--<el-dialog title="语音群发" v-model="GroupVoice">
      <GroupVoiceSend></GroupVoiceSend>
    </el-dialog>-->
    <div v-show="loading.state" v-loading.body="loading.state" class="shield"></div>
  </div>
</template>

<script>
  import servers from '@/config/servers'
  import DataBox from '@/components/DataBox'
  import net from '@/util/net'
  import { mapGetters, mapState } from 'vuex'
  import SendGroupMessage from '@/views/acc-manage/SendGroupMessage'
  // 发送短信
  import SendMessage from '@/views/acc-manage/SendMessage'
  // 发送邮件
  import EmailSend from '@/views/acc-manage/EmailSend'
  import VoiceSend from '@/views/acc-manage/VoiceSend'
  import GroupVoiceSend from '@/views/acc-manage/GroupVoiceSend'

  export default {
    name: 'origin-call-info',
    data() {
      return {
        loading: {
          state: false
        },
        // 服务接口列表
        server: {
          originCallInfoPage: servers.RepairManage.Customer_information_case,
          getTemplate: servers.ConfigManage.get_all_template,
          sendEmail: servers.SmartAcc.post_send_email
        },
        code: '',
        smsData: [],
        area: '',
        forms: {},
        tabsArr: [{
          title: '短信模板',
          pane: 'tab1'
        }, {
          title: '自定义短信模板',
          pane: 'tab2'
        }],
        name: '',
        oneKeyVisualForm: false,
        repairInformation: false,
        GroupMessage: false,
        // GroupVoice: false,
        // sendVoice: false,
        sendEmail: false,
        changeEmail: false,
        // 修改电话
        changePhoneNum: {
          newPhoneNum: '',
          remark: ''
        },
        // 修改邮箱
        changeEmailNum: {
          remark: '',
          newEmailNum: ''
        },
        changePhone: false,
        sendMessage: false,
        params: {},
        emaildata: {},
        form: {}
      }
    },
    computed: {
      sendMessage: {
        get() {
          return this.$store.state.accManage.sendMessage
        },
        set(val) {
          this.$store.commit('sendMessage', val)
        }
      },
      ...mapGetters([
        'userToken'
      ]),
      ...mapState({
        contacts: state => state.accManage.cust_info.customerContacts
      })
    },
    methods: {
      /**
       * 获取列表当前行数据（点击短信）
       */
      getRow() {
        this.$nextTick(() => {
          this.$refs['send'].refresh()
        })
      },
      getmeg() {
        this.$nextTick(() => {
          this.$refs['sendemail'].refresh()
        })
      },
      refresh() {
        this.$reset()
      },
      /**
       * 刷新发信信息记录databox
       */
      refreshRecord() {
        this.$emit('mesRecordRefresh')
      },
      /**
       * 短信
       */
      messageClick(scope) {
        this.templateClass = ''
        this.templateVal = ''
        this.templateContent = ''
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
        // this.forms.id = scope.row.id
      },
      /**
       * 电话
       */
      telClick(scope) {
        console.log(this.$store.state.accManage.caller_info)
        this.form.phone = scope.row.contactPhone
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
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          this.$store.commit('updateCallInfo', {
            follPhoneNum: scope.row.contactPhone,
            follContype: scope.row.contactPhoneStatus,
            follCust: scope.row.contactName,
            follTarget: scope.row.relation,
            // 拨号接口返回数据
            follTaskid: data.taskRecoder.resultTaskId,
            follRecoderid: data.taskRecoder.id,
            follTaskcallerid: data.taskRecoder.taskId,
            follLoad: 0
          })
          this.$emit('repair')
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 语音
       */
      // voiceClick(scope) {
      //   this.params = [scope.row]
      //   this.sendVoice = true
      // },
      /**
       * 邮箱
       */
      emailClick(scope) {
        this.emailtemplateVal = ''
        this.emailtemplateContent = ''
        this.emailtemplateClass = ''
        this.emailTemplateData = this.$store.state.accManage.template_email
        let arrA = []
        let arrB = []
        this.emailTemplateData.map(v => {
          if (v.type === 34) {
            arrA.push(v)
          }
          if (v.type === 35) {
            arrB.push(v)
          }
        })
        this.emailaccTemplateData = arrA
        this.emailremindTemplateData = arrB
        // this.emaildata = [Object.assign({}, scope.row)]
        this.$store.commit('updateMessageInfo', [scope.row])
        this.sendEmail = true
      },
      /**
       * 修改联系电话确定
       */
      changePhoneConfirm() {
        this.$refs['phoneNum'].validate((valid) => {
          if (!valid) {
            return false
          }
          let relation = this.$refs['send'].getRelation()
          let name = this.$refs['send'].getName()
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
            this.$refs['send'].changePhone(this.changePhoneNum.newPhoneNum)
            this.$emit('repairRecordRefresh')
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
       * 取消修改联系电话
       */
      changePhoneCancle() {
        this.changePhone = false
        this.$refs['phoneNum'].resetFields()
      },
      /**
       * 修改电子邮箱
       */
      EmailChange(scope) {
        this.changeEmail = true
      },
      /**
       * 修改电子邮箱确定
       */
      changeEmailConfirm() {
        this.$refs['EmailNum'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.changeEmailNum.custId = this.$store.state.accManage.cust_id
          net.send({
            server: servers.AccManage.modify_phone_email_info,
            data: {
              custId: this.changeEmailNum.custId,
              newEmailNum: this.changeEmailNum.newEmailNum,
              remark: this.changeEmailNum.remark
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            console.log(this.changeEmailNum.newEmailNum)
            this.$refs['sendemail'].changeEmail(this.changeEmailNum.newEmailNum)
            this.$refs['EmailNum'].resetFields()
            this.$emit('repairRecordRefresh')
            this.changeEmail = false
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 取消修改电子邮箱
       */
      changeEmailConcle() {
        this.changeEmail = false
        this.$refs['EmailNum'].resetFields()
      },
      /**
       * 一键呼叫回调
       */
      oneKeyCall() {
        this.oneKeyVisualForm = true
      },
      /**
       * 一键短信回调
       */
      oneKeySms() {
        this.GroupMessage = true
      }
      /**
       * 一件语音回调
       */
      // oneKeyVoice() {
      //   this.GroupVoice = true
      // },
    },
    components: {
      DataBox,
      SendGroupMessage,
      VoiceSend,
      GroupVoiceSend,
      SendMessage,
      EmailSend
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

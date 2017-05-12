<template>
  <el-col>
    <el-table :data="emaildata" header-align="center" max-height="500" border class="no-padding-cell">
      <el-table-column type="index" label="序号" align="center" width="60">
      </el-table-column>
      <el-table-column prop="relation" label="关系" align="center" min-width="80">
        <template scope="scope">
          <span>{{scope.row.relation | typeCodeConvert('0034')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contactName" label="姓名" align="center" min-width="100">
      </el-table-column>
      <el-table-column prop="contactMail" label="电子邮箱" align="center" colSpan="3" min-width="150">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template scope="scope">
          <el-button @click="EmailChange(scope)" type="text" size="small">修改电子邮箱</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col>
      <div class="header">请选择邮件模板或自定义邮件内容:</div>
    </el-col>
    <el-col class="tab-box">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="邮件模板" name="template" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="120px">
              <el-form-item label="邮件模板类别:">
                <el-select v-model="emailtemplateClass" @change="emailtemplateClassChange">
                  <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮件模板名称:">
                <el-select v-model="emailtemplateVal" @change="emailtemplateValChange">
                  <el-option v-for="item in emailtemplateArr" :key="item" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮件内容:">
                <el-input type="textarea" v-model="emailtemplateContent" :autosize="{ minRows: 6}" readonly></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自定义邮件" name="custom" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="140px" label-position="right">
              <el-form-item label="模板参数说明:">
                <el-col class="redcolor">
                  客户姓名：${cust_name}&nbsp;&nbsp;还款日期：${date}&nbsp;&nbsp;逾期天数：${day}&nbsp;&nbsp;还款金额：${money}
                </el-col>
              </el-form-item>
              <el-form-item label="邮箱内容:">
                <el-col :span="20">
                  <el-input type="textarea" v-model="emailtemplateContent" label="邮箱内容:" :autosize="{ minRows: 4}" :maxlength="60"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <div class="btns">
      <el-button @click="sendemailClick">发送</el-button>
    </div>
  </el-col>
</template>
<script>
  import servers from '@/config/servers'
  import net from '@/util/net'
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'

  export default {
    name: 'send-message',
    data() {
      return {
        // 服务接口列表
        server: {
          originCallInfoPage: servers.RepairManage.Customer_information_case,
          getTemplate: servers.ConfigManage.get_all_template,
          sendEmail: servers.SmartAcc.post_send_email
        },
        emailtemplateClass: '', // 模板类型
        emailtemplateArr: [], // 显示的模板名称数组
        emailtemplateVal: '', // 模板值
        emailtemplateContent: '', // 模板内容
        custTemplateContent: '', // 自定义模板内容
        activeName: 'template', // 选项卡的值
        sendObjdata: [], // 发送对象数据
        emailaccTemplateData: [], // 催收模板数据
        emailremindTemplateData: [], // 提醒模板数组
        name: '',
        changeEmailIndex: '',
        changeEmailNum: {},
        emaildata: []
      }
    },
    methods: {
      /**
       * 发送
       */
      sendemailClick() {
        console.log(this.emaildata.contactMail)
        if (this.emailtemplateContent === '') {
          this.$alert('请选择邮件模板', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.emaildata[0].contactMail === null) {
          this.$alert('电子邮箱不能为空', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        let emailSendParamList = this.emaildata.map(v => {
          return {
            cupoId: this.$store.state.accManage.case_id,
            custId: this.$store.state.accManage.cust_id,
            email: v.contactMail,
            custName: v.contactName
          }
        })
        net.send({
          server: this.server.sendEmail,
          data: {
            emailSendParamList: emailSendParamList,
            tesmId: this.emailtemplateVal,
            mereContent: this.emailtemplateContent,
            mereStyle: 162
          }
        }).then((data) => {
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          // 刷新发送信息记录databox
          this.$emit('refresh')
          this.emailtemplateClass = ''
          this.emailtemplateVal = ''
          this.emailtemplateContent = ''
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
        this.$emit('close')
      },
      /**
       * 选项卡切换
       */
      handleClick(tab, event) {
        this.emailtemplateClass = ''
        this.emailtemplateVal = ''
        this.emailtemplateArr = []
        this.emailtemplateContent = ''
      },
      /**
       * 邮件模板类别切换
       */
      emailtemplateClassChange() {
        console.log(1111)
        this.emailtemplateVal = ''
        this.emailtemplateContent = ''
        if (this.emailtemplateClass === 34) {
          this.emailtemplateArr = this.emailaccTemplateData
          let emaildefaultTem = this.emailaccTemplateData.find(v => v.default === true)
          if (emaildefaultTem) {
            this.emailtemplateVal = emaildefaultTem.id
            this.emailtemplateContent = emaildefaultTem.content
          }
        }
        if (this.emailtemplateClass === 35) {
          this.emailtemplateArr = this.emailremindTemplateData
          let emaildefaultTem = this.emailremindTemplateData.find(v => v.default === true)
          if (emaildefaultTem) {
            this.emailtemplateVal = emaildefaultTem.id
            this.emailtemplateContent = emaildefaultTem.content
          }
        }
      },
      /**
       * 邮件模板名变化
       */
      emailtemplateValChange() {
        this.emailTemplateData.map(v => {
          if (v.id === this.emailtemplateVal) {
            this.emailtemplateContent = v.content
          }
        })
      },
      /**
       * 修改电子邮箱
       */
      EmailChange(scope) {
        this.$emit('openChangePhone')
        this.changeEmailIndex = scope.$index
        this.changeEmailNum.relation = scope.row.relation
        this.changeEmailNum.contactName = scope.row.contactName
      },
      /**
       * 修改列表中联系电话
       */
      changeEmail(newNum) {
        if (this.emaildata[this.changeEmailIndex]) {
          this.emaildata[this.changeEmailIndex].contactMail = newNum
        }
      },
      /**
       * 获取当前行数据
       */
      refresh() {
        this.emaildata = this.$store.state.accManage.origin_info.map(v => Object.assign({}, v))
        console.log(this.emaildata[0].contactMail)
      }
    },
    mounted() {
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
    },
    components: {
      DataGrid,
      DataGridItem
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

</style>

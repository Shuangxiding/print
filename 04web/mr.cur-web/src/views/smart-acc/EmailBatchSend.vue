<template>
  <el-col>
    <el-col>
      <div class="header">邮件将会发送给以下用户的电子邮箱:</div>
    </el-col>
    <el-table :data="sendObjdata" header-align="center" max-height="500" border stripe>
      <el-table-column type="index" label="序号" align="center" width="40">
      </el-table-column>
      <el-table-column prop="custName" label="客户姓名" align="center" min-width="60">
      </el-table-column>
      <el-table-column prop="email" label="电子邮件" align="center" min-width="130">
      </el-table-column>
      <el-table-column label="操作" min-width="130" align="center">
        <template scope="scope">
          <el-button @click="emailChange(scope)" type="text" size="small">修改邮箱</el-button>
          <el-button @click="unhangClick(scope)" type="text" size="small">移出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col>
      <div class="header">请选择邮件模板:</div>
    </el-col>
    <el-col class="tab-box">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="邮件模板" name="template" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="120px">
              <el-form-item label="邮件模板类别:">
                <el-select v-model="templateClass" @change="templateClassChange">
                  <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮件模板名称:">
                <el-select v-model="templateVal" @change="templateValChange">
                  <el-option v-for="item in templateArr" :key="item" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮件内容:">
                <el-col :span="18">
                  <el-input type="textarea" v-model="templateContent" :autosize="{ minRows: 4}" readonly></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自定义邮件" name="custom" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="140px" label-position="right">
              <el-form-item label="模板参数说明：">
                <el-col class="redcolor">客户姓名：${cust_name}&nbsp;&nbsp;还款日期：${date}&nbsp; &nbsp;逾期天数：${day}&nbsp;&nbsp;还款金额：${money}&nbsp;&nbsp;性别：${sex}&nbsp;&nbsp;身份证号：${ID}&nbsp;&nbsp;收件人：${receiver}&nbsp;&nbsp;收件地址：${address}&nbsp;&nbsp;邮编：${postcode}
                </el-col>
              </el-form-item>
              <el-form-item label="邮件内容:" style="padding-bottom:20px">
                <!--<el-input type="textarea" v-model="custTemplateContent" label="短信内容:" :autosize="{ minRows: 3}" :maxlength="60"></el-input>-->
                <vue-editor :use-save-button="false" @editor-updated="handleUpdatedContent" style="height:300px;padding-bottom:20px">
                </vue-editor>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <div class="btns">
      <el-button @click="massMsg">一键群发</el-button>
    </div>
  </el-col>
</template>
<script>
  import net from '@/util/net'
  import servers from '@/config/servers'
  import { VueEditor } from 'vue2-editor'

  export default {
    name: 'email-batch-send',
    data() {
      return {
        // 服务接口列表
        server: {
          msgTemplate: servers.SmartAcc.get_message_template, // 获取模板数据
          sendObj: servers.SmartAcc.get_email_sendObj, // 获取发送对象信息
          sendEmail: servers.SmartAcc.post_send_email // 一键群发邮件
        },
        activeName: 'template', // 选项卡的值
        msgTemplateData: [], // 所有模板数据
        accTemplateData: [], // 催收模板数据
        remindTemplateData: [], // 提醒模板数组
        templateClass: '', // 模板类型
        templateVal: '', // 模板值
        templateArr: [],
        custTemplateContent: '',
        sendObjdata: [], // 发送对象数据
        templateContent: '',
        htmlFromEditor: '', // 编辑器的值
        multipleSelection: []
      }
    },
    methods: {
      /**
       * 刷新
       */
      refresh(multipleSelection) {
        this.activeName = 'template'
        this.templateArr = []
        this.templateClass = ''
        this.templateVal = ''
        this.templateContent = ''
        // this.htmlFromEditor = ''
        this.multipleSelection = multipleSelection
        let accNums = this.multipleSelection.map(v => {
          return v.cupoId
        })
        net.send({
          server: this.server.sendObj,
          data: {
            emailBatchSendList: accNums
          }
        }).then((data) => {
          // 更新数据信息
          this.sendObjdata = data
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.sendObjdata[i].cupoId = this.multipleSelection[i].cupoId
            this.sendObjdata[i].custId = this.multipleSelection[i].custId
            this.sendObjdata[i].custName = this.multipleSelection[i].custName
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 保存编辑器文本
       */
      handleUpdatedContent(value) {
        this.htmlFromEditor = value
      },
      /**
       * 移出
       */
      unhangClick(scope) {
        let arr = []
        this.sendObjdata.map((v, i) => {
          if (i !== scope.$index) {
            arr.push(v)
          }
        })
        this.sendObjdata = arr
      },
      /**
       * 一键群发
       */
      massMsg() {
        let mereContent = ''
        let tesmId = ''
        if (this.activeName === 'custom') {
          mereContent = this.htmlFromEditor
        } else {
          if (this.templateVal === '') {
            this.$alert('请选择短信模板', '提示', {
              confirmButtonText: '确定'
            })
            return false
          }
          mereContent = this.templateContent
          tesmId = this.templateVal
        }
        let emailSendParamList = this.sendObjdata
        net.send({
          server: this.server.sendEmail,
          data: {
            emailSendParamList: emailSendParamList,
            mereContent: mereContent,
            tesmId: tesmId,
            mereStyle: 161
          }
        }).then((data) => {
          // 更新数据信息
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.close()
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 选项卡切换
       */
      handleClick(tab, event) {
        this.templateClass = ''
        this.templateVal = ''
        this.templateArr = []
        this.custTemplateContent = ''
      },
      /**
       * 模板类别切换
       */
      templateClassChange() {
        this.templateVal = ''
        this.templateContent = ''
        if (this.templateClass === 34) {
          this.templateArr = this.accTemplateData
          let defaultTem = this.accTemplateData.find(v => v.default === true)
          if (defaultTem) {
            this.templateVal = defaultTem.id
            this.templateContent = defaultTem.content
          }
        }
        if (this.templateClass === 35) {
          this.templateArr = this.remindTemplateData
          let defaultTem = this.remindTemplateData.find(v => v.default === true)
          if (defaultTem) {
            this.templateVal = defaultTem.id
            this.templateContent = defaultTem.content
          }
        }
      },
      /**
       * 模板名变化
       */
      templateValChange() {
        this.msgTemplateData.map(v => {
          if (v.id === this.templateVal) {
            this.templateContent = v.content
          }
        })
      },
      /**
       * 修改邮箱
       */
      emailChange(scope) {
        this.$emit('emailChange', scope)
      },
      /**
       * 修改邮箱后更新发送对象数据
       */
      updateSendData(index, email) {
        this.sendObjdata[index].email = email
      },
      /**
       * 关闭弹出框
       */
      close() {
        this.$emit('close')
      }
    },
    mounted() {
      //  获取电子邮件模板
      net.send({
        server: this.server.msgTemplate,
        data: {
          style: '31'
        }
      }).then((data) => {
        // 更新数据信息
        this.msgTemplateData = data
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
      }, err => {
        console.log(err)
      })
    },
    components: {
      VueEditor
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
    min-height: 250px;
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

</style>

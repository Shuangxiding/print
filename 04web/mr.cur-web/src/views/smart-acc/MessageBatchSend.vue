<template>
  <el-col v-loading="loading.state">
    <el-col>
      <div class="header">短信将会发送给以下用户的手机号:</div>
    </el-col>
    <el-table :data="sendObjdata" header-align="center" max-height="500" border class="no-padding-cell">
      <el-table-column type="index" label="序号" align="center" width="40">
      </el-table-column>
      <el-table-column prop="custName" label="客户姓名" align="center" min-width="60">
      </el-table-column>
      <el-table-column prop="relation" label="关系" align="center" min-width="45">
        <template scope="scope">
          <el-col type="text" size="small" v-for="v,i in scope.row.relation" :key="i" class="item">{{v | typeCodeConvert('0034')}}</el-col>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" colSpan="3" min-width="80">
        <template scope="scope">
          <el-col type="text" size="small" v-for="v,i in scope.row.phone" :key="i" class="item">{{v}}</el-col>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="60">
        <template scope="scope">
          <el-col type="text" size="small" v-for="v,i in scope.row.status" :key="i" class="item">{{v | typeCodeConvert('0023')}}</el-col>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="150">
        <template scope="scope">
          <el-row v-for="v,i in scope.row.phone" class="item" :key="i">
            <el-button @click="phoneChange(scope,i)" type="text" size="small">修改手机号</el-button>
            <el-button @click="unhangClick(scope,i)" type="text" size="small">移出</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-col>
      <div class="header">请选择短信模板:</div>
    </el-col>
    <el-col class="tab-box">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="短信模板" name="template" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="120px">
              <el-form-item label="短信模板类别:">
                <el-select v-model="templateClass" @change="templateClassChange">
                  <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="短信模板名称:">
                <el-select v-model="templateVal" @change="templateValChange">
                  <el-option v-for="item in templateArr" :key="item" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="短信内容:">
                <el-col :span="18">
                  <el-input type="textarea" v-model="templateContent" :autosize="{ minRows: 4}" readonly></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <div class="btns">
      <el-button @click="preStep">上一步</el-button>
      <el-button @click="massMsg">一键群发</el-button>
    </div>
  </el-col>
</template>
<script>
  import net from '@/util/net'
  import servers from '@/config/servers'

  export default {
    name: 'message-batch-send',
    data() {
      return {
        // 服务接口列表
        server: {
          msgTemplate: servers.SmartAcc.get_message_template, // 获取模板数据
          sendObj: servers.SmartAcc.get_message_sendObj, // 获取发送对象数据
          SendMessage: servers.SmartAcc.post_send_message // 一键群发短信
        },
        loading: {
          state: false
        },
        activeName: 'template', // 选项卡的值
        msgTemplateData: [], // 所有模板数据
        accTemplateData: [], // 催收模板数据
        remindTemplateData: [], // 提醒模板数组
        templateClass: '', // 模板类型
        templateVal: '', // 模板值
        templateArr: [], // 显示的模板名称数组
        custTemplateContent: '', // 自定义模板内容
        sendObjdata: [], // 发送对象数据
        templateContent: '', // 模板内容
        multipleSelection: []
      }
    },
    methods: {
      /**
       * 刷新
       */
      refresh(multipleSelection, selected, checkList) {
        this.templateArr = []
        this.templateClass = ''
        this.templateVal = ''
        this.templateContent = ''
        this.multipleSelection = multipleSelection
        let accNums = this.multipleSelection.map(v => {
          return v.cupoId
        })
        net.send({
          server: this.server.sendObj,
          data: {
            cupoIdList: accNums,
            selected: selected,
            selRelationsList: checkList
          }
        }).then((data) => {
          // 更新数据信息
          this.sendObjdata = data
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.sendObjdata[i].cupoId = this.multipleSelection[i].cupoId
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 修改手机号
       */
      phoneChange(scope, i) {
        this.$emit('phoneChange', scope, i)
      },
      /**
       * 修改手机号成功更新发送数据
       */
      updateSendData(index, i, phone) {
        if (this.sendObjdata[index]) {
          this.sendObjdata[index].phone[i] = phone
          this.sendObjdata = Object.assign([], this.sendObjdata)
        }
      },
      /**
       * 短信群发上一步
       */
      preStep() {
        this.$emit('preStep')
      },
      /**
       * 移出
       */
      unhangClick(scope, index) {
        if (this.sendObjdata[scope.$index].phone.length === 1) {
          let data = []
          this.sendObjdata.map((v, i) => {
            if (i !== scope.$index) {
              data.push(v)
            }
          })
          this.sendObjdata = data
          return
        }
        let newData = this.sendObjdata.map((v, i) => {
          if (i === scope.$index) {
            let relation = []
            let phone = []
            let status = []
            v.relation.map((rv, ri) => {
              if (ri !== index) {
                relation.push(rv)
              }
            })
            v.phone.map((pv, pi) => {
              if (pi !== index) {
                phone.push(pv)
              }
            })
            v.status.map((v, i) => {
              if (i !== index) {
                status.push(v)
              }
            })
            return {
              'custId': v.custId,
              'custName': v.custName,
              'relation': relation,
              'phone': phone,
              'status': status
            }
          }
          return v
        })
        this.sendObjdata = newData
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
        console.log(this.templateVal)
        this.msgTemplateData.map(v => {
          if (v.id === this.templateVal) {
            this.templateContent = v.content
          }
        })
        console.log(this.templateArr)
      },
      /**
       * 一键群发
       */
      massMsg() {
        if (this.templateVal === '') {
          this.$alert('请选择短信模板', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        let smsMessageParamsList = this.sendObjdata.map(({ cupoId, custId, phone }) => {
          let custInfoList = phone.map(v => {
            return {
              custphone: v
            }
          })
          return {
            cupoId: cupoId,
            custId: custId,
            custInfoList: custInfoList,
            tesmId: this.templateVal
          }
        })
        net.send({
          server: this.server.SendMessage,
          data: {
            smsMessageParamsList
          },
          loading: this.loading
        }).then((data) => {
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
       * 关闭弹出框
       */
      close() {
        this.$emit('close')
      }
    },
    mounted() {
      //  获取短信模板
      net.send({
        server: this.server.msgTemplate,
        data: {
          style: '29'
        }
      }).then((data) => {
        // 更新数据信息
        this.msgTemplateData = data
        let arrA = []
        let arrB = []
        data.map(v => {
          if (v.type === 34) {
            arrA.push(v)
          }
          if (v.type === 35) {
            arrB.push(v)
          }
        })
        this.accTemplateData = arrA
        this.remindTemplateData = arrB
      })
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    margin: 30px 0 30px;
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
    height: 40px;
    border-bottom: 1px solid rgb(223, 230, 236);
    line-height: 40px;
    text-align: center;
  }
  
  .item:last-child {
    border: 0px;
  }

</style>

<template>
  <el-col>
    <el-col>
      <div class="header">短信将会发送给以下用户的手机号:</div>
    </el-col>
    <el-table :data="params" header-align="center" max-height="500" border class="no-padding-cell" :max-height="200">
      <el-table-column type="index" label="序号" align="center" width="30">
      </el-table-column>
      <el-table-column prop="relation" label="关系" align="center" min-width="80">
        <template scope="scope">
          <span>{{scope.row.relation | typeCodeConvert('0034')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contactName" label="姓名" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="contactPhone" label="联系电话" align="center" colSpan="3" min-width="100">
      </el-table-column>
      <el-table-column prop="contactPhoneStatus" label="电话状态" align="center" min-width="80">
        <template scope="scope">
          <span>{{scope.row.contactPhoneStatus | typeCodeConvert('0023')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template scope="scope">
          <el-button @click="phoneChange(scope)" type="text" size="small">修改联系电话</el-button>
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
                <el-input type="textarea" v-model="templateContent" :autosize="{ minRows: 4}" readonly></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane label="自定义短信" name="custom" class="tab-pane">
          <div class="tab-pane">
            <el-form label-width="140px" label-position="right">
              <el-form-item label="模板参数说明:">
                <el-col class="redcolor">
                  客户姓名：${cust_name}&nbsp;&nbsp;还款日期：${date}&nbsp;&nbsp;逾期天数：${day}&nbsp;&nbsp;还款金额：${money}
                </el-col>
              </el-form-item>
              <el-form-item label="短信内容:">
                <el-input type="textarea" v-model="custTemplateContent" label="短信内容:" :autosize="{ minRows: 3}" :maxlength="60"></el-input>
                <el-col>
                  <div class="red-font">提示：短信内容不超过60个汉字，其中包括标点符合或空格等！</div>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>-->
      </el-tabs>
    </el-col>
    <div class="btns">
      <el-button @click="massMsg">发送</el-button>
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
        params: [],
        templateClass: '', // 模板类型
        templateArr: [], // 显示的模板名称数组
        templateVal: '', // 模板值
        templateContent: '', // 模板内容
        custTemplateContent: '', // 自定义模板内容
        activeName: 'template', // 选项卡的值
        sendObjdata: [], // 发送对象数据
        name: '',
        changePhoneIndex: '',
        changePhoneNum: {}
      }
    },
    methods: {
      /**
       * 发送
       */
      massMsg() {
        if (this.templateVal === '') {
          this.$alert('请选择短信模板', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        let mm = this.params.map(v => {
          return {
            custphone: v.contactPhone,
            custName: v.contactName
          }
        })
        net.send({
          server: servers.AccManage.send_info,
          data: {
            cupoId: this.$store.state.accManage.case_id,
            custId: this.$store.state.accManage.cust_id,
            tesmId: this.templateVal,
            custType: '1',
            custInfoList: mm
          }
        }).then((data) => {
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          // 刷新发送信息记录databox
          this.$emit('refresh')
          this.templateClass = ''
          this.templateVal = ''
          this.templateContent = ''
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
          let defaulttemplateClass = this.accTemplateData.find(v => v.default === true)
          if (defaulttemplateClass) {
            this.templateVal = defaulttemplateClass.id
          }
        }
        if (this.templateClass === 35) {
          this.templateArr = this.remindTemplateData
          let defaulttemplateClass = this.remindTemplateData.find(v => v.default === true)
          if (defaulttemplateClass) {
            this.templateVal = defaulttemplateClass.id
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
       * 修改联系电话
       */
      phoneChange(scope) {
        this.$emit('openChangePhone')
        this.changePhoneIndex = scope.$index
        this.changePhoneNum.relation = scope.row.relation
        this.changePhoneNum.contactName = scope.row.contactName
      },
      /**
       * 获取关系
       */
      getRelation() {
        return this.changePhoneNum.relation
      },
      /**
       * 获取姓名
       */
      getName() {
        return this.changePhoneNum.contactName
      },
      /**
       * 修改列表中联系电话
       */
      changePhone(newNum) {
        if (this.params[this.changePhoneIndex]) {
          this.params[this.changePhoneIndex].contactPhone = newNum
        }
      },
      /**
       * 获取当前行数据
       */
      refresh() {
        this.params = this.$store.state.accManage.origin_info.map(v => Object.assign({}, v))
      }
    },
    mounted() {
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

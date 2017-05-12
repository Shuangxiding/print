<template>
  <el-col>
    <el-col>
      <div class="header">短信将会发送给以下用户的手机号:</div>
    </el-col>
    <el-table :data="params" header-align="center" max-height="500" border class="no-padding-cell">
      <el-table-column type="index" label="序号" align="center" width="30">
      </el-table-column>
      <el-table-column prop="name" label="客户姓名" align="center" min-width="100">
      </el-table-column>
      <el-table-column prop="relation" label="关系" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" colSpan="3" min-width="100">
      </el-table-column>
      <el-table-column prop="phoneStatus" label="状态" align="center" min-width="80">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60">
        <template scope="scope">
          <el-button @click="phoneChange(scope)" type="text" size="small">修改联系电话</el-button>
          <el-button @click="unhangClick(scope)" type="text" size="small">移出</el-button>
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
              <el-input type="textarea" v-model="templateContent" :autosize="{ minRows: 4}"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tabs>
    </el-col>
    <div class="btns">
      <el-button @click="massMsg">一键发送</el-button>
    </div>
  </el-col>
</template>
<script>
  import servers from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'group-voice-send',
    data() {
      return {
        params: [],
        templateClass: '', // 模板类型
        templateArr: [], // 显示的模板名称数组
        templateVal: '', // 模板值
        templateContent: '', // 模板内容
        custTemplateContent: '', // 自定义模板内容
        activeName: 'template', // 选项卡的值
        sendObjdata: [] // 发送对象数据
      }
    },
    methods: {
      /**
       * 一键群发
       */
      massMsg() {
        if (this.activeName === 'custom') {
          console.log(1)
        } else {
          console.log(2)
        }
        this.nextDialog.disabled = false
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
        if (this.templateClass === 34) {
          this.templateArr = this.accTemplateData
          let defaulttemplateClass = this.accTemplateData.find(v => v.default === true)
          if (defaulttemplateClass) {
            this.templateVal = defaulttemplateClass.id
          }
        }
        if (this.templateClass === 35) {
          this.templateArr = this.remindTemplateData
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
       * 修改联系电话
       */
      phoneChange(scope) {
        this.$emit('openChangePhoneNum')
        this.changePhoneIndex = scope.$index
        this.changePhoneNum.relation = scope.row.relation
      },
      /**
       * 获取关系
       */
      getRelation() {
        return this.changePhoneNum.relation
      },
      /**
       * 修改列表中电话信息
       */
      changePhone(newNum) {
        console.log(newNum)
        console.log(this.params[this.changePhoneIndex])
        if (this.params[this.changePhoneIndex]) {
          this.params[this.changePhoneIndex].phone = newNum
        }
      },
      /**
       * 移出
       */
      unhangClick(scope) {
        let arr = []
        this.params.map((v, i) => {
          if (i !== scope.$index) {
            arr.push(v)
          }
        })
        this.params = arr
      },
      refresh() {
        net.send({
          server: servers.RepairManage.repair_information_case,
          append: [this.$store.state.accManage.cust_id]
        }).then((data) => {
          console.log(data)
          // 更新数据信息
          this.params = data.content
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      }
    },
    mounted() {
      this.refresh()
    },
    components: {

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

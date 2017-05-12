<template>
  <div class="page">
    <el-form label-width="100px" class="text-left">
      <el-form-item label="话术模板类别:">
        <el-select v-model="templateClass" @change="templateClassChange">
          <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话术模板名称:">
        <el-select v-model="templateVal" @change="templateValChange">
          <el-option v-for="item in templateArr" :key="item" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话术内容:">
        <el-col :span="22">
          <el-input type="textarea" v-model="templateContent" :autosize="{ minRows: 4}" readonly></el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'check-acc-template',
    data() {
      return {
        templateArr: [],
        templateClass: '',
        templateVal: '',
        templateContent: '',
        accTemplateData: [],
        remindTemplateData: [],
        msgTemplateData: []
      }
    },
    methods: {
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
       * 刷新
       */
      refresh() {
        this.templateArr = []
        this.templateClass = ''
        this.templateVal = ''
        this.templateContent = ''
        this.accTemplateData = []
        this.remindTemplateData = []
        this.msgTemplateData = []
        net.send({
          server: server.SmartAcc.get_message_template,
          data: {
            style: '33'
          }
        }).then((data) => {
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
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>

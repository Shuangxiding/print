<template>
  <div v-loading.body="loading.state">
    <el-form ref="data-form" :model="params" label-width="100px" class="text-left">
      <el-form-item label="委托方" prop="primId" :rules="[
      { required: true, message: '请选择委托方', trigger: 'change' }]">
        <el-select placeholder="请选择" v-model="params.primId">
          <el-option v-for="{prinId,prinName} in clientList" :key="prinId" :label="prinName" :value="prinId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="委案日期" prop="caseDate" :rules="[
      { required: true,type: 'date', message: '请选择委案日期', trigger: 'change' }]">
            <el-date-picker format="yyyy-MM-dd" type="date" :editable="false" v-model="params.caseDate" @change="caseDataChange" :picker-options="caseDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结案日期" prop="endDate" :rules="[
      { required: true, type: 'date', message: '请选择结案日期', trigger: 'change' }]">
            <el-date-picker format="yyyy-MM-dd" type="date" :editable="false" v-model="params.endDate" :picker-options="endDate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="案件手数" prop="caseHandnum" :rules="[
      { required: true, message: '请输入案件手数', trigger: 'blur' }]">
        <el-input v-model="params.caseHandnum" type="number"></el-input>
      </el-form-item>
      <el-form-item label="上传文件">
        <file-upload ref="upload_case_import"></file-upload>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input type="textarea" v-model="params.memo"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submit">确定</el-button>
    <el-button @click="close">取消</el-button>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { mapState } from 'vuex'
  import FileUpload from '@/components/FileUpload'
  export default {
    name: 'case-excel-import',
    data() {
      return {
        loading: {
          state: false
        },
        params: {
          primId: '', // 委托方ID
          caseDate: '', // 委案日期
          endDate: '', // 结案日期
          caseHandnum: '', // 案件手数
          fileId: '', // 文件id
          memo: '' // 备注
        },
        rules: {

        },
        caseDate: {
          disabledDate: (time) => {
            let endTime = this.params.endDate
            if (endTime && (endTime instanceof Date)) {
              return time.getTime() > endTime.getTime()
            }
          }
        },
        endDate: {
          disabledDate: (time) => {
            let startTime = this.params.caseDate
            if (startTime && (startTime instanceof Date)) {
              return time.getTime() < startTime.getTime()
            }
          }
        }
      }
    },
    computed: {
      ...mapState({
        clientList: state => state.caseManage.client_list
      })
    },
    methods: {
      /**
       * 委案日期change事件
       */
      caseDataChange() {
        if (this.params.caseDate && (this.params.caseDate instanceof Date)) {
          let caseDate = new Date(this.params.caseDate.getTime())
          this.params.endDate = new Date(caseDate.setMonth(caseDate.getMonth() + 3))
        }
      },
      /**
       * 确定
       */
      submit() {
        // 获取上传文件
        let file = this.$refs['upload_case_import'].getFile()
        // 查看是否上传完成
        if (!file) {
          this.$message('请上传导入文件')
          return
        }
        // 存储文件ID
        this.params.fileId = file.id
        this.$refs['data-form'].validate(valid => {
          if (!valid) {
            return
          }
          console.log(this.params)
          // 发送导入请求
          net.send({
            server: server.CaseManage.import_case_excel,
            data: this.params,
            loading: this.loading
          }).then(data => {
            this.$message('案件导入成功')
            this.$emit('success')
            this.close()
          }, (err) => {
            if (!err.object) {
              this.$message({
                type: 'info',
                message: '案件导入失败！Excel数据格式错误'
              })
              return
            }
            this.$emit('errMsg', err.object)
          })
        })
      },
      /**
       * 取消
       */
      close() {
        this.$refs['upload_case_import'].reset()
        this.$emit('close')
        this.$refs['data-form'].resetFields()
      }
    },
    components: {
      FileUpload
    }
  }

</script>
<style scoped>


</style>

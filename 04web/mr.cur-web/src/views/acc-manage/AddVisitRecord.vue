<template>
  <div>
    <el-form :model="params" ref="params" label-width="100px" class="demo-ruleForm">
      <div class="row">
        <el-form-item label="催收对象" prop="follTarget" :rules="[
      { required: true,type:'number', message: '请选择催收对象',trigger: 'change'}]">
          <el-select v-model="params.follTarget" style="float:left" @change="accTarget" :disabled="isEdit">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0034')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名" prop="follCust" :rules="[{required: true, message: '请输入姓名', trigger: 'change'}]">
          <el-input v-model="params.follCust" style="float:left" :readonly="isEdit"></el-input>
        </el-form-item>

        <el-form-item label="跟进方式" prop="follType">
          <el-select v-model="params.follType" style="float:left" disabled>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0029')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="催收地址" prop="follPhoneNum">
          <el-select style="float:left" v-model="params.follAddrtype">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0024')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
          <el-cascader v-model="params.cityCode" :options="provinceOptions" :props="{value:'id',label:'areaName'}" clearable></el-cascader>
          <el-input v-model="params.follPhoneNum"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="地址状态" prop="follContype" :rules="[
      { required: true, message: '请选择地址状态'}]">
          <el-select v-model="params.follContype" style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0025')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收反馈" prop="follFeedback" :rules="[
      { required: true, message: '请选择催收反馈'}]">
          <el-select v-model="params.follFeedback" style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0031')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="上传外访材料" prop="fileIds">
          <FileUpload ref="file-upload" multiple></FileUpload>
        </el-form-item>
      </div>
      <el-form-item label="跟进内容" prop="follContent" :rules="[
      { required: true, message: '请填写跟进内容', trigger: 'blur' }]">
        <el-col :span="12">
          <el-input type="textarea" v-model="params.follContent"></el-input>
        </el-col>
      </el-form-item>
      <div class="row">
        <el-form-item label="承诺还款" prop="follIspromise">
          <el-checkbox v-model="params.follIspromise" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="承诺金额" prop="follPnum" label-width="125px">
          <el-input v-model="params.follPnum" style="float:left" :readonly="params.follIspromise===0"></el-input>
        </el-form-item>
        <el-form-item label="承诺日期" prop="follPdate" label-width="125px">
          <el-date-picker type="date" v-model="params.follPdate" placeholder="选择日期" :picker-options="pickerOptions0" :editable="false" :readonly="params.follIspromise===0">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="下次跟进" prop="follIswarn">
          <el-checkbox v-model="params.follIswarn" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="跟进提醒日期" prop="follWarndate" label-width="125px">
          <el-date-picker v-model="params.follWarndate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" :editable="false" :readonly="params.follIswarn===0">
          </el-date-picker>
        </el-form-item>
      </div>
      <el-form-item label="跟进提醒内容" prop="follWarninfo" label-width="125px">
        <el-col :span="12">
          <el-input type="textarea" v-model="params.follWarninfo"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button @click="submit" v-if>{{isEdit?'更新记录':'添加记录'}}</el-button>
    <!--<template>
      <FollowRecord @edit="editRecord" ref="follow-record"></FollowRecord>
    </template>-->
  </div>
</template>

<script>
  import FollowRecord from '@/views/acc-manage/FollowRecord'
  import servers from '@/config/servers'
  import net from '@/util/net'
  import FileUpload from '@/components/FileUpload'
  import { getCityJson } from '@/util/common'

  export default {
    name: 'add-visit-record',
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isEdit: false,
        add: true,
        provinceOptions: getCityJson(),
        params: {
          follTarget: '',
          follPhoneNum: '',
          follType: 111,
          follFeedback: '',
          follContent: '',
          follIspromise: 0,
          follPnum: '',
          follPdate: '',
          follIswarn: 0,
          follWarndate: '',
          follWarninfo: '',
          follContype: '',
          follCust: '',
          follAddrtype: '',
          cityCode: [],
          fileIds: ''
        }
      }
    },
    methods: {
      submit() {
        if (!this.isEdit) {
          this.addRecord()
        } else {
          this.updateRecord()
        }
      },
      /**
       * 催收对象change
       */
      accTarget() {
        if (this.isEdit || this.params.follTarget === '') {
          return
        }
        net.send({
          server: servers.AccManage.get_cust_name_info,
          data: {
            custId: this.$store.state.accManage.cust_id,
            relation: this.params.follTarget
          }
        }).then((data) => {
          this.params.follCust = data
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 添加跟进记录
       */
      addRecord() {
        // 获取上传文件
        let file = this.$refs['file-upload'].getFile()
        // 查看是否上传完成
        if (!file) {
          this.$message('请上传外访材料')
          return
        }
        this.$refs['params'].validate((valid) => {
          if (!valid) { return false }
          let [follProvid, follCityid, follAreaid] = this.params.cityCode
          this.params.follProvid = follProvid
          this.params.follCityid = follCityid
          this.params.follAreaid = follAreaid
          this.params.cupoId = this.$store.state.accManage.case_id
          this.params.fileIds = this.$refs['file-upload'].getFileList().map(x => x.id)
          net.send({
            server: servers.AccManage.add_follow_recode_info,
            data: Object.assign(this.params, {
              follRectype: 70
            })
          }).then((data) => {
            this.$refs['file-upload'].reset()
            this.$emit('followrefresh')
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            if (this.params.follIspromise === 1) {
              // 加载承诺还款数据
              this.$emit('load')
              // 刷新左侧案件列表
              this.$emit('success')
            }
            this.$reset()
            this.$refs['params'].resetFields()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 更新记录
       */
      updateRecord() {
        this.params.cupoId = this.$store.state.accManage.case_id
        net.send({
          server: servers.AccManage.update_follow_recode_info,
          data: this.params
        }).then((data) => {
          this.$emit('followrefresh')
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.isEdit = false
          if (this.params.follIspromise === 1) {
            // 加载承诺还款数据
            this.$emit('load')
            // 刷新左侧案件列表
            this.$emit('success')
          }
          this.$reset()
          this.$refs['params'].resetFields()
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 编辑跟进记录
       */
      editRecord(data) {
        this.isEdit = true
        data.cityCode = [data.follProvid, data.follCityid, data.follAreaid]
        // 如果data为null，则表示从打电话时编辑跟进记录
        this.params = Object.assign({}, data)
      },
      refresh() {
        this.isEdit = false
        this.$refs['params'].resetFields()
      }
    },
    components: {
      FollowRecord,
      FileUpload
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

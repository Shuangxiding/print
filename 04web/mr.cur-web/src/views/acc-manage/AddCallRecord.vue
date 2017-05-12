<template>
  <div>
    <el-form :model="params" ref="params" label-width="100px" class="demo-ruleForm">
      <div class="row">
        <el-form-item label="催收对象" prop="follTarget" :rules="[
      { required: true,type:'number', message: '请选择催收对象',trigger: 'change'}]">
          <el-select :disabled="isEdit" v-model="params.follTarget" style="float:left" @change="accTarget">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0034')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="follCust" :rules="[{required: true, message: '请输入姓名', trigger: 'change'}]">
          <el-input :readonly="isEdit" v-model="params.follCust" style="float:left"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="follPhoneNum" :rules="[
      { message: '请输入正确的联系电话', trigger: 'blur', pattern:/^1(3|4|5|7|8)\d{9}$/}
      ]">
          <el-input :readonly="isEdit" v-model="params.follPhoneNum" style="float:left"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="跟进方式" prop="follType">
          <el-select :disabled="isEdit" v-model="params.follType" style="float:left" disabled>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0029')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话状态" prop="follContype" :rules="[
      { required: true,type:'number', message: '请选择电话状态',trigger: 'change'}]">
          <el-select v-model="params.follContype" style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0023')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="催收反馈" prop="follFeedback" :rules="[
      { required: true,type:'number',  message: '请选择催收反馈',trigger: 'change'}]">
          <el-select v-model="params.follFeedback" style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0031')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="跟进内容" prop="follContent">
        <el-col :span="12">
          <el-input type="textarea" v-model="params.follContent"></el-input>
        </el-col>
      </el-form-item>
      <div class="row">
        <el-form-item label="承诺还款" prop="follIspromise">
          <el-checkbox v-model="params.follIspromise" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="承诺金额" prop="follPnum">
          <el-input v-model="params.follPnum" style="float:left" type="number" :readonly="params.follIspromise===0"></el-input>
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
        <el-form-item label="跟进提醒日期" prop="follWarndate">
          <el-date-picker v-model="params.follWarndate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" :editable="false" :readonly="params.follIswarn===0">
          </el-date-picker>
        </el-form-item>
        <!--<el-form-item label="是否保存录音文件" label-width="125px">
          <el-checkbox v-model="params.follLoad" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>-->
      </div>
      <el-form-item label="跟进提醒内容" prop="follWarninfo">
        <el-col :span="12">
          <el-input type="textarea" v-model="params.follWarninfo"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button @click="submit">{{isEdit?'更新记录':'添加记录'}}</el-button>
    <!--<template>
      <FollowRecord @edit="editRecord" ref="follow-record"></FollowRecord>
    </template>-->
  </div>
</template>

<script>
  import FollowRecord from '@/views/acc-manage/FollowRecord'
  import servers from '@/config/servers'
  import net from '@/util/net'
  import { mapState } from 'vuex'
  export default {
    name: 'add-call-record',
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isEdit: false,
        // 定义请求参数
        params: {
          follWarndate: '',
          follTarget: '',
          follPhoneNum: '',
          follType: 110,
          follContype: '',
          follFeedback: '',
          follContent: '',
          follIspromise: 0,
          follPnum: '',
          follPdate: '',
          follIswarn: 0,
          follWarninfo: '',
          follCust: '',
          // follLoad: '',
          follTaskid: '',
          follRecoderid: '',
          follTaskcallerid: ''
        }
      }
    },
    computed: {
      ...mapState({
        callInfo: state => state.accManage.call_info
      })
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
       * 更新记录
       */
      updateRecord() {
        this.params.cupoId = this.$store.state.accManage.case_id
        net.send({
          server: servers.AccManage.update_follow_recode_info,
          data: this.params
        }).then((data) => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          if (this.params.follIspromise === 1) {
            // 加载承诺还款数据
            this.$emit('load')
            // 刷新左侧案件列表
            this.$emit('success')
          }
          this.$emit('followrefresh')
          this.$refs['params'].resetFields()
          this.isEdit = false
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
        // 如果data为null，则表示从打电话时编辑跟进记录
        this.params = Object.assign({}, data)
      },
      /**
       * 添加跟进记录
       */
      addRecord(record) {
        this.$refs['params'].validate((valid) => {
          if (!valid && !record) { return false }
          net.send({
            server: servers.AccManage.add_follow_recode_info,
            data: record || Object.assign(this.params, {
              cupoId: this.$store.state.accManage.case_id,
              follRectype: 69,
              // follLoad: this.callInfo.follLoad,
              follTaskid: this.callInfo.follTaskid,
              follRecoderid: this.callInfo.follRecoderid,
              follTaskcallerid: this.callInfo.follTaskcallerid
            })
          }).then((data) => {
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
            this.$emit('followrefresh')
            // 如果通过电话添加跟进记录则直接编辑该条记录
            if (record) {
              this.editRecord(data)
            } else {
              this.$refs['params'].resetFields()
            }
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 修复信息打电话数据回显
       */
      callRecord() {
        // 来电成功，直接添加跟进记录
        this.addRecord({
          follContent: '电催记录',
          follPhoneNum: this.callInfo.follPhoneNum,
          follContype: this.callInfo.follContype,
          follTarget: this.callInfo.follTarget,
          follCust: this.callInfo.follCust,
          follType: 110,
          cupoId: this.$store.state.accManage.case_id,
          // follLoad: this.callInfo.follLoad,
          follTaskid: this.callInfo.follTaskid,
          follRecoderid: this.callInfo.follRecoderid,
          follTaskcallerid: this.callInfo.follTaskcallerid,
          follFeedback: '',
          follWarndate: '',
          follIspromise: 0,
          follPnum: '',
          follPdate: '',
          follIswarn: 0,
          follWarninfo: '',
          follRectype: 69
        })
      },
      refresh() {
        this.isEdit = false
        this.$refs['params'].resetFields()
      }
    },
    components: {
      FollowRecord
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

<template>
  <!--新增委托方-->
  <div class="page">
    <el-form :rules="rules" :model="forms" ref="add-form" label-width="100px" class="text-left">
      <el-row>
        <el-form-item label="委托方" prop="prinName">
          <el-col>
            <el-input v-model="forms.prinName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="机构类型" prop="organizationType">
          <el-radio-group v-model="forms.organizationType">
            <el-radio :label="41">贷款公司</el-radio>
            <el-radio :label="42">银行</el-radio>
            <el-radio :label="43">保险公司</el-radio>
            <el-radio :label="44">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-col>
          <el-form-item label="省份/城市/区" prop="cityList">
            <el-cascader v-model="forms.cityList" :options="options" :props="{value:'id',label:'areaName'}" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="详细地址" prop="prinAddress">
            <el-input type="textarea" v-model="forms.prinAddress" :rows="1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="prinContacts">
            <el-input v-model="forms.prinContacts"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="prinPhone">
            <el-input v-model="forms.prinPhone" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="prinMobile">
            <el-input v-model="forms.prinMobile" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="prinEmail">
            <el-input v-model="forms.prinEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="备注" prop="prinRemark">
            <el-input type="textarea" v-model="forms.prinRemark" :maxlength="200"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="confirm">确定</el-button>
    <el-button @click="cancelClick">取消</el-button>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import { getCityJson } from '@/util/common'

  export default {
    name: 'add-client',
    data() {
      return {
        forms: {
          prinName: '',
          organizationType: '',
          prinProvinces: '',
          prinAddress: '',
          prinContacts: '',
          prinMobile: '',
          prinPhone: '',
          prinEmail: '',
          prinRemark: '',
          cityList: []
        },
        options: getCityJson(),
        form: {},
        value1: '',
        value2: '',
        /**
         * 新增委托方信息校验规则
         */
        rules: {
          prinContacts: [
            { message: '请输入汉字或英文字母', trigger: 'blur', pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/ }
          ],
          prinName: [
            { required: true, message: '请输入委托方', trigger: 'blur' }
          ],
          prinMobile: [
            { message: '请输入正确的手机号', trigger: 'blur', pattern: /^1(3|4|5|7|8)\d{9}$/ }
          ],
          prinPhone: [
            { message: '请输入正确的电话号码', trigger: 'blur', pattern: /^[-0-9]{7,18}$/ }
          ],
          prinEmail: [
            { message: '请输入正确的邮箱', trigger: 'blur', type: 'email' },
            { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' }
          ],
          organizationType: [
            { required: true, type: 'number', message: '请选择机构类型', trigger: 'change' }
          ]
        },
        multipleSelection: [],
        addcaseclient: false,
        modifycaseclient: false,
        selector: [],
        dataName: []
      }
    },
    methods: {
      /**
       * 新增委托方确定
       */
      confirm() {
        this.$refs['add-form'].validate((valid) => {
          if (!valid) { return }
          let [prinPrid, prinCityid, prinCtyid] = this.forms.cityList
          this.forms.prinPrid = prinPrid
          this.forms.prinCityid = prinCityid
          this.forms.prinCtyid = prinCtyid
          net.send({
            server: server.CaseManage.principal_add_case,
            data: {
              prinPrid: prinPrid,
              prinCityid: prinCityid,
              prinCtyid: prinCtyid,
              organizationType: this.forms.organizationType,
              prinAddress: this.forms.prinAddress,
              prinContacts: this.forms.prinContacts,
              prinEmail: this.forms.prinEmail,
              prinMobile: this.forms.prinMobile,
              prinName: this.forms.prinName,
              prinPhone: this.forms.prinPhone,
              prinRemark: this.forms.prinRemark
            }
          }).then((data) => {
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '新增委托方成功'
            })
            // 重置form表单
            this.$refs['add-form'].resetFields()
            // 刷新databox
            this.$emit('refresh')
            // 关闭新增委托方dialog
            this.$emit('close')
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       *取消新增
       */
      cancelClick() {
        // 重置form表单
        this.$refs['add-form'].resetFields()
        // 关闭新增委托方dialog
        this.$emit('close')
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-button {
    margin-left: 10px;
    height: 30px;
    line-height: 0;
  }
  
  .el-input {
    width: 100%;
    height: 100%;
  }
  
  .el-input__inner {
    width: 100%;
    height: 100%;
  }

</style>

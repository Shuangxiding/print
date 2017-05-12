<template>
  <!--修改委托方-->
  <div class="page">
    <el-form :rules="rulesUpdate" :model="form" ref="modify-form" label-width="100px" class="text-left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="委托方编码" prop="prinCode">
            <el-input v-model="form.prinCode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="委托方" prop="prinName">
            <el-input v-model="form.prinName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="机构类型" prop="organizationType">
            <el-radio-group v-model="form.organizationType" disabled>
              <el-radio :label="41">贷款公司</el-radio>
              <el-radio :label="42">银行</el-radio>
              <el-radio :label="43">保险公司</el-radio>
              <el-radio :label="44">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="省份/城市/区" prop="prinProvinces">
            <el-cascader :options="options" :props="{value:'id',label:'areaName'}" v-model="form.prinProvinces" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="详细地址" prop="prinAddress">
            <el-input type="textarea" v-model="form.prinAddress" :rows="1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="prinContacts">
            <el-input v-model="form.prinContacts"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="prinPhone">
            <el-input v-model="form.prinPhone" type="number" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="prinMobile">
            <el-input v-model="form.prinMobile" type="number" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="prinEmail">
            <el-input v-model="form.prinEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="备注" prop="prinRemark">
            <el-input type="textarea" v-model="form.prinRemark" :maxlength="200"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="saveClick">确定</el-button>
    <el-button @click="cancle">取消</el-button>
    </el-dialog>
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
        form: {
          prinName: '',
          organizationType: '',
          prinProvinces: [],
          prinAddress: '',
          prinContacts: '',
          prinMobile: '',
          prinPhone: '',
          prinEmail: '',
          prinRemark: '',
          cityList: []
        },
        options: getCityJson(),
        value1: '',
        value2: '',
        /**
         * 修改委托方信息校验规则
         */
        rulesUpdate: {
          prinContacts: [
            { message: '请输入汉字或英文字母', trigger: 'blur', pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/ }
          ],
          prinName: [
            { required: true, message: '请输入委托方', trigger: 'blur' }
          ],
          prinPhone: [
            { message: '请输入正确的电话号码', trigger: 'blur', pattern: /^[-0-9]{7,18}$/ }
          ],
          prinMobile: [
            { message: '请输入正确的手机号', trigger: 'blur', pattern: /^1(3|4|5|7|8)\d{9}$/ }
          ],
          prinEmail: [
            { message: '请输入正确的邮箱', trigger: 'blur', type: 'email' },
            { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' }
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
       * 获取要修改的委托方数据
       */
      refresh(modifyData) {
        this.form.prinCode = modifyData.prinCode
        this.form.prinName = modifyData.prinName
        this.form.organizationType = modifyData.organizationType
        this.form.prinAddress = modifyData.prinAddress
        this.form.prinMobile = modifyData.prinMobile
        this.form.prinContacts = modifyData.prinContacts
        this.form.prinPhone = modifyData.prinPhone
        this.form.prinEmail = modifyData.prinEmail
        this.form.prinRemark = modifyData.prinRemark
        this.form.prinId = modifyData.prinId
        this.form.prinProvinces = [modifyData.prinPrid, modifyData.prinCityid, modifyData.prinCtyid]
      },
      /**
       * 修改确定
       */
      saveClick() {
        this.$refs['modify-form'].validate((valid) => {
          if (!valid) {
            return
          }
          let [prinPrid, prinCityid, prinCtyid] = this.form.prinProvinces
          net.send({
            server: server.CaseManage.principal_add_case,
            data: {
              prinId: this.form.prinId,
              prinPrid: prinPrid,
              prinCityid: prinCityid,
              prinCtyid: prinCtyid,
              organizationType: this.form.organizationType,
              prinAddress: this.form.prinAddress,
              prinContacts: this.form.prinContacts,
              prinEmail: this.form.prinEmail,
              prinMobile: this.form.prinMobile,
              prinName: this.form.prinName,
              prinPhone: this.form.prinPhone,
              prinRemark: this.form.prinRemark
            }
          }).then((data) => {
            // 修改成功
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.$refs['modify-form'].resetFields()
            this.$emit('refresh')
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
      cancle() {
        // 重置form表单
        this.$refs['modify-form'].resetFields()
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

<template>
  <el-col class="page" v-loading="loading.state">
    <el-form :model="params" :rules="rules" ref="email-form" label-width="130px" class="text-left">
      <el-row>
        <el-form-item prop="default" label="设为默认模板">
          <el-checkbox v-model="params.default" :disabled="defaultFlag"></el-checkbox>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="模板编号:" prop="code" :rules="[{
            required: true,
            message: '请输入模板编号',
            trigger: 'blur'
          }, {
            validator: checkTemplateCode(),
            trigger: 'blur'
          },{
            message: '模板编号只能包含数字和字母', 
            trigger: 'blur', 
            pattern: /^([A-Za-z0-9]+)$/ 
          },{
            max: 40,
            message: '模板编号不超过40位',
            trigger: 'blur'
          }]">
            <el-input v-model="params.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮件模板类别:" prop="type">
            <el-select v-model="params.type" placeholder="请选择" :disabled="defaultFlag">
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮件模板名称:" prop="name" :rules="[{
            required: true,
            message: '请输入模板名称',
            trigger: 'blur'
          }, {
            message: '模板名称只能是汉字或字母', 
            trigger: 'blur', 
            pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/ 
          }, {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }, {
            validator: checkTemplateName(),
            trigger: 'blur'
          }]">
            <el-input v-model="params.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:" prop="status">
            <el-select v-model="params.status" style="float:left" :disabled="defaultFlag">
              <el-option :value="0" label="启用"></el-option>
              <el-option :value="1" label="停用"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="模板参数说明" class="readme">
            客户姓名：${cust_name} 性别：${sex} 身份证号：${ID} 还款日期：${date} 逾期天数：${day} 还款金额：${money} 收件人：${receiver} 收件地址：${address} 邮编：${postcode}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="电子邮件内容: " prop="content">
            <el-input type="textarea" v-model="params.content" :autosize="{ minRows: 3}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button v-if="!isModify" @click="submitClick( 'add') ">保存</el-button>
    <el-button v-else @click="submitClick('update') ">保存</el-button>
    <el-button @click="close">取消</el-button>
  </el-col>
</template>

<script>
  import servers from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'email-template',
    componentName: 'EmailTemplate',
    data() {
      return {
        loading: {
          state: false
        },
        params: {
          code: '', // 模版编号
          default: false, // 是否默认模版
          type: '', // 模版类别
          name: '', // 模版名称
          status: 0, // 模版状态
          content: '' // 模版内容
        },
        server: {
          create: servers.ConfigManage.create_template,
          update: servers.ConfigManage.update_template,
          check: servers.ConfigManage.get_template_by_name_or_code
        },
        validate: {
          oldName: '',
          oldCode: ''
        },
        // 数据校验规则
        rules: {
          type: [{
            type: 'number',
            required: true,
            message: '请选择模板类别',
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '请输入模板内容',
            trigger: 'blur'
          }]
        },
        isModify: false,
        // 是否默认
        defaultFlag: false
      }
    },
    methods: {
      /**
       * 检测模板编号
       */
      checkTemplateCode() {
        return (rule, value, callback) => {
          if (value === this.validate.oldCode) {
            callback()
            return
          }
          net.send({
            server: this.server.check,
            data: {
              code: value
            }
          }).then(data => {
            callback()
          }, () => {
            callback(new Error('已被占用请重新输入'))
          })
        }
      },
      /**
       * 检测模板名称
       */
      checkTemplateName() {
        return (rule, value, callback) => {
          if (value === this.validate.oldName) {
            callback()
            return
          }
          net.send({
            server: this.server.check,
            data: {
              name: value
            }
          }).then(data => {
            callback()
          }, () => {
            callback(new Error('已被占用请重新输入'))
          })
        }
      },
      /**
       * 更新数据
       */
      updateData(data) {
        this.isModify = true
        this.defaultFlag = data.default
        this.validate.oldCode = data.code
        this.validate.oldName = data.name
        this.params = Object.assign({}, data)
      },
      /**
       * 确定按钮处理
       * 数据校验
       */
      submitClick(opt) {
        this.$refs['email-form'].validate((valid) => {
          if (!valid) {
            return
          }

          if (this.params.default && this.params.status === 1) {
            this.$message({
              type: 'info',
              message: '默认模板不可设为停用!'
            })
            return
          }

          switch (opt) {
            case 'add':
              this.addTemplate()
              break
            case 'update':
              this.updateTemplate()
              break
          }
        })
      },
      /**
       * 新增消息模板
       */
      addTemplate() {
        this.params.style = '31'
        net.send({
          server: this.server.create,
          data: this.params,
          loading: this.loading
        }).then(data => {
          // 新增模板信息
          this.$message({
            type: 'success',
            message: '新增模版成功!'
          })
          this.$emit('success')
          this.close()
        }, ({ reason }) => {
          this.$message({
            type: 'info',
            message: reason
          })
        })
      },
      /**
       *  修改模版
       */
      updateTemplate() {
        net.send({
          server: this.server.update,
          data: this.params
        }).then((data) => {
          // 修改模板信息
          this.$message({
            type: 'success',
            message: '修改模版成功!'
          })
          this.$emit('success')
          this.close()
        }, ({ reason }) => {
          this.$message({
            type: 'info',
            message: reason
          })
        })
      },
      /**
       * 关闭页面并重置数据
       */
      close() {
        this.$emit('close')
        this.isModify = false
        this.$refs['email-form'].resetFields()
      }
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
  .readme {
    color: #ff5722;
    font-size: 0.875rem;
    text-align: left;
    margin: 10px 0 20px;
    text-align: left;
    font-size: 5px;
  }
  
  .btns {
    text-align: center
  }

</style>

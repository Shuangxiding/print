<template>
  <div v-loading="loading.state">
    <el-form v-model="form" :rules="voiceRules" ref="voiceForm" label-width="150px">
      <el-form-item label="模板编号:" prop="code">
        <el-input v-model="form.code " :disabled="true"></el-input>
        <el-checkbox v-model="form.default ">设为默认模板</el-checkbox>
      </el-form-item>
      <br>
      <el-form-item label="语音模板类别: ">
        <el-select v-model="form.type " placeholder="请选择 ">
          <el-option value=" ">请选择</el-option>
          <el-option v-for="{id,name} in this.$helper.getTypeCode( '0010') " :key="id " :label="name " :value="id ">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="语音模板名称: " prop="name ">
        <el-input v-model="form.name "></el-input>
      </el-form-item>
      <br>
      <el-form-item label="状态: " prop="status ">
        <select v-model="form.status ">
          <option value="0">启用</option>
          <option value="1">停用</option>
        </select>
      </el-form-item>
      <el-form-item label="上传语音文件" prop="delivery">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture" style="float:left">
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注: " prop="content ">
        <el-input type="textarea " v-model="form.content "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isModify" type="primary " @click="submitCreateForm( 'template') ">保存</el-button>
        <el-button v-else type="primary " @click="submitUpdateForm( 'template') ">保存</el-button>
        <el-button v-if="isModify" @click="cancelCreate">取消</el-button>
        <el-button v-else @click="cancelUpdate">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import servers from '@/config/servers'
  import net from '@/util/net'
  import { mapGetters } from 'vuex'
  export default {
    name: 'voice-template',
    data() {
      return {
        loading: {
          state: false
        },
        server: {
          create: servers.ConfigManage.create_template
        },
        voiceForm: {},
        voiceRules: {
          type: [{ required: true, message: '请选择模板类型', trigger: 'blur' }],
          name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
          content: [{ required: true, message: '请输入模板内容', trigger: 'blur' }]
        },
        form: {
          style: '30',
          default: '',
          type: '',
          name: '',
          status: '0',
          content: ''
        }
      }
    },
    props: [
      'isModify',
      'data'
    ],
    watch: {
      data(value) {
        if (value) {
          this.default = value.default
          this.style = value.style
          this.type = value.type
          this.name = value.name
          this.status = value.status
          this.content = value.content
        }
      }
    },
    computed: {
      template_dialog_visual: {
        get() {
          return this.$store.state.configManage.template_dialog_visual
        },
        set(value) {
          this.$store.commit('updateTemplateDialogVisual', value)
        }
      },
      update_template_model: {
        get() {
          return this.$store.state.configManage.update_template_model
        },
        set(value) {
          this.$store.commit('doUpdateTemplateModel', value)
        }
      },
      ...mapGetters([
        'userToken'
      ])
    },
    methods: {
      // 保存按钮
      submitCreateForm() {
        console.log('增加按钮')
        net.send({
          server: this.server.create,
          data: this.form,
          append: [
            this.userToken
          ],
          loading: this.loading
        }).then((data) => {
          // 新增模板信息
          this.$message({
            type: 'success',
            message: '增加成功!'
          })
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      // 保存修改
      submitUpdateForm() {
        console.log('修改按钮')
        net.send({
          server: this.server.update,
          data: {
            template: this.form
          },
          append: [
            this.userToken
          ]
        }).then((data) => {
          // 新增模板信息
          this.$message({
            type: 'success',
            message: '增加成功!'
          })
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      // 取消增加按钮
      cancelCreate() {
        console.log('增加按钮')
        this.template_dialog_visual = false
      },
      // 取消修改按钮
      cancelUpdate() {
        console.log('修改按钮')
        this.update_template_model = false
      }
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>


</style>

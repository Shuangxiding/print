<template>
  <!--新增版本-->
  <div class="page">
    <el-form :model="addParams" ref="addform" label-width="100px" class="demo-ruleForm" :rules="rules">
      <el-col>
        <el-form-item label="版本号:" prop="appVersion" align="left">
          <el-input v-model="addParams.appVersion" :maxlength="20"></el-input>
        </el-form-item>
      </el-col>
      </el-row>
      <el-col>
        <el-form-item label="选择操作系统:" align="left" prop="oss">
          <el-checkbox-group v-model="addParams.oss">
            <el-checkbox label="IOS"></el-checkbox>
            <el-checkbox label="Android"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="是否静默安装:" prop="silentInstal" class="text-left">
          <el-radio-group v-model="addParams.silentInstal">
            <el-radio :label=1>是</el-radio>
            <el-radio :label=0>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      </el-row>
      <el-col>
        <el-form-item label="上传文件:">
          <FileUpload ref="file-upload"></FileUpload>
        </el-form-item>
      </el-col>
    </el-form>
    <el-button @click="confirmPublish">确认发布</el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script>
  import FileUpload from '@/components/FileUpload'
  import servers from '@/config/servers'
  import net from '@/util/net'
  export default {
    name: 'add-version',
    data() {
      return {
        server: {
          add: servers.SystemManage.save_package
        },
        addParams: {
          appVersion: '',
          oss: [],
          silentInstal: 0
        },
        checkList: [],
        radio: '',
        addVersion: false,
        /**
         * 新增版本校验规则
         */
        rules: {
          appVersion: [
            { required: true, message: '请输入版本号', trigger: 'blur' }
          ],
          oss: [
            { required: true, message: '请选择操作系统', trigger: 'change', type: 'array' }
          ]
        }
      }
    },
    methods: {
      confirmPublish() {
        this.$refs['addform'].validate((valid) => {
          if (!valid) return false
          // 获取上传文件
          let file = this.$refs['file-upload'].getFile()
          // 查看是否上传完成
          if (!file) {
            this.$message('请上传导入文件')
            return
          }
          this.addParams.url = this.$refs['file-upload'].getFileList().map(x => x.url)[0]
          this.addParams.size = this.$refs['file-upload'].getFileList().map(x => x.size)[0]
          // 提交保存
          net.send({
            server: this.server.add,
            data: this.addParams
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
            // 关闭新增角色dialog
            this.$emit('close')
            // 刷新databox
            this.$emit('refresh')
            // 重置form表单
            this.$refs['addform'].resetFields()
            // 重置上传文件
            this.$refs['file-upload'].reset()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      resetFields() {
        this.$refs['addform'].resetFields()
      },
      cancel() {
        this.$refs['file-upload'].reset()
        //   关闭新增版本dialog
        this.$emit('close')
        // 重置form表单
        this.$refs['addform'].resetFields()
      }
    },
    components: {
      FileUpload
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>

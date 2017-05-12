<template>
  <div v-loading="loading.state" :element-loading-text="loading.text">
    <el-form label-width="100px" class="text-left">
      <el-form-item v-if="!selected" label="批次号" prop="cupoBatch">
        <el-select placeholder="请选择" v-model="params.batchNum">
          <el-option v-for="item in batchtList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件">
        <file-upload :multiple="(Boolean)(selected)" :disabled="!params.batchNum&&!selected" ref="upload_file"></file-upload>
      </el-form-item>
      <el-form-item label-width="0" v-if="!selected">
        <span style="color:red;">（重要提示：如果需要导入多个文件，需要使用压缩包形式上传。目前只支持上传ZIP格式的压缩包文件，压缩包命名不限 ，但是压缩包中每个文件夹的命名请按照“客户姓名_身份证号_产品名称”格式，文件夹内不要再包含压缩文件，否则无法在线浏览。）</span>
      </el-form-item>
      <el-form-item label-width="0" v-else>
        <span style="color:red;">（重要提示：支持上传单个文件，如上传压缩包文件则无法在线浏览必须下载才能查看。）</span>
      </el-form-item>
    </el-form>
    <el-button @click="submit">确定</el-button>
    <el-button @click="close">取消</el-button>
  </div>

</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'
  import FileUpload from '@/components/FileUpload'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'case-file-import',
    data() {
      return {
        loading: {
          state: false,
          text: ''
        },
        params: {
          batchNum: '',
          uploadFile: ''
        }
      }
    },
    computed: {
      ...mapState({
        batchtList: state => state.caseManage.batch_list
      })
    },
    props: {
      selected: Object
    },
    methods: {
      ...mapMutations([
        'addMessageListener'
      ]),
      /**
       * 提交上传附件
       */
      submit() {
        let filelist = this.$refs['upload_file'].getFileList()
        if (!filelist || filelist.length < 1) {
          this.$message('请上传导入文件')
          return
        }

        if (this.selected) {
          net.send({
            server: server.CaseManage.upload_case_file_single,
            data: {
              batchNumber: this.selected.batchNumber,
              caseNum: this.selected.id,
              fileIdList: filelist.map(x => x.id)
            }
          }).then(
            data => {
              this.$message('附件导入成功')
              this.$emit('success')
              this.close()
            }, ({ err }) => {
              console.log(err)
              this.$message({
                type: 'info',
                message: err.object[0].errorMsg
              })
            }
          )
        } else {
          let [file] = filelist
          // 获取文件ID
          this.params.uploadFile = file.id
          net.send({
            server: server.CaseManage.import_case_attachment,
            data: this.params
          }).then(
            data => {}, ({ reason }) => {
              this.$message(reason)
            }
          )
        }
      },
      /**
       * 关闭窗体
       */
      close() {
        this.$refs['upload_file'].reset()
        this.$emit('close')
        this.$reset()
      },
      /**
       * 获取附件列表
       */
      getCaseFileList() {
        net.send({
          server: server.CaseManage.get_case_file_list,
          data: {
            batchNumber: this.selected.batchNumber,
            caseNum: this.selected.id
          }
        }).then(
          data => this.$refs['upload_file'].addFileList(data), ({ reason }) => {
            this.$message(reason)
          }
        )
      }
    },
    components: {
      FileUpload
    },
    mounted() {
      this.addMessageListener({
        type: 'Progress',
        callback: (() => {
          let self = this
          return (data) => {
            self.loading.state = (data.current < data.total)
            self.loading.text = `正在解压附件:${data.current}/${data.total}`
            if (!self.loading.state) {
              self.$emit('success')
              self.$message('附件导入完成')
              self.close()
            }
          }
        })()
      })
    }
  }

</script>
<style scoped>


</style>

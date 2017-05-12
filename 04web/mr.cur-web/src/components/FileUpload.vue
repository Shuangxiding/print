<template>
  <div class="row top-span start-span file-upload">
    <el-upload :file-list="defaultFileList" :multiple="multiple" ref="upload" class="text-left" :class="getUploadClass" :action="uploadUrl()" :on-remove="onRemove" :on-error="onError" :on-success="onSuccess" :before-upload="beforeUpload" :headers="headers" auto-upload>
      <el-button style="position:absolute;width:100px;top:0px;" :style="getButtonStyle" @click="uploadClick" size="small" type="primary">{{displayText}}</el-button>
    </el-upload>
  </div>
</template>

<script>
  import server from '@/config/servers'
  import app from '@/config/app'
  export default {
    name: 'file-upload',
    data() {
      return {
        headers: {
          'X-UserToken': this.$store.getters.userToken
        },
        uploading: false,
        uploadSuccess: false,
        defaultFileList: [],
        fileList: []
      }
    },
    computed: {
      getUploadClass() {
        return this.multiple ? {
          'col': true,
          'start-span': true,
          'top-span': true
        } : {
          'row': true,
          'start-span': true,
          'middle-span': true
        }
      },
      displayText() {
        console.log(this.multiple)
        if (this.uploading) {
          return '上传中'
        }
        if (this.uploadSuccess && !this.multiple) {
          return '上传完成'
        }
        return this.label
      },
      disableUpload() {
        if (this.disabled) {
          return true
        }
        return (this.uploading || (!this.multiple && this.uploadSuccess))
      },
      getButtonStyle() {
        if (this.disableUpload) {
          return {
            background: 'lightgray',
            border: 'solid 1px lightgray'
          }
        } else {
          return {}
        }
      }
    },
    props: {
      label: {
        type: String,
        default: '上传'
      },
      multiple: Boolean,
      server: Object,
      append: String,
      disabled: Boolean
    },
    methods: {
      /**
       * 阻止点击按钮状态
       */
      uploadClick(e) {
        if (this.disableUpload) {
          e.preventDefault()
          e.stopPropagation()
        }
      },
      /**
       * 获取上传文件url
       */
      uploadUrl() {
        let base = app.url.upload
        let uploadServer = this.server ? this.server : server.app.upload
        let appendPostfix = this.append ? '/' + this.append : ''

        return `${base}/api/${uploadServer.controller}/${uploadServer.action}${appendPostfix}`
      },
      /**
       * 上传错误处理
       */
      onError() {
        this.uploading = false
        this.uploadSuccess = false
      },
      /**
       * 上传成功处理
       */
      onRemove(data) {
        this.uploading = false
        this.uploadSuccess = false
        this.fileList = this.fileList.filter(x => x.id !== data.id)
        this.defaultFileList = this.defaultFileList.filter(x => x.id !== data.id)
      },
      /**
       * 上传成功处理
       */
      onSuccess(data, file, list) {
        console.log(2323, data, file, list)
        if (data.success) {
          this.uploading = false
          this.uploadSuccess = true

          if (file && data && data.object) {
            file.url = data.object.url
            file.id = data.object.id
          }

          this.fileList = Array.from(list)
        } else {
          this.onError()
        }

        console.log(this.fileList)
      },
      /**
       * 上传前状态处理
       */
      beforeUpload(...args) {
        console.log(args)
        this.uploading = true
        this.uploadSuccess = false
      },
      /**
       * 获取上传文件列表
       */
      getFileList() {
        console.log(this.$refs['upload'])
        console.log([...this.defaultFileList, ...this.fileList])
        return [...this.defaultFileList, ...this.fileList]
      },
      /**
       * 获取上传文件
       */
      getFile() {
        let [file] = [...this.defaultFileList, ...this.fileList]
        return file
      },
      /**
       * 重置上传控件状态
       */
      reset() {
        this.uploading = false
        this.uploadSuccess = false
        this.fileList = []
        this.defaultFileList = []
        this.$refs['upload'].clearFiles()
      },
      /**
       * 添加上传文件列表
       */
      addFileList(list) {
        this.defaultFileList = list.map(x => ({
          name: x.fileName,
          id: x.fileId,
          url: x.fileUrl
        }))
      }
    }
  }

</script>

<style lang="less">
  .file-upload {
    position: relative;
    .row {
      .el-upload-list {
        margin-left: 120px
      }
      .el-upload-list__item:first-child {
        margin-top: 0px;
      }
    }
  }

</style>

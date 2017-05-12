<template>
  <div>
    <el-col class="frame">
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-jinjiancailiao"></span>
        <span>进件材料</span>
        <el-button style="float:right" @click="downloadfirst">一键下载</el-button>
      </el-col>
      <el-table class="tablestyle" :data="items.inputFile">
        <el-table-column header-align="center" label="材料名称" prop="name" min-width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="fileName" label="文件名称" min-width="60">
          <template scope="scope">
            <el-col class="item" v-for="v,i in scope.row.customerPapers" :key="i">
              <el-button v-if="fileType(v.pictureName)" @click="orgPreStep(scope,i)" type="text" size="small">{{v.pictureName}}</el-button>
              <span v-else>{{v.pictureName}}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="uploadDate" label="上传时间" min-width="200">
        </el-table-column>
        <el-table-column header-align="center" prop="operatorName" label="操作人" min-width="80">
        </el-table-column>
        <el-table-column header-align="center" prop="下载" label="操作" min-width="30">
          <template scope="scope">
            <el-col class="item" v-for="v,i in scope.row.customerPapers" :key="i">
              <a :href="v.uploadUrl" :download="scope.row.pictureName">下载</a>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-xianshanghetongxiazai"></span>
        <span>线上合同下载</span>
      </el-col>
      <el-table class="tablestyle" :data="items.olContract">
        <el-table-column header-align="center" prop="contractNum" label="合同编号" min-width="200">
        </el-table-column>
        <el-table-column header-align="center" prop="fileName" label="文件名称" min-width="200">
          <template scope="scope">
            <el-button v-if="fileType(scope.row.fileName)" @click="checkFile(scope.row.filePath)" type="text" size="small">{{scope.row.fileName}}</el-button>
            <span v-else>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="uploadTime" label="上传时间" min-width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="下载" label="操作" min-width="80">
          <template scope="scope">
            <a :href="scope.row.filePath" :download="scope.row.fileName">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-qianyuehetongxiazai"></span>
        <span>签约合同下载</span>
      </el-col>
      <el-table class="tablestyle" label="签约合同下载" :data="items.signContract">
        <el-table-column header-align="center" prop="fileName" label="文件名称" min-width="200">
          <template scope="scope">
            <el-button v-if="fileType(scope.row.fileName)" @click="checkFile(scope.row.filePath)" type="text" size="small">{{scope.row.fileName}}</el-button>
            <span v-else>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="uploadTime" label="上传时间" min-width="200">
        </el-table-column>
        <el-table-column header-align="center" prop="operator" label="操作人" min-width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="下载" label="操作" min-width="80">
          <template scope="scope">
            <a :href="scope.row.filePath" :download="scope.row.fileName">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-buchongcailiao"></span>
        <span>补充材料</span>
      </el-col>
      <el-table class="tablestyle" label="" :data="items.supply">
        <el-table-column header-align="center" prop="fileName" label="文件名称" min-width="200">
          <template scope="scope">
            <el-button v-if="fileType(scope.row.fileName)" @click="checkFile(scope.row.filePath)" type="text" size="small">{{scope.row.fileName}}</el-button>
            <span v-else>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="uploadTime" label="上传时间" min-width="200">
        </el-table-column>
        <el-table-column header-align="center" prop="operator" label="操作人" min-width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="下载" label="操作" min-width="80">
          <template scope="scope">
            <a :href="scope.row.filePath" :download="scope.row.fileName">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <el-col class="text-left data-grid-title" style="float:none">
        <span class="iconfont icon-qitaxinxi"></span>
        <span>其他材料</span>
      </el-col>
      <el-table class="tablestyle" :data="items.other" v-if="type === 'IMPORT'">
        <el-table-column header-align="center" prop="fileName" label="文件名称" min-width="200">
          <template scope="scope">
            <el-button v-if="fileType(scope.row.fileName)" @click="checkFile(scope.row.fileUrl)" type="text" size="small">{{scope.row.fileName}}</el-button>
            <span v-else>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="createDate" label="上传时间" min-width="200">
        </el-table-column>
        <el-table-column header-align="center" prop="creatorName" label="操作人" min-width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="下载" label="操作" min-width="80">
          <template scope="scope">
            <a :href="scope.row.fileUrl" :download="scope.row.fileName">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <el-table class="tablestyle" :data="items.other" v-else>
        <el-table-column header-align="center" prop="pictureName" label="文件名称" min-width="200">
          <template scope="scope">
            <el-button v-if="fileType(scope.row.pictureName)" @click="checkFile(scope.row.uploadUrl)" type="text" size="small">{{scope.row.pictureName}}</el-button>
            <span v-else>{{scope.row.pictureName}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="createTime" label="上传时间" min-width="200">
        </el-table-column>
        <el-table-column header-align="center" prop="operatorName" label="操作人" min-width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="下载" label="操作" min-width="80">
          <template scope="scope">
            <a :href="scope.row.uploadUrl" :download="scope.row.pictureName">下载</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<script>
  import server from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'attach-inform',
    data() {
      return {
        items: {
          olContract: [], // 线上合同
          inputFile: [], // 进件材料
          signContract: [], // 签约合同
          supply: [], // 材料补充
          other: [] // 其他材料
        },
        type: ''
      }
    },
    computed: {
      // 查看凭证
      check_img_dialog: {
        get() {
          return this.$store.state.app.check_img_dialog
        },
        set(val) {
          this.$store.commit('updateCheckImgDialog', val)
        }
      },
      check_img_url: {
        get() {
          return this.$store.state.app.check_img_url
        },
        set(val) {
          this.$store.commit('updateCheckImgUrl', val)
        }
      }
    },
    methods: {
      fileType(name) {
        if (name) {
          let arr = name.split('.')
          let type = arr[arr.length - 1]
          if (type === 'jpg' || type === 'png') {
            return true
          }
        }
        return false
      },
      orgPreStep(scope, i) {
        this.check_img_dialog = true
        this.check_img_url = [scope.row.customerPapers[i].uploadUrl]
      },
      /**
       * 查看文件
       */
      checkFile(url) {
        this.check_img_dialog = true
        this.check_img_url = [url]
      },
      /**
       * 一键下载按钮
       */
      downloadfirst() { console.log('ok') },
      /**
       * 案件导入的数据更新
       */
      importSend(attach) {
        net.send({
          server: server.CaseManage.get_case_impFile,
          data: {
            caseNum: attach.caseNum
          }
        }).then((data) => {
          this.items.other = data
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 其他页面的数据更新
       */
      ortherSend(attach) {
        net.sendAll([{
          server: server.CaseManage.get_customer_feedingMaterial, // 案件分配、案件管理、客户查询的案件详情附件信息的进件材料
          data: {
            custId: attach.custId
          }
        }, {
          server: server.CaseManage.get_customerContract_information, // 案件分配、案件管理、客户查询的案件详情附件信息的线上合同，签约合同下载
          data: {
            orderNum: attach.orderNum
          }
        }, {
          server: server.CaseManage.get_customer_ohterPapers, // 案件分配、案件管理、客户查询的案件详情附件信息的其他材料
          data: {
            custId: attach.custId
          }
        }]).then((data) => {
          if (data[0]) {
            this.items.inputFile = data[0]
          }
          if (data[1]) {
            this.items.olContract = data[1].orderMakeFileList
            this.items.signContract = data[1].orderFileList
          }
          if (data[2]) {
            this.items.other = data[2]
          }
          console.log(data)
        }, err => {
          console.log(err)
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 刷新
       */
      refresh(attach) {
        this.type = attach.type
        this.items = {
          olContract: [], // 线上合同
          inputFile: [], // 进件材料
          signContract: [], // 签约合同
          supply: [], // 材料补充
          other: [] // 其他材料
        }
        console.log('attach')
        if (attach.type === 'IMPORT') {
          this.importSend(attach)
        } else {
          this.ortherSend(attach)
        }
      }
    },
    filters: {
      // 根据文件类型获取材料名称
      fileType(value) {
        switch (value) {
          case 'ID_CARD':
            return '身份证'
          case 'HOUSE_CERTIFICATE':
            return '房产证'
          case 'LAND_CERTIFICATE':
            return '土地证'
          case 'PERSON_CREDIT':
            return '个人征信'
          case 'INTERMEDIARY_AGREEMENT':
            return '中介委托协议'
          default:
            return ''
        }
      }
    }
  }

</script>
<style scoped>
  .frame {
    padding: 10px;
  }
  
  .item {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  
  .item:last-child {
    border: 0px;
  }

</style>

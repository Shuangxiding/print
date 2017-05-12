<template>
  <div class="page">
    <data-box ref="databox" :params="params" row-key="id" :server="server.search" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="版本号" v-role="0x090301">
          <el-input v-model="params.appVersion"></el-input>
        </el-form-item>
        <el-form-item label="操作系统" v-role="0x090302">
          <el-select v-model="params.os" placeholder="请选择" clearable>
            <el-option label="IOS" value="IOS"></el-option>
            <el-option label="Android" value="Android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" v-role="0x090303">
          <div class="block">
            <el-date-picker v-model="publishTime" type="daterange" placeholder="选择发布时间" :editable="false" @change="publishTimeChange">
            </el-date-picker>
          </div>
        </el-form-item>
      </template>

      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="index" label="序号" width="40">
        </el-table-column>
        <el-table-column prop="os" label="操作系统" min-width="80">
        </el-table-column>
        <el-table-column prop="appVersion" label="版本号" min-width="120">
        </el-table-column>
        <el-table-column prop="silentInstal" label="是否静默安装" min-width="50">
          <template scope="scope">
            <span v-if="scope.row.silentInstal === 1">是</span>
            <span v-if="scope.row.silentInstal === 0">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="更新文件地址" min-width="100" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" min-width="60">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="deleteClick(scope)" v-role="0x090305">删除</el-button>
          </template>
        </el-table-column>
      </template>


      <template slot="button">
        <!--按钮区域-->
        <el-button @click="addNewVersion" v-role="0x090304">添加新版本</el-button>
      </template>
    </data-box>

    <!--添加新版本弹出框-->
    <el-dialog title="添加新版本" v-model="addVersion" size="small" @open="addVersionOpen" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <AddVersion @close="addVersion=false" @refresh="refreshDatabox" ref="addform">
      </AddVersion>
    </el-dialog>
  </div>
</template>


<script>
  import DataBox from '@/components/DataBox'
  import AddVersion from '@/views/system-manage/AddVersion'
  import servers from '@/config/servers'
  import net from '@/util/net'
  export default {
    name: 'version-control',
    data() {
      return {
        server: {
          search: servers.SystemManage.get_app_package,
          delete: servers.SystemManage.delete_package
        },

        params: {
          sort: 'publishTime,desc',
          id: '',
          os: '',
          pubDateBegin: '',
          pubDateEnd: '',
          versionId: ''
        },
        publishTime: [],
        addVersion: false,
        // 版本增加参数
        addParams: {

        }
      }
    },
    methods: {
      publishTimeChange() {
        console.log(this.publishTime)
        if (this.publishTime[0] === null) {
          this.params.pubDateBegin = ''
          this.params.pubDateEnd = ''
        } else {
          this.params.pubDateBegin = this.publishTime[0]
          this.params.pubDateEnd = this.publishTime[1]
        }
      },
      addNewVersion() {
        this.addVersion = true
      },
      addVersionOpen() {
        this.$nextTick(() => {
          this.$refs['addform'].resetFields()
        })
      },
      deleteClick(scope) {
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: this.server.delete,
            data: {
              id: scope.row.id
            }
          }).then((data) => {
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
      },
      refreshDatabox() {
        this.$refs['databox'].refresh()
      }
    },
    components: {
      DataBox,
      AddVersion
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>

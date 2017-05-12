<template>
  <!--跟进记录-->
  <div>
    <data-box ref="databox" :params="params" :server="servers.follow" row-key="cupoId">
      <!--输入区域-START-->
      <template slot="input">
        <el-form-item prop="follUpMinTime" label="跟进日期">
          <el-date-picker v-model="params.follUpMinTime" format="yyyy-MM-dd" type="date" placeholder="选择日期" :picker-options="CreatDate" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="follUpMaxTime" label="-">
          <el-date-picker v-model="params.follUpMaxTime" type="date" placeholder="选择日期" :picker-options="EndDate" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="follType" label="跟进形式">
          <el-select v-model="params.follType" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0029')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="follFeedback" label="催收反馈">
          <el-select v-model="params.follFeedback" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0031')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="follSource" label="跟进来源">
          <el-select v-model="params.follSource" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0030')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--输入区域-END-->
      <!--数据列区域-START-->
      <template slot="column" width="150">
        <el-table-column type="index" label="序号" width="40">
        </el-table-column>
        <el-table-column prop="follTime" label="跟进时间" min-width="110">
        </el-table-column>
        <el-table-column prop="follType" label="跟进形式" min-width="70">
          <template scope="scope">
            <span>{{scope.row.follType | typeCodeConvert('0029')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follTarget" label="催收对象" min-width="70">
          <template scope="scope">
            <span>{{scope.row.follTarget | typeCodeConvert('0034')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follName" label="姓名" min-width="90">
        </el-table-column>
        <el-table-column label="电话/地址状态" min-width="90">
          <template scope="scope">
            <span>{{scope.row.follContype | typeCodeConvert('0023')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follPhoneNum" label="电话/地址" min-width="90">
          <template scope="scope">
            <span v-if="scope.row.follType===111">{{scope.row.follPhoneNum | cityConvert}}</span>
            <span v-else>{{scope.row.follPhoneNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follFeedback" label="催收反馈" min-width="140">
          <template scope="scope">
            <span>{{scope.row.follFeedback | typeCodeConvert('0031')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follContent" label="跟进内容" min-width="90">
        </el-table-column>
        <el-table-column prop="follSource" label="跟进来源" min-width="90">
          <template scope="scope">
            <span>{{scope.row.follSource | typeCodeConvert('0030')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="跟进人员" min-width="90">
        </el-table-column>
        <el-table-column label="操作" width="100px" min-width="90">
          <template scope="scope">
            <el-button @click="loadCallFileHandle(scope.row.follOpurl)" type="text" v-if="scope.row.follSource===112&&scope.row.follOpurl">下载录音</el-button>
            <el-button @click="loadVisitFileHandle(scope.row.follId)" type="text" v-if="scope.row.follSource===113">下载外访材料</el-button>
          </template>
          <!--数据列区域-END-->
        </el-table-column>
      </template>
    </data-box>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import { downloadFile } from '@/util/common'
  import net from '@/util/net'

  export default {
    name: 'cost-follow',
    data() {
      return {
        pickerOptions: {},
        // 服务接口列表
        servers: {
          follow: server.ApprovalManage.get_followup_record,
          loadVisitFile: server.AccManage.get_download_visit_info
        },
        // 定义请求参数
        params: {
          follUpMinTime: '',
          follUpMaxTime: '',
          follTime: '',
          follType: '',
          follFeedback: '',
          follSource: '',
          cupoId: '',
          sort: 'follTime,desc'
        },
        multipleSelection: [],
        loadRecordClick: false,
        //  跟进日期开始时间
        CreatDate: {
          disabledDate: (time) => {
            let endTime = this.params.follUpMaxTime
            if (endTime) {
              return time.getTime() > endTime.getTime()
            }
          }
        },
        // 跟进日期结束时间
        EndDate: {
          disabledDate: (time) => {
            let startTime = this.params.follUpMinTime
            if (startTime) {
              return time.getTime() < startTime.getTime()
            }
          }
        }
      }
    },
    methods: {
      /**
       * 下载录音
       */
      loadCallFileHandle(url) {
        downloadFile(url)
      },
      /**
       * 下载外访材料
       */
      loadVisitFileHandle(follId) {
        net.send({
          server: this.servers.loadVisitFile,
          data: {
            follId: follId
          }
        }).then((data) => {
          // 接口返回的数据
          if (data) {
            for (let i = 0; i < data.length; i++) {
              downloadFile(data[i].localUrl, data[i].realName)
            }
          } else {
            this.$message({
              type: 'info',
              message: '暂无数据'
            })
          }
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 刷新
       */
      refresh() {
        this.$refs['databox'].formResetFields()
        this.params.cupoCasenum = this.$store.state.approvalManage.follow_record_cupoId
        this.$refs['databox'].refresh()
      }
    },
    components: {
      DataBox
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

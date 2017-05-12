<template>
  <div>
    <data-box ref="databox" :params="params" :server="servers.getInformation" :defaultParams="defaultParams" row-key="follId" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="跟进日期">
          <el-date-picker v-model="params.follUpMinTime" type="date" placeholder="选择日期" :picker-options="follUpMinTime" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker v-model="params.follUpMaxTime" type="date" placeholder="选择日期" :picker-options="follUpMaxTime" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进形式">
          <el-select v-model="params.follType" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0029')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收反馈">
          <el-select v-model="params.follFeedback" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0031')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进来源">
          <el-select v-model="params.follSource" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0030')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--数据列区域-->
      <template slot="column">
        <el-table-column width="30" type="index" label="序号"></el-table-column>
        <el-table-column prop="follTime" label="跟进时间" min-width="120">
        </el-table-column>
        <el-table-column prop="follType" label="跟进方式" min-width="50">
          <template scope="scope">
            <span>{{scope.row.follType | typeCodeConvert('0029')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follTarget" label="催收对象" min-width="60">
          <template scope="scope">
            <span>{{scope.row.follTarget | typeCodeConvert('0034')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follCust" label="姓名" min-width="50">
        </el-table-column>
        <el-table-column prop="follFeedback" label="催收反馈" min-width="150">
          <template scope="scope">
            <span>{{scope.row.follFeedback | typeCodeConvert('0031')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follContype" label="电话/地址状态" min-width="80">
          <template scope="scope">
            <span>{{scope.row.follContype | typeCodeConvert('0023','0025')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="follPhoneNum" label="电话/地址" min-width="80">
          <template scope="scope">
            {{scope.row.follAreaid|cityConvert(true)}}{{scope.row.follPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column prop="follContent" label="跟进内容" min-width="60">
        </el-table-column>
        <el-table-column prop="follSource" label="跟进来源" min-width="60">
          <template scope="scope">
            <span>{{scope.row.follSource | typeCodeConvert('0030')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="跟进人员" min-width="90">
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template scope="scope">
            <el-button @click="$emit('edit', scope.row)" type="text" size="small"></el-button>
            <el-button @click="checkClick(scope)" type="text" size="small">查看</el-button>
            <el-button @click="downloadOutboundMaterialClick(scope)" type="text" size="small" v-if="scope.row.follType===111">下载外访材料</el-button>
            <el-button @click="downloadRecordClick(scope)" type="text" size="small" v-if="scope.row.follOpurl!==null">下载录音</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-->
    <!--查看-->
    <el-dialog title="查看" v-model="Check" size="small" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form ref="CheckParams" :params="CheckParams" label-width="100px" class="text-left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="催收对象" prop="follTarget">
              <el-select v-model="CheckParams.follTarget" placeholder="请选择" clearable disabled>
                <el-option v-for="{id,name} in this.$helper.getTypeCode('0034')" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="follCust">
              <el-input v-model="CheckParams.follCust" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="跟进方式">
              <el-select v-model="CheckParams.follType" placeholder="请选择" clearable disabled>
                <el-option v-for="{id,name} in this.$helper.getTypeCode('0029')" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话/地址状态">
              <el-select v-model="CheckParams.follContype" placeholder="请选择" clearable disabled>
                <el-option v-for="{id,name} in this.$helper.getTypeCode('0023','0025')" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="催收反馈">
              <el-select v-model="CheckParams.follFeedback" placeholder="请选择" clearable disabled>
                <el-option v-for="{id,name} in this.$helper.getTypeCode('0031')" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话/地址" prop="follPhoneNum">
              <el-input v-model="CheckParams.follPhoneNum" readonly>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="跟进内容">
              <el-input type="textarea" v-model="CheckParams.follContent" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="跟进时间">
              <el-input v-model="CheckParams.follTime" readonly></el-input>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="承诺金额">
              <el-input v-model="CheckParams.follPnum" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="承诺日期">
              <el-input v-model="CheckParams.follPdate" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="跟进提醒内容">
              <el-input type="textarea" v-model="CheckParams.follWarninfo" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button @click="Check=false">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import { downloadFile, getCityName } from '@/util/common'
  import net from '@/util/net'

  export default {
    name: 'follow-record',
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        servers: {
          getInformation: servers.AccManage.get_follow_recode_info
        },
        items: [],
        edit: false,
        params: {
          follTime: '',
          follType: '',
          follFeedback: '',
          follSource: '',
          creator: '',
          follContent: '',
          follPhoneNum: '',
          follContype: '',
          follUpMinTime: '',
          follUpMaxTime: '',
          sort: 'createTime,desc'
        },
        CheckParams: {
          follTarget: ''
        },
        form: {},
        Check: false,
        defaultParams: {
          cupoCasenum: this.$store.state.accManage.case_num
        }
      }
    },
    methods: {
      /**
       * 跟进日期
       */
      follUpMinTime: {
        disabledDate: (time) => {
          let endTime = this.params.follUpMaxTime
          if (endTime) {
            return time.getTime() > endTime.getTime()
          }
        }
      },
      follUpMaxTime: {
        disabledDate: (time) => {
          let startTime = this.params.follUpMinTime
          if (startTime) {
            return time.getTime() < startTime.getTime()
          }
        }
      },
      /**
       * 查看
       */
      checkClick(scope) {
        this.CheckParams = Object.assign({}, scope.row)
        if (this.$store.state.accManage.type_id === 70) {
          let follNum = getCityName([scope.row.follProvid, scope.row.follCityid, scope.row.follAreaid]).join('') + scope.row.follPhoneNum
          this.CheckParams.follPhoneNum = follNum
        }
        this.Check = true
      },
      /**
       * 刷新databox
       */
      refresh() {
        this.defaultParams = Object.assign({}, {
          cupoCasenum: this.$store.state.accManage.case_num
        })
      },
      /**
       * 下载外访材料
       */
      downloadOutboundMaterialClick(scope) {
        net.send({
          server: servers.AccManage.get_download_visit_info,
          data: {
            follId: scope.row.follId
          }
        }).then((object) => {
          if (object && object.length > 0) {
            for (let i = 0; i < object.length; i++) {
              downloadFile(object[i].url, '外访材料')
            }
            this.$message({
              type: 'success',
              message: '下载成功'
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
       * 下载录音
       */
      downloadRecordClick(scope) {
        downloadFile(scope.row.follOpurl, '语音内容')
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

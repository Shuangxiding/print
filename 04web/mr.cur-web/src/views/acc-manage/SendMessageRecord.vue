<template>
  <!--发送信息记录-->
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="servers.getInformation" row-key="mereId" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="发送信息类别">
          <el-select v-model="params.mereType" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0009')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送方式" style="align=center">
          <el-select v-model="params.mereStyle" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0037')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类别">
          <el-select v-model="params.mereMtype" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--数据列区域-->
      <template slot="column">
        <el-table-column width="30" type="index" label="序号"></el-table-column>
        <el-table-column prop="mereType" label="发送信息类别" min-width="90">
          <template scope="scope">
            <span>{{scope.row.mereType | typeCodeConvert('0009')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mereStyle" label="发送方式" min-width="80">
          <template scope="scope">
            <span>{{scope.row.mereStyle | typeCodeConvert('0037')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mereMnum" label="模板序号" min-width="80">
        </el-table-column>
        <el-table-column prop="mereMtype" label="模板类别" min-width="80">
          <template scope="scope">
            <span>{{scope.row.mereMtype | typeCodeConvert('0010')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mereMname" label="模板名称" min-width="80">
        </el-table-column>
        <el-table-column prop="mereSendtime" label="发送时间" min-width="120">
        </el-table-column>
        <el-table-column prop="mereTarget" label="发送对象" min-width="130">
        </el-table-column>
        <el-table-column prop="mereTname" label="发送对象姓名" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template scope="scope">
            <el-button @click="CheckdetailsClick(scope)" type="text" size="small">查看详情</el-button>
            <el-button @click="telClick(scope)" type="text" size="small" v-if="scope.row.mereType===159">下载语音</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-->
    <el-dialog title="查看详情" v-model="Checkdetails" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form ref="form" :params="form" label-width="100px">
        <div class="row">
          <el-form-item label="信息类别">
            <el-select v-model="form.mereType" placeholder="请选择" clearable disabled>
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0009')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板名称">
            <el-input v-model="form.mereMname" disabled></el-input>
          </el-form-item>
        </div>
        <el-form-item label="模板类别">
          <el-select v-model="form.mereMtype" placeholder="请选择" clearable disabled style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送内容">
          <el-col :span="22">
            <el-input type="textarea" v-model="form.mereContent" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="Checkdetails=false">关闭</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'

  export default {
    name: 'send-message-record',
    data() {
      return {
        // 服务接口列表
        servers: {
          getInformation: servers.AccManage.get_send_message_info
        },
        // 定义请求参数
        params: {
          relation: '',
          name: '',
          phone: '',
          phoneStatus: '',
          updateTime: '',
          status: '',
          operator: '',
          cupoName: '',
          mereType: '',
          mereStyle: '',
          mereMtype: '',
          sort: 'mereSendtime,desc'
        },
        items: [],
        form: {
          mereType: '',
          mereMtype: '',
          mereMname: '',
          mereContent: ''
        },
        Checkdetails: false,
        defaultParams: {
          cupoId: this.$store.state.accManage.case_id
        }
      }
    },
    activated() {
      this.$refs['databox'].refresh()
    },
    methods: {
      /**
       * 刷新
       */
      refreshMessage() {
        this.defaultParams = Object.assign({}, {
          cupoId: this.$store.state.accManage.case_id
        })
      },
      /**
       * 查看详情
       */
      CheckdetailsClick(scope) {
        this.form = scope.row
        this.Checkdetails = true
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

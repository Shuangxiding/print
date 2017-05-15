<template>
  <div class="page">
    <!--<data-box ref="databox" :params="params" :server="servers.customerCollection">-->
    <data-box ref="databox" :params="params" :data="data">
      <!--搜索区-->
      <template slot="input">
        <el-form-item label="客户名称:" v-role="0x070103">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x060103">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x060104">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x060103">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
      </template>
      <!--数据区-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="30"></el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号" min-width="100"></el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="90"></el-table-column>
        <el-table-column prop="cupoAmt" label="案件金额" min-width="90"></el-table-column>
        <el-table-column prop="cupoOverday" label="逾期天数" min-width="80"></el-table-column>
        <el-table-column prop="cupoBatch" label="批次号" min-width="90"></el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="110"></el-table-column>
        <el-table-column prop="cupoPaystatus" label="还款状态" min-width="80"></el-table-column>
        <el-table-column prop="cupoName" label="催收员" min-width="90"></el-table-column>
        <el-table-column label="操作" min-width="90">
          <template scope="scope">
            <el-button type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  export default {
    name: 'notice-acc',
    data() {
      return {
        // data: [{ custName: '孙艳平' }],
        // 服务接口列表
        servers: {
          sendNoticeInfo: server.NoticeManage.send_notice_info
        },
        params: {
          custName: '',
          cupoBatch: '',
          prinId: '',
          cupoName: '',
          cupoCasenum: '',
          cupoAmt: '',
          cupoOverday: '',
          cupoPrincipal: '',
          cupoPaystatus: '',
          createTime: '',
          sort: 'createTime,desc'
        }
      }
    },
    components: {
      DataBox
    }
  }

</script>

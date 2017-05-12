<template>
  <div class="page">
    <!--<data-box ref="databox" :params="params" :server="servers.customerCollection">-->
    <data-box ref="databox" :params="params" :data="data">
      <!--搜索区-->
      <template slot="input">
        <el-form-item label="客户名称:" v-role="0x070103">
          <el-input></el-input>
        </el-form-item>
      </template>
      <!--数据区-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="30"></el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="90"></el-table-column>
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
        data: [{ custName: '孙艳平' }],
        servers: {
          sendNoticeInfo: server.NoticeManage.send_notice_info
        },
        params: {
          custName: ''
        }
      }
    },
    components: {
      DataBox
    }
  }

</script>

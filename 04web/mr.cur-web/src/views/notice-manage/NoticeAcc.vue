<template>
  <!--通知管理-->
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.sendNoticeInfo" row-key="noticeAcc" autoSearch>
      <!--搜索区-START-->
      <template slot="input">
        <el-form-item label="客户名称:" v-role="0x070103">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]" v-role="0x050108">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" prop="overDayMax" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]" v-role="0x050108">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
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
      <!--搜索区-END-->

      <!--数据区-STAR-->
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
            <el-button type="text" size="small" @click="printNoticeClick(scope)">打印催收通知单</el-button>
          </template>
        </el-table-column>
      </template>
      <!--数据列区域-END-->
    </data-box>

    <el-dialog title="贷后催收通知单打印" v-model="printNoticeClickHandle" size="small">
      <notice-print ref="NoticePrint" :printData="printData"></notice-print>
    </el-dialog>

  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import NoticePrint from '@/views/notice-manage/NoticePrint'
  import server from '@/config/servers'
  import { validateMin, validateMax } from '@/util/common'
  import net from '@/util/net'
  export default {
    name: 'notice-acc',
    data() {
      return {
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
          overDayMin: '',
          overDayMax: '',
          cupoPrincipal: '',
          cupoPaystatus: '',
          createTime: '',
          sort: 'createTime,desc'
        },
        validate: {
          validateMin,
          validateMax
        },
        printData: '',
        dataName: [],
        printNoticeClickHandle: false
      }
    },
    methods: {
      printNoticeClick(scope) {
        // this.printData = scope.row
        this.$store.commit('updatePrintInfo', scope.row)
        this.printNoticeClickHandle = true
      }
    },
    mounted() {
      net.send({
        server: server.NoticeManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
        console.log(data)
      }, err => {
        console.log(err)
      })
    },
    components: {
      DataBox,
      NoticePrint
    }
  }

</script>

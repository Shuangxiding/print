<!--案件修复-->
<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.client" row-key="orapId" autoSearch>

      <!--输入区域Start-->
      <template slot="input">
        <el-form-item label="委托方" v-role="0x050102">
          <el-select v-model="params.prinId" clearable>
            <el-option v-for="{prinId, prinName} in this.clientList" :key="prinId" :label="prinName" :value="prinId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名" v-role="0x050103">
          <el-input v-model="params.reapCust"></el-input>
        </el-form-item>
        <el-form-item label="申请省份" v-role="0x050104">
          <el-select v-model="params.reapProvid" clearable>
            <el-option v-for="{id,areaName} in provinceList" :key="id" :label="areaName" :value="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请城市">
          <el-select v-model="params.reapCityid" clearable>
            <el-option v-for="{id,areaName} in cityList" :key="id" :label="areaName" :value="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期" v-role="0x050105">
          <el-date-picker v-model="params.createTimeBegin" type="date" placeholder="选择日期" :picker-options="createTimeBegin" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="-" v-role="0x050105">
          <el-date-picker v-model="params.createTimeEnd" type="date" placeholder="选择日期" :picker-options="createTimeEnd" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="案件金额" prop="reapAmtStart" :rules="[
            { validator: validate.validateMin(params.reapAmtEnd), trigger: 'blur' }
          ]" v-role="0x050106">
          <el-input v-model.number="params.reapAmtStart" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" prop="reapAmtEnd" :rules="[
            { validator: validate.validateMax(params.reapAmtStart), trigger: 'blur' }
          ]" v-role="0x050106">
          <el-input v-model.number="params.reapAmtEnd" type="number"></el-input>
        </el-form-item>
        <el-form-item label="还款状态" v-role="0x050107">
          <el-select v-model="params.reapPaystatus" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="reapOverdayStart" :rules="[
            { validator: validate.validateMin(params.reapOverdayEnd), trigger: 'blur' }
          ]" v-role="0x050108">
          <el-input v-model.number="params.reapOverdayStart" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" prop="reapOverdayEnd" :rules="[
            { validator: validate.validateMax(params.reapOverdayStart), trigger: 'blur' }
          ]" v-role="0x050108">
          <el-input v-model.number="params.reapOverdayEnd" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x050109">
          <el-select v-model="params.reapAppstatu" clearable>
            <el-option label="待修复" value="80"></el-option>
            <el-option label="修复中" value="81"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--输入区域End-->

      <!--数据列区域Start-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="40"></el-table-column>
        <el-table-column prop="reapOrdernum" label="案件编号" min-width="100"></el-table-column>
        <el-table-column prop="reapBatch" label="批次号" min-width="90"></el-table-column>
        <!--<el-table-column prop="reapCity" label="申请城市" min-width="60"></el-table-column>-->
        <el-table-column prop="createTime" label="申请日期" min-width="120"></el-table-column>
        <el-table-column prop="reapPrincipal" label="委托方" min-width="60"></el-table-column>
        <el-table-column prop="reapCust" label="客户姓名" min-width="60"></el-table-column>
        <el-table-column prop="reapPhone" label="手机号" min-width="90">
          <template scope="scope">
            <span>{{scope.row.reapPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reapAmt" label="案件金额（元）" min-width="90"></el-table-column>
        <el-table-column prop="reapPaystatus" label="还款状态" min-width="80"></el-table-column>
        <el-table-column prop="reapOverday" label="逾期天数" min-width="80"></el-table-column>
        <el-table-column prop="reapEmpname" label="催收员" min-width="80"></el-table-column>
        <el-table-column prop="reapAppstatu" label="状态" min-width="50">
          <template scope="scope">
            <span>{{scope.row.reapAppstatu | typeCodeConvert('0022')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="70">
          <template scope="scope">
            <el-button type="text" size="small" @click="repairClick(scope)" v-role="0x050101">修复</el-button>
          </template>
        </el-table-column>
      </template>
      <!--数据列区域End-->
    </data-box>

    <!--案件修复弹出框-->
    <el-dialog @open='refreshRepairDetail' title="案件修复" v-model="showRepairDetailDialog" size="full">
      <template>
        <CaseRepairInfo @closeDetail="$store.commit('updateRepairEditDialogVisual',true)" @close="showRepairDetailDialog = false,$refs['databox'].refresh()" ref='caserepairinfo'></CaseRepairInfo>
        <CaseOriginInfo ref='caseorigininfo'></CaseOriginInfo>
      </template>
    </el-dialog>

    <!--修复弹出框-->
    <el-dialog title="修复信息" v-model="showRepairEditDialog" size="small" :model="false" :close-on-press-escape="false">
      <template>
        <CustomerRepairInfo @success="refreshRepairInfo" @close="showRepairEditDialog = false" :custId="custId" :repairId="repairId" :data="repairData" :editState="editState"></CustomerRepairInfo>
      </template>
    </el-dialog>

  </div>
</template>
<script>
  import net from '@/util/net'
  import server from '@/config/servers'
  import DataBox from '@/components/DataBox'
  import CaseOriginInfo from '@/views/repair-manage/CaseOriginInfo'
  import CaseRepairInfo from '@/views/repair-manage/CaseRepairInfo'
  import CustomerRepairInfo from '@/views/repair-manage/CustomerRepairInfo'
  import { getCityJson, validateMin, validateMax } from '@/util/common'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'case-repair',
    data() {
      return {
        // 服务接口列表
        servers: {
          client: server.RepairManage.acc_order_apply_records
        },
        // 定义请求参数
        params: {
          prinId: '', // 修复委托方id
          reapCust: '', // 修复客户姓名
          reapProvid: '', // 修复省份ID
          reapCityid: '', // 修复城市ID
          reapAmtStart: '', // 修复案件金额-最小
          reapAmtEnd: '', // 修复案件金额-最大
          reapOverdayStart: '', // 修复逾期天数-最小
          reapOverdayEnd: '', // 修复逾期天数-最大
          reapAppstatu: '', // 修复状态
          reapPaystatus: '',
          orapPhone: '',
          orapCasenum: '',
          createTimeBegin: '',
          createTimeEnd: '',
          sort: 'createTime,desc'
        },
        validate: {
          validateMin,
          validateMax
        },
        /**
         * 获取申请日期
         */
        createTimeBegin: {
          disabledDate: (time) => {
            let endTime = this.params.createTimeEnd
            if (endTime) {
              return time.getTime() > endTime.getTime()
            }
          }
        },
        createTimeEnd: {
          disabledDate: (time) => {
            let startTime = this.params.createTimeBegin
            if (startTime) {
              return time.getTime() < startTime.getTime()
            }
          }
        },
        showRepairDetailDialog: false,
        custId: '', // 客户ID
        repairId: '',
        clientList: [], // 委托方列表
        provinceList: getCityJson({ level: 1 }) // 省份列表
      }
    },
    deactivated() {
      this.showRepairDetailDialog = false
    },
    computed: {
      ...mapState({
        editState: state => state.repairManage.repair_edit_state,
        repairData: state => state.repairManage.repair_data
      }),
      /**
       * 获取2级城市列表
       */
      cityList() {
        return this.params.reapProvid ? getCityJson({ level: 1, parentId: this.params.reapProvid }) : []
      },
      /**
       * 案件详情弹出框状态
       */
      showRepairDetailDialog: {
        get() {
          return this.$store.state.repairManage.dialog.show_repair_detail
        },
        set(val) {
          this.$store.commit('updateRepairDetailDialogVisual', val)
        }
      },
      /**
       * 修复信息编辑弹出栏状态
       */
      showRepairEditDialog: {
        get() {
          return this.$store.state.repairManage.dialog.show_repair_edit
        },
        set(val) {
          this.$store.commit('updateRepairEditDialogVisual', val)
        }
      }
    },
    methods: {
      ...mapMutations([
        'updateCustId',
        'updateRepairId'
      ]),
      /**
       * 刷新案件详情
       */
      refreshRepairDetail() {
        this.$nextTick(() => {
          this.$refs['caseorigininfo'].refresh(this.custId)
          this.$refs['caserepairinfo'].refresh(this.custId)
        })
      },
      /**
       * 处理点击修复按钮事件
       */
      repairClick(scope) {
        console.log(this.rules)
        // 存储信息
        this.custId = scope.row.custId
        this.repairId = scope.row.reapId

        // 更新store信息
        this.updateCustId(this.custId)
        this.updateRepairId(this.repairId)
        // 显示修复详情
        this.showRepairDetailDialog = true
      },
      /**
       * 获取委托方列表
       */
      getClientList() {
        net.send({
          server: server.RepairManage.client_name
        }).then((data) => {
          this.clientList = data
        })
      },
      /**
       * 刷新修复信息
       */
      refreshRepairInfo() {
        this.showRepairEditDialog = false
        this.$refs['caserepairinfo'].refresh(this.custId)
      }
    },
    components: {
      DataBox,
      CaseOriginInfo, // 原始案件信息
      CaseRepairInfo, // 案件修复信息
      CustomerRepairInfo // 客户修复信息
    },
    mounted() {
      // 获取委托方列表
      this.getClientList()
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>


</style>

<template>
  <div class="page">
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.search" row-key="cupoId">
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名" v-role="0x020302">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x020303" prop="cupoAmtMin" :rules="[
            { validator: validate.validateMin(params.cupoAmtMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x020303" prop="cupoAmtMax" :rules="[
            { validator: validate.validateMax(params.cupoAmtMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="还款状态" v-role="0x020304">
          <el-select v-model="params.cupoPaystatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" v-role="0x020305" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x020305" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x020306">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x020307">
          <el-select v-model="params.prinId" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x020308">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x020309">
          <el-select v-model="params.cupoStatus" placeholder="请选择状态" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0018')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款金额" v-role="0x020310" prop="cupoPaynumMin" :rules="[
            { validator: validate.validateMin(params.cupoPaynumMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoPaynumMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x020310" prop="cupoPaynumMax" :rules="[
            { validator: validate.validateMax(params.cupoPaynumMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoPaynumMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cupoPhone" :rules="[validate.truePhoneRules()]" v-role="0x020311">
          <el-input v-model="params.cupoPhone"></el-input>
        </el-form-item>
        <el-form-item label="归属省份" v-role="0x020312">
          <el-select v-model="params.cupoPrid" clearable>
            <el-option v-for="{id,areaName} in provinceList" :key="id" :label="areaName" :value="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属城市" v-role="0x020313">
          <el-select v-model="params.prinCityid" clearable>
            <el-option v-for="{id,areaName} in cityList" :key="id" :label="areaName" :value="id"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="index" label="序号" width="30"></el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号" min-width="100">
        </el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="60">
          <template scope="scope">
            <span>{{scope.row.custName | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPhone" label="手机号" min-width="80">
          <template scope="scope">
            <span>{{scope.row.cupoPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoAmt" label="案件金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoPaystatus" label="还款状态" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoOverday" label="逾期天数" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoBatch" label="批次号" min-width="100">
        </el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方" min-width="105">
        </el-table-column>
        <el-table-column prop="cupoCity" label="归属城市" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoName" label="催收员" min-width="60">
        </el-table-column>
        <el-table-column prop="cupoStatus" label="状态" min-width="105">
          <template scope="scope">
            <span>{{scope.row.cupoStatus | typeCodeConvert('0018')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPaynum" label="还款金额(元)" min-width="80">
        </el-table-column>
        <el-table-column prop="cupoStyle" label="还款方式" min-width="60">
          <template scope="scope">
            <span>{{scope.row.cupoStyle | typeCodeConvert('0027')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoDate" label="处理日期" min-width="70">
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template scope="scope">
            <el-button @click="caseInstructClick(scope)" type="text" size="small" v-role="0x020301" v-if="scope.row.cupoStatus===60">结案说明</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'
  import { getCityJson, validateMin, validateMax, truePhoneRules } from '@/util/common'
  import { mapState } from 'vuex'

  export default {
    name: 'visit-handled-case',
    data() {
      return {
        // 服务接口列表
        server: {
          search: servers.VisitAcc.post_process_query
        },
        defaultParams: {
          cupoRectype: '70',
          sort: 'cupoDate,desc'
        },
        params: {
          custName: '',
          cupoAmtMin: '',
          cupoAmtMax: '',
          overDayMin: '',
          overDayMax: '',
          cupoBatch: '',
          prinId: '',
          cupoStatus: '',
          cupoPaystatus: '',
          cupoPaynumMin: '',
          cupoPaynumMax: '',
          cupoPhone: '',
          prinCityid: '',
          cupoCity: '',
          cupoPrid: ''
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        provinceList: getCityJson({ level: 1 }), // 省份列表
        caseInstructFlag: false,
        dataName: []
      }
    },
    computed: {
      ...mapState({
        update: state => state.visitAcc.update_time
      }),
      /**
       * 获取2级城市列表
       */
      cityList() {
        return this.params.cupoPrid ? getCityJson({ level: 1, parentId: this.params.cupoPrid }) : []
      }
    },
    watch: {
      update() {
        this.$refs['databox'].refresh()
      }
    },
    mounted() {
      net.send({
        server: servers.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      })
    },
    activated() {
      this.$refs['databox'].refresh()
    },
    methods: {
      caseInstructClick(scope) {
        this.$alert(scope.row.cupoRemark, '结案说明', {
          confirmButtonText: '确定'
        })
        this.caseInstructFlag = true
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

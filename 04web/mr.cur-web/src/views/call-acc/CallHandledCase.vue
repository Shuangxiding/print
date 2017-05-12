<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.handle" row-key="custName" :defaultParams="defaultParams">
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="客户姓名" v-role="0x010202">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x010203" prop="cupoAmtMin" :rules="[
            { validator: validate.validateMin(params.cupoAmtMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMin" type="number" :min="0" :max="params.cupoAmtMax"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x010203" prop="cupoAmtMax" :rules="[
            { validator: validate.validateMax(params.cupoAmtMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoAmtMax" type="number" :min="params.cupoAmtMin"></el-input>
        </el-form-item>
        <el-form-item label="还款状态" v-role="0x010204">
          <el-select v-model="params.cupoPaystatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0033')" :key="id" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" v-role="0x010205" prop="overDayMin" :rules="[
            { validator: validate.validateMin(params.overDayMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x010205" prop="overDayMax" :rules="[
            { validator: validate.validateMax(params.overDayMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDayMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="批次号" v-role="0x010206">
          <el-input v-model="params.cupoBatch"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x010207">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员" v-role="0x010208">
          <el-input v-model="params.cupoName"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x010209">
          <el-select v-model="params.cupoStatus" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0018')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款金额" v-role="0x010210" prop="cupoPaynumMin" :rules="[
            { validator: validate.validateMin(params.cupoPaynumMax), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoPaynumMin" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x010210" prop="cupoPaynumMax" :rules="[
            { validator: validate.validateMax(params.cupoPaynumMin), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.cupoPaynumMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cupoPhone" :rules="[validate.truePhoneRules()]" v-role="0x010211">
          <el-input v-model="params.cupoPhone"></el-input>
        </el-form-item>
      </template>
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column type="index" label="序号" width="30">
        </el-table-column>
        <el-table-column prop="cupoCasenum" label="案件编号 " min-width="90">
        </el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="60">
          <template scope="scope">
            <span>{{scope.row.custName | encryptName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPhone" label="手机号 " min-width="75">
          <template scope="scope">
            <span>{{scope.row.cupoPhone | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoAmt" label="案件金额(元) " min-width="80">
        </el-table-column>
        <el-table-column prop="cupoPaystatus" label="还款状态 " min-width="60">
        </el-table-column>
        <el-table-column prop="cupoOverday" label="逾期天数 " min-width="60">
        </el-table-column>
        <el-table-column prop="cupoBatch" label="批次号 " min-width="100">
        </el-table-column>
        <el-table-column prop="cupoPrincipal" label="委托方 " min-width="90">
        </el-table-column>
        <el-table-column prop="cupoName" label="催收员 " min-width="60">
        </el-table-column>
        <el-table-column prop="cupoStatus" label="状态 " min-width="105">
          <template scope="scope">
            <span>{{scope.row.cupoStatus | typeCodeConvert('0018')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoPaynum" label="还款金额(元) " min-width="80">
        </el-table-column>
        <el-table-column prop="cupoStyle" label="还款方式 " min-width="75">
          <template scope="scope">
            <span>{{scope.row.cupoStyle | typeCodeConvert('0027')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cupoDate" label="处理日期 " min-width="90">
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template scope="scope">
            <el-button @click="caseInstructClick(scope)" type="text" size="small" v-role="0x010201" v-if="scope.row.cupoStatus===60">结案说明</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import net from '@/util/net'
  import { validateMin, validateMax, truePhoneRules } from '@/util/common'
  import { mapState } from 'vuex'

  export default {
    name: 'call-handled-case',
    data() {
      return {
        // 服务接口列表
        servers: {
          handle: server.CallAcc.handled_case
        },
        // 定义请求参数
        params: {
          custName: '',
          caseAmt: '',
          overdueDays: '',
          cupoBatch: '',
          prinId: '',
          cupoName: '',
          cupoStatus: '',
          cupoPaystatus: '',
          cupoPaynumMin: '',
          cupoPaynumMax: '',
          cupoPhone: ''
        },
        defaultParams: {
          cupoRectype: '69',
          sort: 'cupoDate,desc'
        },
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        multipleSelection: [],
        dataName: []
      }
    },
    activated() {
      this.$refs['databox'].refresh()
    },
    methods: {
      /**
       * 结案说明
       */
      caseInstructClick(scope) {
        this.$alert(scope.row.cupoRemark, '结案说明', {
          confirmButtonText: '确定'
        })
        this.caseInstructFlag = true
      }
    },
    computed: {
      ...mapState({
        update: state => state.callAcc.update_time
      })
    },
    watch: {
      update() {
        this.$refs['databox'].refresh()
      }
    },
    mounted() {
      net.send({
        server: server.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
      })
    },
    components: {
      DataBox
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

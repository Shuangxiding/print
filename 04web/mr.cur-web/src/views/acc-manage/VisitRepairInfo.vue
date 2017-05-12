<template>
  <!--外访催收-修复信息-->
  <div>
    <!--按钮区域-->
    <template>
      <el-row>
        <el-col class="text-right">
          <el-button @click="addRepairApplyClick">修复申请</el-button>
          <el-button @click="addRepairInfoClick">修复信息</el-button>
        </el-col>
      </el-row>
    </template>
    <data-box ref="databox" :maxHeight="200" :server="servers.handle" :defaultParams="defaultParams" hiddenForm autoSearch :pagination="false">
      <!--数据列区域-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="addressType" label="地址类型" min-width="110">
          <template scope="scope">
            <span>{{scope.row.addressType | typeCodeConvert('0024')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addressStatus" label="地址状态" min-width="110">
          <template scope="scope">
            <span>{{scope.row.addressStatus | typeCodeConvert('0025')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="180">
        </el-table-column>
        <el-table-column prop="dataSource" label="数据来源" min-width="110">
        </el-table-column>
        <el-table-column prop="operator" label="操作人" min-width="110">
        </el-table-column>
        <el-table-column prop="detailAddress" label="详细地址" min-width="150">
          <template scope="scope">
            <el-button @click="saveAddress(scope)" type="text">{{scope.row.countyId|cityConvert(true)}}{{scope.row.address}}</el-button>
            <el-button v-if="scope.row.address!==null" class="iconfont icon-dingwei" type="text" style="color:#0080ff;cursor: pointer;float:right;margin-right:20px"></el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-START-->
    <!--修复申请-->
    <el-dialog title="修复申请" v-model="addRepairApplys" size="tiny">
      <el-form :rules="rules" :model="applyParams" ref="applyParams" label-width="100px" class="demo-ruleForm">
        <el-form-item label="修复说明" prop="orapRemark" :rules="[{required: true, message: '请输入修复申请', trigger: 'blur'}]">
          <el-col :span="22">
            <el-input type="textarea" v-model="applyParams.orapRemark" :autosize="{ minRows:4, maxRows:6,cols:16}"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="actionCommit">确定</el-button>
      <el-button @click="actionCancel">取消</el-button>
    </el-dialog>
    <!--修复信息-->
    <el-dialog title="修复信息" v-model="repairInformation">
      <template>
        <CustomerRepairInfo @success="$refs['databox'].refresh()" @close="repairInformation=false" :editState="-1" :custId="$store.state.accManage.cust_id"></CustomerRepairInfo>
      </template>
    </el-dialog>
    <!--百度地图弹出框-->
    <el-dialog v-model="addBaiduMap" title="位置信息" size="small" @open="baiduOpen" :close-on-click-modal="false" :close-on-press-escape="false">
      <bd-map ref="bdmap"></bd-map>
    </el-dialog>
  </div>
</template>
<script>
  import BdMap from '@/components/BdMap'
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'
  import { getCityName } from '@/util/common'
  import CustomerRepairInfo from '@/views/repair-manage/CustomerRepairInfo'

  export default {
    name: 'visit-repair-info',
    data() {
      return {
        // 服务接口列表
        servers: {
          handle: servers.RepairManage.get_visit_repair_info
        },
        // 定义请求参数
        params: {
          custId: ''
        },
        defaultParams: {
          custId: this.$store.state.accManage.cust_id,
          reminderType: '70'
        },
        applyParams: {
          cupoId: '',
          orapRemark: ''
        },
        baiduMapInfo: {
          cityName: '',
          address: ''
        },
        addBaiduMap: false,
        addRepairApplys: false,
        addRepairInfos: false,
        repairInformation: false,
        dialog: {
          disabled: false
        },
        //  表单提交校验规则
        rules: {
          orapRemark: [
            { required: true, message: '请输入修复说明', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /**
       * 刷新
       */
      refresh() {
        this.defaultParams = Object.assign({}, {
          custId: this.$store.state.accManage.cust_id,
          reminderType: '70'
        })
      },
      /**
       * 打开百度地图
       */
      baiduOpen() {
        this.$nextTick(() => {
          this.$refs['bdmap'].addressToLngLat('type')
        })
      },
      /**
       * 保存地址信息
       */
      saveAddress(scope) {
        console.log(scope.row)
        this.addBaiduMap = true
        let cityName = getCityName(scope.row.countyId, true).join('')
        let address = scope.row.address
        this.baiduMapInfo.cityName = cityName
        this.baiduMapInfo.address = address
        this.$store.commit('updateBaiduMapInfo', this.baiduMapInfo)
      },
      /**
       * 修复申请
       */
      addRepairApplyClick() {
        this.addRepairApplys = true
        // this.applyParams.remark = ''
      },
      /**
       * 修复信息
       */
      addRepairInfoClick() {
        this.repairInformation = true
      },
      /**
       * 修复申请确定
       */
      actionCommit() {
        this.$refs['applyParams'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.applyParams.cupoId = this.$store.state.accManage.case_id
          net.send({
            server: servers.RepairManage.repair_application,
            data: this.applyParams
          }).then((data) => {
            // 更新数据信息
            this.$refs['applyParams'].resetFields()
            // this.$refs['databox'].refresh()
            this.params = data
            this.$emit('refresh')
            this.$refs['databox'].refresh()
            this.addRepairApplys = false
            this.$emit('assistRecordRefresh')
            this.$message({
              type: 'info',
              message: '申请成功'
            })
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
      },
      /**
       * 修复申请取消
       */
      actionCancel() {
        this.$refs['applyParams'].resetFields()
        this.addRepairApplys = false
      }
    },
    components: {
      DataBox,
      BdMap,
      CustomerRepairInfo
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table .info-row {
    background: #c9e5f5;
  }
  
  .el-table .positive-row {
    background: #e2f0e4;
  }

</style>

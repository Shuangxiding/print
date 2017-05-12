<template>
  <!--外访催收-原始地址信息-->
  <div>
    <data-box v-if="address" :maxHeight="200" ref="databox" :data="address" row-key="id" hiddenForm autoSearch :pagination="false">
      <!--按钮区域 -END-->
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
        <el-table-column prop="updateTime" label="更新时间" min-width="110">
        </el-table-column>
        <el-table-column prop="dataSource" label="数据来源" min-width="110">
        </el-table-column>
        <el-table-column prop="detailAddress" label="详细地址" min-width="110">
          <template scope="scope">
            <el-button @click="saveAddress(scope)" type="text" size="small">{{scope.row.detailAddress}}</el-button>
            <el-button @click="saveAddress(scope)" class="iconfont icon-dingwei" type="text" style="color:#0080ff;cursor:pointer;float:right;margin-right:20px"></el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--百度地图弹出框-->
    <el-dialog v-model="addBaiduMap" title="位置信息" size="small" @open="baiduOpen" :close-on-click-modal="false" :close-on-press-escape="false">
      <bd-map ref="bdmap"></bd-map>
    </el-dialog>
  </div>
</template>
<script>
  import BdMap from '@/components/BdMap'
  import DataBox from '@/components/DataBox'
  import { mapState } from 'vuex'

  export default {
    name: 'origin-visit-info',
    data() {
      return {
        addBaiduMap: false,
        baiduMapInfo: {
          address: ''
        }
      }
    },
    computed: {
      ...mapState({
        address: state => state.accManage.cust_info.customerOriginalAddressInformationList
      })
    },
    methods: {
      /**
       * 打开百度地图
       */
      baiduOpen() {
        this.$nextTick(() => {
          this.$refs['bdmap'].addressToLngLat()
        })
      },
      /**
       * 保存地址信息
       */
      saveAddress(scope) {
        this.addBaiduMap = true
        let address = scope.row.detailAddress
        this.baiduMapInfo.address = address
        this.$store.commit('updateBaiduMapInfo', this.baiduMapInfo)
      }
    },
    components: {
      DataBox,
      BdMap
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

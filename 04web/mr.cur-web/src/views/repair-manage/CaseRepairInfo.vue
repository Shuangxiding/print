<template>
  <div>
    <el-col class="text-left data-grid-title" style="float:none">
      <span class="iconfont icon-xiufuxinxi"></span>
      <span>修复信息</span>
      <el-button style="float:right;margin-left:10px" @click="repairComplete" v-if="!readonly">修复完成</el-button>
      <el-button style="float:right;margin-left:10px" @click="addRepairInfo" v-if="!readonly">修复</el-button>
    </el-col>
    <data-box ref="databox" :params="params" :defaultParams="defaultParams" :append="custId" row-key="Id" :server="servers.repairinformation" autoSearch hidden-form>
      <!--<template slot="button">
        <el-button @click="addRepairInfo">修复</el-button>
        <el-button @click="repairComplete">修复完成</el-button>
      </template>-->
      <template slot="column">
        <!--数据列区域-->
        <el-table-column type="index" label="序号" width="65px">
        </el-table-column>
        <el-table-column prop="relation" label="关系" min-width="50">
          <template scope="scope">
            <span>{{scope.row.relation | typeCodeConvert('0034')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="50">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="80">
        </el-table-column>
        <el-table-column label="联系地址">
          <template scope="scope">
            {{scope.row.countyId|cityConvert(true)}}{{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column prop="addressType" label="地址类型" min-width="80">
          <template scope="scope">
            <span>{{scope.row.addressType | typeCodeConvert('0024')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间">
        </el-table-column>
        <el-table-column prop="operator" min-width="50" label="操作人">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template scope="scope">
            <el-button v-if="scope.row.userId === userInfo.userId&&scope.row.repairStatus===0" @click="editRepairInfo(scope)" type="text" size="small" v-role="0x0502FF">编辑</el-button>
            <el-button v-if="scope.row.userId === userInfo.userId&&scope.row.repairStatus===0" @click="deleteRepairInfo(scope)" type="text" size="small" v-role="0x0502FF">删除</el-button>
            <el-button v-else @click="viewRepairInfo(scope)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-col class="text-left data-grid-title" style="float:none">
      <span class="iconfont icon-yuanshixinxi"></span>
      <span>原始信息</span>
    </el-col>
  </div>
</template>

<script>
  import net from '@/util/net'
  import server from '@/config/servers'
  import DataBox from '@/components/DataBox'
  import { mapGetters, mapState, mapMutations } from 'vuex'

  export default {
    name: 'case-repair-info',
    data() {
      return {
        // 服务列表
        servers: {
          repairinformation: server.RepairManage.repair_information_case,
          updateAccOrderApply: server.RepairManage.update_acc_order_apply,
          deleteCustomerRepair: server.RepairManage.delete_customer_repair
        },
        // 定义请求参数
        params: {
          relation: '',
          name: '',
          phone: '',
          address: '',
          addressType: '',
          updateTime: '',
          operator: ''
        },
        defaultParams: {
          sort: 'updateTime,desc'
        }
      }
    },
    props: {
      readonly: Boolean
    },
    computed: {
      ...mapState({
        repairId: state => state.repairManage.repair_id,
        custId: state => state.repairManage.cust_id
      }),
      ...mapGetters([
        'userToken',
        'userInfo'
      ])
    },
    methods: {
      ...mapMutations([
        'updateEditState',
        'updateRepairData',
        'updateRepairEditDialogVisual'
      ]),
      /**
       *修复完成
       */
      repairComplete() {
        this.$confirm('修复完成后，您就不能再对此案件进行修复，是否确定修复完成？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 进行修复请求
          net.send({
            server: server.RepairManage.update_acc_order_apply,
            data: {
              reapId: this.repairId,
              custId: this.custId
            }
          }).then(() => {
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '修复完成!'
            })
            this.$refs['databox'].refresh()
            this.close()
          }, err => {
            this.$message({
              type: 'error',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      /**
       * 添加修复信息
       */
      addRepairInfo() {
        this.updateEditState(-1)
        this.updateRepairData({})
        this.updateRepairEditDialogVisual(true)
      },
      /**
       * 编辑修复信息
       */
      editRepairInfo({ row }) {
        this.updateEditState(1)
        this.updateRepairData(row)
        this.updateRepairEditDialogVisual(true)
      },
      /**
       * 查看详情
       */
      viewRepairInfo({ row }) {
        console.log(row)
        this.updateEditState(0)
        this.updateRepairData(row)
        // this.updateRepairEditDialogVisual(true)
        this.$emit('closeDetail')
      },
      /**
       * 删除
       */
      deleteRepairInfo(scope) {
        net.send({
          server: this.servers.deleteCustomerRepair,
          append: [scope.row.id]
        }).then(() => {
          // 更新数据信息
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$refs['databox'].refresh()
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 刷新数据列表
       */
      refresh(custId) {
        this.custId = custId
        this.$refs['databox'].refresh()
      },
      close() {
        this.$emit('close')
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

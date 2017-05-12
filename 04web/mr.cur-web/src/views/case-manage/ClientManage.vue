<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.client" row-key="prinCode" autoSearch>
      <!--输入区域Start-->
      <template slot="input">
        <el-form-item label="委托方编码" v-role="0x040104">
          <el-input v-model="params.prinCode"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x040105">
          <el-select v-model="params.prinId" placeholder="请选择" clearable>
            <el-option v-for="{index,prinId,prinName} in this.dataName" :key="index" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构类型" v-role="0x040106">
          <el-select v-model="params.organizationType" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0014')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="prinMobile" :rules="[validate.truePhoneRules()]" v-role="0x040107">
          <el-input v-model="params.prinMobile"></el-input>
        </el-form-item>
      </template>
      <!--输入区域End-->
      <!--按钮区域-->
      <template slot="button">
        <el-button @click="addclientClick" v-role="0x040101">新增委托方</el-button>
      </template>
      <!--数据列区域-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="65">
        </el-table-column>
        <el-table-column prop="prinCode" label="委托方编码" min-width="85">
        </el-table-column>
        <el-table-column prop="prinName" label="委托方" min-width="140">
        </el-table-column>
        <el-table-column prop="organizationType" label="机构类型" min-width="90">
          <template scope="scope">
            <span>{{ scope.row.organizationType | typeCodeConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prinPrid" label="省份" min-width="90">
          <template scope="scope">
            <span>{{ scope.row.prinPrid | cityConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prinCityid" label="城市" min-width="90">
          <template scope="scope">
            <span>{{ scope.row.prinCityid | cityConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prinCtyid" label="区/县" min-width="90">
          <template scope="scope">
            <span>{{ scope.row.prinCtyid | cityConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prinContacts" label="联系人" min-width="110">
        </el-table-column>
        <el-table-column prop="prinPhone" label="电话" min-width="100">
        </el-table-column>
        <el-table-column prop="prinMobile" label="手机号" min-width="100">
          <template scope="scope">
            <span>{{scope.row.prinMobile}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110px">
          <template scope="scope">
            <el-button @click="modifybuttonClick(scope)" type="text" size="small" v-role="0x040102">修改</el-button>
            <el-button @click="deletebuttonClick(scope)" type="text" size="small" v-role="0x040103">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--弹出框-->
    <el-dialog title="新增委托方" v-model="addcaseclient" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <AddClient @refresh="refreshDatabox" @close="addcaseclient=false"></AddClient>
    </el-dialog>
    <!--修改委托方-->
    <el-dialog title="修改委托方" @open="getModifyData" v-model="modifycaseclient" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <ModifyClient @refresh="refreshDatabox" ref="modify" @close="modifycaseclient=false"></ModifyClient>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import server from '@/config/servers'
  import net from '@/util/net'
  import { getCityJson, truePhoneRules } from '@/util/common'
  import AddClient from '@/views/case-manage/AddClient' // 新增委托方
  import ModifyClient from '@/views/case-manage/ModifyClient' // 修改委托方

  export default {
    name: 'client-manage',
    data() {
      return {
        labelPosition: 'left',
        // 服务接口列表
        servers: {
          client: server.CaseManage.principal_management_case,
          deleted: server.CaseManage.principal_delete_case,
          added: server.CaseManage.principal_add_case,
          provinces: server.CaseManage.provinces_case,
          city: server.CaseManage.provinces_city_case,
          country: server.CaseManage.city_country_case
        },
        // 定义请求参数
        params: {
          prinId: '',
          organizationType: '',
          prinProvinces: '',
          prinCity: '',
          prinCounty: '',
          prinContacts: '',
          prinMobile: '',
          prinPhone: '',
          prinEmail: '',
          prinRemark: '',
          sort: 'prinCode,desc'
        },
        validate: {
          truePhoneRules
        },
        options: getCityJson(),
        value1: '',
        value2: '',
        modifyData: '',
        multipleSelection: [],
        addcaseclient: false,
        modifycaseclient: false,
        selector: [],
        dataName: []
      }
    },
    mounted() {
      net.send({
        server: server.ApprovalManage.get_all_pricipal
      }).then((data) => {
        // 接口返回的数据
        this.dataName = data
        console.log(data)
      }, err => {
        console.log(err)
      })
    },
    methods: {
      /**
       * 获取要修改的委托方数据
       */
      getModifyData() {
        this.$nextTick(() => {
          this.$refs['modify'].refresh(this.modifyData)
        })
      },
      /**
       * 刷新databox
       */
      refreshDatabox() {
        this.$refs['databox'].refresh()
      },
      /**
       *新增委托方
       */
      addclientClick(scope) {
        this.addcaseclient = true
      },
      /**
       * 修改委托方
       */
      modifybuttonClick(scope) {
        this.modifyData = scope.row
        this.modifycaseclient = true
      },
      /**
       * 删除委托方
       */
      deletebuttonClick(scope) {
        this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          net.send({
            server: server.CaseManage.principal_delete_case,
            data: {
              prinId: scope.row.prinId
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '删除委托方成功'
            })
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'success',
              message: err.reason
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    components: {
      DataBox,
      AddClient,
      ModifyClient
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-button {
    margin-left: 10px;
    height: 30px;
    line-height: 0;
  }
  
  .el-input {
    width: 100%;
    height: 100%;
  }
  
  .el-input__inner {
    width: 100%;
    height: 100%;
  }

</style>

<template>
  <!--协催申请记录-->
  <div class="page">
    <template>
      <el-form :model="form" :params="params" ref="params" label-width="100px">
        <el-form-item label="协催类型" prop="reapCotype" style="align=center" :rules="[
      { required: true, message: '请选择协催类型' }]">
          <el-select v-model="form.reapCotype" placeholder="请选择" style="float:left">
            <el-option :value="76" label="修复" v-if="$store.state.accManage.type_id===70">
            </el-option>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0021')" :key="id" :label="name" :value="id" v-else>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协催说明" prop="reapRemark" :rules="[
      { required: true, message: '请输入协催说明', trigger: 'blur' }
      ]">
          <el-col :span="12">
            <el-input type="textarea" v-model="form.reapRemark"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="AddApplyClick">添加申请</el-button>
    </template>
    <div style="border-top:solid 2px #ccc;margin-top:10px">
      <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="servers.getInformation" row-key="reapId" autoSearch>
        <!--输入区域-->
        <template slot="input">
          <el-form-item label="申请日期">
            <el-date-picker v-model="params.createMinTime" type="date" placeholder="选择日期" :picker-options="createMinTime" :editable="false">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="-">
            <el-date-picker v-model="params.createMaxTime" type="date" placeholder="选择日期" :picker-options="createMaxTime" :editable="false">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="协催类型">
            <el-select v-model="params.reapCotype" placeholder="请选择" clearable>
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0021')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="params.reapAppstatu" placeholder="请选择" clearable>
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0022')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <!--数据列区域-->
        <template slot="column">
          <el-table-column width="70" type="index" label="序号"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" min-width="110">
          </el-table-column>
          <el-table-column prop="reapCotype" label="协催类型" min-width="110">
            <template scope="scope">
              <span>{{scope.row.reapCotype | typeCodeConvert('0021')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reapRemark" label="协催说明" min-width="130">
          </el-table-column>
          <el-table-column prop="reapAppstatu" label="状态" min-width="100">
            <template scope="scope">
              <span>{{scope.row.reapAppstatu | typeCodeConvert('0022')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reapOpinion" label="审批意见" min-width="100">
          </el-table-column>
        </template>
      </data-box>
    </div>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'assist-application-record',
    props: ['typeId'],
    data() {
      return {
        // 服务接口列表
        servers: {
          getInformation: servers.VisitAcc.get_association_application_record_query
        },
        // 定义请求参数
        params: {
          reapAppstatu: '',
          reapCotype: '',
          createMaxTime: '',
          createMinTime: '',
          sort: 'createTime,desc'
        },
        items: [],
        form: {
          reapCotype: '',
          reapRemark: '',
          cupoRectype: ''
        },
        defaultParams: {
          cupoId: this.$store.state.accManage.case_id
        }
      }
    },
    methods: {
      refresh() {
        this.defaultParams = Object.assign({}, {
          cupoId: this.$store.state.accManage.case_id
        })
        this.$refs['params'].resetFields()
      },
      /**
       * 申请日期
       */
      createMinTime: {
        disabledDate: (time) => {
          let endTime = this.params.createMaxTime
          if (endTime) {
            return time.getTime() > endTime.getTime()
          }
        }
      },
      createMaxTime: {
        disabledDate: (time) => {
          let startTime = this.params.createMinTime
          if (startTime) {
            return time.getTime() < startTime.getTime()
          }
        }
      },
      /**
       * 刷新databox
       */
      assistRefresh() {
        this.$refs['databox'].refresh()
      },
      /**
       * 添加申请
       */
      AddApplyClick() {
        this.$refs['params'].validate((valid) => {
          if (!valid) return false
          this.form.cupoRectype = this.typeId
          this.form.cupoId = this.$store.state.accManage.case_id
          net.send({
            server: servers.VisitAcc.get_add_association_application_record,
            data: this.form
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.$refs['params'].resetFields()
            this.$refs['databox'].refresh()
          }, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        })
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

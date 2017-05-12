<!--模板配置-->
<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="server.search" row-key="id" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="模板形式" v-role="0x080204">
          <el-select v-model="params.style" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0009')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类别" v-role="0x080205">
          <el-select v-model="params.type" placeholder="请选择" clearable>
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0010')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" v-role="0x080206">
          <el-input v-model="params.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-role="0x080207">
          <el-select v-model="params.status" clearable>
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!--按钮区域-->
      <template slot="button">
        <el-button @click="dialog.addTemplate = true" v-role="0x080201">新增模板</el-button>
      </template>

      <!--数据列区域-->
      <template slot="column">
        <el-table-column width="40" type="index" label="序号"></el-table-column>
        <el-table-column prop="style" label="模板形式" min-width="90">
          <template scope="scope">
            <span>{{scope.row.style | typeCodeConvert('0009')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="模板类别" min-width="90">
          <template scope="scope">
            <span>{{scope.row.type | typeCodeConvert('0010')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="模板名称" min-width="90">
        </el-table-column>
        <el-table-column prop="code" label="模板编号" min-width="100">
        </el-table-column>
        <el-table-column prop="default" label="是否为默认模板" min-width="100">
          <template scope="scope">
            <span v-if="scope.row.default">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="70">
          <template scope="scope">
            <span v-if="scope.row.status == 0">启用</span>
            <span v-if="scope.row.status == 1">停用</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180" prop="upTime" label="更新时间">
        </el-table-column>
        <el-table-column prop="creator" label="操作人" min-width="90">
        </el-table-column>
        <el-table-column prop="cupoName" label="操作" min-width="90">
          <template scope="scope">
            <el-button @click="updateClick(scope)" type="text" size="small" v-role="0x080202">修改</el-button>
            <el-button @click="deleteClick(scope)" type="text" size="small" v-role="0x080203">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--增加模板区域-->
    <el-dialog title="增加模板" v-model="dialog.addTemplate" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-row>
        <el-col :span="24" class="text-center" style="margin-bottom:15px">
          <span>请选择需要配置的模板形式：</span>
          <el-radio class="radio" v-model="radio" label="MessageTemplate">短信</el-radio>
          <el-radio class="radio" v-model="radio" label="EmailTemplate">电子邮件</el-radio>
          <el-radio class="radio" v-model="radio" label="CallAccTemplate">电催话术</el-radio>
        </el-col>
        <component :is="radio" @success="refreshData" @close="dialog.addTemplate=false">
        </component>
      </el-row>
    </el-dialog>

    <!--修改模板区域-->
    <el-dialog @open="updateTemplateData" title="修改模板" v-model="dialog.updateTemplate" size="small" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-row>
        <el-col>
          <component ref="template-data" :is="modifyTemp" @success="refreshData" @close="dialog.updateTemplate=false">
          </component>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'
  import MessageTemplate from '@/views/config-manage/MessageTemplate'
  import EmailTemplate from '@/views/config-manage/EmailTemplate'
  import CallAccTemplate from '@/views/config-manage/CallAccTemplate'
  import { templateType } from '@/config/enum'

  export default {
    name: 'template-config',
    data() {
      return {
        server: {
          search: servers.ConfigManage.get_all_template,
          delete: servers.ConfigManage.delete_template
        },
        params: {
          style: '', // 模版形式
          type: '', // 模版类型
          name: '', // 模版名称
          status: '', //  模版状态
          sort: 'code,desc'
        },
        radio: 'MessageTemplate', // 默认新建模版
        modifyTemp: '', // 修改模版类型
        selectData: {},
        dialog: {
          addTemplate: false,
          updateTemplate: false
        }
      }
    },
    methods: {
      updateTemplateData() {
        this.$nextTick(() => {
          this.$refs['template-data'].updateData(this.selectData)
        })
      },
      /**
       * 修改模版
       */
      updateClick(scope) {
        // 获取需要修改的模版类型
        let style = scope.row.style
        this.modifyTemp = templateType[style].code
        this.selectData = scope.row
        this.dialog.updateTemplate = true
      },
      /**
       * 删除模版
       */
      deleteClick(scope) {
        this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送删除数据请求
          net.send({
            server: this.server.delete,
            data: {
              id: scope.row.id
            }
          }).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 更新数据信息
            this.refreshData()
          }, ({ reason }) => {
            this.$message({
              type: 'info',
              message: reason
            })
          })
        })
      },
      /**
       * 刷新列表数据
       */
      refreshData() {
        this.$refs['databox'].refresh()
      }
    },
    components: {
      DataBox,
      MessageTemplate, // 消息模版
      EmailTemplate, // 邮件模版
      CallAccTemplate // 电催话术模板
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>

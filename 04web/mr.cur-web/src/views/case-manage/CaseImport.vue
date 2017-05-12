<template>
  <div class="page">
    <data-box ref="databox" :params="params" :server="servers.getImportData" row-key="cupoBatch" autoSearch>
      <!--输入区域-->
      <template slot="input">
        <el-form-item label="批次号" v-role="0x040206">
          <el-input v-model="params.batchNumber"></el-input>
        </el-form-item>
        <el-form-item label="委托方" v-role="0x040207" :rules="[
            { validator: validate.validateMin(params.overDueDays2), trigger: 'blur' }
          ]">
          <el-select v-model="params.prinCode" placeholder="请选择" clearable>
            <el-option v-for="{prinId,prinName} in clientList" :key="prinId" :label="prinName" :value="prinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名" v-role="0x040208">
          <el-input v-model="params.custName"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数" v-role="0x040209" prop="overDueDays1" :rules="[
            { validator: validate.validateMin(params.overDueDays2), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueDays1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x040209" prop="overDueDays2" :rules="[
            { validator: validate.validateMax(params.overDueDays1), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueDays2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="案件金额" v-role="0x040210" prop="overDueAmount1" :rules="[
            { validator: validate.validateMin(params.overDueAmount2), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueAmount1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="-" v-role="0x040210" prop="overDueAmount2" :rules="[
            { validator: validate.validateMax(params.overDueAmount1), trigger: 'blur' }
          ]">
          <el-input v-model.number="params.overDueAmount2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum" :rules="[validate.truePhoneRules()]" v-role="0x040211">
          <el-input v-model="params.phoneNum"></el-input>
        </el-form-item>
      </template>
      <template slot="button">
        <!--按钮区域-->
        <el-button @click="dialog.excelImport = true" v-role="0x040201">案件导入</el-button>
        <el-button :disabled="!isImported" @click="dialog.fileImport = true" v-role="0x040202">附件导入</el-button>
        <el-button :disabled="!isImported" @click="checkCaseFile" v-role="0x040203">案件确认</el-button>
        <el-button :disabled="!isImported" @click="dialog.deleteImport = true" v-role="0x040204">案件删除</el-button>
        <!--TODO: 添加下载模版地址-->
        <el-button type="text" @click="downloadTemplate" style="margin:0 20px;" v-role="0x040205">下载模板</el-button>
        <!--<a :herf="downloadTemplateUrl" style="margin:0 20px;" v-role="0x040205">下载模板</a>-->
      </template>

      <!--数据列区域-->
      <template slot="column">
        <el-table-column type="index" label="序号" width="40">
        </el-table-column>
        <el-table-column prop="id" label="案件编号" min-width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="openCaseDetail(scope)">{{scope.row.id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" min-width="90">
        </el-table-column>
        <el-table-column prop="prinName" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="custName" label="客户姓名" min-width="90">
          <template scope="scope">
            <span>{{ scope.row.custName | encryptName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idCardNumber" label="身份证号" min-width="100">
          <template scope="scope">
            <span>{{ scope.row.idCardNumber | encryptIDCard }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNum" label="手机号" min-width="80">
          <template scope="scope">
            <span>{{scope.row.phoneNum | encryptPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overDueDays" label="逾期天数" min-width="80">
        </el-table-column>
        <el-table-column prop="overDueAmount" label="案件金额(元)" min-width="100">
        </el-table-column>
        <el-table-column prop="caseHandNum" label="案件手数" min-width="60">
        </el-table-column>
        <el-table-column prop="createDate" label="导入日期" min-width="100">
        </el-table-column>
        <el-table-column prop="createDate" label="操作" min-width="60">
          <template scope="scope">
            <el-button type="text" @click="importCaseFile(scope.row)">导入附件</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--案件详情-->
    <el-dialog title="案件详情" v-model="dialog.caseDetail" size="full" @open="refreshCaseDetail" :modal="false">
      <details-tab :tabsArr="tabsArr" ref="tab">
        <template slot="custInform">
          <cust-inform ref="custInform"></cust-inform>
        </template>
        <template slot="payInform">
          <pay-inform ref="payInform"></pay-inform>
        </template>
        <template slot="attachInform">
          <attach-inform ref="attachInform"></attach-inform>
        </template>
      </details-tab>
    </el-dialog>

    <!--案件导入弹出框-->
    <el-dialog title="案件导入" v-model="dialog.excelImport" @open="getClientList" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <case-excel-import @errMsg="errMsgShow" @close="dialog.excelImport = false" @success="refresh"></case-excel-import>
    </el-dialog>

    <!--附件导入弹出框-->
    <el-dialog title="附件导入" v-model="dialog.fileImport" @open="getBatchList" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <case-file-import @close="dialog.fileImport = false"></case-file-import>
    </el-dialog>

    <!--对应文件-->
    <el-dialog title="附件导入" v-model="dialog.multipleFileImport" @open="getFileList" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <case-file-import ref="case-file-upload" :selected="selectedItem" @close="dialog.multipleFileImport = false"></case-file-import>
    </el-dialog>

    <!--案件删除弹出框-->
    <el-dialog title="案件删除" v-model="dialog.deleteImport" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="100px" class="text-left">
        <el-form-item label="批次号" prop="cupoBatch">
          <el-select placeholder="请选择" v-model="deleteImport.batchNum">
            <el-option v-for="item in batchtList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0" class="text-center">
          <span>确定要删除此批次案件吗?</span>
        </el-form-item>
      </el-form>
      <el-button @click="deleteCase">确定</el-button>
      <el-button @click="dialog.deleteImport = false">取消</el-button>
    </el-dialog>

    <el-dialog title="案件确认" v-model="dialog.caseSubmit" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <div v-loading.body="loading.state">
        <el-form label-width="0" class="text-left">
          <el-form-item class="text-center">
            是否确认提交案件
          </el-form-item>
          <el-form-item>
            <data-box :data="checkResult" v-show="checkResult&&checkResult.length>0" hiddenForm class="text-center">
              <template slot="column">
                <el-table-column type="index" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="id" label="案件编号" min-width="110">
                </el-table-column>
                <el-table-column prop="batchNumber" label="批次号" min-width="100">
                </el-table-column>
                <el-table-column prop="msg" label="备注" min-width="85">
                </el-table-column>
              </template>
            </data-box>
          </el-form-item>
        </el-form>
        <el-button @click="caseSubmit">确定</el-button>
        <el-button @click="dialog.caseSubmit = false">取消</el-button>
      </div>
    </el-dialog>

    <!--EXCEL错误弹出框-->
    <el-dialog title="Excel数据错误" v-model="dialog.errMsgOpen" size="tiny" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
      <data-box :data="errMsgData" hiddenForm class="text-center" :maxHeight="230">
        <template slot="column">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="errorMsg" label="错误提示" min-width="110">
          </el-table-column>
        </template>
      </data-box>
    </el-dialog>
  </div>
</template>
<script>
  import net from '@/util/net'
  import server from '@/config/servers'
  import DataBox from '@/components/DataBox'
  import FileUpload from '@/components/FileUpload'
  import { validateMin, validateMax, downloadFile, truePhoneRules } from '@/util/common'
  import { mapState, mapActions } from 'vuex'
  import CaseExcelImport from '@/views/case-manage/CaseExcelImport'
  import CaseFileImport from '@/views/case-manage/CaseFileImport'
  // 案件详情
  import DetailsTab from '@/components/DetailsTab'
  import CustInform from '@/views/case-manage/CustInform'
  import PayInform from '@/views/case-manage/PayInform'
  import AttachInform from '@/views/case-manage/AttachInform'
  // 下载模板
  import App from '@/config/app'

  export default {
    name: 'case-import',
    data() {
      return {
        loading: {
          state: false
        },
        checkResult: [],
        servers: {
          getImportData: server.CaseManage.get_data_info_excel_list, // 获取导入数据列表
          submitImportCase: server.CaseManage.confirm_import_case, // 确认导入案件
          deleteImportCase: server.CaseManage.delete_import_case, // 删除导入案件
          checkImportFile: server.CaseManage.check_case_file // 查看导入文件
        },
        // databox参数
        params: {
          custName: '',
          caseAmt: '',
          overDueDays1: '',
          overDueDays2: '',
          overDueAmount1: '',
          overDueAmount2: '',
          batchNumber: '',
          pinName: '',
          prinCode: '',
          cupoName: '',
          cupoStatus: '',
          cupoGettime: '',
          phoneNum: ''
        },
        // 数据范围验证
        validate: {
          validateMin,
          validateMax,
          truePhoneRules
        },
        // 案件详情客户信息
        tabsArr: [{
          title: '客户信息',
          pane: 'custInform'
        }, {
          title: '还款信息',
          pane: 'payInform'
        }, {
          title: '附件信息',
          pane: 'attachInform'
        }],
        caseDetail: {
          cust: {
            type: 'IMPORT',
            batchNumber: '',
            idCardNumber: '',
            custId: ''
          },
          pay: {
            type: 'IMPORT',
            orderId: '',
            productId: ''
          },
          attach: {
            type: 'IMPORT',
            caseNum: ''
          }
        },
        // 删除导入
        deleteImport: {
          batchNum: ''
        },
        // 弹出框状态
        dialog: {
          excelImport: false,
          fileImport: false,
          deleteImport: false,
          caseDetail: false,
          multipleFileImport: false,
          caseSubmit: false,
          errMsgOpen: false
        },
        selectedItem: {},
        // 错误信息弹框
        errMsgData: []
      }
    },
    computed: {
      ...mapState({
        clientList: state => state.caseManage.client_list,
        batchtList: state => state.caseManage.batch_list
      }),
      isImported() {
        return this.batchtList.length > 0
      }
    },
    deactivated() {
      this.dialog.caseDetail = false
    },
    methods: {
      /**
       * 错误信息弹出
       */
      errMsgShow(data) {
        console.log(data)
        this.dialog.errMsgOpen = true
        this.errMsgData = data
      },
      ...mapActions([
        'getClientList',
        'getBatchList'
      ]),
      /**
       * 下载模板
       */
      downloadTemplate() {
        downloadFile(App.url.template, '案件导入模板')
      },
      /**
       * 案件确认
       */
      checkCaseFile() {
        this.dialog.caseSubmit = true
        net.send({
          server: this.servers.checkImportFile
        }).then(
          data => {
            this.checkResult = []
          },
          ({ object }) => {
            this.checkResult = object
          }
        )
      },
      /**
       *案件确认
       */
      caseSubmit() {
        net.send({
          server: this.servers.submitImportCase,
          loading: this.loading
        }).then(
          data => {
            this.dialog.caseSubmit = false
            this.refresh()
            this.$message({
              type: 'success',
              message: '导入成功!'
            })
          },
          ({ reason }) => {
            this.$message(reason)
          }
        )
      },
      /**
       *案件删除
       */
      deleteCase() {
        net.send({
          server: this.servers.deleteImportCase,
          data: this.deleteImport
        }).then(
          data => {
            this.$message('案件删除成功')
            this.refresh()
            this.dialog.deleteImport = false
          }, ({ reason }) => {
            this.$message(reason)
          }
        )
      },
      /**
       * 打开案件详情弹出框
       */
      openCaseDetail(scope) {
        this.caseDetail.attach.caseNum = scope.row.id
        this.caseDetail.cust.batchNumber = scope.row.batchNumber
        this.caseDetail.cust.custId = scope.row.custId
        this.caseDetail.cust.idCardNumber = scope.row.idCardNumber
        this.caseDetail.pay.productId = scope.row.productId
        this.caseDetail.pay.orderId = scope.row.orderId

        this.dialog.caseDetail = true
      },
      /**
       * 导入附件
       */
      importCaseFile(data) {
        this.selectedItem = data
        this.dialog.multipleFileImport = true
      },
      getFileList() {
        this.$nextTick(() => {
          this.$refs['case-file-upload'].getCaseFileList()
        })
      },
      /**
       * 刷新案件详情
       */
      refreshCaseDetail() {
        this.$nextTick(() => {
          this.$refs['payInform'].refresh(this.caseDetail.pay)
          this.$refs['attachInform'].refresh(this.caseDetail.attach)
          this.$refs['custInform'].refresh(this.caseDetail.cust)
        })
      },
      /**
       * 刷新databox
       */
      refresh() {
        this.$refs['databox'].refresh()
        this.getBatchList()
      }
    },
    components: {
      DataBox,
      FileUpload,
      CaseExcelImport,
      CaseFileImport,
      // 案件详情
      DetailsTab,
      CustInform,
      PayInform,
      AttachInform
    },
    mounted() {
      this.getBatchList()
      this.getClientList()
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

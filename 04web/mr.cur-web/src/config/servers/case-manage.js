/**
 * 服务配置格式
 * elample:
 * {
 *  service:{服务名称}
 *  controller:{controller名称}
 *  action:{action名称}-可选
 *  url:{自定义地址}-可选(填写url时将不会读取service,controll,action)
 *  type:'RTYPE.(GET|PUT|POST|DELETE)'
 * }
 */
import { RTYPE } from '@/util/common'

export default {
  // 获取委托方列表
  principal_management_case: {
    service: 'acc-service',
    controller: 'accPrincipalController',
    action: 'getAccPrincipal',
    type: RTYPE.GET
  },
  // 新增委托方
  principal_add_case: {
    service: 'acc-service',
    controller: 'accPrincipalController',
    action: 'addAccPrincipal',
    type: RTYPE.POST
  },
  // 委托方删除
  principal_delete_case: {
    service: 'acc-service',
    controller: 'accPrincipalController',
    action: 'deleteAccPrincipal',
    type: RTYPE.DELETE
  },
  // 获取所有省份信息
  provinces_case: {
    service: 'acc-service',
    controller: 'accAreaController',
    action: 'getAllProvince',
    type: RTYPE.POST
  },
  // 获取某省份所在城市
  provinces_city_case: {
    service: 'acc-service',
    controller: 'accAreaController',
    action: 'getAllCity',
    type: RTYPE.POST
  },
  // 获取某城市的所有区/县
  city_country_case: {
    service: 'acc-service',
    controller: 'accAreaController',
    action: 'getAllCounty',
    type: RTYPE.POST
  },
  // 根据案件编码获取案件附件信息
  case_manage_attachment_info: {
    service: 'order-service',
    controller: 'orderPaymentInformation',
    action: 'getOrderPaymentContractByOrderNum',
    type: RTYPE.GET
  },
  // 通过订单编号查询订单信息
  orderPayment_information: {
    service: 'order-service',
    controller: 'orderPaymentInformation',
    action: 'getOrderPaymentInformationByOrderNum',
    type: RTYPE.GET
  },
  // 案件还款审批记录列表
  get_case_reimbursement_info: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'getAccPayApplyByCondition',
    type: RTYPE.GET
  },
  // 结案
  get_end_case_info: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'closedAccRecevicePool',
    type: RTYPE.GET
  },
  // 案件管理列表
  get_case_info_page_list: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'getCaseInfoPageList',
    type: RTYPE.GET
  },
  // 案件分配列表
  get_case_allocat_page_list: {
    service: 'order-service',
    controller: 'caseInfoController',
    action: 'getCaseInfoPageList',
    type: RTYPE.GET
  },
  // 案件导入列表
  get_data_info_excel_list: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'getDataInfoExcelList',
    type: RTYPE.GET
  },
  // 案件管理重新分配
  distribute_cease_info_agin: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'distributeCeaseInfoAgin',
    type: RTYPE.POST
  },
  // 案件管理批量分配
  distribute_cease_info: {
    service: 'order-service',
    controller: 'caseInfoController',
    action: 'distributeCeaseInfo',
    type: RTYPE.POST
  },
  // 案件分配获取机构案件数
  get_depart_cases: {
    service: 'order-service',
    controller: 'caseInfoController',
    action: 'getDepartCases',
    type: RTYPE.GET
  },
  // 案件管理获取机构案件数
  get_case_nums: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'getCaseNums',
    type: RTYPE.GET
  },
  // 案件导入列表
  import_case_excel: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'importExcelData',
    type: RTYPE.POST
  },
  // 获取批次号列表
  import_batch_list: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'queryBatchNumGroup',
    type: RTYPE.GET
  },
  // 附件解压
  import_case_attachment: {
    service: 'file-service',
    controller: 'fileUploadController',
    action: 'unZipCaseFile',
    type: RTYPE.POST
  },
  // 案件确认
  confirm_import_case: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'casesConfirmByBatchNum',
    type: RTYPE.GET
  },
  // 案件删除
  delete_import_case: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'deleteCasesByBatchNum',
    type: RTYPE.GET
  },
  // 通过姓名、角色查询特定部门下的用户
  query_dept_role_user: {
    service: 'organization-service',
    controller: 'userController',
    action: 'queryDeptRoleUser',
    type: RTYPE.GET
  },
  // 查找用户的案件数
  get_acc_receive_pool_by_userId: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'getAccReceivePoolByUserId',
    type: RTYPE.POST
  },
  // 案件分配、案件管理的案件详情客户信息
  get_case_info_details: {
    service: 'order-service',
    controller: 'caseInfoController',
    action: 'getCaseInfoDetails',
    type: RTYPE.GET
  },
  // 案件导入的案件详情客户信息
  import_case_info_details: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'getCaseInfoDetails',
    type: RTYPE.GET
  },

  // 案件导入的案件详情还款信息的产品信息
  get_product_information: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'getProductInformation',
    type: RTYPE.GET
  },
  // 案件导入的案件详情还款信息的还款信息
  get_repayment_information: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'getRepaymentInformation',
    type: RTYPE.GET
  },
  // 案件分配、案件管理、客户查询的案件详情还款信息的产品信息
  get_formalProduct_information: {
    service: 'product-service',
    controller: 'product',
    action: 'getFormalProductInformation',
    type: RTYPE.GET
  },
  // 案件分配、案件管理、客户查询的案件详情还款信息的还款信息
  get_Repayment_info: {
    service: 'order-service',
    controller: 'orderPaymentInformation',
    action: 'getRepaymentInformation',
    type: RTYPE.GET
  },
  // 案件分配、案件管理、客户查询的案件详情还款信息的还款明细、还款记录
  get_orderPaymentInformation_byOrderNum: {
    service: 'order-service',
    controller: 'orderPaymentInformation',
    action: 'getOrderPaymentInformationByOrderNum',
    type: RTYPE.GET
  },

  // 案件导入的案件详情附件信息的其他材料
  get_case_impFile: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'getCustomerOtherPapers',
    type: RTYPE.GET
  },
  // 案件分配、案件管理、客户查询的案件详情附件信息的进件材料
  get_customer_feedingMaterial: {
    service: 'customer-service',
    controller: 'customerInformationController',
    action: 'getCustomerFeedingMaterial',
    type: RTYPE.GET
  },
  // 案件分配、案件管理、客户查询的案件详情附件信息的线上合同，签约合同下载
  get_customerContract_information: {
    service: 'order-service',
    controller: 'orderPaymentInformation',
    action: 'getCustomerContractInformation',
    type: RTYPE.GET
  },
  // 案件分配、案件管理、客户查询的案件详情附件信息的其他材料
  get_customer_ohterPapers: {
    service: 'customer-service',
    controller: 'customerInformationController',
    action: 'getCustomerOhterPapers',
    type: RTYPE.GET
  },
  // 案件管理的案件详情附件信息
  get_case_info_file: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'getCaseInfoFile',
    type: RTYPE.GET
  },
  // 检查案件附件是否存在
  check_case_file: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'checkCasesFile',
    type: RTYPE.GET
  },
  // 指定案件上传文件
  upload_case_file_single: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'uploadCaseFileSingle',
    type: RTYPE.POST
  },
  // 获取案件已上传文件
  get_case_file_list: {
    service: 'dataimp-service',
    controller: 'accImportExcelDataController',
    action: 'getCaseFileList',
    type: RTYPE.GET
  },
  // 导出跟进记录
  export_acc_followup: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'exportAccFollowupModel',
    type: RTYPE.GET
  },
  // 案件按条件分页查询
  get_acc_recevice_pool_by_token: {
    service: 'acc-service',
    controller: 'AccFollowupController',
    action: 'getAccRecevicePoolByToken',
    type: RTYPE.GET
  }
}

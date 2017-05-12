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
   // 协催申请记录多条件查询
   post_AssistApply_query: {
     service: 'acc-service',
     controller: 'AccReceivableApplyController',
     action: 'query',
     type: RTYPE.GET
   },
   // 外访案件查询
   post_outVisit_query: {
     service: 'acc-service',
     controller: 'AccRecevicePoolController',
     action: 'query',
     type: RTYPE.GET
   },
   // 外访已处理案件查询
   post_process_query: {
     service: 'acc-service',
     controller: 'PassRecevicePoolController',
     action: 'query',
     type: RTYPE.GET
   },
   // 协催审批提交
   post_AssistApply: {
     service: 'acc-service',
     controller: 'AccReceivableApplyController',
     action: 'approveAccReceivableApply',
     type: RTYPE.GET
   },
   // 获取催收专员
   get_CupoUser: {
     service: 'acc-service',
     controller: 'BatchDistributionController',
     action: 'getCupoUserCounts',
     type: RTYPE.GET
   },
   // 获取人均案件数
   get_AvgCaseCount: {
     service: 'acc-service',
     controller: 'BatchDistributionController',
     action: 'getAvgCaseCount',
     type: RTYPE.GET
   },
   // 催收案件批量分配
   post_batchDistribute: {
     service: 'acc-service',
     controller: 'BatchDistributionController',
     action: 'batchDistribution',
     type: RTYPE.POST
   },
   // 催收案件重新分配
   post_redistribution: {
     service: 'acc-service',
     controller: 'ReDistributionController',
     action: 'redistribution',
     type: RTYPE.GET
   },
   // 挂起取消挂起
   post_hangup: {
     service: 'acc-service',
     controller: 'AccRecevicePoolController',
     action: 'handUp',
     type: RTYPE.GET
   },
   // 协催申请记录查询
   get_association_application_record_query: {
     service: 'acc-service',
     controller: 'AccReceivableApplyController',
     action: 'getAccReceivableApplyByCondition',
     type: RTYPE.GET
   },
   //  添加协催申请记录
   get_add_association_application_record: {
     service: 'acc-service',
     controller: 'AccReceivableApplyController',
     action: 'saveAccReceivableApply',
     type: RTYPE.POST
   }
 }

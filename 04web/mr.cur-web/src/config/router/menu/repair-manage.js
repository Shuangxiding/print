const CaseRepair = resolve => require(['@/views/repair-manage/CaseRepair'], resolve)
const CaseRepairRecord = resolve => require(['@/views/repair-manage/CaseRepairRecord'], resolve)

export default [
  {
    path: '/case-repair',
    name: 'case-repair',
    component: CaseRepair,
    title: '案件修复',
    code: '0501FF'
  }, {
    path: '/case-repair-record',
    name: 'case-repair-record',
    component: CaseRepairRecord,
    title: '已处理记录',
    code: '0502FF'
  }]

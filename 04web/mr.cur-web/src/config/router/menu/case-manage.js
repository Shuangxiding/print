// 案件管理
const ClientManage = resolve => require(['@/views/case-manage/ClientManage'], resolve)
const CaseImport = resolve => require(['@/views/case-manage/CaseImport'], resolve)
const CaseAllocate = resolve => require(['@/views/case-manage/CaseAllocate'], resolve)
const CaseReallocate = resolve => require(['@/views/case-manage/CaseReallocate'], resolve)

export default [
  {
    path: '/client-manage',
    name: 'client-manage',
    component: ClientManage,
    title: '委托方管理',
    code: '0401FF'
  }, {
    path: '/case-import',
    name: 'case-import',
    component: CaseImport,
    title: '案件导入',
    code: '0402FF'
  }, {
    path: '/case-allocate',
    name: 'case-allocate',
    component: CaseAllocate,
    title: '案件分配',
    code: '0403FF'
  }, {
    path: '/case-reallocate',
    name: 'case-reallocate',
    component: CaseReallocate,
    title: '案件管理',
    code: '0404FF'
  }]

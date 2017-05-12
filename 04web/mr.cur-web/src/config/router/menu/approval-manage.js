const CostReduce = resolve => require(['@/views/approval-manage/CostReduce'], resolve)
const RepairReview = resolve => require(['@/views/approval-manage/RepairReview'], resolve)

export default [
  {
    path: '/cost-reduce',
    name: 'cost-reduce',
    component: CostReduce,
    code: '0601FF',
    title: '费用减免审批'
  }, {
    path: '/repair-review',
    name: 'repair-review',
    component: RepairReview,
    title: '还款审核',
    code: '0602FF'
  }]

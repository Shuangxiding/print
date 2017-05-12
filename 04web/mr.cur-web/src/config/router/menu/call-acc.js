// 电话催收
const CallCase = resolve => require(['@/views/call-acc/CallCase'], resolve)
const CallHandledCase = resolve => require(['@/views/call-acc/CallHandledCase'], resolve)

export default [
  {
    path: '/call-case',
    name: 'call-case',
    component: CallCase,
    title: '电催案件',
    code: '0101FF'
  }, {
    path: '/call-handled-case',
    name: 'call-handled-case',
    component: CallHandledCase,
    title: '已处理记录',
    code: '0102FF'
  }]

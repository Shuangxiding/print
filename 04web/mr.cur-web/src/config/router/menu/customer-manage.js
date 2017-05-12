const CustomerQuery = resolve => require(['@/views/customer-manage/CustomerQuery'], resolve)

export default [
  {
    path: '/customer-query',
    name: 'customer-query',
    component: CustomerQuery,
    title: '客户查询',
    code: '0701FF'
  }]

// 贷后催收通知单
const NoticeAcc = resolve => require(['@/views/notice-manage/NoticeAcc'], resolve)
const NoticeTemp = resolve => require(['@/views/notice-manage/NoticeTemp'], resolve)

export default [
  {
    path: '/notice-acc',
    name: 'notice-acc',
    component: NoticeAcc,
    code: '0901FF',
    title: '催收通知'
  }, {
    path: '/notice-temp',
    name: 'notice-temp',
    component: NoticeTemp,
    code: '0902FF',
    title: '通知单模板'
  }]

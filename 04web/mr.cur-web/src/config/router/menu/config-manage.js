// const CustomerConfig = resolve => require(['@/views/config-manage/CustomerConfig'], resolve)
const TemplateConfig = resolve => require(['@/views/config-manage/TemplateConfig'], resolve)

export default [
  // {
  //   path: '/customer-config',
  //   name: 'customer-config',
  //   component: CustomerConfig,
  //   title: '客户资料配置',
  //   code: '0801FF'
  // },
  {
    path: '/TemplateConfig',
    name: 'TemplateConfig',
    component: TemplateConfig,
    title: '模板配置',
    code: '0802FF'
  }]

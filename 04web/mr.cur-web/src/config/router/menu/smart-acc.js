const MessageAcc = resolve => require(['@/views/smart-acc/MessageAcc'], resolve)
const EmailAcc = resolve => require(['@/views/smart-acc/EmailAcc'], resolve)

export default [
  {
    path: '/message-acc',
    name: 'message-acc',
    component: MessageAcc,
    title: '短信催收',
    code: '0301FF'
  }, {
    path: '/email-acc',
    name: 'email-acc',
    component: EmailAcc,
    title: '电子邮件催收',
    code: '0302FF'
  }]

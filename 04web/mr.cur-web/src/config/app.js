export default {
  name: '贷后催收系统',
  version: 'v1.0.0',
  preview: process.env.PREVIEW,
  url: {
    server: process.env.SERVER_URL,
    socket: process.env.SOCKET_URL,
    upload: process.env.UPLOAD_URL,
    template: process.env.TEMPLATE_URL
  },
  net: {
    timeout: 99999, // 超时时间
    type: 'GET'
  },
  debug: true
}

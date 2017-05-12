var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_URL: '"http://192.168.1.15:9000"',
  SOCKET_URL: '"ws://192.168.1.15:9009/webSocketMessage"',
  UPLOAD_URL: '"http://192.168.1.15:9012"',
  TEMPLATE_URL: '"http://192.168.1.8/group1/M00/00/CA/wKgBCFkAeMiALJTCAEs0APeX-U4753.xls"',
  MOCK: process.env.MOCK,
  BUILD_TIME: (+new Date())
})

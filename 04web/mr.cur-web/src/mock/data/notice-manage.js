// 贷后催收通知单管理数据模拟
import server from '@/config/servers'

export default {
  // 发送贷后催收通知单信息查询
  send_notice_info: {
    server: server.NoticeManage.send_notice_info,
    data: JSON.parse(`{
      "totalElements":1,
      "content":[{
      "custName": "孙艳平"
    }
   ]}`)
  }
}

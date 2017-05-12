/**
 * Created by liuchen on 2017/3/16.
 */
import server from '@/config/servers'

// 智能催收接口数据模拟
export default {
  // 获取短信模板信息
  get_message_template: {
    server: server.SmartAcc.get_message_template,
    data: JSON.parse(`[
      { 
        "id": "0c4efd5e-ac93-4e24-87ff-8dc0ea0fab80",
        "fileId": "1111111",
        "code": "jk001",
        "name": "短信模板06",
        "style": 29,
        "type": 35,
        "status": 0,
        "content": "高并发，高可用",
        "createTime": "2017-03-01T15:26:11.000+0000",
        "creator": null,
        "upTime": "2017-03-04T16:42:19.000+0000",
        "default": true
      }, { 
        "id": "0c4efd5e-ac93-4e24-87ff-8dc0ea0fab80",
        "fileId": "1111111",
        "code": "jk001",
        "name": "短信模板05",
        "style": 29,
        "type": 34,
        "status": 0,
        "content": "高并发，高可用",
        "createTime": "2017-03-01T15:26:11.000+0000",
        "creator": null,
        "upTime": "2017-03-04T16:42:19.000+0000",
        "default": true
      }
    ]`)
  },
  // 获取短信发送对象
  get_message_sendObj: {
    server: server.SmartAcc.get_message_sendObj,
    data: JSON.parse(`[
      { 
        "custId": "001",
        "custName": "张三",
        "relation": ["本人", "同事", "配偶"],
        "phone": ["13904344057", "13904344065", "13904344066"]
      }, 
      { 
        "custId": "222",
        "custName": "张四",
        "relation": ["本人", "同事", "配偶"],
        "phone": ["13904344057", "13904344065", "13904344066"]
      }
    ]`)
  }
}

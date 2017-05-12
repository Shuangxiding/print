// 接口数据模拟
import server from '@/config/servers'

export default {
  get_role_hash: {
    server: server.app.get_role_hash,
    data: '2030060091'
  },
  get_role_list: {
    server: server.app.get_role_data,
    data: JSON.parse(`[{
      "resoId": "1",
      "parentid": "",
      "appname": "催呗",
      "name": "电话催收",
      "code": "01FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:29:05.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "10",
      "parentid": "1",
      "appname": "催呗",
      "name": "电催案件池",
      "code": null,
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:31:11.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "11",
      "parentid": "1",
      "appname": "催呗",
      "name": "电催案件",
      "code": "0101FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:32:28.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "12",
      "parentid": "1",
      "appname": "催呗",
      "name": "已处理记录",
      "code": "0102FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:33:02.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "13",
      "parentid": "2",
      "appname": "催呗",
      "name": "协催申请审批",
      "code": "0201FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:34:12.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "14",
      "parentid": "2",
      "appname": "催呗",
      "name": "外访案件池",
      "code": null,
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:35:25.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "15",
      "parentid": "2",
      "appname": "催呗",
      "name": "外访案件",
      "code": "0202FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:35:58.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "16",
      "parentid": "2",
      "appname": "催呗",
      "name": "已处理记录",
      "code": "0203FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:36:36.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "17",
      "parentid": "3",
      "appname": "催呗",
      "name": "短信催收",
      "code": "0301FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:37:06.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "18",
      "parentid": "3",
      "appname": "催呗",
      "name": "电子邮件催收",
      "code": "0302FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:37:46.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "19",
      "parentid": "3",
      "appname": "催呗",
      "name": "语音群呼",
      "code": "0303FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:38:10.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "2",
      "parentid": "",
      "appname": "催呗",
      "name": "外访催收",
      "code": "02FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:34:02.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "20",
      "parentid": "3",
      "appname": "催呗",
      "name": "信函催收",
      "code": null,
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:38:42.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "21",
      "parentid": "4",
      "appname": "催呗",
      "name": "委托方管理",
      "code": "0501FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:41:44.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "22",
      "parentid": "4",
      "appname": "催呗",
      "name": "案件导入",
      "code": "0502FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:42:09.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "23",
      "parentid": "4",
      "appname": "催呗",
      "name": "案件分配",
      "code": "0503FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:42:34.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "24",
      "parentid": "4",
      "appname": "催呗",
      "name": "案件再分配",
      "code": "0504FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:43:06.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "25",
      "parentid": "5",
      "appname": "催呗",
      "name": "案件修复",
      "code": "0601FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:29:52.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "26",
      "parentid": "5",
      "appname": "催呗",
      "name": "已处理记录",
      "code": "0602FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:30:23.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "27",
      "parentid": "6",
      "appname": "催呗",
      "name": "费用减免审批",
      "code": "0701FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:31:07.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "28",
      "parentid": "6",
      "appname": "催呗",
      "name": "还款审批",
      "code": "0702FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:31:42.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "29",
      "parentid": "7",
      "appname": "催呗",
      "name": "客户查询",
      "code": "0801FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:32:15.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "3",
      "parentid": "",
      "appname": "催呗",
      "name": "智能催收",
      "code": "03FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:39:02.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "30",
      "parentid": "8",
      "appname": "催呗",
      "name": "数据流向策略",
      "code": null,
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:33:03.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "31",
      "parentid": "8",
      "appname": "催呗",
      "name": "客户资料配置",
      "code": "0801FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:33:34.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "32",
      "parentid": "8",
      "appname": "催呗",
      "name": "模板配置",
      "code": "0802FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:34:09.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "33",
      "parentid": "8",
      "appname": "催呗",
      "name": "规则库配置",
      "code": null,
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:34:38.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "34",
      "parentid": "9",
      "appname": "催呗",
      "name": "机构与用户管理",
      "code": "0901FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:35:18.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "35",
      "parentid": "9",
      "appname": "催呗",
      "name": "角色管理",
      "code": "0902FF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 18,
      "remark": null,
      "order": null,
      "time": "2017-03-13T04:35:44.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "4",
      "parentid": null,
      "appname": "催呗",
      "name": "案件管理",
      "code": "04FFFF",
      "level": null,
      "path": null,
      "icon": null,
      "type": 14,
      "filetype": 17,
      "remark": null,
      "order": null,
      "time": "2017-03-13T03:40:21.000+0000",
      "creator": null,
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "5",
      "parentid": "",
      "appname": "催呗",
      "name": "修复管理",
      "code": "05FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:40:12.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "6",
      "parentid": "",
      "appname": "催呗",
      "name": "审批管理",
      "code": "06FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:41:21.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "7",
      "parentid": "",
      "appname": "催呗",
      "name": "客户查询",
      "code": "07FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:42:15.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "8",
      "parentid": "",
      "appname": "催呗",
      "name": "配置管理",
      "code": "08FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:43:15.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    },
    {
      "resoId": "9",
      "parentid": "",
      "appname": "催呗",
      "name": "系统管理",
      "code": "09FFFF",
      "level": null,
      "path": "",
      "icon": "",
      "type": 14,
      "filetype": 17,
      "remark": "",
      "order": null,
      "time": "2017-03-02T06:47:25.000+0000",
      "creator": "",
      "flag": null,
      "roles": [
        {
          "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
          "name": "超级管理员",
          "status": 1,
          "remark": "测试数据",
          "creator": "陈娇",
          "createTime": "2017-03-01T04:00:00.000+0000"
        }
      ]
    }
  ]`)
  }
}

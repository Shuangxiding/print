import servers from '@/config/servers'

export default {
  // 分页多条件获取角色信息
  get_role_page: {
    server: servers.SystemManage.get_role_page,
    data: JSON.parse(`[
      {
        "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
        "name": "超级管理员",
        "status": 0,
        "remark": "测试数据",
        "creator": "陈娇",
        "createTime": "2017-03-15 21:00:59"
      },
      {
        "roleId": "29cc1083-f275-40f9-9454-45073875c32d",
        "name": "外访专员",
        "status": 0,
        "remark": "测试角色",
        "creator": "陈娇",
        "createTime": "2107-03-02 21:51:00"
      },
      {
        "roleId": "6c1c2361-2d15-45d7-8fff-c60014288780",
        "name": "外访组长",
        "status": 0,
        "remark": "测试角色",
        "creator": "陈娇",
        "createTime": "2107-03-02 21:59:08"
      },
      {
        "roleId": "7ae60e7d-7911-43c9-8d3b-e7b803a9438e",
        "name": "运营专员",
        "status": 0,
        "remark": "测试角色",
        "creator": "陈娇",
        "createTime": "2107-03-02 22:10:15"
      },
      {
        "roleId": "90bfda25-2035-4376-9a01-68e99501e431",
        "name": "修复专员",
        "status": 0,
        "remark": "测试角色",
        "creator": "陈娇",
        "createTime": "2107-03-02 22:01:14"
      },
      {
        "roleId": "a1ca16bb-787f-4fb2-b28d-21d67a5f5a7b",
        "name": "贷后总监",
        "status": 0,
        "remark": "测试角色",
        "creator": "陈娇",
        "createTime": "2017-03-02 21:00:00"
      },
      {
        "roleId": "af4bea09-4f89-43a5-ba24-8903789375ce",
        "name": "电催专员",
        "status": 0,
        "remark": "测试角色",
        "creator": "陈娇",
        "createTime": "2017-03-16 19:14:26"
      }
    ]`)
  }
}

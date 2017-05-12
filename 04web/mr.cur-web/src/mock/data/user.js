// 接口数据模拟
import server from '@/config/servers'

export default {
  login: {
    server: server.user.login,
    data: JSON.parse(`{
            "user": {
                "userId": "4b8df7c4-6d3a-4522-9423-6cbf412c9a5a",
                "degrId": "",
                "realName": "胡开甲",
                "userName": "zzl00012",
                "password": "$2a$10$JpEBabnNx1/pL4qh3N7WPeJRCFKZ95hcwwm5faGp6GVL4mmSXgWrG",
                "phone": "15529038219",
                "email": "190916516@qq.com",
                "sex": "0",
                "status": "1",
                "remark": "测试用户",
                "createTime": "2017-03-02 10:23:00.0",
                "creator": "陈娇",
                "departments": [
                    {
                        "deptId": "f649fa76-e05c-4991-9d61-5f1547de52a7",
                        "type": "3",
                        "name": "外访一组",
                        "pid": "f5ec79aa-9c05-4510-9884-ab4565a1bc4c",
                        "level": "4",
                        "remark": "小组 测试数据",
                        "status": "1",
                        "createTime": "2017-03-01 16:43:02.0",
                        "creator": "陈娇"
                    }
                ],
                "roles": [
                    {
                        "roleId": "0a035e58-21dd-43fd-b1b6-5a59fc06428d",
                        "name": "超级管理员",
                        "status": "1",
                        "remark": "测试数据",
                        "creator": "陈娇",
                        "createTime": "2017-03-01 12:00:00.0"
                    },
                    {
                        "roleId": "ead13dfa-f177-471d-8569-872bea7a5df2",
                        "name": "电催组长",
                        "status": "1",
                        "remark": "测试角色",
                        "creator": "陈娇",
                        "createTime": "2107-03-02 13:58:25.0"
                    }
                ]
            },
            "token": "loL_evvABWzhF7vxCxdId7_y3iofiGuFn_naFWpz"
        }`)
  }
}

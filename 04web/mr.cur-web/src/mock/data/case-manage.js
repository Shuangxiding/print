// 接口数据模拟
import server from '@/config/servers'

export default {
  // 已处理案件查询
  principal_management_case: {
    server: server.CaseManage.principal_management_case,
    data: JSON.parse(`{
      "totalElements":30,
      "content":[{
      "prinCode": "006",
      "prinName": "****",
      "organizationType": "贷款公司",
      "prinProvinces": "上海市",
      "prinCity": "市辖区",
      "prinCounty": "虹口区",
      "prinContacts": "赵二",
      "prinPhone": "15800892341",
      "prinMobile": "02189002345"
    },
    {
      "prinCode": "006",
      "prinName": "****",
      "organizationType": "贷款公司",
      "prinProvinces": "上海市",
      "prinCity": "市辖区",
      "prinCounty": "虹口区",
      "prinContacts": "赵二",
      "prinPhone": "15800892341",
      "prinMobile": "02189002345"
    },
    {
      "prinCode": "006",
      "prinName": "****",
      "organizationType": "贷款公司",
      "prinProvinces": "上海市",
      "prinCity": "市辖区",
      "prinCounty": "虹口区",
      "prinContacts": "赵二",
      "prinPhone": "15800892341",
      "prinMobile": "02189002345"
    },
    {
      "prinCode": "006",
      "prinName": "****",
      "organizationType": "贷款公司",
      "prinProvinces": "上海市",
      "prinCity": "市辖区",
      "prinCounty": "虹口区",
      "prinContacts": "赵二",
      "prinPhone": "15800892341",
      "prinMobile": "02189002345"
    }
   ]}`)
  }
}

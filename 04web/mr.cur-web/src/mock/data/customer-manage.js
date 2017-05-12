// 接口数据模拟
import server from '@/config/servers'

export default {
  // 客户查询
  customerCollection: {
    server: server.CustomerManage.get_customer_list,
    data: JSON.parse(`{
      "totalElements":30,
      "content":[{
      "idCard": "201702210001",
      "custName": "胡一123123123",
      "cupoPhone": "15390590980",
      "contractAmt": "2320.00",
      "orderpayStatus": "M1",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "丁金龙12312312",
      "ProName": "逾期还款完成",
      "cupoPaynum": "1765.00",
      "cupoStyle": "对公",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
    {
      "idCard": "201702210002",
      "custName": "刘梅",
      "cupoPhone": "15390597980",
      "contractAmt": "3320.00",
      "orderpayStatus": "M1",
      "overdueDays": "9",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "岩岩",
      "ProName": "提前结清完成",
      "cupoPaynum": "6065.00",
      "cupoStyle": "对公",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
    {
      "idCard": "201702210003",
      "custName": "杨虎",
      "cupoPhone": "15297897980",
      "contractAmt": "2200.00",
      "orderpayStatus": "M1",
      "overdueDays": "9",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "李亮",
      "ProName": "逾期还款完成",
      "cupoPaynum": "2065.00",
      "cupoStyle": "对公",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
    {
      "idCard": "201702210004",
      "custName": "刘燕",
      "cupoPhone": "15397897980",
      "contractAmt": "3200.00",
      "orderpayStatus": "M1",
      "overdueDays": "3",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "小华",
      "ProName": "逾期还款完成",
      "cupoPaynum": "1265.00",
      "cupoStyle": "微信",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
    {
      "idCard": "201702210005",
      "custName": "谢小梅",
      "cupoPhone": "15397897980",
      "contractAmt": "3200.00",
      "orderpayStatus": "M1",
      "overdueDays": "5",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "丁金龙",
      "ProName": "到期流出",
      "cupoPaynum": "2365.00",
      "cupoStyle": "代扣",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
    {
      "idCard": "201702210006",
      "custName": "王城",
      "cupoPhone": "15397907980",
      "contractAmt": "2800.00",
      "orderpayStatus": "M1",
      "overdueDays": "7",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "丁金龙",
      "ProName": "到期流出",
      "cupoPaynum": "2134.00",
      "cupoStyle": "对公",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
    {
      "idCard": "201702210007",
      "custName": "梁明",
      "cupoPhone": "15397906680",
      "contractAmt": "1968.00",
      "orderpayStatus": "M1",
      "overdueDays": "6",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "丁金龙",
      "ProName": "逾期还款完成",
      "cupoPaynum": "2586.00",
      "cupoStyle": "对公",
      "belongName": "丁金",
      "lendingDate": "2016-12-26"
    },
     {
      "idCard": "201702210008",
      "custName": "梁明",
      "cupoPhone": "15355506680",
      "contractAmt": "1968.00",
      "orderpayStatus": "M1",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "丁金龙",
      "ProName": "逾期还款完成",
      "cupoPaynum": "3366.00",
      "cupoStyle": "对公",
      "lendingDate": "2016-12-26",
      "belongName": "丁金"
    }]}`)
  },
  telephone_collection_case: {
    server: server.CallAcc.telephone_collection_case,
    data: JSON.parse(`{
       "totalElements":30,
      "content":[{
      "idCard": "201702210001",
      "custName": "胡一",
      "cupoPhone": "15390590980",
      "contractAmt": "2320.00",
      "orderpayStatus": "M1",
      "cupoBatch": "2016122601",
      "pinName": "中资联",
      "cupoName": "丁金龙",
      "belongName": "丁金",
      "ProName": "逾期还款完成",
      "lendingDate": "2016-12-26"
      }]
    }`)
  }
}

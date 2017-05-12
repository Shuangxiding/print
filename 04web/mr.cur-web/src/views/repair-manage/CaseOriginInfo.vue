<template>
  <div>
    <el-col class="frame">
      <data-grid label="开户信息" iconClass="icon" :labelWidth="100" labelAlign="right" row-key="orapId" contentAlign="left">
        <data-grid-item label="账户类型：" :span="3" min-width="50px">{{params.customerBankInfo.accountType}}</data-grid-item>
        <data-grid-item label="开户省份：" :span="3" min-width="80px">{{params.customerBankInfo.depositPro}}</data-grid-item>
        <data-grid-item label="开户城市：" :span="3" min-width="80px">{{params.customerBankInfo.depositCity}}</data-grid-item>
        <data-grid-item label="开户银行：" :span="3" min-width="80px">{{params.customerBankInfo.depositBank}}</data-grid-item>
        <data-grid-item label="开户支行：" :span="6">{{params.customerBankInfo.depositBankBra}}</data-grid-item>
        <data-grid-item label="银行卡号：" :span="6">{{params.customerBankInfo.cardNumber}}</data-grid-item>
      </data-grid>
      <data-grid row-key="Id" :totalSpan="10" label="客户基本信息" iconClass="icon" :labelWidth="100" labelAlign="right" contentAlign="left" :server="servers.customerbasicInformation">
        <data-grid-item label="姓名：" :span="2">{{params.custName}}</data-grid-item>
        <data-grid-item label="性别：" :span="2">{{params.sex}}</data-grid-item>
        <data-grid-item label="手机号：" :span="2">{{params.custMobile}}</data-grid-item>
        <data-grid-item label="微信号：" :span="2">{{params.wechat}}</data-grid-item>
        <data-grid-item label="qq：" :span="2">{{params.qq}}</data-grid-item>
        <data-grid-item label="婚姻状况：" :span="2">{{params.marital}}</data-grid-item>
        <data-grid-item label="教育程度：" :span="2">{{params.education}}</data-grid-item>
        <data-grid-item label="毕业学校：" :span="4">{{params.school}}</data-grid-item>
        <data-grid-item label="电子邮箱：" :span="2">{{params.eMail}}</data-grid-item>
        <data-grid-item label="身份证号：" :span="4">{{params.idCardNumber}}</data-grid-item>
        <data-grid-item label="证件有效期：" :span="2">{{params.idCardValidityPeriod}}</data-grid-item>
        <data-grid-item label="发证机关：" :span="4">{{params.idCardIssuingAuthority}}</data-grid-item>
        <data-grid-item label="身份证地址：" :span="10">{{params.idCardAddress}}</data-grid-item>
        <data-grid-item label="现居住地址：" :span="10">{{params.homeAddress}}</data-grid-item>
        <data-grid-item label="居住地家庭座机：" :span="2" width="200px">{{params.homePhone}}</data-grid-item>
        <data-grid-item label="本市生活时长：" :span="2">{{params.liveTime}}</data-grid-item>
        <data-grid-item label="现居住生活时长：" :span="2">{{params.nowLiveTime}}</data-grid-item>
        <data-grid-item label="居住地电费账号：" :span="2">{{params.electricityName}}</data-grid-item>
        <data-grid-item label="居住地电费密码：" :span="2">{{params.electricityPsw}}</data-grid-item>
        <template v-for="item of params.customerAssetss">
          <data-grid-item label="本市房产状况：" :span="2">{{params.assetsType}}</data-grid-item>
          <data-grid-item label="房产归属：" :span="2">{{item.houseOwner}}</data-grid-item>
          <data-grid-item label="房产性质：" :span="2">{{item.houseProperty}}</data-grid-item>
          <data-grid-item label="已购年限：" :span="2">{{item.houseYears}}</data-grid-item>
          <data-grid-item label="房贷余额(元)：" :span="2">{{item.mortgageBalance}}</data-grid-item>
          <data-grid-item label="房产地址：" :span="10">{{item.houseAddress}}</data-grid-item>
          <data-grid-item label="中介姓名：" :span="2">{{item.mediationName}}</data-grid-item>
          <data-grid-item label="中介手机号：" :span="2">{{item.agentPhone}}</data-grid-item>
          <data-grid-item label="征信账号：" :span="2">{{params.creditNo}}</data-grid-item>
          <data-grid-item label="征信密码：" :span="2">{{params.creditPwd}}</data-grid-item>
          <data-grid-item label="征信验证码：" :span="2">{{params.creditCode}}</data-grid-item>
        </template>
      </data-grid>
      <el-col class="text-left data-grid-title" style="float:none">
        <span></span>
        <span>车产信息</span></el-col>
      <data-grid :totalSpan="10" v-for="Vehicles of params.customerVehicles" :key="Vehicles.licensePlate" iconClass="icon" :labelWidth="100" labelAlign="right" contentAlign="left">
        <data-grid-item label="本人名下车产：" :span="2">{{Vehicles.vehicleProperty}}</data-grid-item>
        <data-grid-item label="车牌号：" :span="2">{{Vehicles.licensePlate}}</data-grid-item>
        <data-grid-item label="购车价格(万元)：" :span="2">{{Vehicles.vehicleAmomt}}</data-grid-item>
        <data-grid-item label="车辆类型：" :span="2">{{Vehicles.vehicleType}}</data-grid-item>
        <data-grid-item label="二手车(是/否)：" :span="2">{{Vehicles.isSecondHand}}</data-grid-item>
        <data-grid-item label="初次登记时间：" :span="2">{{Vehicles.registerTime}}</data-grid-item>
        <data-grid-item label="抵押登记次数：" :span="2">{{Vehicles.mortgageNum}}</data-grid-item>
        <data-grid-item label="车身颜色：" :span="4">{{Vehicles.vehicleColor}}</data-grid-item>
        <data-grid-item label="保险单：" :span="2">{{Vehicles.policyType}}</data-grid-item>
        <data-grid-item label="购买方式：" :span="2">{{Vehicles.buyType}}</data-grid-item>
        <data-grid-item label="车辆贷款方式：" :span="8">{{Vehicles.loanType}}</data-grid-item>
      </data-grid>
      <data-grid label="单位信息" iconClass="icon" :labelWidth="100" labelAlign="right" contentAlign="left">
        <data-grid-item label="单位名称：" :span="3">{{params.customerJobInformation.employer}}</data-grid-item>
        <data-grid-item label="部门：" :span="3">{{params.customerJobInformation.department}}</data-grid-item>
        <data-grid-item label="职务：" :span="3">{{params.customerJobInformation.position}}</data-grid-item>
        <data-grid-item label="职级：" :span="3">{{params.customerJobInformation.rank}}</data-grid-item>
        <data-grid-item label="单位性质：" :span="3">{{params.customerJobInformation.companyNature}}</data-grid-item>
        <data-grid-item label="单位规模：" :span="3">{{params.customerJobInformation.companyScale}}</data-grid-item>
        <data-grid-item label="何时进入公司：" :span="3">{{params.customerJobInformation.entryTime}}</data-grid-item>
        <data-grid-item label="现单位工作年限：" :span="3">{{params.customerJobInformation.workYear}}</data-grid-item>
        <data-grid-item label="单位固定电话：" :span="3">{{params.customerJobInformation.companyPhone}}</data-grid-item>
        <data-grid-item label="单位地址：" :span="9">{{params.customerJobInformation.address}}</data-grid-item>
        <data-grid-item label="所属行业：" :span="3">{{params.customerJobInformation.industry}}</data-grid-item>
        <data-grid-item label="单位成立时间：" :span="3">{{params.customerJobInformation.companyCreateTime}}</data-grid-item>
        <data-grid-item label="基本月薪(元)：" :span="3">{{params.customerJobInformation.monthSalary}}</data-grid-item>
        <data-grid-item label="每月发薪日：" :span="3">{{params.customerJobInformation.payDay}}</data-grid-item>
      </data-grid>
      <data-grid label="收支状况" iconClass="icon" :labelWidth="100" labelAlign="right" contentAlign="left">
        <data-grid-item label="年收入(万元)：" :span="3">{{params.customerRevenueAndExpenditure.annualIncome}}</data-grid-item>
        <data-grid-item label="每月工作收入(元)：" :span="3">{{params.customerRevenueAndExpenditure.monthIncome}}</data-grid-item>
        <data-grid-item label="每月其他收入(元)：" :span="3">{{params.customerRevenueAndExpenditure.monthOtherIncome}}</data-grid-item>
        <data-grid-item label="月均支出(元)：" :span="3">{{params.customerRevenueAndExpenditure.monthExpenditure}}</data-grid-item>
        <data-grid-item label="社保账号：" :span="3">{{params.customerRevenueAndExpenditure.socialSecurityAccount}}</data-grid-item>
        <data-grid-item label="社保密码：" :span="3">{{params.customerRevenueAndExpenditure.socialSecurityPassword}}</data-grid-item>
        <data-grid-item label="公积金账号：" :span="3">{{params.customerRevenueAndExpenditure.providentAccount}}</data-grid-item>
        <data-grid-item label="公积金密码：" :span="3">{{params.customerRevenueAndExpenditure.providentPassword}}</data-grid-item>
        <data-grid-item label="供养人数：" :span="3">{{params.customerRevenueAndExpenditure.dependentsNumber}}</data-grid-item>
        <data-grid-item label="收入来源说明：" :span="9">{{params.customerRevenueAndExpenditure.incomeDescription}}</data-grid-item>
      </data-grid>
      <el-col class="text-left data-grid-title" style="float:none">
        <span></span>
        <span>联系人信息</span></el-col>
      <el-table :data="params.customerContacts">
        <el-table-column prop="relation" label="关系" width="180" align="center">
          <template scope="scope">
            <el-col type="text" size="small" class="item">{{scope.row.relation | typeCodeConvert('0034')}}</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="contactName" label="姓名" width="180" align="center">
        </el-table-column>
        <el-table-column prop="contactIDCard" label="身份证号" align="center">
        </el-table-column>
        <el-table-column prop="contactPhone" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="contactInfoTelNo" label="固定电话" align="center">
        </el-table-column>
        <el-table-column prop="contactInfoIsKnow" label="是否知晓此项借款(是/否)" align="center">
        </el-table-column>
        <el-table-column prop="contactEmployer" label="工作单位" align="center">
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<script>
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'
  import server from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'case-origin-info',
    data() {
      return {
        // 服务接口列表
        servers: {
          customerbasicInformation: server.RepairManage.Customer_information_case
        },
        // 定义请求参数
        params: {
          depositPro: '',
          depositCity: '',
          depositBank: '',
          depositBankBra: '',
          cardNumber: '',
          custName: '',
          sex: '',
          custMobile: '',
          wechat: '',
          qq: '',
          marital: '',
          education: '',
          school: '',
          eMail: '',
          idCardNumber: '',
          idCardValidityPeriod: '',
          idCardIssuingAuthority: '',
          idCardAddress: '',
          homeAddress: '',
          homePhone: '',
          liveTime: '',
          nowLiveTime: '',
          electricityName: '',
          electricityPsw: '',
          assetsType: '',
          houseOwner: '',
          houseProperty: '',
          houseYears: '',
          mortgageBalance: '',
          houseAddress: '',
          mediationName: '',
          agentPhone: '',
          creditNo: '',
          creditPwd: '',
          creditCode: '',
          customerBankInfo: [],
          customerJobInformation: [],
          customerRevenueAndExpenditure: []
        },
        multipleSelection: []
      }
    },
    methods: {
      refresh(custId) {
        net.send({
          server: server.RepairManage.Customer_information_case,
          data: {},
          append: [
            custId
          ]
        }).then((data) => {
          // 更新数据信息
          if (!data.customerBankInfo) {
            data.customerBankInfo = {}
          }
          if (!data.customerJobInformation) {
            data.customerJobInformation = {}
          }
          if (!data.customerRevenueAndExpenditure) {
            data.customerRevenueAndExpenditure = {}
          }
          this.params = data
        }, err => {
          console.log(err)
        })
      }
    },
    components: {
      DataGrid,
      DataGridItem
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .frame {
    padding: 10px;
    border: 1px solid #ddd;
  }

</style>

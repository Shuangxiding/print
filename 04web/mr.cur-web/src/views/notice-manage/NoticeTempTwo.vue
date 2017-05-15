<template>
  <div>
    <div class="m2_template2">
      <p class="m2_header">催 收 贷 款 通 知 单</p>
      <table class="m2_tm2">
        <tr>
          <td class="m2_t1">案件编号</td>
          <td class="m2_t2"></td>
        </tr>
        <tr>
          <td class="m2_t1">逾期天数</td>
          <td class="m2_t2"></td>
        </tr>
        <tr>
          <td class="m2_t1">债务人</td>
          <td class="m2_t2"></td>
        </tr>
        <tr>
          <td class="m2_t1">应还金额</td>
          <td class="m2_t2"></td>
        </tr>
        <tr class="m2_t3">
          <td colspan="2">
            <div>
              <p class="m2_care">注意事项:</p>
              <p class="m2_careContent">
                <span> 1. &nbsp;请在收到此通知单后立即无条件按照合同约定时间履行所承担的还款/担保责 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;任，清偿所欠本金、利息和罚息。</span></br>
                <span> 2. &nbsp;如不能按期支付，我公司将寻求法律途径催收解决，届时可能对您/贵公司造成 &nbsp;&nbsp; &nbsp; &nbsp;不良影响；</span></br>
                <span> 3. &nbsp;债务人在收到催收单后，应在送达回执上签名或盖章。</span>
              </p>
              <p class="m2_date">年&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;月&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;日</p>
              <p class="m2_seal">(印章)</p>
            </div>
          </td>
        </tr>
      </table>
      <div class="m2_last">本联送到债务人</div>
    </div>
  </div>
</template>
<style>
  /*设置全局字体大小和颜色*/

  .m2_template2 {
    font-size: 16px;
    color: black;
    width: 700px;
    margin: 0 auto;
  }

  .m2_header {
    font-size: 22px;
    padding-bottom: 10px;
    font-weight: bold;
    color: black;
  }

  .m2_tm2 {
    width: 700px;
    border: 0px;
  }

  .m2_tm2 td {
    border: 1px solid black;
    height: 50px;
  }
  /*设置行的第一列的样式*/

  .m2_t1 {
    width: 200px;
    padding: 0px 10px;
    text-align-last: justify
  }

  .m2_t3 {
    height: 650px;
    vertical-align: text-top;
  }
  /*注意事项样式设置*/

  .m2_care {
    text-align: left;
    padding-left: 60px;
    padding-top: 40px;
  }

  .m2_careContent {
    text-align: left;
    padding-left: 80px;
    line-height: 40px;
  }
  /*日期设置样式*/

  .m2_date {
    text-align: right;
    padding-top: 120px;
    padding-right: 120px;
  }

  .m2_seal {
    text-align: right;
    padding-right: 160px;
  }

  .m2_last {
    text-align: left;
    padding-left: 20px;
  }

</style>

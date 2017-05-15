<template>
  <div class="page">
    <div id="m1-print-area">
      <p class="m1-title">贷 后 催 收 通 知 单</p>
      <div>
        <p class="m1-indent2m-left">
          <span class="m1-name-unline"></span>
          <span>:</span>
        </p>
        <p class="m1-indent2m-left m1-align-both m1-line-height">
          <span>你案件编号为</span>
          <span class="m1-casenum-unline"></span>
          <span>的借款合同本期应还款额</span>
          <span class="m1-money-unline"></span>
          <span>元，已还款额</span>
          <span class="m1-money-unline"></span>
          <span>元，现已逾期</span>
          <span class="m1-day-unline"></span>
          <span>天。请你务必积极筹措资金，按照合约约定，进行本息还款。</span>
        </p>
        <p class="m1-hereby">
          特此通知！
        </p>
        <p class="m1-indent2m-left m1-sign">
          <span>贷款人（单位）:</span>
          <span class="m1-officer"> 催收员:</span>
        </p>
        <p class="m1-date1-pos">
          <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>年
          <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>月
          <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>日
        </p>
      </div>
      <hr style="border:1px dashed">
      <div>
        <p class="m1-indent2m-left"> 本通知我已接到。</p>
        <p class="m1-indent2m-left m1-sign">
          <span>借款人: </span>
          <span class="m1-real">签收人：</span>
        </p>
        <p class="m1-date2-pos">
          <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>年
          <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>月
          <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>日
        </p>
      </div>
      <p class="m1-remark" :class="{'m1-indent2m-left':flag}">
        注：本通知书一式两份，借款人、贷款方各留一份。
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'notice-temp-one',
    data() {
      return {
        flag: true
      }
    },
    methods: {
      // 测试在另一页面修改此组件样式
      changeStyle() {
        this.flag = false
      }
    }
  }

</script>

<style>
  /*全局字体大小、颜色*/

  #m1-print-area {
    width: 700px;
    margin: 0 auto;
    font-size: 16px;
    color: black;
  }
  /*标题*/

  .m1-title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }
  /*段落居左并缩进2个字符*/

  .m1-indent2m-left {
    text-align: left;
    text-indent: 2em;
  }
  /*文字两端对齐*/

  .m1-align-both {
    text-align: justify;
  }
  /*下划线设置*/

  .m1-casenum-unline {
    display: inline-block;
    text-align: left;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 180px;
  }

  .m1-money-unline {
    display: inline-block;
    text-align: left;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 150px;
  }

  .m1-day-unline {
    display: inline-block;
    text-align: left;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 60px;
  }

  .m1-name-unline {
    display: inline-block;
    text-align: left;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 180px;
  }
  /*特此通知单的位置*/

  .m1-hereby {
    text-align: right;
    padding: 20px 100px 0px 0px;
  }

  .m1-sign {
    padding: 20px 0px 80px 0px;
  }

  .m1-officer {
    padding-left: 220px;
    padding-bottom: 80px;
  }

  .m1-real {
    padding-left: 280px;
    padding-bottom: 80px;
  }
  /*时间的位置*/

  .m1-date1-pos {
    text-align: right;
    padding-right: 80px;
  }

  .m1-date2-pos {
    text-align: right;
    padding-right: 80px;
  }

  .m1-line-height {
    line-height: 32px;
  }
  /*备注*/

  .m1-remark {
    font-size: 14px;
    margin: 0px;
  }

  @media print {
    .m1-title {
      font-size: 32px!important;
      font-weight: bold;
    }
  }

</style>

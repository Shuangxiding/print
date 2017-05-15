<template>
  <div class="page">
    <div id="m3_print_area" class="m3_print_area">
      <p class="m3_topic"><b>催 收 贷 款 通 知 单</b></p>
      <p class="m3_borrow">借款人：
        <span class="m3 unline bor">{{PrintInfo.custName}}</span>
      </p>
      <p class="m3_mainbody">根据编号为
        <span class="m3 unline cod">{{PrintInfo.cupoCasenum}}</span> 的案件所示，您向我司借款
        <span class="m3 unline mon">{{PrintInfo.cupoContnum}}元</span> 。由于此笔贷款现处于逾期还款状态，截止目前已逾期
        <span class="m3 unline day">{{PrintInfo.cupoOverday}}天</span>，并对我司的正常经营活动造成较大影响。为避免更加不利的局面发生，也为维系您与我司的合作关系，我司特此就有关事宜致函于您。请您抓紧落实还款资金，于接到本通知之日起 7个工作日内清偿所欠本息，否则我司将按合同约定和法律规定追究违约责任。 </p>
      <p class="m3_inform" style="padding-left: 2em;">特此通知</p>
      <p class="m3_cachet">（公章）</p>
      <p class="m3_time"> &nbsp;&nbsp;&nbsp;&nbsp; 年 &nbsp;&nbsp;&nbsp;&nbsp; 月 &nbsp;&nbsp;&nbsp;&nbsp; 日</p>
      <p>-----------------------------------------------------------------------------------------------------</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'notice-temp-three',
    data: {
      return: {}
    },
    computed: {
      ...mapState({
        PrintInfo: state => state.noticeManage.Print_info
      })
    },
    methods: {
      ...mapMutations([
        'updatePrintInfo'
      ])
    }
  }

</script>
<style scoped>
  /*全局设置*/

  .m3_print_area {
    align-content: center;
    width: 700px;
    font-size: 16px;
    line-height: 200%;
    margin: auto;
    color: black;
  }
  /*标题*/

  .m3_topic {
    text-align: center;
    font-size: 22px;
  }
  /*借款人*/

  .m3_borrow {
    text-align: left;
  }
  /*正文*/

  .m3_mainbody {
    text-indent: 2em;
    text-align: justify;
    word-wrap: break-word;
  }
  /*特此通知*/

  .m3_inform {
    text-align: left;
    text-indent: 2em;
  }
  /*公章*/

  .m3_cachet {
    padding-top: 20px;
    text-align: right;
    padding-right: 15%;
    padding-bottom: 30px;
  }
  /*年月日*/

  .m3_time {
    padding-right: 20px;
    text-align: right;
    padding-right: 10%;
  }
  /*下划线设置*/

  .unline {
    display: inline-block;
    text-align: center;
    line-height: 16px;
    border-bottom: 1px solid black;
  }

  .bor {
    width: 120px;
  }

  .cod {
    width: 180px;
  }

  .mon {
    width: 150px;
  }

  .day {
    width: 80px;
  }


  @media print {}

</style>

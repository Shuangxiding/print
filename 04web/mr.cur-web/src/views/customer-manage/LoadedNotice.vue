<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <template>
          <div>
            <div id="m1-print-area">
              <p class="m1-noticenum">
                <span>通知单编号：</span>
                <span class="m1-noticenum-unline" ref="m1-notice">NO.20174544778</span>
              </p>
              <p class="m1-title">贷 后 催 收 通 知 单</p>
              <table class="m1-table">
                <tr>
                  <td colspan="2">
                    <div>
                      <p class="m1-indent2m-left">
                        <span class="m1-name-unline">李先生</span>
                        <span>:</span>
                      </p>
                      <p class="m1-indent2m-left m1-align-both">
                        <span>你（单位）于</span>
                        <span class="m1-date-unline">2000</span>
                        <span>年</span>
                        <span class="m1-date-unline">03</span>
                        <span>月</span>
                        <span class="m1-date-unline">04</span>
                        <span>日在我机构贷款</span>
                        <span class="m1-money-unline">1000000元</span>
                        <span>，该笔贷款于</span>
                        <span class="m1-date-unline">2005</span>
                        <span>年</span>
                        <span class="m1-date-unline">09</span>
                        <span>月</span>
                        <span class="m1-date-unline">08</span>
                        <span>日到期，截止目前仍欠贷款本金</span>
                        <span class="m1-money-unline">1000000元</span>
                        <span>，利息</span>
                        <span class="m1-money-unline">13455.00元</span>
                        <span>。请你（单位）积极组织资金，按合同约定，到期偿还全部贷款本息。</span>
                      </p>
                      <p class="m1-indent2m-left">
                        上述贷款本息，由担保人继续承担连带还款责任。
                      </p>
                      <p class="m1-hereby">
                        特此通知！
                      </p>
                      <p class="m1-indent2m-left m1-chapter">
                        贷款人（公章）:
                      </p>
                      <p class="m1-indent2m-left m1-chapter">
                        <span>法人代表（签章）:</span>
                        <span class="m1-officer"> 信贷员:</span>
                      </p>
                      <p class="m1-date1-pos">
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>年
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>月
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>日
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="m1-indent2m-left"> 本通知我已接到。</p>
                      <p class="m1-indent2m-left m1-chapter">
                        <span>借款人: </span>
                        <span class="m1-real">（公）章</span>
                      </p>
                      <p class="m1-indent2m-left">签收人:</p>
                      <p class="m1-date2-pos">
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>年
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>月
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>日
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p class="m1-indent2m-left"> 本通知我已接到。</p>
                      <p class="m1-indent2m-left m1-chapter">
                        <span>担保人: </span>
                        <span class="m1-real">（公）章</span>
                      </p>
                      <p class="m1-indent2m-left">签收人:</p>
                      <p class="m1-date2-pos">
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>年
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>月
                        <span> &nbsp; &nbsp; &nbsp; &nbsp; </span>日
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              <p class="m1-indent2m-left m1-remark">
                注：本通知书一式三份，借款人、担保人、贷款方各留一份。
              </p>
            </div>

            <div class="m1-button">
              <el-button @click="m1PrintClick()">打印</el-button>
              <el-button @click="m1FillDataClick()">填写数据</el-button>
              <el-button @click="m1PrintDataClick()">打印数据</el-button>
            </div>

            <el-dialog title="通知单数据录入" v-model="m1FillDataClickHandle" size="small">
              <data-fill-form ref="DataFillForm"></data-fill-form>
            </el-dialog>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">模板类型</template>
        <el-menu-item index="1-1">模板一</el-menu-item>
        <el-menu-item index="1-2">模板二</el-menu-item>
        <el-menu-item index="1-3">模板三</el-menu-item>
      </el-submenu>
    </el-menu>
    <div>
      <notice></notice>
    </div>
  </div>
</template>
<script>
  // import printJS from 'print.js/src/index.js'
  import Notice from '@/views/customer-manage/Notice'
  export default {
    name: 'loaded-notice',
    methods: {
      // m1FillDataClick() {
      //   console.log('m1FillDataClick()')
      // },
      // // 打印
      // m1PrintClick() {
      //   console.log('m1PrintClick()')
      //   printJS('m1-print-area', 'html')
      // }
    },
    components: {
      Notice
    }
  }

</script>
<style scoped>
  /*全局字体大小、颜色*/

  #m1-print-area {
    width: 700px;
    margin: 0 auto;
    font-size: 16px;
    color: black;
  }
  /*通知单编号*/

  .m1-noticenum {
    font-size: 14px;
    text-align: right;
  }
  /*标题*/

  .m1-title {
    font-size: 22px;
    font-weight: bold;
  }
  /*table tr td 实现、黑色、大小*/

  .m1-table {
    line-height: 180%;
    border: 0px;
    width: 700px;
    margin: 0 auto;
  }

  .m1-table td {
    border: 1px solid black;
  }
  /*table内文字和table间距*/

  .m1-table td {
    padding: 10px
  }
  /*段落居左并缩进2个字符*/

  .m1-indent2m-left {
    text-align: left;
    text-indent: 2em;
  }
  /*下划线设置*/

  .m1-noticenum-unline {
    display: inline-block;
    text-align: center;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 180px;
  }

  .m1-date-unline {
    display: inline-block;
    text-align: center;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 60px;
  }

  .m1-money-unline {
    display: inline-block;
    text-align: center;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 180px;
  }

  .m1-name-unline {
    display: inline-block;
    text-align: center;
    line-height: 16px;
    border-width: 1px;
    border-bottom-style: solid;
    width: 180px;
  }
  /*文字两端对齐*/

  .m1-align-both {
    text-align: justify;
  }
  /*特此通知单的位置*/

  .m1-hereby {
    text-align: right;
    padding-top: 20px;
    padding-right: 100px;
  }
  /*需要公章的地方*/

  .m1-chapter {
    margin-bottom: 80px;
  }

  .m1-real {
    padding-left: 80px;
  }
  /*信贷员位置*/

  .m1-officer {
    padding-left: 200px;
  }
  /*时间的位置*/

  .m1-date1-pos {
    text-align: right;
    padding-right: 80px;
  }

  .m1-date2-pos {
    text-align: right;
    padding-right: 40px;
  }
  /*备注*/

  .m1-remark {
    font-size: 14px;
    margin: 0px;
  }
  /*按钮*/

  .m1-button {
    margin-top: 15px;
  }

  @media print {
    .m1-noticenum {
      font-size: 14px;
      text-align: right;
    }
  }

</style>

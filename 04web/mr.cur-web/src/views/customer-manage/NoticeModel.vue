<template>
  <div>
    <div class="" id="model_model_3" style="text-align:center;width:750px;margin:auto">

      <!--通知单编号START-->
      <p class="" id="" style="width: 100%;line-height: 200%;text-align: right;padding-top: 10px;">
        通知单编号：_______________________
      </p>
      <!--通知单编号END-->

      <!--标题START-->
      <div class="" id="" style="font-size: 24px;line-height: 200%;text-align:center;">
        <span class="" id=""><b><u>贷 款 催 收 通 知 单</u></b></span>
      </div>
      <!--标题END-->

      <!--内容START-->
      <table class="" id="" cellpadding="10px" border="1" cellspacing="0" style="margin: auto;width: 100%;table-layout: fixed;">
        <tr>
          <td colspan="2" style="padding: 20px;">
            <div class="" id="" style="line-height: 230%;text-align: left;">
              <p class="" id=""> ____________ (借款人)：</p>

              <p class="" id=""> ____________ (担保人)：</p>
            </div>
            <p class="" id="" style="text-indent: 2em;text-align: justify;line-height: 230%;word-wrap: break-word;">
              借款人 ____________ 于 ________ 年 _____ 月 _____ 日向我司借款 _________________ ，用于 _________________________________，由担保人 ____________ 提供担保，承担担保责任。此贷款已于 ________ 年 _____ 月 _____ 日到期，现尚欠贷款本金 _________________，利息 _________________，请抓紧筹集资金及时归还贷款本息，否则，我司将按合同约定和法律规定追究违约责任。
            </p>
            <p class="" id="" style="text-align: left;text-indent:2em;line-height:230%;">特此通知。</p>
            <p class="" id="" style="padding-left: 75%;padding-bottom: 80px;padding-top: 50px;">(公章)</p>
            <p></p>
            <div class="" id="" style="padding-right: 20px;text-align: right;">
              <span id="">  &nbsp; &nbsp; &nbsp; &nbsp; </span>年
              <span id="">  &nbsp; &nbsp; &nbsp; &nbsp; </span>月
              <span id="">  &nbsp; &nbsp; &nbsp; &nbsp; </span>日
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p class="" id="" style="text-indent: 2em;text-align: justify;line-height: 230%;word-wrap: break-word;">
              以上通知已收悉，经核对无误。本人保证积极筹措资金，尽快偿还贷款本息,并愿承担合同约定和法律规定的责任。
            </p>
            <p class="" id="" style="padding-top: 20px;padding-left: 45%;line-height: 240%;padding-bottom: 70px;">借款人签章:</p>
            <div class="" id="" style="padding-right: 20px;text-align: right;">
              <span id="">  &nbsp; &nbsp; &nbsp; &nbsp;  </span>年
              <span id="">  &nbsp; &nbsp; &nbsp; &nbsp;  </span>月
              <span id="">  &nbsp; &nbsp; &nbsp; &nbsp;  </span>日
            </div>
          </td>
          <td style="padding: 20px;">
            <p class="" id="" style="text-indent: 2em;text-align: justify;line-height: 230%;word-wrap: break-word;">
              以上通知已收悉，经核实无误。本人将积极督促借款人及时归还贷款，并愿承担按合同约定和法律规定的担保责任。
            </p>
            <p class="" id="" style="padding-top: 20px;padding-left: 45%;line-height: 240%;padding-bottom: 70px;">担保人签章：</p>
            <div class="" id="" style="padding-right: 20px;text-align: right;">
              <span id=""> &nbsp; &nbsp; &nbsp; &nbsp; </span>年
              <span id=""> &nbsp; &nbsp; &nbsp; &nbsp; </span>月
              <span id=""> &nbsp; &nbsp; &nbsp; &nbsp; </span>日
            </div>
          </td>
        </tr>
      </table>
      <!--内容END-->

      <!--备注区START-->
      <div class="m3_end" style="text-align: left;padding-left: 20px;padding-bottom: 20px;font-size: 14px;">
        注：本通知书一式三份，借款人、担保人、贷款方各留一份。
      </div>
      <!--备注区END-->
    </div>

    <!--按钮区START-->
    <div class="m3-button">
      <el-button @click="m3PrintClick()">打印</el-button>
      <el-button @click="m3FillDataClick()">填写数据</el-button>
      <el-button @click="m3PrintDataClick()">打印数据</el-button>
    </div>
    <!--按钮区END-->

    <el-dialog title="填写数据" v-model="dataFillFormClickHandle" size="small">
      <data-fill-form ref="DataFillForm"></data-fill-form>
    </el-dialog>

  </div>
</template>


<script>
  import printJS from 'print.js/src/index.js'
  import DataFillForm from '@/views/customer-manage/DataFillForm'

  export default {
    data: {
      return: {
        dataFillFormClickHandle: false
      }
    },
    methods: {
      m3PrintClick() {
        printJS('model_model_3', 'html')
      },
      m3FillDataClick() {
        this.dataFillFormClickHandle = true
      }
    },
    components: {
      DataFillForm
    }
  }

</script>

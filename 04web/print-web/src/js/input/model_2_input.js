//    填写数据完成后，单击确认并预览触发单击事件
function m2_confirmAndPreview() {
    //  应还金额
    var mon = $("#model_money").prev().text() + $("#model_money").val() + $("#model_money").next().text();
    // 通知单编号
    var m2_noticenum = $("#memo_number").val();
    // 案件编号
    var m2_caseNumber = $("#model_casenum").val();
    // 催收理由
    var m2_caseReason = $("#model_reason").val();
    // 借款人
    var m2_borrower = $("#model2_borrower").val();
    // 住址或工作单位
    var m2_place = $("#model_address").val();
    // 联系人
    var m2_contrat = $("#model_contrat").val();
    // 联系电话
    var m2_phone = $("#model_phone").val();
    // 最晚还款日
    var m2_date = $("#model_maturity").val();
    // 验证输入框内容，如果为空不允许确认
    if (mon === null || mon === '' ||
        m2_noticenum === null || m2_noticenum === '' ||
        m2_caseNumber === null || m2_caseNumber === '' ||
        m2_caseReason === null || m2_caseReason === '' ||
        m2_borrower === null || m2_borrower === '' ||
        m2_place === null || m2_place === '' ||
        m2_contrat === null || m2_contrat === '' ||
        m2_phone === null || m2_phone === '' ||
        model_maturity === null || model_maturity === '') {
        alert("输入数据不能为空！");
        return;

    }
    $("#m2_noticenum_span").text(m2_noticenum);
    $("#m2_caseNumber_span").text(m2_caseNumber);
    $("#m2_caseReason_span").text(m2_caseReason);
    $("#m2_borrower_span").text(m2_borrower);
    $("#m2_address_span").text(m2_place);
    $("#m2_sum_span").text(mon);
    $("#m2_contrat_span").text(m2_contrat);
    $("#m2_phone_span").text(m2_phone);
    // 年月日分别传
    var date = m2_date.split("/");
    $("#m2_arrivalsYear_span").text(date[2]);
    $("#m2_arrivalsMonth_span").text(date[0]);
    $("#m2_arrivalsDay_span").text(date[1]);
    //    填写数据后显示打印数据按钮  
    $("#m2_button_bt").removeClass("m2_btn");
}
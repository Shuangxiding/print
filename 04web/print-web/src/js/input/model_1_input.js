// 点击打印模板事件
function m1_print() {
    console.log("m1_print()");

    // 取消透明度
    $("#m1_noticenum_span1").removeClass("m1_opacity");
    $("#m1_title_span").removeClass("m1_opacity");
    $("#m1_loader_span2").removeClass("m1_opacity");
    $("#m1_p1_span1").removeClass("m1_opacity");
    $("#m1_p1_span3").removeClass("m1_opacity");
    $("#m1_p1_span5").removeClass("m1_opacity");
    $("#m1_p1_span7").removeClass("m1_opacity");
    $("#m1_p1_span9").removeClass("m1_opacity");
    $("#m1_p1_span11").removeClass("m1_opacity");
    $("#m1_p1_span13").removeClass("m1_opacity");
    $("#m1_p1_span15").removeClass("m1_opacity");
    $("#m1_p1_span17").removeClass("m1_opacity");
    $("#m1_p1_span19").removeClass("m1_opacity");
    $("#m1_p2").removeClass("m1_opacity");
    $("#m1_p3").removeClass("m1_opacity");
    $("#m1_lender").removeClass("m1_opacity");
    $("#m1_legal").removeClass("m1_opacity");
    $("#m1_date1").removeClass("m1_opacity");
    $("#m1_confirmtext1").removeClass("m1_opacity");
    $("#m1_borrower").removeClass("m1_opacity");
    $("#m1_signer1").removeClass("m1_opacity");
    $("#m1_date2").removeClass("m1_opacity");
    $("#m1_confirmtext2").removeClass("m1_opacity");
    $("#m1_guarantor").removeClass("m1_opacity");
    $("#m1_signer2").removeClass("m1_opacity");
    $("#m1_date3").removeClass("m1_opacity");
    $("#m1_remark").removeClass("m1_opacity");
    $("#m1_table").removeClass("m1_table_opacity");

    // 显示下划线
    $("#m1_noticenum_span").addClass("m1_show_");
    $("#m1_name").addClass("m1_show_");
    $("#m1_byear").addClass("m1_show_");
    $("#m1_bmonth").addClass("m1_show_");
    $("#m1_bday").addClass("m1_show_");
    $("#m1_bmoney").addClass("m1_show_");
    $("#m1_cyear").addClass("m1_show_");
    $("#m1_cmonth").addClass("m1_show_");
    $("#m1_cday").addClass("m1_show_");
    $("#m1_omoney").addClass("m1_show_");
    $("#m1_ointerest").addClass("m1_show_");
    // 打印
    $(".m1").printArea();
}

// 点击确认并预览按钮事件
function m1_confirmAndPreview() {
    var memo_number = $("#memo_number").val(); // 通知单编号
    var model_borrower = $("#model_borrower").val(); // 借款单位/个人名称
    var model_loandate = $("#model_loandate").val(); // 贷款日期

    var model_loadamount_symbol = $("#model_loadamount").prev().text(); // 贷款金额金钱符号
    var model_loadamount = $("#model_loadamount").val(); // 贷款金额
    var model_loadamount_yuan = $("#model_loadamount").next().text(); // 贷款金额“元”

    var model_maturity = $("#model_maturity").val(); // 贷款到期日期

    var model_principal_symbol = $("#model_principal").prev().text(); // 贷款金额金钱符号
    var model_principal = $("#model_principal").val(); // 至今欠款本金
    var model_principal_yuan = $("#model_principal").next().text(); // 贷款金额“元”

    var model_interest_symbol = $("#model_interest").prev().text(); // 贷款金额金钱符号
    var model_interest = $("#model_interest").val(); // 至今欠款利息
    var model_interest_yuan = $("#model_interest").next().text(); // 贷款金额“元”

    if (memo_number === null || memo_number === '' ||
        model_borrower === null || model_borrower === '' ||
        model_loandate === null || model_loandate === '' ||
        model_loadamount === null || model_loadamount === '' ||
        model_maturity === null || model_maturity === '' ||
        model_principal === null || model_principal === '' ||
        model_interest === null || model_interest === '') {
        alert("录入信息不能存在空值！");
        return;

    }
    // 添加关闭此窗口属性
    $("#m1_button_preview").attr("data-dismiss", "modal");

    $("#m1_noticenum_span").text(memo_number);

    $("#m1_name").text(model_borrower);

    var date = model_loandate.split("/");
    $("#m1_byear").text(date[2]);
    $("#m1_bmonth").text(date[1]);
    $("#m1_bday").text(date[0]);

    $("#m1_bmoney").text(model_loadamount_symbol + model_loadamount + model_loadamount_yuan);

    var date1 = model_maturity.split("/");
    $("#m1_cyear").text(date1[2]);
    $("#m1_cmonth").text(date1[1]);
    $("#m1_cday").text(date1[0]);

    $("#m1_omoney").text(model_principal_symbol + model_principal + model_principal_yuan);

    $("#m1_ointerest").text(model_interest_symbol + model_interest + model_interest_yuan);

    // 显示打印数据按钮
    $("#m1_printdata_button").removeClass("m1_bttton_hide");
}

function m1_print_data() {
    // 打印数据时添加class，用此class控制透明样式
    $("#m1_noticenum_span1").addClass("m1_opacity");
    $("#m1_title_span").addClass("m1_opacity");
    $("#m1_loader_span2").addClass("m1_opacity");
    $("#m1_p1_span1").addClass("m1_opacity");
    $("#m1_p1_span3").addClass("m1_opacity");
    $("#m1_p1_span5").addClass("m1_opacity");
    $("#m1_p1_span7").addClass("m1_opacity");
    $("#m1_p1_span9").addClass("m1_opacity");
    $("#m1_p1_span11").addClass("m1_opacity");
    $("#m1_p1_span13").addClass("m1_opacity");
    $("#m1_p1_span15").addClass("m1_opacity");
    $("#m1_p1_span17").addClass("m1_opacity");
    $("#m1_p1_span19").addClass("m1_opacity");
    $("#m1_p2").addClass("m1_opacity");
    $("#m1_p3").addClass("m1_opacity");
    $("#m1_lender").addClass("m1_opacity");
    $("#m1_legal").addClass("m1_opacity");
    $("#m1_date1").addClass("m1_opacity");
    $("#m1_confirmtext1").addClass("m1_opacity");
    $("#m1_borrower").addClass("m1_opacity");
    $("#m1_signer1").addClass("m1_opacity");
    $("#m1_date2").addClass("m1_opacity");
    $("#m1_confirmtext2").addClass("m1_opacity");
    $("#m1_guarantor").addClass("m1_opacity");
    $("#m1_signer2").addClass("m1_opacity");
    $("#m1_date3").addClass("m1_opacity");
    $("#m1_remark").addClass("m1_opacity");
    $("#m1_table").addClass("m1_table_opacity");

    // 控制不显示块下边框
    $("#m1_noticenum_span").removeClass("m1_show_");
    $("#m1_name").removeClass("m1_show_");
    $("#m1_byear").removeClass("m1_show_");
    $("#m1_bmonth").removeClass("m1_show_");
    $("#m1_bday").removeClass("m1_show_");
    $("#m1_bmoney").removeClass("m1_show_");
    $("#m1_cyear").removeClass("m1_show_");
    $("#m1_cmonth").removeClass("m1_show_");
    $("#m1_cday").removeClass("m1_show_");
    $("#m1_omoney").removeClass("m1_show_");
    $("#m1_ointerest").removeClass("m1_show_");
    // 打印
    $(".m1").printArea();
}
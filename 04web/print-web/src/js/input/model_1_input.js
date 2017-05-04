// 点击打印模板事件
function m1_print() {
    $(".m1").printArea();
}

// 点击确认并预览按钮事件
function m1_confirmAndPreview() {
    var memo_number = $("#memo_number").val(); // 通知单编号
    var model_borrower = $("#model_borrower").val(); // 借款单位/个人名称
    var model_guarantor = $("#model_guarantor").val(); // 担保单位/个人名称
    var model_loandate = $("#model_loandate").val(); // 贷款日期
    var model_loadamount = $("#model_loadamount").val(); // 贷  款金额
    var model_maturity = $("#model_maturity").val(); // 贷款到期日期
    var model_principal = $("#model_principal").val(); // 至今欠款本金
    var model_interest = $("#model_interest").val(); // 至今欠款利息

    if (memo_number != null || memo_number != '') {
        $("#m1_noticenum_span").text(memo_number);
    }
    if (model_borrower != null || model_borrower != '') {
        $("#m1_name").text(model_borrower);
    }
    if (model_guarantor != null || model_guarantor != '') {

    }
    if (model_loandate != null || model_loandate != '') {
        var date = model_loandate.split("/");
        $("#m1_byear").text(date[2]);
        $("#m1_bmonth").text(date[1]);
        $("#m1_bday").text(date[0]);
    }
    if (model_loadamount != null || model_loadamount != '') {
        $("#m1_bmoney").text(model_loadamount);
    }
    if (model_maturity != null || model_maturity != '') {
        var date = model_maturity.split("/");
        $("#m1_cyear").text(date[2]);
        $("#m1_cmonth").text(date[1]);
        $("#m1_cday").text(date[0]);
    }
    if (model_principal != null || model_principal != '') {
        $("#m1_omoney").text(model_principal);
    }
    if (model_interest != null || model_interest != '') {
        $("#m1_ointerest").text(model_interest);
    }
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
    $(".m1").printArea();
}
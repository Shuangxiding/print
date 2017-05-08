// 点击打印模板事件
function m1_print() {
    console.log("m1_print()");

    // 取消透明度
    $(".m1_ra").removeClass("m1_opacity")
    $("#m1_table").removeClass("m1_table_opacity");

    // 显示下划线
    $(".m1_line_ra").addClass("m1_show_")
    // 打印
    $(".m1").printArea();
}

// 点击确认并预览按钮事件
function m1_confirmAndPreview() {
    // 通知单编号
    var memo_number = $("#memo_number").val();
    // 借款单位/个人名称
    var model_borrower = $("#model_borrower").val();
    // 贷款日期
    var model_loandate = $("#model_loandate").val();
    var date = model_loandate.split("/");
    // 贷款金额
    var model_loadamount_symbol = $("#model_loadamount").prev().text();
    var model_loadamount = $("#model_loadamount").val();
    var model_loadamount_yuan = $("#model_loadamount").next().text();
    // 贷款到期日期
    var model_maturity = $("#model_maturity").val();
    var date1 = model_maturity.split("/");
    // 至今欠款本金
    var model_principal_symbol = $("#model_principal").prev().text();
    var model_principal = $("#model_principal").val();
    var model_principal_yuan = $("#model_principal").next().text();
    // 至今欠款利息
    var model_interest_symbol = $("#model_interest").prev().text();
    var model_interest = $("#model_interest").val();
    var model_interest_yuan = $("#model_interest").next().text();
    // 简单判断，数据为空时不能预览（后面做修改）
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
    // 填值
    $("#m1_noticenum_span").text(memo_number);
    $("#m1_name").text(model_borrower);
    $("#m1_byear").text(date[2]);
    $("#m1_bmonth").text(date[1]);
    $("#m1_bday").text(date[0]);
    $("#m1_bmoney").text(model_loadamount_symbol + model_loadamount + model_loadamount_yuan);
    $("#m1_cyear").text(date1[2]);
    $("#m1_cmonth").text(date1[1]);
    $("#m1_cday").text(date1[0]);
    $("#m1_omoney").text(model_principal_symbol + model_principal + model_principal_yuan);
    $("#m1_ointerest").text(model_interest_symbol + model_interest + model_interest_yuan);
    // 显示打印数据按钮
    $("#m1_printdata_button").removeClass("m1_bttton_hide");
}

// 点击打印数据按钮事件
function m1_print_data() {
    // 打印数据时添加class，用此class控制透明样式
    $(".m1_ra").addClass("m1_opacity")
    $("#m1_table").addClass("m1_table_opacity");

    // 控制不显示块下边框
    $(".m1_line_ra").removeClass("m1_show_")
    // 打印
    $(".m1").printArea();
}
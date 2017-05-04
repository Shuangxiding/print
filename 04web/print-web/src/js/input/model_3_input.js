<<<<<<< HEAD
// 点击打印模板事件
function m3_print() {
    $(".m3").printArea();
}

// 点击确认并预览按钮事件
function m3_confirmAndPreview() {
    $("#m3_ordernum_span").text($("#memo_number").val());
    $("#m3_borrower1").text($("#model_borrower").val());
    $("#m3_surety1").text($("#model_guarantor").val());
    $("#m3_borrower2").text($("#model_borrower").val());
    $("#m3_borrowYear").text($("#model_loandate").val().split("/")[2]);
    $("#m3_borrowMonth").text($("#model_loandate").val().split("/")[1]);
    $("#m3_borrowDay").text($("#model_loandate").val().split("/")[0]);
    $("#m3_money").text($("#model_loadamount").val());
    $("#m3_application").text($("#model_loaduse").val());
    $("#m3_surety2").text($("#model_guarantor").val());
    $("#m3_dueYear").text($("#model_maturity").val().split("/")[2]);
    $("#m3_dueMonth").text($("#model_maturity").val().split("/")[1]);
    $("#m3_dueDay").text($("#model_maturity").val().split("/")[0]);
    $("#m3_capital").text($("#model_principal").val());
    $("#m3_interest").text($("#model_interest").val());

    // 显示打印数据按钮
    $("#m3_printdata_button").removeClass("m3_button_hide");
}

//点击打印数据事件
function m3_print_data() {
    $(".m3_ordernum_span1").addClass("m3_opacity");
    $(".m3_title_span").addClass("m3_opacity");
    $(".m3_table").addClass("m3_table_opacity");
    $(".m3_unpri").addClass("m3_opacity");
    $("#m3_content_notice").addClass("m3_opacity");
    $("#m3_content_text1").addClass("m3_opacity");
    $("#m3_content_text2").addClass("m3_opacity");
    $(".m3_content_section2").addClass("m3_opacity");
    $(".m3_content_section3").addClass("m3_opacity");
    $(".m3_content_sign").addClass("m3_opacity");
    $(".m3_end").addClass("m3_opacity")
    $(".m3").printArea();
}
=======
>>>>>>> 58b3b7ad3f616f1d1f10a2f7e22dd93687f70b94

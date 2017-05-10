// 点击打印模板事件
function m3_print() {
    $(".m3_ordernum_span1").removeClass("m3_opacity");
    $(".m3_title_span").removeClass("m3_opacity");
    $(".m3_table").removeClass("m3_table_opacity");
    $(".m3_unpri").removeClass("m3_opacity");
    $("#m3_content_notice").removeClass("m3_opacity");
    $("#m3_content_text1").removeClass("m3_opacity");
    $("#m3_content_text2").removeClass("m3_opacity");
    $(".m3_content_section2").removeClass("m3_opacity");
    $(".m3_content_section3").removeClass("m3_opacity");
    $(".m3_content_sign").removeClass("m3_opacity");
    $(".m3_end").removeClass("m3_opacity");
    $("#m3_ordernum_span").removeClass("m3_unline");
    $("#m3_borrower1").removeClass("m3_unline");
    $("#m3_surety1").removeClass("m3_unline");
    $("#m3_borrower2").removeClass("m3_unline");
    $("#m3_borrowYear").removeClass("m3_unline");
    $("#m3_borrowMonth").removeClass("m3_unline");
    $("#m3_borrowDay").removeClass("m3_unline");
    $("#m3_money").removeClass("m3_unline");
    $("#m3_application").removeClass("m3_unline");
    $("#m3_surety2").removeClass("m3_unline");
    $("#m3_dueYear").removeClass("m3_unline");
    $("#m3_dueMonth").removeClass("m3_unline");
    $("#m3_dueDay").removeClass("m3_unline");
    $("#m3_capital").removeClass("m3_unline");
    $("#m3_interest").removeClass("m3_unline");

    $(".m3").printArea();
}

// 点击确认并预览按钮事件
function m3_confirmAndPreview() {
    //通知单编号
    var m3_ordernum = $("#memo_number").val();
    //借款人（标题）
    var m3_borrower1 = $("#model_borrower").val();
    //担保人（标题）
    var m3_surety1 = $("#model_guarantor").val();
    //借款人（正文）
    var m3_borrower2 = $("#model_borrower").val();
    //借款日期
    var m3_byear = $("#model_loandate").val().split("/")[2];
    var m3_bmonth = $("#model_loandate").val().split("/")[1];
    var m3_bday = $("#model_loandate").val().split("/")[0];
    //用途
    var m3_application = $("#model_loaduse").val();
    //担保人（正文）
    var m3_surety2 = $("#model_guarantor").val();
    //还款日期
    var m3_dyear = $("#model_maturity").val().split("/")[2];
    var m3_dmonth = $("#model_maturity").val().split("/")[1];
    var m3_dday = $("#model_maturity").val().split("/")[0];
    //借款金额
    var m3_money = $("#model_loadamount").prev().text() + $("#model_loadamount").val() + $("#model_loadamount").next().text();
    //应还本金
    var m3_capital = $("#model_principal").prev().text() + $("#model_principal").val() + $("#model_principal").next().text();
    //应还利息
    var m3_interest = $("#model_interest").prev().text() + $("#model_interest").val() + $("#model_interest").next().text();

    //输入数据不能为空
    if (m3_ordernum === null || m3_ordernum === '' ||
        m3_borrower1 === null || m3_borrower1 === '' ||
        m3_surety1 === null || m3_surety1 === '' ||
        m3_borrower2 === null || m3_borrower2 === '' ||
        m3_byear === null || m3_byear === '' ||
        m3_bmonth === null || m3_bmonth === '' ||
        m3_bday === null || m3_bday === '' ||
        m3_application === null || m3_application === '' ||
        m3_surety2 === null || m3_surety2 === '' ||
        m3_dyear === null || m3_dyear === '' ||
        m3_dmonth === null || m3_dmonth === '' ||
        m3_dday === null || m3_dday === '' ||
        m3_money === null || m3_money === '' ||
        m3_capital === null || m3_capital === '' ||
        m3_interest === null || m3_interest === '') {
        alert("输入数据不能为空")
        return;
    }
    //填入数据
    $("#m3_ordernum_span").text(m3_ordernum);
    $("#m3_borrower1").text(m3_borrower1);
    $("#m3_surety1").text(m3_surety1);
    $("#m3_borrower2").text(m3_borrower2);
    $("#m3_borrowYear").text(m3_byear);
    $("#m3_borrowMonth").text(m3_bmonth);
    $("#m3_borrowDay").text(m3_bday);
    $("#m3_money").text(m3_money);
    $("#m3_application").text(m3_application);
    $("#m3_surety2").text(m3_surety2);
    $("#m3_dueYear").text(m3_dyear);
    $("#m3_dueMonth").text(m3_dmonth);
    $("#m3_dueDay").text(m3_dday);
    $("#m3_capital").text(m3_capital);
    $("#m3_interest").text(m3_interest);

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
    $(".m3_end").addClass("m3_opacity");
    $("#m3_ordernum_span").addClass("m3_unline");
    $("#m3_borrower1").addClass("m3_unline");
    $("#m3_surety1").addClass("m3_unline");
    $("#m3_borrower2").addClass("m3_unline");
    $("#m3_borrowYear").addClass("m3_unline");
    $("#m3_borrowMonth").addClass("m3_unline");
    $("#m3_borrowDay").addClass("m3_unline");
    $("#m3_money").addClass("m3_unline");
    $("#m3_application").addClass("m3_unline");
    $("#m3_surety2").addClass("m3_unline");
    $("#m3_dueYear").addClass("m3_unline");
    $("#m3_dueMonth").addClass("m3_unline");
    $("#m3_dueDay").addClass("m3_unline");
    $("#m3_capital").addClass("m3_unline");
    $("#m3_interest").addClass("m3_unline");
    $(".m3").printArea();
}

//lodop打印demo
function doprint() {
    if (typeof (LODOP.VERSION) == "undefined") {
        window.open('install.html', '打印控件安装', 'height=100, width=500, top=400, left=400, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
    } else {
        var m3_ordernum = $("#memo_number").val();
        var m3_borrower1 = $("#model_borrower").val();;
        var m3_surety1 = $("#model_guarantor").val();
        var m3_borrower2 = $("#model_borrower").val();
        var m3_byear = $("#model_loandate").val();
        var m3_bmonth = $("#model_loandate").val();
        var m3_bday = $("#model_loandate").val();
        var m3_application = $("#model_loaduse").val();
        var m3_surety2 = $("#model_guarantor").val();
        var m3_dyear = $("#model_maturity").val();
        var m3_dmonth = $("#model_maturity").val();
        var m3_dday = $("#model_maturity").val();
        var m3_money = $("#model_loadamount").prev().text() + $("#model_loadamount").val() + $("#model_loadamount").next().text();
        var m3_capital = $("#model_principal").prev().text() + $("#model_principal").val() + $("#model_principal").next().text();
        var m3_interest = $("#model_interest").prev().text() + $("#model_interest").val() + $("#model_interest").next().text();

        CreatePagePrint(m3_ordernum, m3_borrower1, m3_surety1, m3_borrower2, m3_byear, m3_bmonth, m3_bday, m3_money, m3_application, m3_surety2, m3_dyear, m3_dmonth, m3_dday, m3_capital, m3_interest);
        LODOP.PREVIEW();
    }
}

function CreatePagePrint(m3_ordernum, m3_borrower1, m3_surety1, m3_borrower2, m3_byear, m3_bmonth, m3_bday, m3_money, m3_application, m3_surety2, m3_dyear, m3_dmonth, m3_dday, m3_capital, m3_interest) {
    // LODOP = getLodop();
    // var model_3_style = "<link href='src/css/model/model_3.css' type='text/css' rel='stylesheet'>";
    // var printHtml = model_3_style + "<body>" + document.getElementById("model_model_3").innerHTML + "</body>";
    // console.log(printHtml);
    LODOP.PRINT_INIT("打印一下");
    LODOP.PRINT_INITA(-1, 2, 943, 1063, "model_3_print");
    LODOP.ADD_PRINT_SETUP_BKIMG("lib/css/images/model_3_300dpi.bmp");
    LODOP.SET_SHOW_MODE("BKIMG_LEFT", 0);
    LODOP.SET_SHOW_MODE("BKIMG_TOP", 0);
    LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "216.69mm");
    LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", "296.86mm");
    LODOP.ADD_PRINT_TEXT(35, 576, 162, 25, m3_ordernum);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(143, 82, 75, 30, m3_borrower1);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
    LODOP.ADD_PRINT_TEXT(185, 83, 72, 25, m3_surety1);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(220, 169, 70, 25, m3_borrower2);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(220, 316, 52, 25, m3_byear);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(229, 442, 26, 20, m3_bmonth);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(229, 559, 22, 20, m3_bday);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(259, 89, 131, 25, m3_money);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(262, 352, 200, 25, m3_application);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(295, 83, 70, 25, m3_surety2);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(297, 524, 52, 25, m3_dyear);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(301, 648, 22, 20, m3_dmonth);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(334, 89, 27, 20, m3_dday);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(335, 489, 135, 25, m3_capital);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(368, 76, 126, 25, m3_interest);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    //LODOP.ADD_PRINT_HTM("4%", "4%", "100%", "100%", printHtml);
}
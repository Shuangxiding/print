function preview1() {
    console.log('preview1()')
    localStorage["orderNumber"] = $("#orderNumber").val();
    localStorage["caseNumber"] = $("#caseNumber").val();
    localStorage["caseReason"] = $("#caseReason").val();
    localStorage["borrower"] = $("#borrower").val();
    localStorage["address"] = $("#address").val();
    localStorage["arrivalsYear"] = $("#arrivalsYear").val();
    localStorage["arrivalsMonth"] = $("#arrivalsMonth").val();
    localStorage["arrivalsDay"] = $("#arrivalsDay").val();
    localStorage["sum"] = $("#sum").val();
    localStorage["contrat"] = $("#contrat").val();
    localStorage["phone"] = $("#phone").val();
    localStorage["callYear"] = $("#callYear").val();
    localStorage["callMonth"] = $("#callMonth").val();
    localStorage["callDay"] = $("#callDay").val();
    window.location.href = "../model/model_2.html";
}
// 点击打印数据，实现套打
function m2_preview() {
    $("#m2_num").addClass("opa");
    $("#m2_tle").addClass("opa");
    $("#m2_count").addClass("opa");
    $("#m2_why").addClass("opa");
    $("#m2_person").addClass("opa");
    $("#m2_place").addClass("opa");
    $("#m2_load").addClass("opa");
    $("#year1").addClass("opa");
    $("#month1").addClass("opa");
    $("#day1").addClass("opa");
    $("#m2_money").addClass("opa");
    $("#m2_search").addClass("opa");
    $("#m2_people").addClass("opa");
    $("#m2_mobail").addClass("opa");
    $("#m2_date").addClass("opa");
    $("#m2_seal_data").addClass("opa");
    $("#m2_sea_content").addClass("opa");
    $("#m2_tab").addClass("opata");
    $("#m2_bottom_remark").addClass("opa");
    $("#m2_noticenum_span").addClass("datas");
    $("#m2_caseNumber_span").addClass("datas");
    $("#m2_caseReason_span").addClass("datas");
    $("#m2_borrower_span").addClass("datas");
    $("#m2_address_span").addClass("datas");
    $("#m2_arrivalsYear_span").addClass("datas");
    $("#m2_arrivalsMonth_span").addClass("datas");
    $("#m2_arrivalsDay_span").addClass("datas");
    $("#m2_sum_span").addClass("datas");
    $("#m2_contrat_span").addClass("datas");
    $("#m2_phone_span").addClass("datas");
    $("#m2_noticenum_span").removeClass("m2_noticenum_span");
    $(".m2").printArea();
}
// 点击打印按钮打印模板
function m2_print_all() {
    // 将隐藏的显示出来
    $("#m2_num").removeClass("opa");
    $("#m2_tle").removeClass("opa");
    $("#m2_count").removeClass("opa");
    $("#m2_why").removeClass("opa");
    $("#m2_person").removeClass("opa");
    $("#m2_place").removeClass("opa");
    $("#m2_load").removeClass("opa");
    $("#year1").removeClass("opa");
    $("#month1").removeClass("opa");
    $("#day1").removeClass("opa");
    $("#m2_money").removeClass("opa");
    $("#m2_search").removeClass("opa");
    $("#m2_people").removeClass("opa");
    $("#m2_mobail").removeClass("opa");
    $("#m2_date").removeClass("opa");
    $("#m2_seal_data").removeClass("opa");
    $("#m2_sea_content").removeClass("opa");
    $("#m2_tab").removeClass("opata");
    $("#m2_bottom_remark").removeClass("opa");
    $("#m2_noticenum_span").removeClass("datas");
    $("#m2_caseNumber_span").removeClass("datas");
    $("#m2_caseReason_span").removeClass("datas");
    $("#m2_borrower_span").removeClass("datas");
    $("#m2_address_span").removeClass("datas");
    $("#m2_arrivalsYear_span").removeClass("datas");
    $("#m2_arrivalsMonth_span").removeClass("datas");
    $("#m2_arrivalsDay_span").removeClass("datas");
    $("#m2_sum_span").removeClass("datas");
    $("#m2_contrat_span").removeClass("datas");
    $("#m2_phone_span").removeClass("datas");
    $("#m2_noticenum_span").removeClass("m2_noticenum_span");
    $(".m2").printArea();
}
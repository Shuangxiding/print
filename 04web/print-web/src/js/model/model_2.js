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

function m2_preview() {
    $("#m2_num").addClass("opa");
    $("#m2_tle").addClass("opa");
    $("#m2_count").addClass("opa");
    $("#m2_why").addClass("opa");
    $("#m2_person").addClass("opa");
    $("#m2_place").addClass("opa");
    $("#m2_load").addClass("opa");
    $("#m2_money").addClass("opa");
    $("#m2_search").addClass("opa");
    $("#m2_people").addClass("opa");
    $("#m2_mobail").addClass("opa");
    $("#m2_date").addClass("opa");
    $("#m2_seal_data").addClass("opa");
    $("#m2_sea_content").addClass("opa");
    $("#m2_tab").addClass("opa");
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
    $("#m2_sum_span").addClass("datas");
    $(".m2").printArea();
}

function m2_preview_all() {
    // $("#m2_tle").addClass("real");
    // $("#m2_not").addClass("real");
    // $("#m2_num").addClass("real");
    // $("#m2_con").addClass("real");
    // $("#m2_tab tr td").addClass("real");
    $(".m2").printArea();

}
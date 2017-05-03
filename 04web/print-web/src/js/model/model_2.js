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
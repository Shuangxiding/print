function m3_confirmAndPreview() {
    console.log("m3_confirmAndPreview");
    console.log($("#memo_number").val());
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
}

function m3_print() {
    $(".m3").printArea();
}

// function m3_printdata() {

// }
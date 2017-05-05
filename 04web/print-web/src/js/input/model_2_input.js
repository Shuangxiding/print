   function m2_confirmAndPreview() {
       console.log("m2_confirmAndPreview");
       $("#m2_noticenum_span").text($("#memo_number").val());
       $("#m2_caseNumber_span").text($("#model_casenum").val());
       $("#m2_caseReason_span").text($("#model_reason").val());
       $("#m2_borrower_span").text($("#model2_borrower").val());
       $("#m2_address_span").text($("#model_address").val());
       $("#m2_sum_span").text($("#model_money").val());
       $("#m2_contrat_span").text($("#model_contrat").val());
       $("#m2_phone_span").text($("#model_phone").val());
       $("#m2_arrivalsYear_span").text($("#model_maturity").val().split("/")[2]);
       $("#m2_arrivalsMonth_span").text($("#model_maturity").val().split("/")[0]);
       $("#m2_arrivalsDay_span").text($("#model_maturity").val().split("/")[1]);
       $("#m2_button_bt").removeClass("m2_btn");
   }
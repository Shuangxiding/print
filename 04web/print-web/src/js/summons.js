function HtmlToPdf() {
    var map = new Object();
    map.courtName = $("#company").text();
    map.company = $("#courtName").text();
    map.casenumName = $("#casenumName").text();
    map.casenumWord = $("#casenumWord").text();
    map.casenumCount = $("#casenumCount").text();
    map.caseReason = $("#caseReason").text();
    map.calledPerson = $("#calledPerson").text();
    map.calledAddress = $("#calledAddress").text();
    map.calledThing = $("#calledThing").text();
    map.arrivalsYear = $("#arrivalsYear").text();
    map.arrivalsMonth = $("#arrivalsMonth").text();
    map.arrivalsDay = $("#arrivalsDay").text();
    map.arrivalsHour = $("#arrivalsHour").text();
    map.arrivalsMinute = $("#arrivalsMinute").text();
    map.destination = $("#destination").text();
    map.judge = $("#judge").text();
    map.clerk = $("#clerk").text();
    map.callYear = $("#callYear").text();
    map.callMonth = $("#callMonth").text();
    map.callDay = $("#callDay").text();
    console.log(map);

    $.ajax({
        url: "http://localhost:9005/api/PrintSummonsController/printSummons",
        data: map,
        success: function (result) {
            console.log(result);
            alert(result.reason)
        }
    });



}
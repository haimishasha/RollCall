$(document).ready(function(){
    $("#change").click(function(){
        $("input[readonly=readonly]:not(#number)").removeAttr("readonly");
        //$("#trueName").attr("autofocus","autofocus");
    });
});


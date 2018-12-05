/* Name: Zachary Palmer
Date: 12/4/18
Assignment: 8
Class: GUI 1
*/

var tableCount = 0;


//Process form when submit button is pressed and return false so 
// page is not refreshed
function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
}

var form = document.getElementById('inputForm');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}


// Validate input and create table based on 4 index inputs

function generateTable(topStart, topEnd, sideStart, sideEnd, targetTable) {
    document.getElementById(targetTable).innerHTML = "";
    document.getElementById("inputtedVals").innerHTML = "";

    if (Number(topStart) > Number(topEnd)) {
        var tempStart = topStart;
        topStart = topEnd;
        topEnd = tempStart;
        document.getElementById("inputtedVals").innerHTML =
        "<h4>Swapping Top Values!</h4>";
    }
    if (Number(sideStart) > Number(sideEnd)) {
        var tempStart = sideStart;
        sideStart = sideEnd;
        sideEnd = tempStart;
        document.getElementById("inputtedVals").innerHTML +=
        "<h4>Swapping Side Values!</h4>";
    }   
    //If any values are blank then abort 
    //table creation and print out error msg
    if (sideStart == "" ||
        sideEnd == "" ||
        topStart == "" ||
        topEnd == "") {
        document.getElementById("inputtedVals").innerHTML =
            "";
    }
    //If any starting values are higher than ending values 
    //then abort table creation and print error msg
        //All validation has passed so create table and place in HTML
        else {
            topStart = Number(topStart);
            topEnd = Number(topEnd);
            sideStart = Number(sideStart);
            sideEnd = Number(sideEnd);
            document.getElementById("inputtedVals").innerHTML +=
                "<h4>Creating multiplication table by multiplying all values from " +
                topStart + " to " + topEnd + " by all values from " +
                sideStart + " to " + sideEnd + "...</h4>";

            //loop through all the inputted indexes creating the multiplicaiton table
            var table = document.getElementById(targetTable);
            for (var i = sideStart; i <= sideEnd; i++) {
                var row = table.insertRow(i - sideStart);
                for (var e = topStart; e <= topEnd; e++) {
                    var cell = row.insertCell(e - topStart);
                    cell.innerHTML = i * e;
                }
                var cell = row.insertCell(0);
                cell.innerHTML = i;
            }

            //insert the first row on the top showing the range
            var firstRow = table.insertRow(0);
            for (let j = topStart; j <= topEnd; j++) {
                var cell = firstRow.insertCell(j - topStart);
                cell.innerHTML = j;
            }

            //in the upper right cell insert a multiplication sign
            var cell = firstRow.insertCell(0);
            cell.innerHTML = "X";
        }
}



(function($){
    var sliderOpts = {
        min: -25,
        max: 25,
        value: 0,
        slide: function() {
            //upon the movement of any slider we regenerate the table and adjust the text field accorgingly
            var tS = $("#topSliderStart").slider("value"),
            tE = $("#topSliderEnd").slider("value"),
            sS = $("#sideSliderStart").slider("value"),
            sE = $("#sideSliderEnd").slider("value");
            $("#num1").val(tS);
            $("#num2").val(tE);
            $("#num3").val(sS);
            $("#num4").val(sE);
            generateTable(document.getElementById('num1').value,
                          document.getElementById('num2').value,
                          document.getElementById('num3').value, 
                          document.getElementById('num4').value, 
                          "outputTable");
        }
    };
    $("#topSliderStart").slider(sliderOpts);
    $("#topSliderEnd").slider(sliderOpts);
    $("#sideSliderStart").slider(sliderOpts);
    $("#sideSliderEnd").slider(sliderOpts);
})(jQuery);
    


$(function () {
    //upon the change of any text field we regenerate the table and adjust the sliders accorgingly
    $("#num1").change(function() {
        var value = this.value;
        $("#topSliderStart").slider("value",value);
        generateTable(value, 
                      document.getElementById('num2').value,
                      document.getElementById('num3').value, 
                      document.getElementById('num4').value, 
                      "outputTable");
    });
    $("#num2").change(function() {
        var value = this.value;
        $("#topSliderEnd").slider("value",value);
        generateTable(document.getElementById('num1').value, 
                      value,
                      document.getElementById('num3').value, 
                      document.getElementById('num4').value,
                      "outputTable");
    });
    $("#num3").change(function() {
        var value = this.value;
        $("#sideSliderStart").slider("value",value);
        generateTable(document.getElementById('num1').value, 
                      document.getElementById('num2').value,
                      value, 
                      document.getElementById('num4').value, 
                      "outputTable");
    });
    $("#num4").change(function() {
        var value = this.value;
        $("#sideSliderEnd").slider("value",value);
        generateTable(document.getElementById('num1').value, 
                      document.getElementById('num2').value,
                      document.getElementById('num3').value,
                      value,
                      "outputTable");

    });
});

 (function($){
    $("#myTabs").tabs();
    $("#removeTabs").click(function() {
        var tabIndex = parseInt($("#indexValue").val(), 10);
        if(tabIndex > 0)
        {
            var tab = $( "#myTabs" ).find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove();
            $("#myTabs").tabs("refresh");
        }
    });
    $("#removeAllTabs").click(function() {
        var tabCount = $('#myTabs >ul >li').length;
        var i;
        console.log(tabCount);
        for(i = 1 ; i <= Number(tabCount)+1; i++)
        {
           var tab = $( "#myTabs" ).find(".ui-tabs-nav li:eq(" + i + ")").remove();
        }
        $("#myTabs").tabs("refresh");
    });
    $("#save").click(function() {
        //on click of save tab button we generate an apporpriate tab name
        //create new tab and generate a table in the newly created tab
        var t = $("#myTabs").tabs();
        var ul = t.find("ul");
        var tabName = "[" + document.getElementById('num1').value + " , " + 
                    document.getElementById('num2').value + "] X [" + 
                    document.getElementById('num3').value + " , " + 
                    document.getElementById('num4').value + "]";

        $( "<li><a href='#tab" + tableCount + "'>" + tabName + "</a></li>" ).appendTo( ul );
        $( "<div id='tab" + tableCount + "'><table id=table"+tableCount+"></table> </div>" ).appendTo( t );
        t.tabs( "refresh" );
        generateTable(document.getElementById('num1').value, 
                      document.getElementById('num2').value,
                      document.getElementById('num3').value, 
                      document.getElementById('num4').value, 
                      "table"+tableCount);
        tableCount++;
    });
 })(jQuery);


$(function () {
    $("form[name='inputForm']").validate({
        //validation rules
        rules: {
            num1: {
                //(same for all) sets this a as a required input with steps of 1 and a range of -25 - 25
                required: true,
                step: 1, 
                range: [-26,26]
            },
            num2: {
                required: true,
                step: 1, 
                range: [-26,26]
            },
            num3: {
                required: true,
                step: 1, 
                range: [-26,26]
            },
            num4: {
                required: true,
                step: 1, 
                range: [-26,26]
            }
        },
        //validation error messages
        messages: {
            num1: {
                //sensible error messages for validation issues
                required: "<br><h3>Cannot leave this blank!</h3></br>",
                range: "<br><h3>Must be between -25 and 25!</h3></br>",
                step: "<br><h3>Must be a whole number!</h3></br>"
            },
            num2: {
                required: "<br><h3>Cannot leave this blank!</h3></br>",
                range: "<br><h3>Must be between -25 and 25!</h3></br>",
                step: "<br><h3>Must be a whole number!</h3></br>"
            },
            num3: {
                required: "<br><h3>Cannot leave this blank!</h3></br>",
                range: "<br><h3>Must be between -25 and 25!</h3></br>",
                step: "<br><h3>Must be a whole number!</h3></br>"
            },
            num4: {
                required: "<br><h3>Cannot leave this blank!</h3></br>",
                range: "<br><h3>Must be between -25 and 25!</h3></br>",
                step: "<br><h3>Must be a whole number!</h3></br>"
            }
        }
    });
});
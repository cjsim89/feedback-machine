$(document).ready(function() {
  ellies = $("input[name^='selector']");

  ellies.on('click', function(e) {
    dv = $(this).attr("data-value");

    var rowNum = dv.split("_")[0];
    var rowScore = dv.split("_")[1];
    var rowResult = $("input[id='" + rowNum + "_result']");

    rowResult.val(rowScore)
    rowResult.change();

  })

  resultBoxes = $("input[id$='_result']");



  resultBoxes.on('change', function(e) {
    var dv = $(this).val();

    var bgcolor = "";
    if (dv >= 3) {
      bgcolor = "bg-success"
    } else if (dv < 3 && dv > 2) {
      bgcolor = "bg-warning"
    } else {
      bgcolor = "bg-danger"
    }

    $(this).closest("td").attr('class', bgcolor);

    var theAverage = calculateAverage();

    $("span#result_average").html(theAverage);

    if (theAverage >= 2.5) {
      $("span#result").html("Pass");
    } else {
      $("span#result").html("Does Not Pass");
    }

  })




})

function calculateAverage() {
  var total = 0;
  for (var i = 0; i < resultBoxes.length; i++) {
    var thisValue = resultBoxes[i].value;
    thisValue = (thisValue == '' || thisValue == null) ? 0 : parseFloat(thisValue);

    total += thisValue;

  }
  return (total / 4);
}

function didPass() {
  var theAverage = calculateAverage();
  return (theAverage >= 2.5) ? true : false;
}

function getCategories() {
  var arr = [];
  var things = $("table#rowTable tbody tr th[scope='row']");
  for (var i = 0; i < things.length; i++) {
    arr.push(things[i].innerHTML)
  }
  return arr;
}

function generateFeedback() {
  var categories = getCategories();
  var genFeed = "";
  var message = "Hi " + $("#studentName").val() + ", your " + $("#projectName").text() + " project is ";

  var message2 = (didPass()) ? "a pass :tada: Congratulations!\n\n" : "not a pass. Here is some feedback for you...\n\n";

  genFeed += message + message2;

  for (var i = 0; i < resultBoxes.length; i++) {

    genFeed += categories[i] + ": " + $("input#" + (i+1) + "_result").val() + "\n" + $("input#" + (i+1) + "_result").parents().find("td[id=" + (i+1) + "_" + $("input#" + (i+1) + "_result").val() + "]").children().find("p")[0].innerHTML.trim() + "\n";
    genFeed += $("textarea#feedback_" + (i+1)).val() + "\n\n";
  }
  $("textarea#fb_finished").text(genFeed);
}
$(document).ready(function() {

  var studentNameBox = $("input#studentName")
  studentNameBox.on("input", function(e) {
    document.title = $(this).val() + " | Feedback Machine"
  })

  var connect_four_data = {}
  loadData();
  console.log(connect_four_data)
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
  return (total / resultBoxes.length).toFixed(2);
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
  var message = "Hi " + $("#studentName").val().trim() + ", your " + $("#projectName").text() + " project is ";

  var message2 = (didPass()) ? "a pass :tada: Congratulations!\n\n" : "not a pass. Here is some feedback for you...\n\n";

  genFeed += message + message2;

  for (var i = 0; i < resultBoxes.length; i++) {
    var $inputResultBox = $("input#" + (i+1) + "_result");
    var resultBoxActualVal = $inputResultBox[0].value;
    var $inputResultBoxVal = 0;
    if (parseInt(Number.isInteger($inputResultBox[0].value))) {
      $inputResultBoxVal = parseInt($inputResultBox[0].value);
    } else {
      $inputResultBoxVal = parseInt($inputResultBox[0].value);
    }
    if (resultBoxActualVal !== "") {
      genFeed += categories[i] + ": " + resultBoxActualVal + " / 4\n ```" + $inputResultBox.parents().find("td[id=" + (i+1) + "_" + $inputResultBoxVal + "]").children().find("p")[0].innerHTML.trim() + "```\n";
      genFeed += $("textarea#feedback_" + (i+1)).val() + "\n\n";
    }

  }
  var num_commits = $("#num_commits").val()
  var num_pr = $("#num_pr").val()
  genFeed += "\n# Commits: " + num_commits + "\n# Pull requests: " + num_pr + "\n";

  $("textarea#fb_finished").text(genFeed);
  $("textarea#fb_finished").height(document.getElementById("fb_finished").scrollHeight);
}

$("button#copyBtn").on('click', function(e) {
  e.preventDefault();

  $("textarea#fb_finished").select();
  document.execCommand('copy');

})

function loadData() {

  $.ajax({
    url: "https://cjsim89.github.io/feedback-machine/data/connect_four.json",
    success: function(response) {
      connect_four_data = response
    }, error: function(error) {
      console.log(error)
    }
  })

}
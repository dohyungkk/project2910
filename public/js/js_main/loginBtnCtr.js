// JUNHO
function gameBtnControl(gameBtn) {
  // var link = (gameBtn === "game1Btn") ? "/game1" : "/game2";
  var link;
  switch(gameBtn){
    case "game1Btn":
      link = "/game1";
      break;
    case "game2Btn":
      link = "/game2";
      break;
    case "game3Btn":
      link = "/game3";
      break;
  }
  var cur = document.getElementById("loVerf").innerHTML;
  console.log(cur);
  $("#modalOk").click(function () {
    location.href = link;
  })
  if (cur === "Guest") {
    console.log("notlogged in");
    $("#gameOption").modal({ backdrop: true, focus: true });
  } else {
    location.href = link;
  }
}

var curStat = document.getElementById("grtVerf").innerHTML;
document.getElementById("navLogout").innerHTML = "";
if (curStat != "") {
  document.getElementById("navLogout").innerHTML = "Logout";
  $("#navLogout").click(() => {
    location.href = "/logout";
  })
}
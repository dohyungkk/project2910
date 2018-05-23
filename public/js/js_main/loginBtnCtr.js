// JUNHO
function gameBtnControl(gameBtn) {
  var link = (gameBtn === 'game1Btn') ? '/game1' : '/game2';
  var cur = document.getElementById("loVerf").innerHTML;
  console.log(cur);
  $('#modalOk').click(function () {
    location.href = link;
  })
  if (cur === 'Guest') {
    console.log('notlogged in');
    $('#gameOption').modal({ backdrop: true, focus: true });
  } else {
    location.href = link;
  }
}

var curStat = document.getElementById("grtVerf").innerHTML;
document.getElementById("navLogout").innerHTML = '';
if (curStat != '') {
  document.getElementById("navLogout").innerHTML = 'Logout';
  $('#navLogout').click(() => {
    location.href = '/logout';
  })
}
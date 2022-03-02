let game = 0; // 1:local, 2:easy-bot, 3:normal-bot, 4:hard-bot
let gameOver = false;
let count = 0;
let colNum = [0, 0, 0, 0, 0, 0, 0];
let b = [ [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0] ]; 

function place(column, repeat){
  if (gameOver) return;
  var color = 'gold'; 
  var team = 1; 
  if (count % 2 == 0 || (localStorage.getItem("game") > 1 && repeat)){
    color = 'red'; 
    team = 2;
  }
  var rowLimiter = colNum[column];
  b[5-colNum[column]][column] = team;
  colNum[column]++;
  if (rowLimiter <= 6){
    var height = 507 - (100 * rowLimiter);
    count++;
    document.querySelector('#r' + column).insertAdjacentHTML('afterbegin',`
    <div class="chip" style="top: ` + height + `px; background-color: ` + color + `"></div>
    `)
    checkWin(repeat);
    if (localStorage.getItem("game") > 1 && repeat)
      botMove();
  }
}

function restart(){
  redWon = false;
  gameOver = false;
  count = 0;
  colNum = [0, 0, 0, 0, 0, 0, 0];
  b = [ [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0] ];
  t = 0;
  document.getElementById("all").innerHTML = "<div class='scoreboard'><p id='redWins'><span id='name1'>Red</span> Wins: <span id='rW'>0</span></p><p id='yellowWins'><span id='name2'>Yellow</span> Wins: <span id='yW'>0</span></p></div><div id='winShow'><p id='won'><span id='winner'></span><br></p><div id='playAgain' onclick='restart()'>Play Again</div></div><div id='winBack'></div><div class='chip' id='guide' style='top: 0px; left: 0px; opacity: 0.25; display: none; background-color: red;'></div><img src='/photos/board.png' id='board'><div id='r0' onmouseover='guideIn(0)' onmouseout='guideOut()' onclick='place(0, true)'></div><div id='r1' onmouseover='guideIn(1)' onmouseout='guideOut()' onclick='place(1, true)'></div><div id='r2' onmouseover='guideIn(2)' onmouseout='guideOut()' onclick='place(2, true)'></div><div id='r3' onmouseover='guideIn(3)' onmouseout='guideOut()' onclick='place(3, true)'></div><div id='r4' onmouseover='guideIn(4)' onmouseout='guideOut()' onclick='place(4, true)'></div><div id='r5' onmouseover='guideIn(5)' onmouseout='guideOut()' onclick='place(5, true)'></div><div id='r6' onmouseover='guideIn(6)' onmouseout='guideOut()' onclick='place(6, true)'></div>";
  document.getElementById("rW").innerHTML = rWins;
  document.getElementById("yW").innerHTML = yWins;
  document.getElementById("won").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
  document.getElementById("winBack").style.display = "none";
  names();
}

let rWins = 0;
let yWins = 0;
let redWon = false;
function checkWin(repeat){
  for (var r = 0; r <= 5; r++){
    for (var c = 0; c <= 6; c++){
      /*if (r <= 2 && b[r][c]==1 && b[r+1][c]==1 && b[r+2][c]==1 && b[r+3][c]==1){
        alert("dab");
      }*/
      if ( (c <= 3 && ( (b[r][c]==2 && b[r][c+1]==2 && b[r][c+2]==2 && b[r][c+3]==2) || (b[r][c]==1 && b[r][c+1]==1 && b[r][c+2]==1 && b[r][c+3]==1) ) ) || ( r <= 2 && ( (b[r][c]==2 && b[r+1][c]==2 && b[r+2][c]==2 && b[r+3][c]==2) || (b[r][c]==1 && b[r+1][c]==1 && b[r+2][c]==1 && b[r+3][c]==1) ) ) || ( r <= 2 && c <= 3 && ( (b[r][c]==2 && b[r+1][c+1]==2 && b[r+2][c+2]==2 && b[r+3][c+3]==2) || (b[r][c]==1 && b[r+1][c+1]==1 && b[r+2][c+2]==1 && b[r+3][c+3]==1) ) ) || ( r <= 2 && c >= 3 && ( (b[r][c]==2 && b[r+1][c-1]==2 && b[r+2][c-2]==2 && b[r+3][c-3]==2) || (b[r][c]==1 && b[r+1][c-1]==1 && b[r+2][c-2]==1 && b[r+3][c-3]==1) ) ) ){
        gameOver = true;
        document.getElementById("won").style.display = "block";
        document.getElementById("playAgain").style.display = "block";
        document.getElementById("winBack").style.display = "block";
        if (localStorage.getItem("game") > 1){
          if (repeat){
            rWins++;
            document.getElementById("rW").innerHTML = rWins;
            document.getElementById("winner").innerHTML = "Player<br>Won!";
            redWon = true;
          }
          else if (!redWon){
            yWins++;
            document.getElementById("yW").innerHTML = yWins;
            document.getElementById("winner").innerHTML = "Bot<br>Won!";
          }
          else {
            redWon = false;
          }
        }
        else {
          if (count % 2 != 0){
            rWins++;
            document.getElementById("rW").innerHTML = rWins;
            document.getElementById("winner").innerHTML = "Red<br>Won!";
          }
          else {
            yWins++;
            document.getElementById("yW").innerHTML = yWins;
            document.getElementById("winner").innerHTML = "Yellow<br>Won!";
          }
        }
      }
      else if (count >= 42){
        gameOver = true;
        document.getElementById("won").style.display = "block";
        document.getElementById("playAgain").style.display = "block";
        document.getElementById("winBack").style.display = "block";
        document.getElementById("winner").innerHTML = "Tie<br>Game";
      }
    }
  }
}

function guideIn(column){ 
  if (gameOver) return;
  var color = 'gold'; if (count % 2 == 0 || localStorage.getItem("game") > 1) color = 'red';
  var guideLim = colNum[column];
  var left = 0;
  switch (column){
    case 0: left = 18; break;
    case 1: left = 129; break;
    case 2: left = 242; break;
    case 3: left = 355; break;
    case 4: left = 468; break;
    case 5: left = 580; break;
    case 6: left = 692; break;
  }
  if (guideLim < 6){
    var height = 507 - (100 * guideLim);
    document.getElementById("guide").style.display = "block";
    document.getElementById("guide").style.backgroundColor = color;
    document.getElementById("guide").style.top = height + "px";
    document.getElementById("guide").style.left = left + "px";
    if (color === 'gold') document.getElementById("guide").style.opacity = 0.35;
  }
}

function guideOut(){ 
  document.getElementById("guide").style.display='none';
}

let t = 0; // the number of the bot's turn
function botMove(){
  t++;
  if (localStorage.getItem("game") == 2){
    var easyVision = Math.floor(Math.random() * 10)+1;
    if (easyVision > 4 && bWin(b) != -1)
      place(bWin(b), false);
    else if (easyVision > 5 && bDefend(b) != -1)
      place(bDefend(b), false);
    else {
      var stay = true;
      do {
        var rand = Math.floor(Math.random() * 7);
        if (colNum[rand]+1 <= 6){
          place(rand, false);
          stay = false;
        }
      } while (stay);
    }
  }
  else if (t == 1)
    place(3, false);
  else if (t == 2 && b[5][3] == 2){
    if (b[5][4] == 0) 
      place(4, false);
    else if (b[5][2] == 0) 
      place(2, false);
  }
  else if (localStorage.getItem("game") == 3){
    var normVision = Math.floor(Math.random() * 10)+1;
    if (normVision > 2 && bWin(b) != -1)
      place(bWin(b), false);
    else if (normVision > 2 && bDefend(b) != -1)
      place(bDefend(b), false);
    else if (normVision > 6 && doubleDef(b) != -1)
      place(doubleDef(b), false);
    else {
      var stay = true;
      do {
        var rand = Math.floor(Math.random() * 7);
        if (colNum[rand]+1 <= 6){
          place(rand, false);
          stay = false;
        }
      } while (stay);
    }
  }
  else if (bWin(b) != -1){
    place(bWin(b), false);
  }
  else if (bDefend(b) != -1){
    place(bDefend(b), false);
  }
  else if (doubleWin(b) != -1){
    //alert("double win");
    place(doubleWin(b), false);
  }
  else if (doubleDef(b) != -1){
    //alert("double def");
    place(doubleDef(b), false);
  }
  else {
    var bTest = [];
    var firstPlaced = false;
    for (var c = 0; c <= 6; c++){
      // error in here i think
      bTest = copyArray(b);
      if (colNum[c]+1 <= 6){
        bTest[5-colNum[c]][c] = 1;
        if (bWin(bTest) != -1 && bDefend(bTest) == -1){ // && doubleDef(bTest) == -1
          place(c, false);
          firstPlaced = true;
          break;
        }
      }
    }
    if (!firstPlaced){
      var stay = 0;
      while (stay <= 10) {
        bTest = copyArray(b);
        var rand = Math.floor(Math.random() * 3 + 2);
        if (colNum[rand]+1 <= 6){
          bTest[5-colNum[rand]][rand] = 1;
          if (bDefend(bTest) == -1){  // && doubleDef(bTest) == -1
            place(rand, false);
            stay = 20;
          }
        }
        stay++;
      }
      if (stay < 20){
        while (stay >= 0) {
          bTest = copyArray(b);
          var randArr = [0, 1, 5, 6];
          var randInt = Math.floor(Math.random() * 4);
          var rand = randArr[randInt];
          if (colNum[rand]+1 <= 6){
            bTest[5-colNum[rand]][rand] = 1;
            if (bDefend(bTest) == -1){  // && doubleDef(bTest) == -1
              place(rand, false);
              stay = -10;
            }
          }
          stay++;
        }
      }
    }
  }
}

function doubleWin(bo){
  for (var c = 0; c <= 6; c++){
    var dTest1 = [];
    dTest1 = copyArray(bo);
    if (colNum[c]+1 <= 6){
      dTest1[5-colNum[c]][c] = 1;
      colNum[c]++;
      if (bWin(dTest1) != -1 && bDefend(dTest1) == -1){
        dTest1[5-colNum[bWin(dTest1)]][bWin(dTest1)] = 2;
        if (bWin(dTest1) != -1 && colNum[c]+1 <= 6){
          colNum[c]--;
          return c;
        }
      }
    }
    colNum[c]--;
  }
  return -1;
}

function doubleDef(bo){
  for (var c = 0; c <= 6; c++){
    var dTest1 = [];
    dTest1 = copyArray(bo);
    if (colNum[c]+1 <= 6){
      dTest1[5-colNum[c]][c] = 2;
      colNum[c]++;
      if (bDefend(dTest1) != -1){
        dTest1[5-colNum[bDefend(dTest1)]][bDefend(dTest1)] = 1;
        if (bDefend(dTest1) != -1 && colNum[c]+1 <= 6){
          colNum[c]--;
          return c;
        }
      }
    }
    colNum[c]--;
  }
  return -1;
}

function bWin(bo){
  for (var r = 0; r <= 5; r++){
    for (var c = 0; c <= 6; c++){
      let test = "";
      if (c <= 3){
        test = bo[r][c] + "" + bo[r][c+1] + "" + bo[r][c+2] + "" + bo[r][c+3];
        if (test == "1110" || test == "1101" || test == "1011" || test == "0111"){
          if (r == 5){
            if (bo[r][c] == 0) return c;
            else if (bo[r][c+1] == 0) return c+1;
            else if (bo[r][c+2] == 0) return c+2;
            else return c+3;
          }
          else {
            if (bo[r][c] == 0 && bo[r+1][c] != 0) return c;
            else if (bo[r][c+1] == 0 && bo[r+1][c+1] != 0) return c+1;
            else if (bo[r][c+2] == 0 && bo[r+1][c+2] != 0) return c+2;
            else if (bo[r][c+3] == 0 && bo[r+1][c+3] != 0) return c+3;
          }
        }
      }
      if (r <= 2 && bo[r][c] == 0){
        test = bo[r][c] + "" + bo[r+1][c] + "" + bo[r+2][c] + "" + bo[r+3][c];
        if (test == "0111")
          return c;
      }
      if (r <= 2 && c <= 3){
        test = bo[r][c] + "" + bo[r+1][c+1] + "" + bo[r+2][c+2] + "" + bo[r+3][c+3];
        if (test == "1110" || test == "1101" || test == "1011" || test == "0111"){
          if (bo[r][c] == 0 && bo[r+1][c] != 0) return c;
          else if (bo[r+1][c+1] == 0 && bo[r+2][c+1] != 0) return c+1;
          else if (bo[r+2][c+2] == 0 && bo[r+3][c+2] != 0) return c+2;
          else if (r < 2 && bo[r+3][c+3] == 0 && bo[r+4][c+3] != 0) return c+3;
          else if (r == 2 && bo[r+3][c+3] == 0) return c+3;
        }
      }
      if (r >= 3 && c <= 3){
        test = bo[r][c] + "" + bo[r-1][c+1] + "" + bo[r-2][c+2] + "" + bo[r-3][c+3];
        if (test == "1110" || test == "1101" || test == "1011" || test == "0111"){
          if (r > 5 && bo[r][c] == 0 && bo[r+1][c] != 0) return c;
          else if (bo[r][c] == 0) return c;
          else if (bo[r-1][c+1] == 0 && bo[r][c+1] != 0) return c+1;
          else if (bo[r-2][c+2] == 0 && bo[r-1][c+2] != 0) return c+2;
          else if (bo[r-3][c+3] == 0 && bo[r-2][c+3] != 0) return c+3;
        }
      }
    }
  }
  return -1;
}

function bDefend(bo){
  for (var r = 0; r <= 5; r++){
    for (var c = 0; c <= 6; c++){
      let test = "";
      if (c <= 3){
        test = bo[r][c] + "" + bo[r][c+1] + "" + bo[r][c+2] + "" + bo[r][c+3];
        if (test == "2220" || test == "2202" || test == "2022" || test == "0222"){
          if (r == 5){
            if (bo[r][c] == 0) return c;
            else if (bo[r][c+1] == 0) return c+1;
            else if (bo[r][c+2] == 0) return c+2;
            else return c+3;
          }
          else {
            if (bo[r][c] == 0 && bo[r+1][c] != 0) return c;
            else if (bo[r][c+1] == 0 && bo[r+1][c+1] != 0) return c+1;
            else if (bo[r][c+2] == 0 && bo[r+1][c+2] != 0) return c+2;
            else if (bo[r][c+3] == 0 && bo[r+1][c+3] != 0) return c+3;
          }
        }
      }
      if (r <= 2 && bo[r][c] == 0){
        test = bo[r][c] + "" + bo[r+1][c] + "" + bo[r+2][c] + "" + bo[r+3][c];
        if (test == "0222")
          return c;
      }
      if (r <= 2 && c <= 3){
        test = bo[r][c] + "" + bo[r+1][c+1] + "" + bo[r+2][c+2] + "" + bo[r+3][c+3];
        if (test == "2220" || test == "2202" || test == "2022" || test == "0222"){
          if (bo[r][c] == 0 && bo[r+1][c] != 0) return c;
          else if (bo[r+1][c+1] == 0 && bo[r+2][c+1] != 0) return c+1;
          else if (bo[r+2][c+2] == 0 && bo[r+3][c+2] != 0) return c+2;
          else if (r < 2 && bo[r+3][c+3] == 0 && bo[r+4][c+3] != 0) return c+3;
          else if (bo[r+3][c+3] == 0) return c+3;
        }
      }
      if (r >= 3 && c <= 3){
        test = bo[r][c] + "" + bo[r-1][c+1] + "" + bo[r-2][c+2] + "" + bo[r-3][c+3];
        if (test == "2220" || test == "2202" || test == "2022" || test == "0222"){
          if (r > 5 && bo[r][c] == 0 && bo[r+1][c] != 0) return c;
          else if (bo[r][c] == 0) return c;
          else if (bo[r-1][c+1] == 0 && bo[r][c+1] != 0) return c+1;
          else if (bo[r-2][c+2] == 0 && bo[r-1][c+2] != 0) return c+2;
          else if (bo[r-3][c+3] == 0 && bo[r-2][c+3] != 0) return c+3;
        }
      }
    }
  }
  return -1;
}

function setGame(g){
  localStorage.setItem("game", g);
}

window.onload = function start(){
  names();
}

function names(){
  if (localStorage.getItem("game") == 2){
    document.getElementById("name1").innerHTML = "Player";
    document.getElementById("name2").innerHTML = "Easy Bot";
    document.getElementById("yellowWins").style.marginLeft = "450px";
  }
  else if (localStorage.getItem("game") == 3){
    document.getElementById("name1").innerHTML = "Player";
    document.getElementById("name2").innerHTML = "Normal Bot";
    document.getElementById("yellowWins").style.marginLeft = "425px";
  }
  else if (localStorage.getItem("game") == 4){
    document.getElementById("name1").innerHTML = "Player";
    document.getElementById("name2").innerHTML = "Hard Bot";
    document.getElementById("yellowWins").style.marginLeft = "450px";
  }
}

function copyArray(ari1) {
   var mxx4 = [];
   for (var i=0;i<ari1.length;i++) {
      var nads2 = [];
      for (var j=0;j<ari1[0].length;j++)
        nads2.push(ari1[i][j]);
      mxx4.push(nads2);
   }
   return mxx4;
}


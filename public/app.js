const box = document.querySelector(".box");
const grids = document.querySelectorAll(".grid");
const msg = document.querySelector(".msg");
const fullscreen = document.querySelector(".fullscreen");
const xScore = document.querySelector("#x-score");
const oScore = document.querySelector("#o-score");
const turn = document.querySelector("#turn");

let xo = "O";

let scoreX = 0;
let scoreO = 0;
let win = false;

const reset = () => {
  newGame();
  scoreX = 0;
  scoreO = 0;
  xScore.innerHTML = 0;
  oScore.innerHTML = 0;
  win = false;
};

const turnUpdate = () => {
  let turnFor = xo == "O" ? "X" : "O";
  let turnColor = turnFor == "O" ? "o-color" : "x-color";
  turn.innerHTML = `<span class="${turnColor}"> ${turnFor}'s</span> Turn`;
};

const newGame = () => {
  msg.style.transform = "translate(-50%, -150%)";
  msg.style.opacity = 0;

  for (let i = 0; i < 9; i++) grids[i].innerHTML = "";
  for (let i = 0; i < 9; i++) grids[i].style.background = "#352F67";
  setTimeout(() => {
    fullscreen.style.zIndex = -1;
    fullscreen.style.opacity = 0;
  }, 400);

  xo = xo == "O" ? "O" : "X";

  win = false;
};

const showWin = (x) => {
  fullscreen.style.zIndex = 2;
  fullscreen.style.opacity = 1;
  msg.innerHTML = `<span class="info">${x}</span><br>
   <button onclick='newGame()' class="btn">New Game</button>`;
  msg.style.transform = "translate(-50%, 0%)";
  msg.style.opacity = 1;
  turnUpdate();
};

turnUpdate();

grids.forEach((grid) => {
  grid.addEventListener("click", (e) => {
    if (e.target.innerHTML == "") {
      e.target.innerHTML = xo == "O" ? "X" : "O";
      xo = xo == "O" ? "X" : "O";
      xo == "O"
        ? (e.target.style.color = "#FFD03C")
        : (e.target.style.color = "#EC4451");
    }
    let xArr = [0, 0, 0, 1, 2, 2, 3, 6];
    let yArr = [1, 3, 4, 4, 4, 5, 4, 7];
    let zArr = [2, 6, 8, 7, 6, 8, 5, 8];
    for (let i = 0; i < xArr.length; i++) {
      if (
        grids[xArr[i]].innerHTML != "" &&
        grids[xArr[i]].innerHTML == grids[yArr[i]].innerHTML &&
        grids[xArr[i]].innerHTML == grids[zArr[i]].innerHTML
      ) {
        // Background
        grids[xArr[i]].style.background = "#50D175";
        grids[yArr[i]].style.background = "#50D175";
        grids[zArr[i]].style.background = "#50D175";
        // Color
        grids[xArr[i]].style.color = "white";
        grids[yArr[i]].style.color = "white";
        grids[zArr[i]].style.color = "white";
        // Win Alert
        showWin(`${grids[xArr[i]].innerHTML} Wins!`);
        if (grids[xArr[i]].innerHTML == "X") {
          scoreX++;
          xScore.innerHTML = scoreX;
        } else {
          scoreO++;
          oScore.innerHTML = scoreO;
        }
        win = true;
      }
    }

    if (!win) {
      let count = 0;
      for (let i = 0; i < 9; i++) grids[i].innerHTML !== "" && count++;

      count == 9 && showWin(`Draw!`);
    }
    turnUpdate();
  });
});

// 0 1 2
// 0 3 6
// 0 4 8
// 1 4 7
// 2 4 6
// 2 5 8
// 3 4 5
// 6 7 8

//NEW GAME MENU START
const startMenu = document.getElementById("new-game-section");
const gameBoardPage = document.getElementById("game-board");

//select X or O
const markSelectors = document.getElementsByClassName("mark");
let selectedMark = markSelectors[0];

//change styling of selected mark X/O
function selectMark(selected) {
      selected.querySelector("path").style.fill = "#1F3641";
      selected.style.backgroundColor = "#A8BFC9";
}

//undo styling of mark when unselected
function unselectMark(originalSelection) {
      originalSelection.querySelector("path").style.fill = "#A8BFC9";
      originalSelection.style.backgroundColor = "initial";
}

selectMark(selectedMark);

//apply appropriate syling to selected mark
for (let i = 0; i < markSelectors.length; i++) {
      markSelectors[i].onclick = () => {
            unselectMark(selectedMark);
             selectedMark = markSelectors[i];
            selectMark(markSelectors[i]);
      }
}


//function to start game
function startGame(){
      startMenu.style.display = "none";
      gameBoardPage.style.display = "grid";

      if (turn === "x") {
            document.querySelector(".turn-X").style.display = "block";
            document.querySelector(".turn-O").style.display = "none";
      } else {
            document.querySelector(".turn-X").style.display = "none";
            document.querySelector(".turn-O").style.display = "block";
      }
}

//GAME INTERACTION
const boxes = document.getElementsByClassName("game-board-box");

//GAME LOGIC

//game board
const gameBoard = {
     
      row1: [boxes[0], boxes[1], boxes[2]],
      row2: [boxes[3], boxes[4], boxes[5]],
      row3: [boxes[6], boxes[7], boxes[8]],

      column1: [boxes[0], boxes[3], boxes[6]],
      column2: [boxes[1], boxes[4], boxes[7]],
      column3: [boxes[2], boxes[5], boxes[8]],

      diagonal1: [boxes[0], boxes[4], boxes[8]],
      diagonal2: [boxes[2], boxes[4], boxes[6]]

}


//start game buttons
const startNewGameBtns = document.getElementsByClassName("new-game-btn");
const cpuGameBtn = startNewGameBtns[0];
const twoPlayerBtn = startNewGameBtns[1];

//setting up players
let playerX;
let playerO;
let turn;
const Xmarker = '<img src="./assets/icon-x.svg" alt="">'
const Omarker = '<img src="./assets/icon-o.svg" alt="">'

//function to create human players and computer
function createHumanPlayer(playerNum, mark) {
      return {
            player: playerNum,
            mark: mark,
            selectBox(box) {
                  if (this.mark === "x" && turn === "x") {
                        box.innerHTML = Xmarker;
                        switchTurns();
                        checkForWin();
                        if (playerO.player === "computer" && (checkForWin() !== true)) {
                              setTimeout(() => {
                                    playerO.selectBox()
                              }, 1000);
                        }
                  } else if(this.mark === "o" && turn === "o"){
                        box.innerHTML = Omarker;
                        switchTurns();
                        checkForWin();
                        if (playerX.player === "computer" && (checkForWin() !== true)) {
                              setTimeout(() => {
                                    playerX.selectBox()
                              }, 1000);
                        }
                  }
            }
      }
}


function createCompPlayer(mark) {
      return {
            player: "computer",
            mark: mark,

            selectBox() {
                  if ((this.mark === "x") && (turn === "x")) {
                        let selectedBox = boxes[Math.floor(Math.random() * 9)];

                        while (selectedBox.hasChildNodes() === true) {
                              selectedBox = boxes[Math.floor(Math.random() * 9)]
                        }

                        selectedBox.innerHTML = Xmarker;
                        switchTurns();

                  } else if((this.mark === "o") && (turn === "o")){
                        let selectedBox = boxes[Math.floor(Math.random() * 9)];

                        while (selectedBox.hasChildNodes() === true) {
                              selectedBox = boxes[Math.floor(Math.random() * 9)]
                        }

                        selectedBox.innerHTML = Omarker;
                        switchTurns();
                  }
            }
      }
}

function switchTurns() {
      if (turn === "x") {
            turn = "o";
            document.querySelector(".turn-X").style.display = "none";
            document.querySelector(".turn-O").style.display = "block";
            console.log(turn)
      } else {
            turn = "x";
            document.querySelector(".turn-X").style.display = "block";
            document.querySelector(".turn-O").style.display = "none";
            console.log(turn)
      }
}

cpuGameBtn.onclick = () => {
      startGame();
      turn = "x";

      if (selectedMark === markSelectors[0]) {
            playerX = createHumanPlayer(1, "x")
            playerO = createCompPlayer("o");
            document.querySelector(".player-X").innerHTML = " (you)";
            document.querySelector(".player-O").innerHTML = " (CPU)";
      } else {
            playerO = createHumanPlayer(1, "o")
            playerX = createCompPlayer("x");
            document.querySelector(".player-O").innerHTML = " (you)";
            document.querySelector(".player-X").innerHTML = " (CPU)";
            playerX.selectBox();
      }
}

for (let i = 0; i < boxes.length; i++) {
      boxes[i].onclick = () => {
            if (turn === "x" && boxes[i].hasChildNodes() === false) {
                  playerX.selectBox(boxes[i]);
            } else if (turn === "o" && boxes[i].hasChildNodes() === false){
                  playerO.selectBox(boxes[i]);
            }
      }
}

function checkForWin() {
      for (let property in gameBoard) {
            if (gameBoard[property].every(box => box.innerHTML === Xmarker)) {
                  return true;
            } 
      }

      for (let property in gameBoard) {
            if (gameBoard[property].every(box => box.innerHTML === Omarker)) {
                  return true
            } 
      }   
}

// function checkForTie() {
//       let boxesArray = Array.from(boxes);
//       let filledBoxes = boxesArray.filter(box => box.hasChildNodes())
//       if (filledBoxes.length === boxesArray.length){
//             console.log("ITS A TIE")
//       }
// }
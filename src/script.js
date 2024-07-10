//PAGES
const startMenu = document.getElementById("new-game-section");
const gameBoardPage = document.getElementById("game-board");
const gameEndModal = document.getElementById("game-end-modal");
const roundTiedModal = document.getElementById("round-tied-modal");
const restartModal = document.getElementById("restart-modal")

//BUTTONS
//start game buttons
const startNewGameBtns = document.getElementsByClassName("new-game-btn");
const cpuGameBtn = startNewGameBtns[0];
const twoPlayerBtn = startNewGameBtns[1];

const boxes = document.getElementsByClassName("game-board-box");

const restartButton = document.querySelector(".restart-btn");
const noCancel = document.querySelector(".no-cancel")
const yesRestart = document.querySelector(".yes-restart")

const quitButtons = document.getElementsByClassName("quit-btn");
const nextRoundButtons = document.getElementsByClassName("next-round-btn");

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
function startGame() {
      turn = "x"
      playerXPoints.innerHTML = "0";
      playerOPoints.innerHTML = "0";
      tiePoints.innerHTML = "0"
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

twoPlayerBtn.onclick = () => {
      startGame();
     
      if (selectedMark === markSelectors[0]) {
            playerX = createHumanPlayer(1, "x")
            playerO = createHumanPlayer(2, "o");
            document.querySelector(".player-X").innerHTML = " (P1)";
            document.querySelector(".player-O").innerHTML = " (P2)";
      } else {
            playerO = createHumanPlayer(1, "o")
            playerX = createHumanPlayer(2, "x");
            document.querySelector(".player-O").innerHTML = " (P1)";
            document.querySelector(".player-X").innerHTML = " (P2)";
      }
}

//START CPU GAME
cpuGameBtn.onclick = () => {
      startGame();

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
            setTimeout(() => {
                  playerX.selectBox();
            }, 500)
      }
}

//setting up players
let playerX;
let playerO;
let turn;
let playerXPoints = document.querySelector(".player-X-points");
let playerOPoints = document.querySelector(".player-O-points");
let tiePoints = document.querySelector(".tie-points");
let Xpoints = 0;
let Opoints = 0;
let numOfTies = 0;

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
                        checkForWin();
                        if (checkForWin() === true) {
                              Xpoints += 1;
                              playerXPoints.innerHTML = Xpoints;
                              displayEndGameModal();
                        } else if (playerO.player === "computer" && (checkForWin() !== true)) {
                              switchTurns();
                              setTimeout(() => {
                                    playerO.selectBox()
                              }, 1000);
                        } else if (playerO.player !== "computer" && (checkForWin() !== true)) {
                              switchTurns();
                        }

                  } else if(this.mark === "o" && turn === "o"){
                        box.innerHTML = Omarker;
                        checkForWin();
                        if (checkForWin() === true) {
                              Opoints += 1;
                              playerOPoints.innerHTML = Opoints;
                              displayEndGameModal();
                        } else if (playerX.player === "computer" && (checkForWin() !== true)) {
                              switchTurns();
                              setTimeout(() => {
                                    playerX.selectBox()
                              }, 1000);
                        } else if (playerX.player !== "computer" && (checkForWin() !== true)) {
                              switchTurns();
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
                        checkForTie();
                        checkForWin();
                        if (checkForWin() === true) {
                              Xpoints += 1;
                              playerXPoints.innerHTML = Xpoints;
                              displayEndGameModal();
                        } else {
                              switchTurns();
                        }

                  } else if((this.mark === "o") && (turn === "o")){
                        let selectedBox = boxes[Math.floor(Math.random() * 9)];

                        while (selectedBox.hasChildNodes() === true) {
                              selectedBox = boxes[Math.floor(Math.random() * 9)]
                        }

                        selectedBox.innerHTML = Omarker;
                        checkForTie();
                        checkForWin();
                        if (checkForWin() === true) {
                              Opoints += 1;
                              playerOPoints.innerHTML = Opoints;
                              displayEndGameModal();
                        } else {
                              switchTurns();
                        }
                  }
            }
      }
}

function switchTurns() {
      if (turn === "x") {
            turn = "o";
            document.querySelector(".turn-X").style.display = "none";
            document.querySelector(".turn-O").style.display = "block";
      } else {
            turn = "x";
            document.querySelector(".turn-X").style.display = "block";
            document.querySelector(".turn-O").style.display = "none";
      }
}


for (let i = 0; i < boxes.length; i++) {
      boxes[i].onclick = () => {
            if (turn === "x" && boxes[i].hasChildNodes() === false) {
                  playerX.selectBox(boxes[i]);
                  checkForTie();
            } else if (turn === "o" && boxes[i].hasChildNodes() === false){
                  playerO.selectBox(boxes[i]);
                  checkForTie();
            }
      }
}


function checkForWin() {
      for (let property in gameBoard) {
            if (gameBoard[property].every(box => box.innerHTML === Xmarker)) {
                  return true;
            } else if(gameBoard[property].every(box => box.innerHTML === Omarker)) {
                  return true;
            } 
      }
}

function displayEndGameModal() {
      gameEndModal.style.display = "grid";

      //displays for CPU game
      if (playerX.player === "computer" || playerO.player === "computer") {
            if (turn === "x" && playerX.player !== "computer") {
                  gameEndModal.querySelector(".modal-p").innerHTML = "You won!";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-x.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#31C3BD";
            } else if (turn === "o" && playerX.player !== "computer") {
                  gameEndModal.querySelector(".modal-p").innerHTML = "Oh no, you lost...";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-o.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#F2B137";
            } else if (turn === "x" && playerX.player === "computer") {
                  gameEndModal.querySelector(".modal-p").innerHTML = "Oh no, you lost...";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-x.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#31C3BD";
            } else if(turn === "o" && playerX.player === "computer") {
                  gameEndModal.querySelector(".modal-p").innerHTML = "You won!";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-o.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#F2B137";
            }
      }

      //displays for 2 player game
      if (playerX.player !== "computer" && playerO.player !== "computer") {
            if (turn === "x" && playerX.player === 1) {
                  gameEndModal.querySelector(".modal-p").innerHTML = "Player 1 wins!";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-x.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#31C3BD";  
            } else if (turn === "o" && playerX.player === 1) {
                  gameEndModal.querySelector(".modal-p").innerHTML = "Player 2 wins!";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-o.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#F2B137";
            } else if (turn === "x" && playerX.player === 2) {
                  gameEndModal.querySelector(".modal-p").innerHTML = "Player 2 wins!";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-x.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#31C3BD";  
            } else if (turn === "o" && playerX.player === 2) {
                  gameEndModal.querySelector(".modal-p").innerHTML = "Player 1 wins!";
                  gameEndModal.querySelector(".winner-image").innerHTML = '<img src="./assets/icon-o.svg" alt="">';
                  gameEndModal.querySelector("h1").style.color = "#F2B137";
            }
      }
}

function checkForTie() {
      let filledBoxes= [];
      for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].hasChildNodes() === true) {
                  filledBoxes.push(boxes[i])
            }
      }

      if (boxes.length === filledBoxes.length && checkForWin() !==true) {
            roundTiedModal.style.display = "grid";
            numOfTies += 1;
            tiePoints.innerHTML = numOfTies
      }
}


//RESTART
restartButton.onclick = () => {
      restartModal.style.display = "grid";
}

yesRestart.onclick = () => {
      turn = "x";
      Xpoints = 0;
      Opoints = 0;
      playerXPoints.innerHTML = Xpoints;
      playerOPoints.innerHTML = Opoints;
      restartModal.style.display = "none";

      for (let i = 0; i < boxes.length; i++) {
            while (boxes[i].firstChild) {
                  boxes[i].removeChild(boxes[i].firstChild)
            }
      }

      if (playerX.player === "computer") {
            setTimeout(() => {
                  playerX.selectBox();
            }, 500)
      }
}

noCancel.onclick = () => {
      restartModal.style.display = "none";
}

//QUIT GAME
for (let i = 0; i < quitButtons.length; i++) {
      quitButtons[i].onclick = () => {
            for (let i = 0; i < boxes.length; i++) {
                  while (boxes[i].firstChild) {
                        boxes[i].removeChild(boxes[i].firstChild)
                  }
            }
      
            playerX = undefined;
            playerO = undefined;
            turn="x"
            Xpoints = 0;
            Opoints = 0;
            gameEndModal.style.display = "none";
            gameBoardPage.style.display = "none";
            roundTiedModal.style.display = "none";
            startMenu.style.display = "grid";
      }
}


//NEXT ROUND
for (let i = 0; i < nextRoundButtons.length; i++) {
      nextRoundButtons[i].onclick = () => {
            for (let i = 0; i < boxes.length; i++) {
                  while (boxes[i].firstChild) {
                        boxes[i].removeChild(boxes[i].firstChild)
                  }
            }

            if (playerX.player === "computer") {
                  setTimeout(() => {
                        playerX.selectBox();
                  }, 500)
            }
      
            turn = "x";
            document.querySelector(".turn-X").style.display = "block";
            document.querySelector(".turn-O").style.display = "none";
            gameEndModal.style.display = "none";
            roundTiedModal.style.display = "none";
      }
}

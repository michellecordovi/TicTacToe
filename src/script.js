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
}

//GAME INTERACTION
const boxes = document.getElementsByClassName("game-board-box");

//GAME LOGIC

//game board
const gameBoard = {
      board: [
            [boxes[0], boxes[1], boxes[2]],
            [boxes[3], boxes[4], boxes[5]],
            [boxes[6], boxes[7], boxes[8]]
      ],

      get column1() {
            return this.board.map(row => row[0])
      },

      get column2() {
            return this.board.map(row => row[1])
      },

      get column3() {
            return this.board.map(row => row[2])
      },

      get diagonal1() {
            return [this.board[0][0], this.board[1][1], this.board[2][2]]
      },

      get diagonal2() {
            return [this.board[0][2], this.board[1][1], this.board[2][0]]
      }
}

//when button for CPU or 2 player is clicked, if x is selected then player X is you

//start game buttons
const startNewGameBtns = document.getElementsByClassName("new-game-btn");
const cpuGameBtn = startNewGameBtns[0];
const twoPlayerBtn = startNewGameBtns[1];

//setting up players
let playerX;
let playerO;
let turn;
let Xmarker = '<img src="./assets/icon-x.svg" alt="">'
let Omarker = '<img src="./assets/icon-o.svg" alt="">'

//function to create human players and computer
function createHumanPlayer(playerNum, mark) {
      return {
            player: playerNum,
            mark: mark,
            selectBox(box) {
                  if (this.mark === "x" && turn === playerX) {
                        box.innerHTML = Xmarker;
                        turn = playerO;
                  } else if(this.mark === "o" && turn === playerO){
                        box.innerHTML = Omarker;
                        turn = playerX;
                  }
            }
      }
}

function createCompPlayer(mark) {
      return {
            player: "computer",
            mark: mark,

            selectBox() {
                  if (this.mark === "x" && turn === playerX) {
                        gameBoard.board[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)].innerHTML = Xmarker;
                  } else if(this.mark === "o" && turn === playerO){
                        gameBoard.board[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)].innerHTML = Omarker;
                  }
            }
      }
}

function switchTurns() {
      if (turn === playerX) {
            turn = playerO;
      } else {
            turn = playerX;
      }
}


cpuGameBtn.onclick = () => {
      startGame();

      if (selectedMark === markSelectors[0]) {
            playerX = createHumanPlayer(1, "x")
            playerO = createCompPlayer("o");
            turn = playerX;
      } else {
            playerO = createHumanPlayer(1, "o")
            playerX = createCompPlayer("x");
            playerX.selectBox();
            turn = playerO;
      }
}

for (let i = 0; i < boxes.length; i++) {
      boxes[i].onclick = () => {
            turn.selectBox(boxes[i]);
      }
}
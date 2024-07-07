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
            console.log(selectedMark)
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
let Xmarker = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>'
let Omarker = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>'

//function to create human players and computer
function createHumanPlayer(playerNum, mark) {
      return {
            player: playerNum,
            mark: mark,
            selectBox(box) {
                  if (this.mark === "x") {
                        box.appendChild(Xmarker);
                  } else {
                        box.appendChild(Omarker);
                  }
            }
      }
}

function createCompPlayer(mark) {
      return {
            player: "computer",
            mark: mark,

            selectBox(box) {
                  if (this.mark === "x") {
                        gameBoard.board[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)].appendChild(Xmarker);
                  } else {
                        gameBoard.board[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)].appendChild(Omarker);
                  }
            }
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
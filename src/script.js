//NEW GAME MENU START
const markSelectors = document.getElementsByClassName("mark");
let selectedMark = markSelectors[0];

//change styling of selected mark
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
            if (selectedMark !== markSelectors[i]) {
                  unselectMark(selectedMark);
                  selectedMark = markSelectors[i];
                  selectMark(markSelectors[i]);
            }
      }
}

//when button for CPU or 2 player is clicked, if x is selected then player X is you

//setting up players
let playerX = {};
let playerO = {};



//GAME INTERACTION
const boxes = document.getElementsByClassName("game-board-box");


//GAME LOGIC


//game board
const gameBoard = {
      board: [
            [boxes[0], boxes[1], boxes[2]],
            [2, "2", ""],
            [3, "","4"]
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


console.log(gameBoard.board[0][0])

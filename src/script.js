//NEW GAME MENU START
const markSelectors = document.getElementsByClassName("mark");
let selected = markSelectors[0];

function selectMark(selectedMark) {
      selectedMark.querySelector("path").style.fill = "#1F3641";
      selectedMark.style.backgroundColor = "#A8BFC9";
}

function unselectMark(originalSelection) {
      originalSelection.querySelector("path").style.fill = "#A8BFC9";
      originalSelection.style.backgroundColor = "initial";
}

selectMark(selected);


for (let i = 0; i < markSelectors.length; i++) {
      markSelectors[i].onclick = () => {
            if (selected !== markSelectors[i]) {
                  unselectMark(selected);
                  selected = markSelectors[i];
                  selectMark(markSelectors[i]);
            }
      }
}

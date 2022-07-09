/* Global Variables */
let squares = [];
let map = [];
let sideNum = 3;

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", initialize);

/* Create an array with a boolean for each div, representing the presence of a mine. Set a click-event listener for each square.  */
function initialize() {
  // later: call function to generate any size map
  let squares = document.getElementsByTagName("div");
  let numSquares = squares.length;
  map = [];
  for (let i = 0; i < numSquares; i++) {
    map.push(writeToMap());
    squares[i].addEventListener("click", handleMove);
    squares[i].setAttribute("id", i);
  }
}

/* Return a random Boolean with a (1 / probabilityOfMine) chance of being true */
function writeToMap() {
  const probabilityOfMine = 3;
  let someNum = Math.floor(Math.random() * probabilityOfMine);
  if (someNum === 0) {
    return true;
  } else {
    return false;
  }
}

/* Check if the clicked square was a mine, then apply the appropriate CSS class. */
function handleMove(e) {
  let clickedSquare = parseInt(e.target.getAttribute("id")); //this seems bad!
  if (map[clickedSquare] === true) {
    e.target.style.background = "red";
  } else {
    e.target.style.background = "gray";
    e.target.innerHTML = countMines(clickedSquare);
  }
}

function countMines(position) {
  let adjacentIndexes = [];
  let numMines = 0;
  adjacentIndexes.push(position - sideNum - 1, position - sideNum, position - sideNum + 1);
  adjacentIndexes.push(position - 1,                               position + 1);
  adjacentIndexes.push(position + sideNum - 1, position + sideNum, position + sideNum + 1);
  adjacentIndexes = eliminateEdgeCases(adjacentIndexes, position);
  adjacentIndexes.forEach(element => {
    if (map[element] === true){
      numMines++;
    }
  });
  alert(numMines);
  return numMines;
}

function eliminateEdgeCases(adjacentIndexes, position) {
  if (position % sideNum === 0) { //on left edge of map, remove left side of adjacentIndexes
    adjacentIndexes[0] = null; adjacentIndexes[3] = null; adjacentIndexes[5] = null;
  } else if (position % sideNum === 2) { //on right edge of map, remove right side
    adjacentIndexes[2] = null; adjacentIndexes[4] = null; adjacentIndexes[7] = null;
  }

  if (position < (sideNum - 1)) { // on top edge, remove top
    adjacentIndexes[0] = null; adjacentIndexes[1] = null; adjacentIndexes[2] = null;
  } else if (position > (Math.pow(sideNum, 2) - sideNum - 1)){ // on bottom edge, remove bottom
    adjacentIndexes[5] = null; adjacentIndexes[6] = null; adjacentIndexes[7] = null;
  }
  return adjacentIndexes;
}

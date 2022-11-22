/* Global Variables */
const mindsweeper = [];
let hardMode = true;
const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById("start");
const sizeInput = document.getElementById('size-input')

startBtn.addEventListener("click", initialize);

/* Create an array with a boolean for each div, representing the presence of a mine. Set a click-event listener for each square.  */
function initialize() {
  const size = Number(sizeInput.value);
  while(mindsweeper.length) mindsweeper.pop();
  gameArea.innerHTML = null;
  gameArea.style.gridTemplateColumns = "repeat(" + size + ", 40px)";
  gameArea.style.gridTemplateRows = "repeat(" + size + ", 40px)";
  for (let row = 0; row < size; row++){
    mindsweeper.push([]) 
    for(let col = 0; col < size; col++){
      mindsweeper[row].push(makeSquare(row, col));
      gameArea.appendChild(mindsweeper[row][col].div);
    }
  }
  console.log(mindsweeper);
}

function makeSquare(row, col) {
  const div = document.createElement('div');
  div.classList.add('game-square');
  div.addEventListener('mousedown', () => handleMove(row, col));
  return {
    div: div,
    row: row,
    col: col,
    isMine: (Math.floor(Math.random() * 5) === 0),
    clicked: false,
    flagged: false
  }
}

/* Check if the clicked square was a mine, then apply the appropriate CSS class. */
function handleMove(row, col) {
  const square = mindsweeper[row][col];
  let longClick = false;
  setTimeout(() => { longClick = true }, 400);
  square.div.addEventListener('mouseup', () => {
    if (longClick) {
      if (square.flagged)  {
        square.flagged = false;
        square.div.classList.remove('flagged');
        square.div.textContent = null;
      }
      square.flagged = true;
      square.div.textContent = 'F';
      square.div.classList.add('flagged');
    }
    else {
      if (square.isMine) {
        youLose();
      }
      else {
        square.div.textContent = countAdjacentMines(row, col);
        if (hardMode) {
          setTimeout(() => { square.div.textContent = null}, 2000);
        }
        if (youWon()) {
          const winnerObj = {
            name: prompt('Congratulations!  Enter your name to post your score.'),
            gameState: mindsweeper
          }
          Object.freeze(winnerObj);
        }
      }
    }
  })
  

}

function youWon() {
  let youWon = true;
  for (row = 0; row < mindsweeper.length; row ++){
    for (col = 0; col < mindsweeper.length; col++){
      if (!mindsweeper[row][col].isMine && !mindsweeper[row][col].clicked) {
        youWon = false;
      }
    }
  }
  return youWon; 
}

function youLose() {
  for (row = 0; row < mindsweeper.length; row ++){
    for (col = 0; col < mindsweeper.length; col++){
      const square = mindsweeper[row][col];
      if (square.isMine) {
        square.div.classList.add('mine');
      }
      else if (!square.clicked ) {
        square.div.classList.add('safe');
        square.div.textContent = countAdjacentMines(row, col);
      }
    }
  }
}
/* Create an array containing all adjacent indexes, then remove the ones that are "off of the map".  Check map[] at each index to count the mines. */
function countAdjacentMines(row, col) {
  let adjacentMinesCounter = 0;
  const adjacentCoordinates = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col -1], [row + 1, col], [row + 1, col +1]
  ]
  const size = mindsweeper.length;
adjacentCoordinates.forEach(([row, col]) => {
  if (row < 0 || col < 0 || row >= size || col >= size) return;
  if (mindsweeper[row][col].isMine) adjacentMinesCounter++;
  });
  return adjacentMinesCounter;
}